import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { formRateLimit, getClientIp, safeLimit } from "@/lib/rateLimit";

const schema = z.object({
  email: z.string().email(),
  source: z.string().optional().default("homepage"),
  honeypot: z.string().optional(),
});

export async function POST(req: Request) {
  // Rate Limiting
  const ip = getClientIp(req);
  const { blocked } = await safeLimit(formRateLimit, ip);
  if (blocked) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { email, source, honeypot } = schema.parse(body);

    // Honeypot: silently accept bots without storing anything.
    if (honeypot && honeypot.trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    if (!supabaseAdmin) {
      return NextResponse.json({ ok: false, error: "Supabase not configured" }, { status: 500 });
    }
    const { error } = await supabaseAdmin.from("email_subscribers").insert([
      { email, source, created_at: new Date().toISOString() },
    ]);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Failed to subscribe" }, { status: 500 });
  }
}
