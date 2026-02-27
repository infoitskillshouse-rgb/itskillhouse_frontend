// frontend/src/pages/AdminDashboard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { removeToken } from "../../utils/auth";

import SubscriberTable from "../pages/newsLetter/SubscriberList";
import NewsletterForm from "../pages/newsLetter/NewsletterForm";
import AnalyticsChart from "../pages/newsLetter/AnalyticsChart";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("subscribers");
  const navigate = useNavigate();

  const logout = () => {
    removeToken();
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  return (
    <div className="p-4 space-y-8">
      {/* Top Bar */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-lg font-medium">Total Subscribers</h2>
          <p className="text-2xl font-bold text-blue-600">150</p>
        </div>
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-lg font-medium">Newsletters Sent</h2>
          <p className="text-2xl font-bold text-green-600">320</p>
        </div>
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-lg font-medium">Open Rate</h2>
          <p className="text-2xl font-bold text-purple-600">58%</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "subscribers" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("subscribers")}
        >
          Subscribers
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "send" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("send")}
        >
          Send Newsletter
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "analytics" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("analytics")}
        >
          Analytics
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white p-6 shadow rounded-lg">
        {activeTab === "subscribers" && <SubscriberTable />}
        {activeTab === "send" && <NewsletterForm />}
        {activeTab === "analytics" && <AnalyticsChart />}
      </div>
    </div>
  );
};

export default AdminDashboard;
