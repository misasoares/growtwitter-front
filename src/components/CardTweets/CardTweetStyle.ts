import styled from "styled-components";

export const IconeStyled = styled.div<{ imgurl: string }>`
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  border-radius: 50%;
  border: 2px solid #1d9bf0;
  background-color: #fd924b;
  background-image: url(${(props) => props.imgurl});
  background-size: cover;
  background-position: center;
  margin-right: 10px;
`;

export const SmallIconeStyled = styled(IconeStyled)`
  width: 50px;
  height: 50px;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;