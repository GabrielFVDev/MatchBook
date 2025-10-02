
import { PageWrapper } from "../../../components/PageWrapper";
import { BookContainer } from "../../../components/BookContainer";
import { LeftPage } from "../../../components/LeftPage";
import { RightPage } from "../../../components/RightPage";
import { Title } from "../../../components/Title";
import { Form } from "../../../components/Form";
import { InputGroup } from "../../../components/InputGroup";
import { Label } from "../../../components/Label";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { StyledLink } from "../../../components/StyledLink";
import { LinkWrapper } from "../../../components/LinkWrapper";
import { 
  IllustrationContainer, 
  BookStack, 
  Book, 
  QuoteText 
} from "./styles.module.jsx";



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
              <StyledLink to="/cadastro">Criar uma conta</StyledLink>
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

