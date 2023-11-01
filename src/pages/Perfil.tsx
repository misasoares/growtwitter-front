import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Box, CircularProgress } from "@mui/material";
import { TweetDTO, list } from "../config/services/tweet.service";
import { BodyTimeline, HrStyled } from "../components/Timeline/Timeline";
import CardTweet from "../components/CardTweets/CardTweet";
import { UserDto, listMe } from "../config/services/user.service";
import Sidebar from "../components/Sidebar/Sidebar";
import iconeExplorar from "../images/icone_explorar.svg";
import iconepaginaInicial from "../images/icone_pagina inicial.svg";
import iconePerfilSelecionado from "../images/icone_perfil_selecionado.svg";
import Acontecimeto from "../components/Acontecimento/Acontecimento";
import { Body } from "./Home";

export const IconeStyled = styled.div<{ imgurl: string }>`
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  border-radius: 50%;
  border: 2px solid #1d9bf0;
  background-color: #fd924b;
  background-image: url(${(props) => props.imgurl});
  background-size: cover;
  background-position: center;
  margin-right: 10px;
`;

function Perfil() {
  const navigate = useNavigate();
  const [userLogado, setUserLogado] = useState<UserDto | null>();
  const [tweets, setTweets] = useState<TweetDTO[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    setLoading(true);
    async function me() {
      const res = await listMe();
      setUserLogado(res.data);
    }

    async function listarTweets() {
      const res = await list();

      if (res.code !== 200) {
        alert("Algo deu errado, atualize a página.");
      }
      setTweets(res.data);
      setLoading(false);
    }

    me();
    listarTweets();
  }, []);

  function addTweet(tweet: TweetDTO) {
    setTweets([tweet, ...tweets]);
  }

  const tweetsDoUsuario = tweets.filter((tweet: TweetDTO) => tweet.User.id === userLogado?.id);

  return (
    <Body>
      <Sidebar iconeExplorar={iconeExplorar} iconePerfil={iconePerfilSelecionado} iconePgInicial={iconepaginaInicial} addTweet={addTweet} userLogado={userLogado} />
      <BodyTimeline>
        {loading ? (
          <>
            <Box sx={{ display: "flex", position: "absolute", left: "43%", top: "50%" }}>
              <CircularProgress />
            </Box>
          </>
        ) : (
          <div style={{ paddingLeft: "15px" }}>
            <h2 style={{ marginBottom: "0" }}>Perfil de {userLogado?.username}</h2>
            <p style={{ margin: "0 0 10px 0", padding: "0" }}>{tweetsDoUsuario.length} tweets.</p>
            <IconeStyled imgurl={`https://www.gravatar.com/avatar/${userLogado?.iconePerfil}?d=robohash`}></IconeStyled>
            <h3 style={{ marginBottom: "0" }}>{userLogado?.name}</h3>
            <p style={{ marginTop: "0" }}>
              <strong>{userLogado?.username}</strong>
            </p>

            <div style={{ border: "1px solid #bbbbbb", borderRadius: "10px", padding: "10px" }}>
              {tweetsDoUsuario.map((t, index) => (
                <div key={index}>
                  <div style={{ margin: "10px" }}>
                    <CardTweet iconePerfilUser={t.User.iconePerfil} iconePerfil={t.originalTweet ? t.originalTweet.User.iconePerfil : null} index={index} tweet={t} key={index} />
                  </div>
                  <HrStyled />
                </div>
              ))}
            </div>
          </div>
        )}
      </BodyTimeline>
      <Acontecimeto />
    </Body>
  );
}
export default Perfil;
