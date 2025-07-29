import { useRouter } from 'next/router';
import { useState } from 'react';

export default function RequestForm() {
  const router = useRouter();
  const { propertyId } = router.query;
  const [formData, setFormData] = useState({
    location: '',
    issue: '',
    urgency: 'Medium',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRequest = {
      id: `REQ-${Date.now()}`,
      location: formData.location,
      issue: formData.issue,
      urgency: formData.urgency,
      status: 'Pending',
    };

    // Save to backend or memory (for demo, post to API route)
    await fetch('/api/add-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRequest),
    });

    alert('Request submitted!');
    router.push('/admin');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Maintenance Request – {propertyId}</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <input name="location" placeholder="Your unit or address" onChange={handleChange} required />
        <input name="issue" placeholder="Describe the issue" onChange={handleChange} required />
        <select name="urgency" onChange={handleChange} defaultValue="Medium">
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
}
