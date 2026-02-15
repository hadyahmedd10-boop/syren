import { NextResponse } from "next/server"; 
import { supabaseAdmin } from "@/lib/supabaseAdmin"; 

export async function POST(req: Request) { 
  const { id } = await req.json().catch(() => ({})); 
  if (!id) return NextResponse.json({ ok: false, error: "Missing id" }, { status: 400 }); 
  if (!supabaseAdmin) return NextResponse.json({ ok: false, error: "Supabase Admin not configured" }, { status: 500 });

  const { error } = await supabaseAdmin 
    .from("testimonials") 
    .update({ approved: true }) 
    .eq("id", id); 

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 }); 

  return NextResponse.json({ ok: true }); 
} 
