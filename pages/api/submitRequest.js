import { supabaseAdmin } from "../../lib/supabaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const p = req.body || {};
  const contact = [p.contact_name, p.contact_phone, p.contact_email].filter(Boolean).join(" | ");

  const row = {
    property: p.property_address || "",
    type: p.maintenance_type || "",
    urgency: p.urgency || "",
    description: p.details || "",
    contact,
    ...(p.photo_url ? { photo_url: p.photo_url } : {})
  };

  const { data, error } = await supabaseAdmin.from("Requests").insert([row]).select("*").single();
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json({ data });
}
