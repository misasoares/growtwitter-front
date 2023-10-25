/* eslint-disable @typescript-eslint/no-explicit-any */
import apiService, { ResponseAPI } from "./api.service";
import { LikeDto } from "./like.service";
import { UserDto } from "./user.service";

interface TweetRequest {
  content: string;
  token: string;
}

export interface TweetDTO {
  id: string;
  userId: string;
  content: string;
  retweets?: string[];
  User: UserDto;
  Likes: LikeDto[];
}

export async function create(objTweet: TweetRequest): Promise<ResponseAPI> {
  try {
    const tweet = {
      content: objTweet.content,
      type: "tweet",
    };
    const resposta = await apiService.post("/tweets", tweet, {
      headers: { Authorization: objTweet.token },
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

export async function list() {
  try {
    const resposta = await apiService.get("/tweets");
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
