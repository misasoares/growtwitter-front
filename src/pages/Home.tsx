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
`;

export const ButtonNav = styled.button`
  display: none;
  @media (max-width: 500px) {
    width: 60px;
    height: 30px;
    position: absolute;
    display: flex;
    text-align: center;
    justify-content: center;
    background-color: transparent;
    border: none;
    font-size: 20px;
    z-index: 11;
  }
`;

function Home() {
  const [userLogado, setUserLogado] = useState<UserDto | null>();
  const [tweets, setTweets] = useState<TweetDTO[]>([]);
  const [hideNav, setHideNav] = useState(false);

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
      <ButtonNav onClick={() => setHideNav(!hideNav)}>...</ButtonNav>
      <Sidebar hide={hideNav} iconePgInicial={iconepaginaInicialSelecionado} iconeExplorar={iconeExplorar} iconePerfil={iconePerfil} addTweet={addTweet} userLogado={userLogado} />
      <Timeline addTweet={addTweet} tweets={tweets} setarTweets={setarTweets} />
      <Acontecimeto />
    </Body>
  );
}

export default Home;
