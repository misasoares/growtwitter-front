// import styled from "styled-components"
// import {useEffect} from 'react'
// import { useNavigate } from "react-router-dom";
// import { TweetDTO, list, listAllUsers } from "../../config/services/tweet.service";
// import {useState} from 'react'

// const BodyTimeline = styled.div`
//     border: solid black 2px;
//     width: 60%;
// `
// export default function Timeline(){
//     const navigate = useNavigate();
//     const [ tweet, setTweet] = useState<TweetDTO[]>([])

//     useEffect(()=>{
//         const token = localStorage.getItem('token')
//         if (!token) {
// 			navigate('/login'); // devolve o usuario não logado pra pagina de login
// 			return;
// 		}
//         async function listAll(){
//             const resposta = await list(token as string);
//             setTweet(resposta.data)
//         }
//         listAll()
//     })

//     async function getUser(id:string){
//         const resposta = await listAllUsers(id)
        
//         return resposta.data.username
//     }

//     return(
//         <BodyTimeline>
            
//           {tweet.slice().reverse().map(async(i)=>(
//             <div key={i.id}>
//             <p>{i.content}</p>
//             <p>{await getUser(i.userId)}</p>
//             </div>
//           ))}
//         </BodyTimeline>
//     )
// }

import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TweetDTO, list } from "../../config/services/tweet.service";
import { useState } from "react";
import { listAllUsers } from "../../config/services/user.service";

const BodyTimeline = styled.div`
  border: solid black 2px;
  width: 60%;
`;

export default function Timeline() {
  const navigate = useNavigate();
  const [tweet, setTweet] = useState<TweetDTO[]>([]);
  const [usernames, setUsernames] = useState<string[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    async function listaTweets() {
      const resposta = await list(token as string);
      setTweet(resposta.data);
    }

    async function listaUsers() {
      const usernamesPromises = tweet.map(async (tweet) => {
        const resposta = await listAllUsers(tweet.userId);
        
        return resposta.data.username;
      });
      const resolvedUsernames = await Promise.all(usernamesPromises);
      setUsernames(resolvedUsernames);
    }

    listaTweets();
    listaUsers();
  }, []);
  

  return (
    <BodyTimeline>
      {tweet.slice().reverse().map((i, index) => (
        <div key={index}>
          <p>{i.content}</p>
          <p>{usernames[index]}</p>
        </div>
      ))}
    </BodyTimeline>
  );
}
