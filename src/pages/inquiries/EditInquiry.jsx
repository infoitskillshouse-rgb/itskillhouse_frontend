// src/components/admin/inquiries/EditInquiry.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getInquiryById, updateInquiry } from '../../services/inquiryService';
import { toast } from 'react-toastify';

const EditInquiry = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiry = async () => {
      try {
        const inquiry = await getInquiryById(id);
        setFormData(inquiry);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to load inquiry details.');
        setLoading(false);
      }
    };

    fetchInquiry();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateInquiry(id, formData);
      toast.success('Inquiry updated successfully!');
      navigate('/admin/inquiries');
    } catch (error) {
      toast.error('Failed to update inquiry.');
    }
  };

  if (loading) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Inquiry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Message</label>
          <textarea
            name="message"
            value={formData.requirements}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            rows={4}
          />
        </div>
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => navigate('/admin/inquiries')}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Update Inquiry
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditInquiry;
