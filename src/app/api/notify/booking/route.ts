import { NextResponse } from "next/server";
import { z } from "zod";
import { quoteRateLimit, getClientIp, safeLimit } from "@/lib/rateLimit";
import { sendTransactionalEmail, sendTransactionalEmailTo } from "@/lib/email/brevo";
import { generateSyrenEmail } from "@/lib/email/syren-template";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const bookingSchema = z.object({
  experienceTitle: z.string().min(2),
  experienceSlug: z.string().min(1),
  startDate: z.string().optional().nullable(),
  endDate: z.string().optional().nullable(),
  travelers: z.number().int().min(1).max(20),
  contact: z.string().min(3),
  notes: z.string().optional().nullable(),
  totalPrice: z.number().optional().nullable(),
  currency: z.string().optional().default("USD"),
});

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const { blocked } = await safeLimit(quoteRateLimit, ip);
  if (blocked) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const data = bookingSchema.parse(body);

    const lines: string[] = [];
    lines.push(`<p><strong>Experience:</strong> ${data.experienceTitle}</p>`);
    lines.push(`<p><strong>Slug:</strong> ${data.experienceSlug}</p>`);
    if (data.startDate) lines.push(`<p><strong>Start Date:</strong> ${data.startDate}</p>`);
    if (data.endDate) lines.push(`<p><strong>End Date:</strong> ${data.endDate}</p>`);
    lines.push(`<p><strong>Travelers:</strong> ${data.travelers}</p>`);
    lines.push(`<p><strong>Contact:</strong> ${data.contact}</p>`);
    if (data.totalPrice !== undefined && data.totalPrice !== null) {
      lines.push(`<p><strong>Estimated Total:</strong> ${data.totalPrice.toLocaleString()} ${data.currency}</p>`);
    }
    if (data.notes) {
      lines.push(`<div style="margin-top:12px;"><p><strong>Special Requests:</strong></p><p style="white-space:pre-wrap;">${data.notes}</p></div>`);
    }

    const bodyHtml = `
      <h2 style="color:#C9A84C; margin:0 0 12px;">New Booking Request</h2>
      ${lines.join("")}
    `;
    const html = generateSyrenEmail({
      subject: `New Booking Request — ${data.experienceTitle}`,
      preheader: "A new booking has been requested",
      bodyHtml,
    });

    const emailRes = await sendTransactionalEmail({
      subject: `New Booking Request — ${data.experienceTitle}`,
      html,
      // Use contact as reply-to if it's an email, otherwise fallback to EMAIL_FROM
      replyTo: /\S+@\S+\.\S+/.test(data.contact) ? data.contact : (process.env.EMAIL_FROM || "noreply@syrentravel.com"),
    });

    if (!emailRes.success) {
      return NextResponse.json({ ok: false, error: emailRes.error || "Email failed" }, { status: 500 });
    }

    const customerEmail = /\S+@\S+\.\S+/.test(data.contact) ? data.contact : null;
    if (customerEmail) {
      const travelDates =
        data.startDate || data.endDate ? `${data.startDate || "—"} → ${data.endDate || "—"}` : "—";
      const estimatedTotal =
        data.totalPrice !== undefined && data.totalPrice !== null
          ? `${data.totalPrice.toLocaleString()} ${data.currency}`
          : "—";
      const whatsappNumber = process.env.WHATSAPP_NUMBER || "201016015723";
      const whatsappLink = `https://wa.me/${whatsappNumber}`;
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://syrentravel.com";
      const logoUrl = `${siteUrl}/syren-logo-email.svg`;

      const body = `
        <p>Dear Traveler,</p>
        <p>Thank you for choosing Syren. We've received your booking request and our concierge team will be in touch within 24 hours.</p>
        <h3 style="color:#C9A84C;">Your Request Summary</h3>
        <ul style="margin:0; padding-left:18px;">
          <li><strong>Experience:</strong> ${data.experienceTitle}</li>
          <li><strong>Travel Dates:</strong> ${travelDates}</li>
          <li><strong>Travelers:</strong> ${data.travelers}</li>
          <li><strong>Estimated Total:</strong> ${estimatedTotal}</li>
        </ul>
        <h3 style="color:#C9A84C; margin-top:16px;">What Happens Next</h3>
        <ol style="margin:0; padding-left:18px;">
          <li>Our concierge team reviews your request</li>
          <li>We contact you within 24 hours to confirm availability</li>
          <li>We send your detailed itinerary and payment instructions</li>
        </ol>
        <p>No payment has been taken. Your journey begins when you're ready.</p>
        <p>For urgent inquiries, reach us on <a href="${whatsappLink}" style="color:#C9A84C; text-decoration:none;">WhatsApp</a>.</p>
      `;
      const customerHtml = generateSyrenEmail({
        subject: "Your Syren Booking Request — We'll Be In Touch Shortly",
        preheader: "We received your booking request",
        bodyHtml: body,
        ctaLabel: "Visit syrentravel.com",
        ctaUrl: siteUrl,
      });

      await sendTransactionalEmailTo({
        to: customerEmail,
        subject: "Your Syren Booking Request — We'll Be In Touch Shortly",
        html: customerHtml,
        replyTo: process.env.NOTIFY_EMAIL || process.env.EMAIL_FROM || "noreply@syrentravel.com",
      });
    }

    try {
      if (supabaseAdmin) {
        const isEmail = /\S+@\S+\.\S+/.test(data.contact);
        const emailVal = isEmail ? data.contact : `phone.${Date.now()}@booking.syren`;
        const phoneVal = isEmail ? null : data.contact;
        const tripDates = data.startDate || data.endDate
          ? `${data.startDate || ""}${data.endDate ? ` → ${data.endDate}` : ""}`.trim()
          : null;
        const messageParts = [
          `Experience: ${data.experienceTitle}`,
          `Travelers: ${data.travelers}`,
          data.totalPrice ? `Est. Total: ${data.totalPrice.toLocaleString()} ${data.currency}` : null,
          data.notes ? `Notes: ${data.notes}` : null,
        ].filter(Boolean).join(" | ");
        await supabaseAdmin.from("quote_requests").insert([{
          name: data.contact,
          email: emailVal,
          phone: phoneVal,
          trip_dates: tripDates,
          message: messageParts,
          source: "booking_drawer",
          status: "pending",
        }]);
      }
    } catch (e) {
      console.error("supabase insert error (booking):", e);
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Booking notify error:", err);
    return NextResponse.json({ ok: false, error: "Failed to send booking request" }, { status: 500 });
  }
}
