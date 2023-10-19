import logo from "../images/logo_growtweet.svg";
import iconePaginaInicialSelecionado from "../images/icone_pagina inicial_selecionado.svg";
import styled from "styled-components";
import iconeExplorar from "../images/icone_explorar.svg";
import iconePerfil from "../images/icone_perfil.svg";
import ButtonTweetar from "../components/Button";
import Modal from "../components/Modal";
import {useState} from 'react'

const BodyHome = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
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

function Home() {
    const [openModal, setOpenModal] = useState(false)

    

  return (
    <BodyHome>
        
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
        <ButtonTweetar action={()=>setOpenModal(true)} />
      </SidebarStyled>
      <Modal isOpen={openModal}/>
    </BodyHome>
  );
}

export default Home;
