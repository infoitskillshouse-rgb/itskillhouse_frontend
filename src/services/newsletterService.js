

import axiosInstance from "../../utils/axiosInstance";

// ✅ 1. Subscribe user
export const subscribeUser = async (formData) => {
  return await axiosInstance.post("/newsletter", formData);
};

// ✅ 2. Send newsletter to all subscribers
export const sendNewsletter = async (data) => {
  return await axiosInstance.post("/newsletter/send", data);
};

// ✅ 3. Get all subscribers
export const getAllSubscribers = async () => {
  return await axiosInstance.get("/newsletter/subscribers");
};

// ✅ 4. Delete subscriber by ID
export const deleteSubscriber = async (id) => {
  return await axiosInstance.delete(`/newsletter/${id}`);
};

// ✅ 5. Get newsletter stats
export const getNewsletterStats = async () => {
  return await axiosInstance.get("/newsletter/stats");
};

export const checkNewsletterStatus = async () => {
  return await axiosInstance.get(`/newsletter/check`);
};