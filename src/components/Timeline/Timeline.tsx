import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TweetDTO, list } from "../../config/services/tweet.service";
import { useState } from "react";
import { listAllUsers } from "../../config/services/user.service";
import { LikeDto , createLike, deleteLike, listLikes } from "../../config/services/like.service";

const BodyTimeline = styled.div`
  border: solid black 2px;
  width: 60%;
`;

export default function Timeline() {
  const navigate = useNavigate();
  const [tweet, setTweet] = useState<TweetDTO[]>([]);
  const [usernames, setUsernames] = useState<string[]>([]);
  const [likedTweets, setLikedTweets] = useState<boolean[]>(new Array(tweet.length).fill([]));
  const [likes, setLikes] = useState<LikeDto[]>([])

  const token = localStorage.getItem("token") as string;

  useEffect(() => {

    if (!token) {
      navigate("/login");
      return;
    }

    async function listaTweets() {
      const resposta = await list(token);
      setTweet(resposta.data);
    }

   
    async function findLikes(){
      const allLikes = await listLikes(token)
      
      const formatedLikes = allLikes.data.map((like:LikeDto)=>({
        id:like.id,
        tweetId:like.tweetId
      }))

      setLikes(formatedLikes)

    }

    findLikes()
    
    listaTweets();

  }, []);

  useEffect(() => {
    //deixa vermelho os likes ja existentes
    const newLikedTweets = tweet.slice().reverse().map((t) =>
      likes.some((like) => like.tweetId === t.id)
    );
    setLikedTweets(newLikedTweets);

    async function listaUsers() {
      const usernamesPromises = tweet
        .map(async (tweet) => {
          const resposta = await listAllUsers(tweet.userId);

          return resposta.data.username;
        });
      const resolvedUsernames = await Promise.all(usernamesPromises);
      setUsernames(resolvedUsernames);
    }

    

    listaUsers()
  }, [likes, tweet]);


  // async function curtir(index: number) {

  //     const updatedLikedTweets = [...likedTweets];
  //     updatedLikedTweets[index] = !likedTweets[index];
  //   setLikedTweets(updatedLikedTweets);

  //   const newLike = {
  //     tweetId:tweet.slice().reverse()[index].id,
  //     token: token
  //   }
  
  //   if(updatedLikedTweets[index]){
  //     const resposta = await createLike(newLike)

  //     const setLike = {
  //       id: resposta.data.id,
  //       tweetId: resposta.data.tweetId
  //     } 
  //     setLikes([...likes, setLike])

  //     console.log(likes)
  //     return console.log(resposta.data)
  //   }else{
  //     const findIdLike = likes.find(e=>e.tweetId===likes[index].tweetId)
  //     if(findIdLike){
        
  //       const deslike = {
  //         id:findIdLike.id,
  //         token:token
  //       }
  //       const resposta = await deleteLike(deslike)
  //       const deleteState = likes.filter((like)=> like.id !== findIdLike!.id)
  //       console.log(deleteState)
  //       setLikes(deleteState)
       
  //       console.log(resposta)
        
  //     }
  //     else{
  //       alert("Deu pau")
  //     }
  //   }

  // }


  async function curtir(tweetId: string) {
    const updatedLikedTweets = [...likedTweets];
    const index = tweet.findIndex((t) => t.id === tweetId);

    if (index === -1) {
      return;
    }
  
    updatedLikedTweets[index] = !likedTweets[index];
    setLikedTweets(updatedLikedTweets);
  
    const existingLike = likes.find((like) => like.tweetId === tweetId);
  
    if (updatedLikedTweets[index]) {
      if (!existingLike) {
        // Criar um novo like
        const newLike = {
          tweetId: tweetId,
          token: token,
        };
  
        const resposta = await createLike(newLike);
        const setLike = {
          id: resposta.data.id,
          tweetId: resposta.data.tweetId,
        };
        setLikes([...likes, setLike]);
        console.log(resposta)
      }
    } else if (existingLike) {
      // Deletar o like existente
      const deslike = {
        id: existingLike.id,
        token: token,
      };
      
      const resposta = await deleteLike(deslike);
      const updatedLikes = likes.filter((like) => like.id !== existingLike.id);
      setLikes(updatedLikes);
      console.log(resposta)
    }
  }
  

  return (
    <BodyTimeline>
      {tweet
        .slice()
        .reverse()
        .map((i, index) => (
          <div key={index}>
            <p>{usernames.slice().reverse()[index]}</p>
            <p>{i.content}</p>
            <p>{i.likes?.length} likes</p>
            <p>{i.retweets} retweet aqui</p>

            <svg
              width="11"
              height="10"
              viewBox="0 0 11 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => curtir(i.id)}
            >
              <g clipPath="url(#clip0_83_2222)">
                <path
                  d="M0 3.08429C0.0179879 1.989 0.502097 0.988356 1.59076 0.388938C2.70444 -0.22504 3.80484 -0.0826685 4.84735 0.616248C5.50587 1.05792 5.49726 1.05631 6.13388 0.62919C7.20064 -0.0867132 8.32293 -0.238792 9.45773 0.417251C10.598 1.07572 11.054 2.14836 10.9945 3.46611C10.9445 4.58567 10.4713 5.54102 9.8347 6.41628C8.94469 7.641 7.81145 8.58826 6.56715 9.39395C5.31895 10.2021 5.67636 10.1956 4.45553 9.40771C3.16509 8.5737 1.99666 7.5868 1.08944 6.30546C0.445788 5.39541 0.00625667 4.40366 0 3.08429ZM5.48866 2.9128C5.26968 2.62725 5.1117 2.4145 4.94746 2.20741C4.68077 1.8709 4.37263 1.58616 3.99175 1.38878C2.5754 0.651841 1.11134 1.57402 1.08397 3.21534C1.07067 4.00486 1.34909 4.69326 1.75265 5.33312C2.62702 6.71963 3.86427 7.70005 5.1899 8.57774C5.38308 8.70555 5.56139 8.74196 5.76786 8.60525C7.20299 7.65071 8.5513 6.59991 9.42176 5.03058C9.77917 4.38667 9.98486 3.69908 9.90587 2.94435C9.8128 2.05129 9.25987 1.39363 8.41522 1.18816C7.59716 0.989165 6.92926 1.31355 6.35755 1.87899C6.06115 2.17182 5.81557 2.51966 5.48788 2.9128H5.48866Z"
                  fill={likedTweets[index] ? "red" : "#828282"}
                />
              </g>
              <defs>
                <clipPath id="clip0_83_2222">
                  <rect width="11" height="10" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <hr />
          </div>
        ))}
    </BodyTimeline>
  );
}
