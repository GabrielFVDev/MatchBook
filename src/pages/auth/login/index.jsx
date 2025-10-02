import {
  PageWrapper,
  BookContainer,
  LeftPage,
  RightPage,
  Title,
  Form,
  InputGroup,
  Label,
  Input,
  Button,
  IllustrationContainer,
  BookStack,
  Book,
  QuoteText,
  LinkWrapper,
  StyledLink,
} from "./styles.module.jsx";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <PageWrapper>
      <BookContainer>
        <LeftPage>
          <Title>Bem-vindo</Title>
          <Form onSubmit={(e) => e.preventDefault()}>
            <InputGroup>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                type="email" 
                placeholder="seu@email.com" 
                required 
              />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="password">Senha</Label>
              <Input 
                id="password"
                type="password" 
                placeholder="••••••••" 
                required 
              />
            </InputGroup>
            <Button type="submit">Entrar na Biblioteca</Button>
            <LinkWrapper>
              <StyledLink as={Link} to="/cadastro">Criar uma conta</StyledLink>
              <StyledLink href="#">Esqueceu a senha?</StyledLink>
            </LinkWrapper>
          </Form>
        </LeftPage>
        
        <RightPage>
          <IllustrationContainer>
            <BookStack>
              <Book />
              <Book />
              <Book />
            </BookStack>
            <QuoteText>
              Um livro é um sonho que você segura em suas mãos
            </QuoteText>
          </IllustrationContainer>
        </RightPage>
      </BookContainer>
    </PageWrapper>
  );
}

