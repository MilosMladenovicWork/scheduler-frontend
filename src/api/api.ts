import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
});

api.defaults.headers.common["Content-Type"] = "application/json";
