import { ContainerStyled, MainStyled, SectionStyled, SubmitStyled } from "../components/LoginStyled/LoginStyled";
import { login } from "../config/services/auth.service";
import { useNavigate } from "react-router-dom";


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

      localStorage.setItem("token", resposta.data.token);

      navigate("/");
    }
  }

  return (
    <MainStyled>
      <ContainerStyled>
        <SectionStyled>
          <h2>Growtwitter</h2>
          <p>Trabalho final do bloco intermediário</p>
          <p>
            O Growtwitter é a plataforma definitiva para todos os apaixonados por redes sociais que buscam uma experiência familiar e poderosa, semelhante ao Twitter, mas com um toque único. Seja
            parte desta comunidade que valoriza a liberdade de expressão, a conexão com pessoas de todo o mundo e a disseminação de ideias.
          </p>
        </SectionStyled>

        <SubmitStyled>
          <h2>Etrar no Growtwitter</h2>
          <form onSubmit={(e) => handleSubmit(e)} style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" />

            <label htmlFor="password">password</label>
            <input type="text" name="password" />

            <button type="submit">Entrar</button>
          </form>
        </SubmitStyled>
      </ContainerStyled>
    </MainStyled>
  );
}

export default Login;
