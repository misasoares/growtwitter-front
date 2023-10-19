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

        <ButtonTweetar action={() => setOpenModal(true)} />
      </SidebarStyled>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} />
    </BodySidebar>
  );
}

export default Sidebar;
