/* eslint-disable @typescript-eslint/no-explicit-any */
import apiService, { ResponseAPI } from "./api.service";

interface LoginRequest {
  username: string;
  password: string;
}


export async function login(objLogin: LoginRequest): Promise<ResponseAPI> {
  try {
    const resposta = await apiService.post("/auth/login", objLogin);
console.log(resposta)
    return {
      ok: resposta.data?.ok,
      message: resposta.data?.message,
      code: resposta.data?.code,
      data: resposta.data?.data,
    };
  } catch (error: any) {
    return {
      ok: error.response.data?.ok,
      message: error.response.data?.message,
      code: error.response.data?.code,
      data: error.response.data?.data,
    };
  }
}
