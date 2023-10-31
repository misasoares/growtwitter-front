import ButtonTweetar from "../Button/Button";
import Modal from "../../components/Modal/Modal";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserDto, listMe } from "../../config/services/user.service";
import logo from "../../images/logo_growtweet.svg";
import iconePaginaInicialSelecionado from "../../images/icone_pagina inicial_selecionado.svg";
import iconeExplorar from "../../images/icone_explorar.svg";
import iconePerfil from "../../images/icone_perfil.svg";
import { BodySidebar, ButtonLogout, IconeStyled, SidebarStyled } from "./SidebarStyled";

function Sidebar() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [userLogado, setUserLogado] = useState<UserDto | null>();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }
    async function me() {
      const res = await listMe();
      setUserLogado(res.data);
    }
    me();
  }, [navigate]);

  useEffect(() => {
    return () => {
      console.log("desmontar componente");
      setUserLogado(null);
    };
  }, []);

  function deslogar() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  const userAvatarUrl = `https://www.gravatar.com/avatar/${userLogado?.iconePerfil}?d=robohash`;

  return (
    <BodySidebar>
      <SidebarStyled>
        <div>
          <img src={logo} alt="icone growtweet" />
          <p onClick={() => navigate("/")}>
            <img src={iconePaginaInicialSelecionado} alt="icone pagina inicial selecionado" /> Página Inicial
          </p>
          <p onClick={() => navigate("/explorar")}>
            <img src={iconeExplorar} alt="icone explorar" /> Explorar
          </p>
          <p onClick={() => navigate("/perfil")}>
            <img src={iconePerfil} alt="icone perfil" /> Perfil
          </p>
        </div>

        <ButtonTweetar type="button" action={() => setOpenModal(true)} />
        <ButtonLogout onClick={deslogar}>Sair</ButtonLogout>
        <IconeStyled imgurl={userLogado === undefined ? "https://www.gravatar.com/avatar/?d=blank" : userAvatarUrl}></IconeStyled>
      </SidebarStyled>
      <Modal isOpen={openModal} tweet={undefined} type="tweet" onClose={() => setOpenModal(false)} />
    </BodySidebar>
  );
}

export default Sidebar;
