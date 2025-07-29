let requests = global.requests || [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    requests.push(req.body);
    global.requests = requests;
    res.status(200).json({ message: 'Saved' });
  } else if (req.method === 'GET') {
    res.status(200).json(requests);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
