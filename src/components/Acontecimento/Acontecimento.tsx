import styled from "styled-components";
import Assuntos from "../Assuntos/Assuntos";
import { useEffect, useState } from "react";
import axios from "axios";
import { NewsDto } from "../../pages/Explorar";

const BodyAcontecimentos = styled.div`
  margin: 60px 10px 10px 10px;
  height: 30rem;
  max-width: 20rem;
  background-color: #e9e9e9;
  border-radius: 30px 30px 30px 30px;
  overflow: hidden;
  font-size: 0%.8;
`;

export default function Acontecimeto() {
  const [newsAPI, setNews] = useState<NewsDto | null>();

  useEffect(() => {
    async function news() {
      const res = await axios.get("https://newsapi.org/v2/top-headlines?country=br&apiKey=3756b5f45de74943976dd6a8f2c860f3");
      console.log(res.data);
      setNews(res.data);
    }
    console.log(newsAPI?.articles);
    news();
  }, []);

  return (
    <BodyAcontecimentos>
      <h3 style={{ margin: "20px" }}>O que está acontecendo?</h3>
      <Assuntos link={newsAPI ? newsAPI.articles[0].url : null} subtitulo="Assunto do momento em Brasil" titulo={newsAPI ? newsAPI.articles[0].title : null} />
      <Assuntos link={newsAPI ? newsAPI.articles[1].url : null} subtitulo="Assunto do momento em Brasil" titulo={newsAPI ? newsAPI.articles[1].title : null} />
      <Assuntos link={newsAPI ? newsAPI.articles[2].url : null} subtitulo="Assunto do momento em Brasil" titulo={newsAPI ? newsAPI.articles[2].title : null} />
      <Assuntos link={newsAPI ? newsAPI.articles[3].url : null} subtitulo="Assunto do momento em Brasil" titulo={newsAPI ? newsAPI.articles[3].title : null} />
    </BodyAcontecimentos>
  );
}
