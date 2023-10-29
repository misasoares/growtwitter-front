/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const apiService = axios.create({
  baseURL: "https://api-growtwitter-misael.onrender.com",
  headers: {
    Authorization: localStorage.getItem("token"),
  },
});

export default apiService;

export interface ResponseAPI {
  ok?: boolean;
  code?: number;
  message?: string;
  data?: any;
}