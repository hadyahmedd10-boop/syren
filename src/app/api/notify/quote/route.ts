import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { quoteRateLimit, getClientIp } from "@/lib/rateLimit";
import { sendTransactionalEmail, sendTransactionalEmailTo } from "@/lib/email/brevo";

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
  if (quoteRateLimit) {
    const { success } = await quoteRateLimit.limit(ip);
    if (!success) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }
  }

  try {
    const body = await req.json();
    const validatedData = quoteSchema.parse(body);

    // 1. Save to Supabase (service role)
    if (!supabaseAdmin) {
      return NextResponse.json({ ok: false, error: "Supabase Admin not configured" }, { status: 500 });
    }
    const { error: dbError } = await supabaseAdmin
      .from("quote_requests")
      .insert([
        {
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone,
          trip_dates: validatedData.trip_dates,
          budget: validatedData.budget,
          message: validatedData.message,
          status: "pending",
        },
      ]);

    if (dbError) throw dbError;
    console.log("saved to supabase: quote_requests");

    // 2. Send Email via Brevo
    try {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.syrentravel.com";
      const logoUrl = `${siteUrl}/syren-logo-email.png`;
      const htmlContent = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #1a1a1a; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">New Quote Request</h2>
          <div style="margin-top: 20px;">
            <p><strong>Name:</strong> ${validatedData.name}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            ${validatedData.phone ? `<p><strong>Phone:</strong> ${validatedData.phone}</p>` : ""}
            ${validatedData.trip_dates ? `<p><strong>Desired Dates:</strong> ${validatedData.trip_dates}</p>` : ""}
            ${validatedData.budget ? `<p><strong>Budget:</strong> ${validatedData.budget}</p>` : ""}
            <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${validatedData.message}</p>
            </div>
          </div>
          <p style="margin-top: 30px; font-size: 12px; color: #666; text-align: center;">Sent from Syren Travel platform</p>
        </div>
      `;

      const emailResult = await sendTransactionalEmail({
        subject: `New Quote Request from ${validatedData.name}`,
        html: htmlContent,
        replyTo: validatedData.email,
      });

      if (!emailResult.success) {
        throw new Error(emailResult.error || "Email failed");
      }

      const autoReplyHtml = `
        <div style="font-family: sans-serif; max-width: 640px; margin: 0 auto; padding: 24px; border: 1px solid #eee; border-radius: 12px;">
          <div style="text-align:center; margin-bottom: 16px;">
            <img src="${logoUrl}" alt="Syren" width="48" height="50" style="display:inline-block;" />
          </div>
          <h2 style="color: #1a1a1a; text-align:center; margin: 0 0 16px;">We received your quote request</h2>
          <p style="margin: 0 0 12px;">Hi ${validatedData.name},</p>
          <p style="margin: 0 0 16px;">Thanks for requesting a quote with Syren Travel. Our team will review the details and get back to you soon.</p>
          <div style="margin-top: 16px; padding: 14px; background-color: #f9f9f9; border-radius: 8px;">
            ${validatedData.trip_dates ? `<p style="margin:0 0 6px;"><strong>Desired Dates:</strong> ${validatedData.trip_dates}</p>` : ""}
            ${validatedData.budget ? `<p style="margin:0 0 6px;"><strong>Budget:</strong> ${validatedData.budget}</p>` : ""}
            <p style="margin:0 0 6px;"><strong>Your message:</strong></p>
            <p style="white-space: pre-wrap; margin:0;">${validatedData.message}</p>
          </div>
          <hr style="border:none; border-top:1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #666; margin: 0; text-align:center;">Syren Travel · Cairo, Egypt</p>
        </div>
      `;
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
      console.log("brevo email success: quote request + auto-reply");
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
