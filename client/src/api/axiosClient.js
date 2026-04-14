import axios from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? "http://localhost:5000/api/v1" : "/api/v1");

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
});

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default axiosClient;
