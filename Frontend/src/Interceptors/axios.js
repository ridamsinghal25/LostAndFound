import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URI,
  withCredentials: true,
  timeout: 120000,
});

apiClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export { apiClient };
