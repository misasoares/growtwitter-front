import styled from "styled-components";
import ButtonTweetar from "../Button/Button";
import Modal from "../../components/Modal/Modal";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserDto, listMe } from "../../config/services/user.service";
import logo from "../../images/logo_growtweet.svg";
import iconePaginaInicialSelecionado from "../../images/icone_pagina inicial_selecionado.svg";
import iconeExplorar from "../../images/icone_explorar.svg";
import iconePerfil from "../../images/icone_perfil.svg";

const BodySidebar = styled.div`
  display: flex;
  height: 100vh;
  align-self: flex-start;
`;

const SidebarStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #f2f2f2;
  min-width: 15vw;
  max-width: 20vw;
  align-items: center;
`;

const ButtonLogout = styled.button`
  background-color: #f01d1d;
  border: none;
  padding: 7px;
  border-radius: 30px;
  width: 60px;
  color: white;
  position: absolute;
  bottom: 10px;
`;

export const IconeStyled = styled.div<{ imgurl: string }>`
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 2px solid #1d9bf0;
  background-color: #fd924b;
  background-image: url(${(props) => props.imgurl});
  background-size: cover;
  background-position: center;
  margin-right: 10px;
  position: absolute;
  bottom: 50px;
`;

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
        <ButtonLogout onClick={deslogar}>sair</ButtonLogout>
        <IconeStyled imgurl={userLogado === undefined ? "https://www.gravatar.com/avatar/?d=blank" : userAvatarUrl}></IconeStyled>
      </SidebarStyled>
      <Modal isOpen={openModal} tweet={undefined} type="tweet" onClose={() => setOpenModal(false)} />
    </BodySidebar>
  );
}

export default Sidebar;
