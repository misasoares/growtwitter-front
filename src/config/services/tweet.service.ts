/* eslint-disable @typescript-eslint/no-explicit-any */
import apiService, { ResponseAPI } from "./api.service";
import { LikeDto } from "./like.service";
import { UserDto } from "./user.service";

interface TweetRequest {
  content: string;
  type: "tweet" | "retweet";
  tweetId?: string 
}

export interface TweetDTO {
  [x: string]: any;
  id: string;
  userId: string;
  content: string;
  retweets: TweetDTO[]
  User: UserDto;
  Likes: LikeDto[];
  originalTweet: TweetDTO
  type: "tweet" | "retweet"
}

export async function create(objTweet: TweetRequest): Promise<ResponseAPI> {
  try {
    const tweet = {
      content: objTweet.content,
      type: objTweet.type,
      originalTweetId: objTweet.tweetId,
    };
    const resposta = await apiService.post("/tweets", tweet);

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
