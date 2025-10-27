import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const userData = localStorage.getItem("userData");

    if (userData) {
      const { access_token } = JSON.parse(userData);
      if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("userData");
      window.location.href = "/login";
    }

    console.error("Axios error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
