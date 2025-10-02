
import { PageWrapper } from "../../../components/PageWrapper";
import { BookContainer } from "../../../components/BookContainer";
import { LeftPage } from "../../../components/LeftPage";
import { RightPage } from "../../../components/RightPage";
import { Title } from "../../../components/Title";
import { Form } from "../../../components/Form";
import { FormRow } from "../../../components/FormRow";
import { InputGroup } from "../../../components/InputGroup";
import { Label } from "../../../components/Label";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { CheckboxGroup } from "../../../components/CheckboxGroup";
import { Checkbox } from "../../../components/Checkbox";

import { Link } from "react-router-dom";


export default function CadastroPage() {
  return (
    <PageWrapper>
      <BookContainer>
        <LeftPage>
          <Title>Crie sua Conta</Title>
          <Form onSubmit={(e) => e.preventDefault()}>
            <FormRow>
              <InputGroup>
                <Label htmlFor="nome">Nome Completo</Label>
                <Input 
                  id="nome"
                  type="text" 
                  placeholder="Seu nome completo"
                  required 
                />
              </InputGroup>
            </FormRow>
            <FormRow>
              <InputGroup>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  type="email" 
                  placeholder="seu@email.com" 
                  required 
                />
              </InputGroup>
            </FormRow>
            <FormRow>
              <InputGroup>
                <Label htmlFor="password">Senha</Label>
                <Input 
                  id="password"
                  type="password" 
                  placeholder="••••••••" 
                  required 
                />
              </InputGroup>
            </FormRow>
            <FormRow>
              <InputGroup>
                <Label htmlFor="data_nascimento">Data de Nascimento</Label>
                <Input 
                  id="data_nascimento"
                  type="date" 
                  required 
                />
              </InputGroup>
            </FormRow>
          </Form>
        </LeftPage>
        
        <RightPage>
          <Form onSubmit={(e) => e.preventDefault()}>
            <FormRow>
              <InputGroup>
                <Label htmlFor="genero_favorito">Gênero Favorito</Label>
                <Input 
                  id="genero_favorito"
                  type="text" 
                  placeholder="Ficção, etc."
                  required 
                />
              </InputGroup>
            </FormRow>
            <FormRow>
              <InputGroup>
                <Label htmlFor="livros_lidos">Livros Lidos (Quantidade)</Label>
                <Input 
                  id="livros_lidos"
                  type="number" 
                  placeholder="0"
                  required 
                />
              </InputGroup>
            </FormRow>
            <FormRow>
              <InputGroup>
                <Label htmlFor="autor_preferido">Autor Preferido</Label>
                <Input 
                  id="autor_preferido"
                  type="text" 
                  placeholder="Seu autor preferido"
                  required 
                />
              </InputGroup>
            </FormRow>
            <FormRow>
              <InputGroup>
                <Label htmlFor="nivel_leitura">Nível de Leitura</Label>
                <Input 
                  id="nivel_leitura"
                  type="text" 
                  placeholder="Iniciante, Intermediário, Avançado"
                  required 
                />
              </InputGroup>
            </FormRow>
            <CheckboxGroup>
              <Checkbox 
                id="receber_recomendacoes"
                type="checkbox" 
              />
              <Label htmlFor="receber_recomendacoes">Desejo receber recomendações</Label>
            </CheckboxGroup>
            <Button type="submit">Criar Conta</Button>
            <Link to="/">Já tem uma conta? Faça login</Link>
          </Form>
        </RightPage>
      </BookContainer>
    </PageWrapper>
  );
}
