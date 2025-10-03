import { useState } from "react";
import { PageWrapper } from "../../../components/PageWrapper";
import { BookContainer } from "../../../components/BookContainer";
import { LeftPage } from "../../../components/LeftPage";
import { RightPage } from "../../../components/RightPage";
import { AnotherTitle } from "../../../components/Title";
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
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { NotificationModal } from "../../../components/NotificationModal";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading, error, setError } = useAuth();
  
  const [formData, setFormData] = useState({
    email: "",
    senha: ""
  });

  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: 'error',
    title: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    // Limpa erro quando usuário começa a digitar
    if (error) {
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.senha) {
      setModalConfig({
        type: 'error',
        title: 'Campos Obrigatórios ⚠️',
        message: 'Por favor, preencha seu email e senha para continuar.'
      });
      setShowModal(true);
      return;
    }

    const resultado = await login(formData.email, formData.senha);
    
    if (resultado.success) {
      navigate("/home");
    } else {
      setModalConfig({
        type: 'error',
        title: 'Erro no Login ❌',
        message: resultado.error || 'Verifique suas credenciais e tente novamente.'
      });
      setShowModal(true);
    }
  };


  return (
    <PageWrapper>
      <BookContainer>
        <LeftPage>
          <AnotherTitle>Bem-vindo</AnotherTitle>
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                type="email" 
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleInputChange}
                required 
              />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="senha">Senha</Label>
              <Input 
                id="senha"
                type="password" 
                placeholder="••••••••"
                value={formData.senha}
                onChange={handleInputChange}
                required 
              />
            </InputGroup>
            <Button type="submit" disabled={loading}>
              {loading ? "Entrando..." : "Entrar na Biblioteca"}
            </Button>
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
      
      <NotificationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        type={modalConfig.type}
        title={modalConfig.title}
        message={modalConfig.message}
      />
    </PageWrapper>
  );
}

