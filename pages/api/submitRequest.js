import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { property, type, urgency, description, contact } = req.body;

  // ✅ Log the incoming request data
  console.log('🔍 Received data:', req.body);

  // ✅ Insert into Supabase
  const { data, error } = await supabase.from('Requests').insert([
    {
      property,
      type,
      urgency,
      description,
      contact,
    },
  ]);

  // ✅ Log Supabase response
  console.log('📤 Supabase response:', { data, error });

  if (error) {
    return res.status(500).json({ message: 'Failed to submit request', error });
  }

  return res.status(200).json({ message: 'Request submitted successfully', data });
}
