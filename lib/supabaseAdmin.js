// lib/supabaseAdmin.js
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const service = process.env.SUPABASE_SERVICE_ROLE;

if (!url || !service) {
  throw new Error("Missing SUPABASE envs: check NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE");
}

export const supabaseAdmin = createClient(url, service, {
  auth: { persistSession: false }
});
