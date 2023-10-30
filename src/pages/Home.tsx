import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Timeline from "../components/Timeline/Timeline";
import { UserDto, listMe } from "../config/services/user.service";
import Perfil from "../components/Perfil/Perfil";
import { TweetDTO, list } from "../config/services/tweet.service";
import logo from "../images/logo_growtweet.svg";
import iconePaginaInicialSelecionado from "../images/icone_pagina inicial_selecionado.svg";
import iconeExplorar from "../images/icone_explorar.svg";
import iconePerfil from "../images/icone_perfil.svg";

function Home() {
  const navigate = useNavigate();
  const [userLogado, setUserLogado] = useState<UserDto>();
  const [loading, setLoading] = useState(false);
  const [tweets, setTweets] = useState<TweetDTO[]>([]);
  const [showPerfil, setShowPerfil] = useState(false);
  // const [showTimeline, setShowTimeline] = useState(true)

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
  }, [navigate, showPerfil]);

  function handleShowPerfil(show: boolean) {
    setShowPerfil(show);
  }

  return (
    <>
      <Sidebar
        showPerfil={handleShowPerfil}
        userLogado={userLogado}
        logo={logo}
        iconePerfil={iconePerfil}
        iconeExplorar={iconeExplorar}
        iconePaginaInicialSelecionado={iconePaginaInicialSelecionado}
      />
      {showPerfil ? <Perfil userLogado={userLogado} /> : <Timeline userLogado={userLogado} tweets={tweets} loading={loading} />}
    </>
  );
}

export default Home;
