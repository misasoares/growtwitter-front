import styled from "styled-components";
import { ButtonStyled, ContainerStyled, InputStyled, MainStyled, SectionStyled, SubmitStyled } from "../components/LoginStyled/LoginStyled";
import { login } from "../config/services/auth.service";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { CSSProperties, useState } from "react";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


const ButtonToSignup = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  color: #1d9bf0;
  text-align: left;
  text-decoration: underline;
`

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const user = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };
    console.log(user);


    setLoading(true)
    const resposta = await login(user);
    setLoading(false)

    if (resposta.code !== 200) {
      alert("Username ou senha incorretos.");
      return;
    }

    if (resposta.code === 200) {
      localStorage.setItem("token", resposta.data.token);

      navigate("/");
    }
  }

  function navToSignup(){
    navigate('/cadastro')
  }

  return (
    <MainStyled>
      {loading ? <ClipLoader
        color='#ff0000'
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      /> : 
      <ContainerStyled>
        <SectionStyled>
          <h1>Growtwitter</h1>
          <p>Trabalho final do bloco intermediário</p>
          <p>
            O Growtwitter é a plataforma definitiva para todos os apaixonados por redes sociais que buscam uma experiência familiar e poderosa, semelhante ao Twitter, mas com um toque único. Seja
            parte desta comunidade que valoriza a liberdade de expressão, a conexão com pessoas de todo o mundo e a disseminação de ideias.
          </p>
        </SectionStyled>

        <SubmitStyled>
          <h2>Entrar no Growtwitter</h2>
          <form onSubmit={(e) => handleSubmit(e)} style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <label style={{ color: " rgb(136, 136, 136)" }} htmlFor="username">
              Username
            </label>
            <InputStyled type="text" name="username" />

            <label style={{ color: " rgb(136, 136, 136)" }} htmlFor="password">
              password
            </label>
            <InputStyled type="password" name="password" />
            <ButtonStyled type="submit">Entrar</ButtonStyled>
          </form>
          <p>Não tem conta? <ButtonToSignup onClick={navToSignup}>Cadastre-se</ButtonToSignup></p>
        </SubmitStyled>
      </ContainerStyled>
      }
      
             
    </MainStyled>
  );
}

export default Login;
