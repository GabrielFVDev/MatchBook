
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { NotificationModal } from "../../components/NotificationModal";
import {
  PageContainer,
  MainContent,
  BookDiscoveryCard,
  DiscoveryTitle,
  QuestionIcon,
  ActionButtons,
  PrimaryButton,
  SecondaryButton,
  QuizContainer,
  QuizTitle,
  BookRecommendation,
  BookCover,
  BookCoverPlaceholder,
  BookInfo,
  BookTitle,
  BookAuthor,
  BookGenre,
  BookPages,
  QuizButtons,
  LikeButton,
  DislikeButton,
  LoadingMessage,
  ErrorMessage,
  BackButton
} from './styles.module.jsx';
import { FaQuestion, FaHeart, FaThumbsDown } from 'react-icons/fa';
import { useAuth } from "../../hooks/useAuth";
import { recomendacaoService } from "../../apis/services";

export default function HomePage() {
  const { getCurrentUser } = useAuth();
  const [usuario, setUsuario] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    setUsuario(user);
  }, []);

  // Função para iniciar o quiz
  const iniciarQuiz = async () => {
    setShowQuiz(true);
    setError(null);
    await carregarProximaRecomendacao();
  };

  // Função para carregar próxima recomendação
  const carregarProximaRecomendacao = async () => {
    if (!usuario?.id) return;

    setLoading(true);
    setError(null);

    try {
      const response = await recomendacaoService.obterRecomendacaoAdaptativa(usuario.id);
      
      if (response.success && response.data && response.data.length > 0) {
        // Pega o primeiro livro da lista de recomendações
        const livro = response.data[0];
        console.log('📚 Livro recebido da API:', livro);
        console.log('🖼️ URL da capa (capaUrl):', livro.capaUrl);
        console.log('🖼️ URL da capa (capa):', livro.capa);
        setCurrentBook(livro);
        setImageError(false); // Reset do estado da imagem
      } else {
        setError('Nenhuma recomendação disponível no momento.');
      }
    } catch (err) {
      console.error('Erro ao carregar recomendação:', err);
      setError('Erro ao carregar recomendação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Função para aceitar um livro
  const aceitarLivro = async () => {
    if (!currentBook || !usuario?.id || isProcessing) return;

    setIsProcessing(true);
    
    try {
      const response = await recomendacaoService.aceitarLivro(usuario.id, currentBook.id);
      
      if (response.success) {
        setNotification({
          type: 'success',
          title: 'Ótima escolha! 📚',
          message: `"${currentBook.titulo}" foi adicionado à sua lista! O algoritmo aprendeu com sua preferência.`
        });
        
        // Carrega próxima recomendação após um delay
        setTimeout(() => {
          carregarProximaRecomendacao();
        }, 1500);
      } else {
        throw new Error(response.error);
      }
    } catch (err) {
      console.error('Erro ao aceitar livro:', err);
      setNotification({
        type: 'error',
        title: 'Erro',
        message: 'Erro ao processar sua escolha. Tente novamente.'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Função para recusar um livro
  const recusarLivro = async () => {
    if (!currentBook || !usuario?.id || isProcessing) return;

    setIsProcessing(true);
    
    try {
      const response = await recomendacaoService.recusarLivro(usuario.id, currentBook.id);
      
      if (response.success) {
        const { totalRecusas, algoritmoAlterado, sugestao } = response.data || {};
        
        let message = 'Entendido! Vamos buscar algo mais adequado para você.';
        
        if (algoritmoAlterado && sugestao) {
          message = `${message} ${sugestao}`;
        }
        
        setNotification({
          type: 'info',
          title: 'Preferência registrada',
          message: message
        });
        
        // Carrega próxima recomendação após um delay
        setTimeout(() => {
          carregarProximaRecomendacao();
        }, 1500);
      } else {
        throw new Error(response.error);
      }
    } catch (err) {
      console.error('Erro ao recusar livro:', err);
      setNotification({
        type: 'error',
        title: 'Erro',
        message: 'Erro ao processar sua escolha. Tente novamente.'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Função para voltar ao menu inicial
  const voltarAoMenu = () => {
    setShowQuiz(false);
    setCurrentBook(null);
    setError(null);
  };

  // Função para fechar notificação
  const fecharNotificacao = () => {
    setNotification(null);
  };

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
                {!showQuiz ? (
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
                            <PrimaryButton onClick={iniciarQuiz}>
                                Começar Quiz
                            </PrimaryButton>
                            
                        </ActionButtons>
                    </BookDiscoveryCard>
                ) : (
                    <QuizContainer>
                        <QuizTitle>Que tal esse livro?</QuizTitle>
                        
                        {error && (
                            <ErrorMessage>
                                {error}
                                <BackButton onClick={voltarAoMenu}>
                                    Voltar ao Menu
                                </BackButton>
                            </ErrorMessage>
                        )}
                        
                        {loading && (
                            <LoadingMessage>
                                Buscando recomendação perfeita para você...
                            </LoadingMessage>
                        )}
                        
                        {currentBook && !loading && !error && (
                            <>
                                <BookRecommendation>
                                    {!imageError && (currentBook.capaUrl || currentBook.capa) ? (
                                        <BookCover 
                                            src={currentBook.capaUrl || currentBook.capa} 
                                            alt={`Capa do livro ${currentBook.titulo}`}
                                            onError={(e) => {
                                                console.log('❌ Erro ao carregar imagem:', currentBook.capaUrl || currentBook.capa);
                                                console.log('❌ Erro:', e.target.error);
                                                setImageError(true);
                                            }}
                                            onLoad={() => {
                                                console.log('✅ Imagem carregada com sucesso:', currentBook.capaUrl || currentBook.capa);
                                            }}
                                        />
                                    ) : (
                                        <BookCoverPlaceholder>
                                            📚<br/>Livro
                                        </BookCoverPlaceholder>
                                    )}
                                    <BookInfo>
                                        <BookTitle>{currentBook.titulo}</BookTitle>
                                        <BookAuthor>por {currentBook.autor}</BookAuthor>
                                        <BookGenre>{currentBook.genero}</BookGenre>
                                        <BookPages>{currentBook.numeroPaginas} páginas</BookPages>
                                    </BookInfo>
                                </BookRecommendation>
                                
                                <QuizButtons>
                                    <LikeButton 
                                        onClick={aceitarLivro}
                                        disabled={isProcessing}
                                    >
                                        <FaHeart /> Amei
                                    </LikeButton>
                                    <DislikeButton 
                                        onClick={recusarLivro}
                                        disabled={isProcessing}
                                    >
                                        <FaThumbsDown /> Próximo
                                    </DislikeButton>
                                </QuizButtons>
                                
                                <BackButton onClick={voltarAoMenu}>
                                    Voltar ao Menu
                                </BackButton>
                            </>
                        )}
                    </QuizContainer>
                )}
            </MainContent>
            
            <NotificationModal
                isOpen={!!notification}
                type={notification?.type || 'success'}
                title={notification?.title || ''}
                message={notification?.message || ''}
                onClose={fecharNotificacao}
                autoClose={true}
                autoCloseDelay={3000}
            />
        </PageContainer>
    );
}

