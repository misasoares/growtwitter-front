/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const apiService = axios.create({
  baseURL: "http://localhost:3333/",
});

export default apiService;

export interface ResponseAPI {
  ok?: boolean;
  code?: number;
  message?: string;
  data?: any;
}

apiService.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? token : "";
  return config;
});
