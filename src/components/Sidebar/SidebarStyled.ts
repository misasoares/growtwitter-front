import styled from "styled-components";

export const BodySidebar = styled.div`
  display: flex;
  height: 100vh;
  align-self: flex-start;
`;

export const SidebarStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #f2f2f2;
  min-width: 15vw;
  max-width: 20vw;
  align-items: center;
`;

export const ButtonLogout = styled.button`
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