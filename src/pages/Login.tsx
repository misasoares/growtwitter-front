import styled from "styled-components";
import { login } from "../config/services/auth.service";
import { useNavigate } from "react-router-dom";

const MainStyled = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f2f2f2;
`;

function Login() {
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const user = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };
    console.log(user); //dados do formulario captados

    const resposta = await login(user);

    if (!resposta.ok && resposta.code !== 200) {
      alert("Username ou senha incorretos.");
      return;
    }

    if (resposta.code === 200) {
      alert(`Logado com sucesso! ${resposta.message}`);

      localStorage.setItem("token", resposta.data.token);

      navigate("/");
    }

    
  }

  return (
    <MainStyled>
      <div style={{ display: "flex", maxWidth: "80vw", maxHeight: "80vh" }}>
        <section
          style={{
            maxWidth: "700px",
            wordBreak: "normal",
            backgroundColor: "#1d9bf0",
            color: "white",
            justifyContent: "center",
            alignContent: "center",
            textAlign: "left",
            paddingLeft: "25px",
            paddingRight: "25px",
            borderLeft: "solid transparent", 
            borderRadius: "8px 0px 0px 8px",
          }}
        >
          <h2>Growtwitter</h2>
          <p>Trabalho final do bloco intermediário</p>
          <p>
            O Growtwitter é a plataforma definitiva para todos os apaixonados por redes sociais que buscam uma experiência familiar e poderosa, semelhante ao Twitter, mas com um toque único. Seja
            parte desta comunidade que valoriza a liberdade de expressão, a conexão com pessoas de todo o mundo e a disseminação de ideias.
          </p>
        </section>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", minWidth: "250px", backgroundColor: "white", borderLeft: "solid transparent", 
            borderRadius: "0px 8px 8px 0px", }}>
          <h2>Etrar no Growtwitter</h2>
          <form onSubmit={(e) => handleSubmit(e)} style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" />

            <label htmlFor="password">password</label>
            <input type="text" name="password" />

            <button type="submit">Entrar</button>
          </form>
        </div>
      </div>
    </MainStyled>
  );
}

export default Login;
