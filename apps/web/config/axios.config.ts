import axios from 'axios'
import { clientConfig } from './client.config';

const api = axios.create({
    baseURL: clientConfig.backendUrl,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
})

api.interceptors.request.use(
  (config) => {
    console.log("Outgoing Axios Request", config.url)
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("Incoming Axios Response", error.config?.url, error.response?.status);
    const status = error.response?.status;

    if (status === 401) {
      console.warn("Unauthorized. Redirecting to login...");
    }

    if (status === 403) {
      console.warn("Forbidden. You don't have access.");
    }

    if (status >= 500) {
      console.error("Server error:", error.response?.data?.message);
    }

    return Promise.reject(error);
  }
);

export default api;
