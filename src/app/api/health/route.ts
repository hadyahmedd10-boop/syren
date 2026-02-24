import { NextResponse } from "next/server";

export async function GET() {
  const present = {
    NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    BREVO_API_KEY: !!process.env.BREVO_API_KEY,
    EMAIL_FROM: !!process.env.EMAIL_FROM,
    NOTIFY_EMAIL: !!process.env.NOTIFY_EMAIL,
    STRIPE_SECRET_KEY: !!process.env.STRIPE_SECRET_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    UPSTASH_REDIS_REST_URL:
      !!process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_URL !== "PASTE_HERE",
    UPSTASH_REDIS_REST_TOKEN:
      !!process.env.UPSTASH_REDIS_REST_TOKEN && process.env.UPSTASH_REDIS_REST_TOKEN !== "PASTE_HERE",
    NEXT_PUBLIC_SITE_URL: !!process.env.NEXT_PUBLIC_SITE_URL,
  };

  return NextResponse.json({
    ok: true,
    ts: Date.now(),
    env: present,
    nodeEnv: process.env.NODE_ENV,
  });
}
