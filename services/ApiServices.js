import axios from "axios";
import Cookies from "js-cookie";


export const axiosInstance = (apiType) => {
  const TOKEN = Cookies.get("accessToken");
  let apiURL = process.env.NEXT_PUBLIC_API_BACKOFFICE_URL;

  if (apiType === "auth") {
    apiURL = process.env.NEXT_PUBLIC_API_AUTH_URL;
  }

  const instance = axios.create({
    baseURL: apiURL, maxBodyLength: Infinity, headers: {
      "Content-Type": "application/json", // Content-Type başlığını burada ekleyin
      Authorization: `Bearer ${TOKEN}`
    }
  });
  instance.interceptors.request.use((config) => {
    // Authorization başlığını ekleyin
    return config;
  });
  instance.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    if (error.response?.status === 401) {
      Cookies.remove("accessToken");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  });
  return instance;
};
