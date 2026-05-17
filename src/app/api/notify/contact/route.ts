import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { contactRateLimit, getClientIp } from "@/lib/rateLimit";
import { sendTransactionalEmail, sendTransactionalEmailTo } from "@/lib/email/brevo";
import { generateSyrenEmail } from "@/lib/email/syren-template";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  pathname: z.string().optional(),
});

export async function POST(req: Request) {
  // Rate Limiting
  const ip = getClientIp(req);
  if (contactRateLimit) {
    const { success } = await contactRateLimit.limit(ip);
    if (!success) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }
  }

  try {
    const body = await req.json();
    const validatedData = contactSchema.parse(body);

    // Send Email via Brevo
    try {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.syrentravel.com";
      const adminBody = `
        <h2 style="color:#C9A84C; margin:0 0 12px;">New Contact Inquiry</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        ${validatedData.phone ? `<p><strong>Phone:</strong> ${validatedData.phone}</p>` : ""}
        <p><strong>Subject:</strong> ${validatedData.subject || "General Inquiry"}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${validatedData.message}</p>
        <p style="font-size:12px; color:#7f7767;">From page: ${validatedData.pathname || "Unknown"}</p>
      `;
      const htmlContent = generateSyrenEmail({
        subject: `New Contact Inquiry: ${validatedData.subject || "General Inquiry"}`,
        preheader: "A new contact inquiry was submitted",
        bodyHtml: adminBody,
      });

      const emailResult = await sendTransactionalEmail({
        subject: `New Contact Inquiry: ${validatedData.subject || "General Inquiry"}`,
        html: htmlContent,
        replyTo: validatedData.email,
      });

      if (!emailResult.success) {
        throw new Error(emailResult.error || "Email failed");
      }

      const autoReplyHtml = generateSyrenEmail({
        subject: "We received your message",
        preheader: "The Syren team will reply shortly",
        bodyHtml:
          `<p>Hi ${validatedData.name},</p>
           <p>Thanks for contacting Syren Travel. Our team will review your message and get back to you shortly.</p>
           <p><strong>Your message:</strong></p>
           <p style="white-space: pre-wrap;">${validatedData.message}</p>`,
        ctaLabel: "Explore Experiences",
        ctaUrl: siteUrl + "/experiences",
      });
      const replyTo = process.env.NOTIFY_EMAIL || process.env.EMAIL_FROM || "noreply@syrentravel.com";
      const autoRes = await sendTransactionalEmailTo({
        to: validatedData.email,
        subject: "Thanks for contacting Syren Travel",
        html: autoReplyHtml,
        replyTo,
      });
      if (!autoRes.success) {
        console.error("brevo auto-reply failure:", autoRes.error);
      }
      try {
        if (supabaseAdmin) {
          await supabaseAdmin.from("contact_inquiries").insert([{
            name: validatedData.name,
            email: validatedData.email,
            phone: validatedData.phone || null,
            message: validatedData.message,
            pathname: validatedData.pathname || null,
            created_at: new Date().toISOString(),
          }]);
        }
      } catch (e) {
        console.error("Supabase insert failed (contact):", e);
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
