/* eslint-disable @typescript-eslint/no-explicit-any */

import apiService from "./api.service";

export interface LikeDto {
  id?: string;
  tweetId?: string;
  retweetId?: string;
  userId?: string;
}

export async function createLike(data: LikeDto) {
  try {
    const like = {
      tweetId: data.tweetId,
      retweetId: data.retweetId,
    };
    const token = localStorage.getItem("token")
    const resposta = await apiService.post("/likes", like, {headers:{Authorization: token}});

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

export async function deleteLike(data: LikeDto) {
  try {
    const like = {
      id: data.id,
    };
    const token = localStorage.getItem("token")
    const resposta = await apiService.delete(`/likes/${like.id}`, {headers:{Authorization: token}});

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

export async function listLikes(token: string) {
  try {
    const resposta = await apiService.get("/likes/list", {
      headers: {
        Authorization: token,
      },
    });

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
