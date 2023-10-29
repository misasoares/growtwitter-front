/* eslint-disable @typescript-eslint/no-explicit-any */
import apiService, { ResponseAPI } from "./api.service";
import { LikeDto } from "./like.service";

export interface UserDto {
  id: string;
  name: string;
  username: string;
  LikesToUser: LikeDto[];
  iconePerfil:string
}

interface CreateUser {
  name: string;
  email: string;
  username: string;
  password: string;
}

export async function create(data: CreateUser) {
  try {
    const resposta = await apiService.post("users", data);
    console.log(resposta.data.code);

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

export async function listAllUsers(id: string): Promise<ResponseAPI> {
  try {
    const resposta = await apiService.get(`/users/${id}`);
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

export async function listMe(): Promise<ResponseAPI> {
  try {
    const resposta = await apiService.get(`/users/me`);

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
