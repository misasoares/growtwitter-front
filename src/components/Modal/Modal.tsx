import React from "react";
import ButtonTweetar from "../../components/Button/Button";
import X from "../../images/X.svg";
import { create } from "../../config/services/tweet.service";
import { useNavigate } from "react-router-dom";
import { BackgroundStyle, FormStyled, IconeXStyled, ModalStyle, TextAreaContentStyled } from "./Modal.style";

interface ModalPrimaryProps {
  isOpen: boolean;
  onClose: () => void;
}


const Modal: React.FC<ModalPrimaryProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  async function criatTweet(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const token = localStorage.getItem("token");

    if(!token){
      alert("Você não está logado.")
      navigate('/login')
    }

    const tweet = {
      content: e.currentTarget.content.value as string,
      token: token as string
    };

    const resposta = await create(tweet)
    if(resposta.code === 201){
      onClose()
    }

    alert(resposta.message)
   
  }
  if (isOpen) {
    return (
      <BackgroundStyle>
        <ModalStyle>
          <IconeXStyled src={X} alt="fechar modal" onClick={onClose} />
          <FormStyled onSubmit={(e) => criatTweet(e)}>
            <label htmlFor="content"></label>
          
            <TextAreaContentStyled name="content" placeholder="Digite seu novo tweet"/>
            
            <hr />
            <div style={{ alignSelf: "flex-end" }}>
              <ButtonTweetar type="submit" />
            </div>
          </FormStyled>
        </ModalStyle>
      </BackgroundStyle>
    );
  }
  return null;
};

export default Modal;
