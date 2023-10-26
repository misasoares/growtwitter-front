/* eslint-disable @typescript-eslint/no-explicit-any */
import apiService from "./api.service";
import { LikeDto } from "./like.service";

export interface RetweetDto {
  content: string;
  tweetId: string;
}

export interface RetweetShow{
  id:string
  content:string
  Likes: LikeDto[]
}

export async function createRetweet(data: RetweetDto) {
  try {
    const retweet = {
      content: data.content,
      tweetId: data.tweetId,
    };
    const resposta = await apiService.post("/retweets", retweet);

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
