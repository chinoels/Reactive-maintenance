// lib/uploadPhoto.js
import { supabase } from "./supabaseClient";

/**
 * Upload a single image to the 'requests' storage bucket and return its public URL.
 * @param {File|Blob} file - The image file selected in the browser <input type="file">
 * @param {{ requestKey: string }} opts - A unique id per submission (e.g., nanoid)
 * @returns {Promise<string|null>} Public URL string or null if no file provided
 */
export async function uploadPhoto(file, { requestKey }) {
  if (!file) return null;

  // Basic guards
  const MAX_MB = 5;
  const sizeMb = file.size / (1024 * 1024);
  if (sizeMb > MAX_MB) {
    throw new Error(`File exceeds ${MAX_MB}MB limit`);
  }

  // Only allow common image MIME types (optional but safer)
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/heic", "image/heif"];
  if (file.type && !allowed.includes(file.type)) {
    throw new Error("Please upload a JPG/PNG/WEBP/GIF/HEIC image");
  }

  // Object key must start with 'uploads/' to satisfy the storage policy
  const safeName = (file.name || "photo").replace(/[^\w.\-]+/g, "_");
  const objectKey = `uploads/${requestKey}/${Date.now()}-${safeName}`;

  // Upload to the public 'requests' bucket (RLS policy must allow anon INSERT to uploads/*)
  const { error: uploadErr } = await supabase
    .storage
    .from("requests")
    .upload(objectKey, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadErr) {
    // Surface useful message to the UI
    throw new Error(uploadErr.message || "Upload failed");
  }

  // Get a public URL (bucket must be public; otherwise use signed URLs)
  const { data: pub } = supabase.storage.from("requests").getPublicUrl(objectKey);
  return pub?.publicUrl || null;
}
