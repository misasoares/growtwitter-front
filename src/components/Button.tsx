import styled from "styled-components";

interface ButtonPrimaryProps {
  action: () => void;
}

const ButtonStyled = styled.button`
  background-color: #1d9bf0;
  border: none;
  padding: 7px;
  border-radius: 10px;
  width: 150px;
`;

const ButtonTweetar: React.FC<ButtonPrimaryProps> = ({ action }) => {
  return <ButtonStyled onClick={action}>Tweetar</ButtonStyled>;
};

export default ButtonTweetar;
