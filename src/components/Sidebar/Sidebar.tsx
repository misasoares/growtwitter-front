import logo from "../../images/logo_growtweet.svg";
import iconePaginaInicialSelecionado from "../../images/icone_pagina inicial_selecionado.svg";
import styled from "styled-components";
import iconeExplorar from "../../images/icone_explorar.svg";
import iconePerfil from "../../images/icone_perfil.svg";
import ButtonTweetar from "../Button/Button";
import Modal from "../../components/Modal/Modal";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  width: 150px;
  color: white;
`;

function Sidebar() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
  }, []);

  function deslogar() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <BodySidebar>
      <SidebarStyled>
        <div>
          <img src={logo} alt="icone growtweet" />
          <p>
            <img src={iconePaginaInicialSelecionado} alt="icone pagina inicial selecionado" /> Página Inicial
          </p>
          <p>
            <img src={iconeExplorar} alt="icone explorar" /> Explorar
          </p>
          <p>
            <img src={iconePerfil} alt="icone perfil" /> Perfil
          </p>
        </div>

        <ButtonTweetar type="button" action={() => setOpenModal(true)} />
        <ButtonLogout onClick={deslogar}>sair</ButtonLogout>
      </SidebarStyled>
      <Modal isOpen={openModal} tweet={null} type="tweet" onClose={() => setOpenModal(false)} />
    </BodySidebar>
  );
}

export default Sidebar;
