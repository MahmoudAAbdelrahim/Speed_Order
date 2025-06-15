import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// إضافة التوكن لو موجود
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const createOrder = (data) => API.post("/orders", data);
export const getOrders = () => API.get("/orders");
