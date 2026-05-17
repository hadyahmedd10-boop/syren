import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const schema = z.object({
  email: z.string().email(),
  source: z.string().optional().default("homepage"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, source } = schema.parse(body);
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
