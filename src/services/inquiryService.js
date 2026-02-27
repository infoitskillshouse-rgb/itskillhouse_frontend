// src/services/inquiryService.js
import axios from '../../utils/axiosInstance';

// Get all inquiries (Admin)
export const getAllInquiries = async () => {
  const res = await axios.get('/inquiries');
  return res.data.data;
};

// Get single inquiry by ID (Admin)
export const getInquiryById = async (id) => {
  const res = await axios.get(`/inquiries/${id}`);
  return res.data.data;
};

// Create a new inquiry (Public)
export const createInquiry = async (inquiryData) => {
  const res = await axios.post('/inquiries', inquiryData);
  return res.data.data;
};

// Update inquiry (Admin)
export const updateInquiry = async (id, updatedData) => {
  const res = await axios.put(`/inquiries/${id}`, updatedData);
  return res.data.data;
};

// Delete inquiry (Admin)
export const deleteInquiry = async (id) => {
  const res = await axios.delete(`/inquiries/${id}`);
  return res.data.data;
};
