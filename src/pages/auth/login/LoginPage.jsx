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

