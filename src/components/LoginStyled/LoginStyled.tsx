import styled from "styled-components";

export const MainStyled = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f2f2f2;
`;

export const ContainerStyled = styled.div`
  display: flex;
  max-width: 80vw;
  max-height: 80vh;
`;

export const SectionStyled = styled.section`
  max-width: 700px;
  word-break: normal;
  background-color: #1d9bf0;
  color: white;
  justify-content: center;
  align-content: center;
  text-align: left;
  padding-left: 25px;
  padding-right: 25px;
  border-radius: 8px 0px 0px 8px;
`;

export const SubmitStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-width: 250px;
  background-color: white;
  border-radius: 0px 8px 8px 0px;
`;