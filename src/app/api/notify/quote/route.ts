import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { quoteRateLimit, getClientIp, safeLimit } from "@/lib/rateLimit";
import { sendTransactionalEmail, sendTransactionalEmailTo } from "@/lib/email/brevo";
import { generateSyrenEmail } from "@/lib/email/syren-template";

const quoteSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  trip_dates: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(req: Request) {
  // Rate Limiting
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
    const validatedData = quoteSchema.parse(body);

    // Send Emails via Brevo
    try {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.syrentravel.com";
      const adminBody = `
        <h2 style="color:#C9A84C; margin:0 0 12px;">New Quote Request</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        ${validatedData.phone ? `<p><strong>Phone:</strong> ${validatedData.phone}</p>` : ""}
        ${validatedData.trip_dates ? `<p><strong>Desired Dates:</strong> ${validatedData.trip_dates}</p>` : ""}
        ${validatedData.budget ? `<p><strong>Budget:</strong> ${validatedData.budget}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${validatedData.message}</p>
      `;
      const htmlContent = generateSyrenEmail({
        subject: `New Quote Request from ${validatedData.name}`,
        preheader: "A new quote request was submitted",
        bodyHtml: adminBody,
      });

      const emailResult = await sendTransactionalEmail({
        subject: `New Quote Request from ${validatedData.name}`,
        html: htmlContent,
        replyTo: validatedData.email,
      });

      if (!emailResult.success) {
        throw new Error(emailResult.error || "Email failed");
      }

      const autoReplyHtml = generateSyrenEmail({
        subject: "We Received Your Syren Quote Request",
        preheader: "Our concierge will be in touch within 24 hours",
        bodyHtml:
          `<p>Hi ${validatedData.name},</p>
           <p>Thanks for requesting a quote with Syren Travel. Our team will review the details and get back to you soon.</p>
           ${validatedData.trip_dates ? `<p><strong>Desired Dates:</strong> ${validatedData.trip_dates}</p>` : ""}
           ${validatedData.budget ? `<p><strong>Budget:</strong> ${validatedData.budget}</p>` : ""}
           <p><strong>Your message:</strong></p>
           <p style="white-space: pre-wrap;">${validatedData.message}</p>`,
        ctaLabel: "Explore Experiences",
        ctaUrl: siteUrl + "/experiences",
      });
      const replyTo = process.env.NOTIFY_EMAIL || process.env.EMAIL_FROM || "noreply@syrentravel.com";
      const autoRes = await sendTransactionalEmailTo({
        to: validatedData.email,
        subject: "Thanks for your quote request",
        html: autoReplyHtml,
        replyTo,
      });
      if (!autoRes.success) {
        console.error("brevo auto-reply failure:", autoRes.error);
      }
      try {
        if (supabaseAdmin) {
          await supabaseAdmin.from("quote_requests").insert([{
            name: validatedData.name,
            email: validatedData.email,
            phone: validatedData.phone || null,
            trip_dates: validatedData.trip_dates || null,
            budget: validatedData.budget || null,
            message: validatedData.message,
            status: "pending",
            created_at: new Date().toISOString(),
          }]);
        }
      } catch (e) {
        console.error("supabase insert error (quote):", e);
      }
      return NextResponse.json({ ok: true }, { status: 200 });
    } catch (emailErr) {
      console.error("brevo email failure:", emailErr);
      return NextResponse.json({ ok: true, warning: "Email failed" }, { status: 200 });
    }
  } catch (err) {
    console.error("Notify route failed:", err);
    return NextResponse.json({ ok: false, error: "Failed to save request" }, { status: 500 });
  }
}
