// src/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API || "https://itskillhouse-backend.onrender.com/api",
  withCredentials: true,
});

export default instance;
