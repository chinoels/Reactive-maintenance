import { supabaseAdmin } from "../../lib/supabaseAdmin";

export default async function handler(req, res) {
  const { data, error } = await supabaseAdmin
    .from("Requests")              // capital R
    .select("*")
    .order("id", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json({ data });
}
