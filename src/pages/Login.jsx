import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import { setToken } from "../../utils/auth";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate("/admin/dashboard");

const handleLogin = async (e) => {
  e.preventDefault();

  const { email, password } = formData;

  if (!email || !password) {
    toast.warn("Please fill all fields");
    return;
  }

  try {
    setLoading(true);
    const res = await api.post("/admin/login", { email, password });
    setToken(res.data.token);
    toast.success("Login successful!");

    // ✅ Redirect after login
    navigate("/admin/dashboard");

  } catch (err) {
    console.error("Login error:", err);
    const message = err.response?.data?.message || "Login failed";
    toast.error(message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-surface">
      <motion.form
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded-xl px-8 pt-8 pb-10 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Admin Login</h2>

        <div className="mb-5">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading || !formData.email || !formData.password}
          className={`w-full py-2 px-4 text-white rounded-md transition duration-200 ${
            loading || !formData.email || !formData.password
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </motion.form>
       <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default AdminLogin;
