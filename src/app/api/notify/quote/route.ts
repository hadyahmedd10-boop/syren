import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { quoteRateLimit, getClientIp, safeLimit } from "@/lib/rateLimit";
import { sendTransactionalEmail, sendTransactionalEmailTo, getReplyToAddress } from "@/lib/email/brevo";
import { generateSyrenEmail } from "@/lib/email/syren-template";
import { escapeHtml } from "@/lib/email/html";

const quoteSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  trip_dates: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(1, "Message is required"),
  honeypot: z.string().optional(),
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

    // Honeypot: real users never fill this hidden field. Silently accept bots so
    // they get no signal, but skip all downstream processing.
    if (validatedData.honeypot && validatedData.honeypot.trim() !== "") {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // Escape user-supplied values before HTML interpolation to prevent
    // HTML/header injection in notification emails.
    const name = escapeHtml(validatedData.name);
    const email = escapeHtml(validatedData.email);
    const phone = validatedData.phone ? escapeHtml(validatedData.phone) : null;
    const tripDates = validatedData.trip_dates ? escapeHtml(validatedData.trip_dates) : null;
    const budget = validatedData.budget ? escapeHtml(validatedData.budget) : null;
    const message = escapeHtml(validatedData.message);
    // Single-line copy for subjects (strip CR/LF to avoid header injection).
    const nameForSubject = validatedData.name.replace(/[\r\n]+/g, " ").trim();

    // Send Emails via Brevo
    try {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.syrentravel.com";
      const adminBody = `
        <h2 style="color:#C9A84C; margin:0 0 12px;">New Quote Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        ${tripDates ? `<p><strong>Desired Dates:</strong> ${tripDates}</p>` : ""}
        ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      `;
      const htmlContent = generateSyrenEmail({
        subject: `New Quote Request from ${nameForSubject}`,
        preheader: "A new quote request was submitted",
        bodyHtml: adminBody,
      });

      const emailResult = await sendTransactionalEmail({
        subject: `New Quote Request from ${nameForSubject}`,
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
          `<p>Hi ${name},</p>
           <p>Thanks for requesting a quote with Syren Travel. Our team will review the details and get back to you soon.</p>
           ${tripDates ? `<p><strong>Desired Dates:</strong> ${tripDates}</p>` : ""}
           ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ""}
           <p><strong>Your message:</strong></p>
           <p style="white-space: pre-wrap;">${message}</p>`,
        ctaLabel: "Explore Experiences",
        ctaUrl: siteUrl + "/experiences",
      });
      const replyTo = getReplyToAddress();
      const autoRes = await sendTransactionalEmailTo({
        to: validatedData.email,
        subject: "Thanks for your quote request",
        html: autoReplyHtml,
        replyTo,
      });
      if (!autoRes.success) {
        console.error("brevo auto-reply failure:", autoRes.error);
      }
    } catch (emailErr) {
      console.error("brevo email failure:", emailErr);
    }

    // Persist the lead even if email delivery failed, so no enquiry is lost.
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
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ ok: false, error: err.issues[0]?.message || "Invalid input" }, { status: 400 });
    }
    console.error("Notify route failed:", err);
    return NextResponse.json({ ok: false, error: "Failed to save request" }, { status: 500 });
  }
}
