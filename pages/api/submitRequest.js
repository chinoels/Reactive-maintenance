let requests = []; // In-memory (use DB later)

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { property, type, urgency, description, contact } = req.body;
    const id = Date.now();
    const entry = { id, property, type, urgency, description, contact, status: 'New', date: new Date() };
    requests.unshift(entry);
    res.status(200).json({ success: true });
  } else if (req.method === 'GET') {
    res.status(200).json(requests);
  } else {
    res.status(405).end();
  }
}
