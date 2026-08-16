import { useAuthStore } from "@/store/auth.store";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
  // Without this, axios silently falls back to relative URLs and every call
  // 404s against the dev server instead of failing with a clear cause.
  throw new Error(
    "VITE_API_BASE_URL is not set. Copy .env.example to .env and set the API base URL."
  );
}

export const apiClient = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Clear the session on 401; the route guards react to the store change and
    // redirect. Navigating from here would create a cycle back to the router.
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      if (useAuthStore.getState().accessToken) {
        useAuthStore.getState().logout();
      }
    }

    return Promise.reject(error);
  }
);
