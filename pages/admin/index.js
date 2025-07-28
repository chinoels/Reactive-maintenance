// pages/admin/index.js

import { useState } from 'react';

export default function AdminDashboard() {
  const [requests] = useState([
    { id: 'REQ-001', location: 'Unit 4, Sunnyvale', issue: 'Leaking tap', status: 'Pending', urgency: 'High' },
    { id: 'REQ-002', location: 'House 8, Glen Eden', issue: 'Broken light', status: 'In Progress', urgency: 'Medium' },
    { id: 'REQ-003', location: 'Flat 1, Avondale', issue: 'Clogged toilet', status: 'Completed', urgency: 'High' },
  ]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2rem' }}>🛠️ Admin Dashboard</h1>
      <p>Manage incoming property maintenance requests.</p>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '2rem' }}>
        <thead>
          <tr style={{ background: '#f0f0f0', textAlign: 'left' }}>
            <th style={{ padding: '10px' }}>Request ID</th>
            <th style={{ padding: '10px' }}>Location</th>
            <th style={{ padding: '10px' }}>Issue</th>
            <th style={{ padding: '10px' }}>Urgency</th>
            <th style={{ padding: '10px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{req.id}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{req.location}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{req.issue}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{req.urgency}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{req.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
