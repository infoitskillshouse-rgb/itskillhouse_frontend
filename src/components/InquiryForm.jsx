import React, { useState } from 'react';
import axios from 'axios';

const InquiryForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    services: [],
    requirements: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const updatedServices = formData.services.includes(value)
        ? formData.services.filter((s) => s !== value)
        : [...formData.services, value];
      setFormData({ ...formData, services: updatedServices });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/inquiries', formData);
      setMessage('Inquiry submitted successfully!');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        services: [],
        requirements: '',
      });
    } catch (error) {
      setMessage('Failed to submit inquiry.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Inquiry Form</h2>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="fullName" type="text" placeholder="Full Name" required className="w-full p-2 border rounded" value={formData.fullName} onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" required className="w-full p-2 border rounded" value={formData.email} onChange={handleChange} />
        <input name="phone" type="text" placeholder="Phone" required className="w-full p-2 border rounded" value={formData.phone} onChange={handleChange} />
        <input name="companyName" type="text" placeholder="Company Name" className="w-full p-2 border rounded" value={formData.companyName} onChange={handleChange} />

        <div className="space-y-1">
          <label className="block font-medium">Services</label>
          {['Web Design', 'SEO', 'Marketing', 'App Development'].map((service) => (
            <label key={service} className="block">
              <input type="checkbox" value={service} checked={formData.services.includes(service)} onChange={handleChange} /> {service}
            </label>
          ))}
        </div>

        <textarea name="requirements" placeholder="Requirements" className="w-full p-2 border rounded" rows={4} value={formData.requirements} onChange={handleChange} />

        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
      </form>
    </div>
  );
};

export default InquiryForm;
