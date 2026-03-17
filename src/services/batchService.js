// src/services/batchService.js
import axios from '../../utils/axiosInstance';

// Get all batches (Public / Admin)
export const getAllBatches = async () => {
  const res = await axios.get('/batches');
  return res.data.data;
};

// Get single batch by ID
export const getBatchById = async (id) => {
  const res = await axios.get(`/batches/${id}`);
  return res.data.data;
};

// Create new batch (Admin)
export const createBatch = async (batchData) => {
  const res = await axios.post('/batches/create', batchData);
  return res.data.data;
};

// Update batch (Admin)
export const updateBatch = async (id, updatedData) => {
  const res = await axios.put(`/batches/${id}`, updatedData);
  return res.data.data;
};

// Delete batch (Admin)
export const deleteBatch = async (id) => {
  const res = await axios.delete(`/batches/${id}`);
  return res.data.data;
};