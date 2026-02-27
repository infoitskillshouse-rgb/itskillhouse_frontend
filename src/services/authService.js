// services/authService.js

import axiosInstance from "../../utils/axiosInstance";

/* =========================
   AUTH
========================= */

// Login
export const login = async (credentials) => {
  const res = await axiosInstance.post("/admin/login", credentials);
  return res.data;
};

// Logout (agar backend me hai)
export const logout = async () => {
  const res = await axiosInstance.post("/admin/logout");
  return res.data;
};




/* =========================
   PASSWORD
========================= */

// Forgot Password
export const forgotPassword = async (email) => {
  const res = await axiosInstance.post("/admin/forgot-password", { email });
  return res.data;
};

// Reset Password
export const resetPassword = async (token, password) => {
  const res = await axiosInstance.put(`/admin/reset-password/${token}`, {
    password
  });
  return res.data;
};

// Change Password
export const changePassword = async (data) => {
  const res = await axiosInstance.put("/admin/change-password", data);
  return res.data;
};



/* =========================
   PROFILE
========================= */

// Get Profile
export const getProfile = async () => {
  const res = await axiosInstance.get("/admin/me");
  return res.data;
};

// Update Profile
export const updateProfile = async (data) => {
  const res = await axiosInstance.put("/admin/update-profile", data);
  return res.data;
};



/* =========================
   ADMIN
========================= */

// Create Admin
export const createAdmin = async (data) => {
  const res = await axiosInstance.post("/admin/create-admin", data);
  return res.data;
};