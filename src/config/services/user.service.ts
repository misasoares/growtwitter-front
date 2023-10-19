/* eslint-disable @typescript-eslint/no-explicit-any */
import apiService, { ResponseAPI } from "./api.service";

export async function listAllUsers(id:string): Promise<ResponseAPI>{
    try {

        const resposta = await apiService.get(`/users/${id}`)
        return {
            ok: resposta.data?.ok,
            message: resposta.data?.message,
            code: resposta.data?.code,
            data: resposta.data?.data,
          };
    } catch (error:any) {
        return {
            ok: error.response.data?.ok,
            message: error.response.data?.message,
            code: error.response.data?.code,
            data: error.response.data?.data,
          };
    }
}