import RoutesApp from "./routes/RoutesApp";
import styled from "styled-components";

const BodyStyled = styled.div`
  display: flex;
  justify-content: center;
`;

function App() {
  return (
    <BodyStyled>
      <RoutesApp />
    </BodyStyled>
  );
}

export default App;
