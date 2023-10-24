/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import apiService from "./api.service";

export interface LikeDto {
  length?: ReactNode;
  id?:string
  token?: string;
  tweetId?: string;
  retweetId?: string;
  userId?:string
}

export async function createLike(data: LikeDto) {
  try {
  
    const like = {
        tweetId:data.tweetId,
        retweetId: data.retweetId
    }
    const resposta = await apiService.post("/likes", like,{
        headers:{
            Authorization:data.token
        }
    });

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


export async function deleteLike(data:LikeDto){
  try {
    const like = {
        id:data.id
    }
   
    const resposta = await apiService.delete(`/likes/${like.id}`,{
        headers:{
            Authorization:data.token
        }
    });

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

export async function listLikes(token:string){
  try {
    const resposta = await apiService.get('/likes/list', {
      headers:{
        Authorization:token
      }
    })

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
