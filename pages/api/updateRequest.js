// pages/api/updateRequest.js
import { supabaseAdmin } from "../../lib/supabaseAdmin"; // uses SERVICE_ROLE

export default async function handler(req, res) {
  if (req.method !== "PATCH") return res.status(405).json({ error: "Method not allowed" });

  const { id, status } = req.body || {};
  if (!id || !status) return res.status(400).json({ error: "id and status required" });

  const { data, error } = await supabaseAdmin
    .from("Requests")
    .update({ status })
    .eq("id", id)
    .select("*")
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json({ data });
}
