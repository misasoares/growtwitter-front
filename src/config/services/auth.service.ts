/* eslint-disable @typescript-eslint/no-explicit-any */
import apiService, { ResponseAPI } from "./api.service";

interface LoginRequest {
  username: string;
  password: string;
}

export async function login(objLogin: LoginRequest): Promise<ResponseAPI> {
  try {
    const resposta = await apiService.post("/auth/login", objLogin);

    return {
      message: resposta.data?.message,
      code: resposta.data?.code,
      data: resposta.data?.data,
    };
  } catch (error: any) {
    return {
      message: error.response.data?.message,
      code: error.response.data?.code,
      data: error.response.data?.data,
    };
  }
}
