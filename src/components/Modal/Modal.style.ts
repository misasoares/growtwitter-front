import styled from "styled-components";

export const BackgroundStyle = styled.div`
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

export const ModalStyle = styled.div`
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

export const IconeXStyled = styled.img`
  width: 1rem;
  cursor: pointer;
`;

export const FormStyled = styled.form`
  width: 100%;
  height: 45%;
`;

export const TextAreaContentStyled = styled.textarea`
  height: 100%;
  width: 90%;
  border: none;
  outline: none;
  resize: none;
`;

export const TextAreaRetweetStyled = styled.textarea`
  height: 53%;
  width: 90%;
  border: none;
  outline: none;
  resize: none;
`;

export const DivCampoTweet = styled.div`
  font-size: 0.8rem;
  color: #616161;
  > h3 {
    margin: 0;
    padding: 0;
  }
  > p {
    margin: 0;
    padding: 0;
  }
`;
