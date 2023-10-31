/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const apiService = axios.create({
  baseURL: "https://api-growtwitter-misael.onrender.com",
});
console.log(apiService)
export default apiService;

export interface ResponseAPI {
  ok?: boolean;
  code?: number;
  message?: string;
  data?: any;
}