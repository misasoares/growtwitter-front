/* eslint-disable @typescript-eslint/no-explicit-any */
import apiService, { ResponseAPI } from "./api.service";

interface TweetRequest {
  content: string;
  token: string;
}

export async function create(objTweet: TweetRequest): Promise<ResponseAPI> {
  try {
    const tweet = {
      content: objTweet.content,
      type: "tweet",
    };
    const resposta = await apiService.post("/tweets", tweet, { headers: { Authorization: objTweet.token } });
    console.log(resposta);
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
