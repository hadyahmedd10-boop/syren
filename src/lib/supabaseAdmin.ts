import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseAdmin: SupabaseClient | null =
  url && service
    ? createClient(url, service, {
        auth: { persistSession: false },
      })
    : null;
