import Sidebar from "../components/Sidebar/Sidebar";
import { TweetDTO } from "../config/services/tweet.service";
import { UserDto, listMe } from "../config/services/user.service";
import { useEffect, useState } from "react";
import iconeExplorarSelecionado from "../images/icone_explorar_selecionado.svg";
import iconepaginaInicial from "../images/icone_pagina inicial.svg";
import iconePerfil from "../images/icone_perfil.svg";
import Assuntos from "../components/Assuntos/Assuntos";
import { BodyTimeline, HrStyled, TimeLineStyled } from "../components/Timeline/TimelineStyled";
import Acontecimeto from "../components/Acontecimento/Acontecimento";
import axios from "axios";
import { Body, ButtonNav } from "./Home";

export interface ArticlesDto {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  title: string;
  url: string;
}

export interface NewsDto {
  articles: ArticlesDto[];
  status: string;
}

export default function Explorar() {
  const [userLogado, setUserLogado] = useState<UserDto | null>();
  const [tweets, setTweets] = useState<TweetDTO[]>([]);
  const [newsAPI, setNews] = useState<NewsDto | null>();
  const [hideNav, setHideNav] = useState(false);

  useEffect(() => {
    async function me() {
      const res = await listMe();
      setUserLogado(res.data);
    }

    me();
  }, []);

  useEffect(() => {
    async function news() {
      const res = await axios.get("https://newsapi.org/v2/top-headlines?country=br&apiKey=3756b5f45de74943976dd6a8f2c860f3");
      console.log(res.data);
      setNews(res.data);
    }
    console.log(newsAPI?.articles);
    news();
  }, []);

  function addTweet(tweet: TweetDTO) {
    setTweets([tweet, ...tweets]);
  }

  return (
    <Body>
      <ButtonNav onClick={() => setHideNav(!hideNav)}>...</ButtonNav>
      <Sidebar hide={hideNav} iconePerfil={iconePerfil} iconePgInicial={iconepaginaInicial} iconeExplorar={iconeExplorarSelecionado} addTweet={addTweet} userLogado={userLogado} />
      <BodyTimeline>
        <TimeLineStyled>
          <h2 style={{ margin: "20px" }}>Explorar</h2>
          <HrStyled />
          <div style={{ padding: "10px" }}>
            {newsAPI &&
              newsAPI.articles.map((n, index) => (
                <div key={index}>
                  <Assuntos link={n.url} subtitulo="Assuntos do momento em Brasil" titulo={n ? n.title : null} />
                </div>
              ))}
          </div>
        </TimeLineStyled>
      </BodyTimeline>
      <Acontecimeto />
    </Body>
  );
}
