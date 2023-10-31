import RoutesApp from "./routes/RoutesApp";
import styled from "styled-components";

const BodyStyled = styled.div`
  display: flex;
  width: 98vw;
  height: 98vh;
`;

function App() {
  return (
    <BodyStyled>
      <RoutesApp />
    </BodyStyled>
  );
}

export default App;
