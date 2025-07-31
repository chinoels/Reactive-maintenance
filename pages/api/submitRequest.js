// pages/api/submitRequest.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { property, type, urgency, description, contact } = req.body;

    const { data, error } = await supabase
      .from('Requests')
      .insert([{ property, type, urgency, description, contact }]);

    if (error) {
      console.error('❌ Supabase Insert Error:', error);
      return res.status(500).json({ error: 'Failed to submit request' });
    }

    return res.status(200).json({ message: 'Request submitted successfully', data });
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}

