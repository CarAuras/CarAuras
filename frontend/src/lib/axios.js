import axios from "axios";
import { BACKEND_URL } from "../config/api";

export const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  // timeout: 5000,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ERR_NETWORK" || error.code === "ECONNABORTED") {
      error.isServerDown = true; // Add custom flag
    }
    return Promise.reject(error);
  }
);
