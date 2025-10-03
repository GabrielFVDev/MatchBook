
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import {
  PageContainer,
  MainContent,
  BookDiscoveryCard,
  DiscoveryTitle,
  QuestionIcon,
  ActionButtons,
  PrimaryButton,
  SecondaryButton,
} from './styles.module.jsx';
import { FaQuestion } from 'react-icons/fa';
import { useAuth } from "../../hooks/useAuth";

export default function HomePage() {
  const { getCurrentUser } = useAuth();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const user = getCurrentUser();
    setUsuario(user);
  }, []);

  if (!usuario) {
    return (
      <PageContainer>
        <MainContent>
          <div>Carregando...</div>
        </MainContent>
      </PageContainer>
    );
  }
    return (
        <PageContainer>
            <Header />
            
            <MainContent>
                <BookDiscoveryCard>
                    <DiscoveryTitle>
                        Olá, {usuario.nome}! Vamos descobrir seu próximo livro?
                    </DiscoveryTitle>
                    <div style={{ 
                      marginBottom: '20px', 
                      fontSize: '14px', 
                      color: '#666',
                      textAlign: 'center'
                    }}>
                      Gênero favorito: {usuario.generoFavorito || 'Não informado'} <br />
                      Livros lidos: {usuario.livrosLidos || 0} livros
                    </div>
                    <QuestionIcon>
                        <FaQuestion />
                    </QuestionIcon>
                    <ActionButtons>
                        <PrimaryButton>Começar Quiz</PrimaryButton>
                        <SecondaryButton>Explorar Catálogo</SecondaryButton>
                    </ActionButtons>
                </BookDiscoveryCard>
            </MainContent>
        </PageContainer>
    );
}

