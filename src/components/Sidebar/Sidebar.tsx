import ButtonTweetar from "../Button/Button";
import Modal from "../../components/Modal/Modal";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserDto } from "../../config/services/user.service";
import logo from "../../images/logo_growtweet.svg";
import { styled } from "styled-components";
import { TweetDTO } from "../../config/services/tweet.service";

interface SidebarLineProp {
  userLogado?: UserDto | null;
  addTweet: (tweets: TweetDTO) => void;
  iconePgInicial: string;
  iconeExplorar: string;
  iconePerfil: string;
  hide: boolean
}

const BodySidebar = styled.div<{hide:boolean}>`
  display: flex;
  height: 100vh;
  align-self: flex-start;
  transform: translateX(${props => props.hide ? '-100%' : '0'});
  transition: transform 0.3s ease-in-out;
  @media (max-width:500px) {
    display: flex; 
    position: absolute; 
    width: 80%; 
    z-index: 10;
  
  }
`;

const SidebarStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #f2f2f2;
  min-width: 15vw;
  max-width: 20vw;
  padding: 30px 0 0 0;
  align-items: center;
  @media (max-width:500px) {
    padding: 50px 0 0 0;
    min-width: 40vw;
    width: 80%; 
    z-index: 10;
  
  }
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



function Sidebar(props: SidebarLineProp) {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [userLogado, setUserLogado] = useState<UserDto | null>();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }
    setUserLogado(props.userLogado);
  }, [navigate, props.userLogado]);

  function deslogar() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <BodySidebar hide={props.hide}>
      <SidebarStyled>
        <div>
          <img src={logo} alt="icone growtweet" />
          <p onClick={() => navigate("/")}>
            <img src={props.iconePgInicial} alt="icone pagina inicial selecionado" /> Página Inicial
          </p>
          <p onClick={() => navigate("/explorar")}>
            <img src={props.iconeExplorar} alt="icone explorar" /> Explorar
          </p>
          <p onClick={() => navigate("/perfil")}>
            <img src={props.iconePerfil} alt="icone perfil" /> Perfil
          </p>
        </div>

        <ButtonTweetar type="button" action={() => setOpenModal(true)} />
        <ButtonLogout onClick={deslogar}>Sair</ButtonLogout>
        <IconeStyled imgurl={userLogado?.iconePerfil ? `https://www.gravatar.com/avatar/${userLogado?.iconePerfil}?d=robohash` : ""}></IconeStyled>
      </SidebarStyled>
      <Modal addTweet={props.addTweet} isOpen={openModal} tweet={undefined} type="tweet" onClose={() => setOpenModal(false)} />
    </BodySidebar>
  );
}

export default Sidebar;
