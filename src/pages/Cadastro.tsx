import { ButtonStyled, ContainerStyled, InputStyled, MainStyled, SectionStyled, SubmitStyled } from "../components/LoginStyled/LoginStyled";
import { useNavigate } from "react-router-dom";
import { create } from "../config/services/user.service";

function Cadastro() {
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const user = {
      name: e.currentTarget.nome.value,
      email: e.currentTarget.email.value,
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };
    console.log(user);

    const resposta = await create(user);

  

    if (resposta.code !== 201) {
      alert(resposta.message);
      return;
    }



    if (resposta.code === 201) {
        alert("Cadastrado com sucesso.")
      navigate("/login");
    }
  }

  return (
    <MainStyled>
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
          <h2>Cadastre-se</h2>
          <form onSubmit={(e) => handleSubmit(e)} style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <label style={{ color: " rgb(136, 136, 136)" }} htmlFor="nome">
              nome
            </label>
            <InputStyled type="text" name="nome"  />

            <label style={{ color: " rgb(136, 136, 136)" }} htmlFor="email">
              email
            </label>
            <InputStyled type="text" name="email" />

            <label style={{ color: " rgb(136, 136, 136)" }} htmlFor="username">
              Username
            </label>
            <InputStyled type="text" name="username" />

            <label style={{ color: " rgb(136, 136, 136)" }} htmlFor="password">
              password
            </label>
            <InputStyled type="password" name="password" />

            <ButtonStyled type="submit">Cadastrar-se</ButtonStyled>
          </form>
        </SubmitStyled>
      </ContainerStyled>
    </MainStyled>
  );
}

export default Cadastro;
