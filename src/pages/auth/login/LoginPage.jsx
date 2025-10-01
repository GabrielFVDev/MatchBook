
import {   PageWrapper,
  Book,
  Left,
  Right,
  Title,
  Form,
  Label,
  Input,
  SocialButtons,
  SocialButton,
  LoginButton, } from "./styles.styles";

export default function LoginPage() {
  return (
    <PageWrapper>
    <Book>
      <Left>
        <Title>Entrar</Title>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Label>
            Email
            <Input type="email" placeholder="seu@email.com" required />
          </Label>
          <Label>
            Senha
            <Input type="password" placeholder="••••••••" required />
          </Label>

          <SocialButtons>
            <SocialButton disabled aria-disabled>
              Entrar com Google
            </SocialButton>
            <SocialButton disabled aria-disabled>
              Entrar com GitHub
            </SocialButton>
            <SocialButton disabled aria-disabled>
              Entrar com Apple
            </SocialButton>
          </SocialButtons>

          <LoginButton type="submit">Entrar</LoginButton>
        </Form>
      </Left>

      <Right
        role="img"
        aria-label="Imagem ilustrativa de leitura/tecnologia"
        style={{
          backgroundImage:
            "url('https://source.unsplash.com/900x900/?book,reading,technology')",
        }}
      />
    </Book>
  </PageWrapper>
  );
}

