import styled from "styled-components";

interface ButtonPrimaryProps {
  action?: () => void;
  type:"submit"|"button"
}

const ButtonStyled = styled.button`
  background-color: #1d9bf0;
  border: none;
  padding: 7px;
  border-radius: 30px;
  width: 150px;
`;

const ButtonTweetar: React.FC<ButtonPrimaryProps> = ({ action, type }) => {
  return <ButtonStyled type={type} onClick={action}>Tweetar</ButtonStyled>;
};

export default ButtonTweetar;
