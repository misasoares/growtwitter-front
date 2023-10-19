import React from "react";
import styled from "styled-components";
import ButtonTweetar from "./Button";
interface ModalPrimaryProps {
  isOpen: boolean;
}

const BackgroundStyle = styled.div`
display: flex;
    position: fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    background-color:rgba(0, 0, 0, 0.7);
    justify-content: center;
    z-index: 1000;
`;

const ModalStyle = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 50%;
    height: 40%;
    background-color: #ffff;
`

const Modal: React.FC<ModalPrimaryProps> = ({ isOpen }) => {
    function criatTweet(){
        alert("xablau 2")
    }
  if (isOpen) {
    return (
      <BackgroundStyle>
        <ModalStyle>
            <p>Este é o novo tweet</p>
            <ButtonTweetar action={criatTweet}/>
        </ModalStyle>
      </BackgroundStyle>
    );
  }
  return null;
};

export default Modal;
