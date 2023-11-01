import Sidebar from "../components/Sidebar/Sidebar";
import Timeline from "../components/Timeline/Timeline";
import { useEffect, useState } from "react";
import { UserDto, listMe } from "../config/services/user.service";
import { TweetDTO } from "../config/services/tweet.service";
import iconeExplorar from "../images/icone_explorar.svg";
import iconepaginaInicialSelecionado from "../images/icone_pagina inicial_selecionado.svg";
import iconePerfil from "../images/icone_perfil.svg";
import Acontecimeto from "../components/Acontecimento/Acontecimento";
import styled from "styled-components";

export const Body = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: space-between;
`

function Home() {
  const [userLogado, setUserLogado] = useState<UserDto | null>();
  const [tweets, setTweets] = useState<TweetDTO[]>([]);

  useEffect(() => {
    async function me() {
      const res = await listMe();
      setUserLogado(res.data);
    }
    me();
  }, []);

  function setarTweets(tweets: TweetDTO[]) {
    setTweets(tweets);
  }

  function addTweet(tweet: TweetDTO) {
    setTweets([tweet, ...tweets]);
  }

  return (
    <Body>
      <Sidebar iconePgInicial={iconepaginaInicialSelecionado} iconeExplorar={iconeExplorar} iconePerfil={iconePerfil} addTweet={addTweet} userLogado={userLogado} />
      <Timeline addTweet={addTweet} tweets={tweets} setarTweets={setarTweets} />
      <Acontecimeto />
    </Body>
  );
}

export default Home;
