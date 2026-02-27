// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // dynamic env base URL
  withCredentials: true, // for cookies (optional if not using)
});

export default api;
