import { useState } from 'react';

export default function RequestForm() {
  const [form, setForm] = useState({
    property: '',
    issue: '',
    urgency: '',
    contact: '',
    type: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/submitRequest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    alert('Request submitted!');
    setForm({ property: '', issue: '', urgency: '', contact: '', type: '' });
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f9f9f9',
      fontFamily: 'Arial, sans-serif'
    }}>
      <form onSubmit={handleSubmit} style={{
        textAlign: 'center',
        background: '#fff',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        width: '90%',
        maxWidth: '600px'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>🛠️ Maintenance Request</h1>

        <input
          type="text"
          name="property"
          placeholder="Property Address"
          value={form.property}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          required
          style={inputStyle}
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
          value={form.urgency}
          onChange={handleChange}
          required
          style={inputStyle}
        >
          <option value="">Urgency Level</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <textarea
          name="issue"
          placeholder="Describe the issue"
          value={form.issue}
          onChange={handleChange}
          required
          style={{ ...inputStyle, height: '100px', resize: 'vertical' }}
        />

        <input
          type="text"
          name="contact"
          placeholder="Your name or contact (optional)"
          value={form.contact}
          onChange={handleChange}
          style={inputStyle}
        />

        <button type="submit" style={{
          padding: '15px 30px',
          fontSize: '16px',
          fontWeight: 'bold',
          backgroundColor: '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          marginTop: '20px',
          cursor: 'pointer'
        }}>
          Submit Request
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '12px 15px',
  marginBottom: '15px',
  border: '1px solid #ccc',
  borderRadius: '6px',
  fontSize: '16px'
};
