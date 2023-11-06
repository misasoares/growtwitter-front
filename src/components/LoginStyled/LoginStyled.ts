import styled from "styled-components";


export const MainStyled = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f2f2f2;
  flex-direction: column;
`;

export const ContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 90vw;
  width: 100%;
  min-height: 30vh;
  max-height: 90vh;
  box-sizing: border-box;

  @media (min-width: 768px) {
    flex-direction: row;
    max-width: 80vw;
  }
`;

export const SectionStyled = styled.section`
  width: 100%;
  word-break: normal;
  background-color: #1d9bf0;
  color: white;
  justify-content: center;
  align-content: center;
  text-align: center;
  border-radius: 8px 0 0 8px;
  justify-content: center;
  align-items: center;

  @media (max-width: 500px) {
    text-align: left;
    padding: 20px;
    max-width: 80vw;
    border-radius: 8px 8px 0 0;
    margin-bottom: 0;
  }
`;

export const SubmitStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  background-color: white;
  border-radius: 0 8px 8px 0;
  box-sizing: border-box;

  @media (max-width: 500px) {
    width: 91vw;
    border-radius: 0 0 8px 8px;
  }
`;

export const ButtonStyled = styled.button`
  background-color: #1d9bf0;
  border: none;
  margin-top: 10px;
  border-radius: 9px;
  color: white;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
`;

export const InputStyled = styled.input`
  border: 1px solid rgb(221, 221, 221);
  padding: 8px;
  border-radius: 9px;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 10px;
`;
