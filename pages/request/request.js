// pages/request/request.js
import { useState } from 'react';

export default function RequestForm() {
  const [formData, setFormData] = useState({
    property: '',
    type: '',
    urgency: '',
    description: '',
    contact: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/submitRequest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert('Request submitted successfully!');
      setFormData({ property: '', type: '', urgency: '', description: '', contact: '' });
    } else {
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '50px' }}>
      <form onSubmit={handleSubmit} style={{ textAlign: 'center', maxWidth: '600px' }}>
        <h1>Maintenance Request Form</h1>
        <input
          type="text"
          name="property"
          placeholder="Property Address"
          value={formData.property}
          onChange={handleChange}
          required
          style={{ display: 'block', margin: '10px auto', width: '100%' }}
        />
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
          style={{ display: 'block', margin: '10px auto', width: '100%' }}
        >
          <option value="">Select Maintenance Type</option>
          <option value="Electrical">Electrical</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Handyman">Handyman</option>
          <option value="Broken Glass">Broken Glass</option>
          <option value="Lockouts">Lockouts</option>
          <option value="Others">Others</option>
        </select>
        <select
          name="urgency"
          value={formData.urgency}
          onChange={handleChange}
          required
          style={{ display: 'block', margin: '10px auto', width: '100%' }}
        >
          <option value="">Urgency Level</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <textarea
          name="description"
          placeholder="Issue description"
          value={formData.description}
          onChange={handleChange}
          required
          style={{ display: 'block', margin: '10px auto', width: '100%' }}
        />
        <input
          type="text"
          name="contact"
          placeholder="Your name or contact (optional)"
          value={formData.contact}
          onChange={handleChange}
          style={{ display: 'block', margin: '10px auto', width: '100%' }}
        />
        <button type="submit" style={{ marginTop: '15px' }}>Submit Request</button>
      </form>
    </div>
  );
}
