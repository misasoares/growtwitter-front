import React from "react";
import styled from "styled-components";
import ButtonTweetar from "../../components/Button/Button";
import X from "../../images/X.svg";
import { create } from "../../config/services/tweet.service";
import { useNavigate } from "react-router-dom";

interface ModalPrimaryProps {
  isOpen: boolean;
  onClose: () => void;
}

const BackgroundStyle = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: center;
  z-index: 1000;
`;

const ModalStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 30%;
  max-width: 500px;
  max-height: 200px;
  background-color: #ffff;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const IconeXStyled = styled.img`
  width: 1rem;
  cursor: pointer;
`;

const FormStyled = styled.form`

  width: 100%;
  height: 70%;
`

const TextAreaContentStyled = styled.textarea`
height: 80%;
width: 90%;
border: none;
outline: none;
resize: none;
`

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
