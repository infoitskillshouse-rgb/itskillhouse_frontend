import React, { useEffect, useState } from "react";
import {   getNewsletterStats,
 } from "../../services/newsletterService";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import  Loader  from "../../components/Loader";
import { toast } from "react-toastify";

const AnalyticsChart = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);

const fetchStats = async () => {
  try {
    setLoading(true);
    const res = await getNewsletterStats();
    setStats(res?.data?.stats || []);   // 👈 fallback array
  } catch (error) {
    console.error(error);
    toast.error("Failed to load analytics data");
    setStats([]); // 👈 fallback
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Subscriber Analytics</h2>

      {loading ? (
        <Loader />
      ) : stats.length === 0 ? (
        <p className="text-center text-gray-500">No analytics data to display.</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={stats}>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default AnalyticsChart;
