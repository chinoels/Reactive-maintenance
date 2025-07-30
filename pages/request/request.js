import { useState } from 'react';

export default function RequestForm() {
  const [formData, setFormData] = useState({
    property: '',
    type: '',
    urgency: '',
    description: '',
    contact: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('/api/submitrequest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return <div className="text-center mt-10">✅ Request submitted successfully! Someone will be in contact with you shortly</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 shadow-md bg-white rounded">
      <h1 className="text-2xl font-bold mb-4 text-center">Maintenance Request Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="property" placeholder="Property Address" required className="w-full border p-2 rounded" onChange={handleChange} />
        <select name="type" required className="w-full border p-2 rounded" onChange={handleChange}>
          <option value="">Select Maintenance Type</option>
          <option>Electrical</option>
          <option>Plumbing</option>
          <option>Handyman</option>
          <option>Broken Glass</option>
          <option>Lockouts</option>
          <option>Others</option>
        </select>
        <select name="urgency" required className="w-full border p-2 rounded" onChange={handleChange}>
          <option value="">Urgency Level</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Emergency</option>
        </select>
        <textarea name="description" rows="4" placeholder="Issue description" required className="w-full border p-2 rounded" onChange={handleChange}></textarea>
        <input name="contact" placeholder="Your name or contact (optional)" className="w-full border p-2 rounded" onChange={handleChange} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Submit Request</button>
      </form>
    </div>
  );
}
