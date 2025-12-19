import axios from "axios";
import { baseUrlHandler } from "../utils/baseUrlHandler";

export const api = axios.create({
  // Base Backend -> .env
  baseURL: baseUrlHandler(),
});

// interceptor -> before request & after response
api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  function (error) {
    return Promise.reject(error);
  }
);
