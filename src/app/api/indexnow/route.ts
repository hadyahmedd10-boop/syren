import { NextResponse } from "next/server";
import sitemap from "@/app/sitemap";
import { submitToIndexNow } from "@/lib/indexnow";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    let incoming: string[] | undefined = Array.isArray(body?.urls) ? body.urls : undefined;

    // Use incoming URLs if provided; otherwise build from sitemap on the fly
    const map = sitemap();
    const auto = Array.from(new Set(map.map((e) => e.url)));
    const urls = incoming && incoming.length ? Array.from(new Set(incoming.concat(auto))) : auto;

    // Submit to IndexNow
    await submitToIndexNow(urls);

    return NextResponse.json({ ok: true, submitted: urls.length });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "IndexNow submission failed" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const map = sitemap();
    const urls = Array.from(new Set(map.map((e) => e.url)));
    await submitToIndexNow(urls);
    return NextResponse.json({ ok: true, submitted: urls.length });
  } catch {
    return NextResponse.json({ ok: false, error: "IndexNow submission failed" }, { status: 500 });
  }
}
