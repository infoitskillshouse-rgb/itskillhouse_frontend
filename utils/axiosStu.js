import axios from "axios";

const instance = axios.create({
  baseURL: "https://itskillhouse-backend.onrender.com/api", // ✅ Correct backend port
});

// axiosInstance.js

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default instance;
