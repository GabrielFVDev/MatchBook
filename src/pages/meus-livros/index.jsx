import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { NotificationModal } from "../../components/NotificationModal";
import { FaBook, FaHeart, FaArrowLeft, FaCalendarAlt, FaUser, FaTags, FaTrash } from 'react-icons/fa';
import { useAuth } from "../../hooks/useAuth";
import { recomendacaoService } from "../../apis/services";
import {
  PageContainer,
  MainContent,
  HeaderNavigation,
  BackButton,
  PageTitle,
  StatsContainer,
  StatCard,
  StatNumber,
  StatLabel,
  FilterContainer,
  FilterButton,
  BooksGrid,
  BookCard,
  RemoveButton,
  BookCover,
  BookCoverPlaceholder,
  BookInfo,
  BookTitle,
  BookDetail,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyDescription,
  LoadingContainer,
  ErrorContainer,
} from './styles.module.jsx';

export default function MeusLivrosPage() {
  const { getCurrentUser } = useAuth();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [filtroGenero, setFiltroGenero] = useState('todos');

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      navigate('/login');
      return;
    }
    setUsuario(user);
    carregarLivrosCurtidos(user.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const carregarLivrosCurtidos = async (idUsuario) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await recomendacaoService.obterLivrosCurtidos(idUsuario);
      
      if (response.success) {
        const livrosOrdenados = response.data.sort((a, b) => 
          new Date(b.dataCurtida) - new Date(a.dataCurtida)
        );
        setLivros(livrosOrdenados);
      } else {
        if (response.error && !response.error.includes('Nenhum livro')) {
          setError(response.error);
        } else {
          setLivros([]);
        }
      }
    } catch (err) {
      console.error('Erro ao carregar livros curtidos:', err);
      setError('Erro ao carregar seus livros. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const voltarParaHome = () => {
    navigate('/home');
  };

  const fecharNotificacao = () => {
    setNotification(null);
  };

  const removerLivro = async (livroId, tituloLivro) => {
    if (!usuario?.id) return;

    try {
      const response = await recomendacaoService.descurtirLivro(usuario.id, livroId);
      
      if (response.success) {
        setLivros(livrosAtuais => livrosAtuais.filter(livro => livro.id !== livroId));
        setNotification({
          type: 'success',
          title: 'Livro removido',
          message: `"${tituloLivro}" foi removido dos seus favoritos.`
        });
      } else {
        setNotification({
          type: 'error',
          title: 'Erro',
          message: response.error || 'Erro ao remover livro dos favoritos.'
        });
      }
    } catch (err) {
      console.error('Erro ao remover livro:', err);
      setNotification({
        type: 'error',
        title: 'Erro',
        message: 'Erro ao remover livro. Tente novamente.'
      });
    }
  };

  const livrosFiltrados = filtroGenero === 'todos' 
    ? livros 
    : livros.filter(livro => livro.genero?.toLowerCase() === filtroGenero.toLowerCase());

  const generos = [...new Set(livros.map(livro => livro.genero).filter(Boolean))];

  const totalLivros = livros.length;
  const totalPaginas = livros.reduce((total, livro) => total + (livro.numeroPaginas || 0), 0);
  const generoMaisLido = generos.reduce((max, genero) => {
    const count = livros.filter(livro => livro.genero === genero).length;
    return count > (max.count || 0) ? { genero, count } : max;
  }, {});

  const formatarData = (data) => {
    if (!data) return '';
    return new Date(data).toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <PageContainer>
        <Header />
        <MainContent>
          <LoadingContainer>
            <FaBook />
            <div>Carregando seus livros...</div>
          </LoadingContainer>
        </MainContent>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <Header />
        <MainContent>
          <ErrorContainer>
            <div>❌ {error}</div>
            <BackButton onClick={() => carregarLivrosCurtidos(usuario?.id)}>
              Tentar Novamente
            </BackButton>
          </ErrorContainer>
        </MainContent>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header />
      
      <MainContent>
        <HeaderNavigation>
          <BackButton onClick={voltarParaHome}>
            <FaArrowLeft /> Voltar
          </BackButton>
          <PageTitle>
            <FaHeart /> Meus Livros Favoritos
          </PageTitle>
        </HeaderNavigation>

        {totalLivros > 0 && (
          <StatsContainer>
            <StatCard>
              <StatNumber>{totalLivros}</StatNumber>
              <StatLabel>Livros Curtidos</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{totalPaginas.toLocaleString()}</StatNumber>
              <StatLabel>Páginas Totais</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{generos.length}</StatNumber>
              <StatLabel>Gêneros Diferentes</StatLabel>
            </StatCard>
            {generoMaisLido.genero && (
              <StatCard>
                <StatNumber>{generoMaisLido.genero}</StatNumber>
                <StatLabel>Gênero Favorito</StatLabel>
              </StatCard>
            )}
          </StatsContainer>
        )}

        {generos.length > 1 && (
          <FilterContainer>
            <FilterButton 
              active={filtroGenero === 'todos'}
              onClick={() => setFiltroGenero('todos')}
            >
              Todos
            </FilterButton>
            {generos.map(genero => (
              <FilterButton 
                key={genero}
                active={filtroGenero === genero}
                onClick={() => setFiltroGenero(genero)}
              >
                {genero}
              </FilterButton>
            ))}
          </FilterContainer>
        )}

        {livrosFiltrados.length === 0 ? (
          <EmptyState>
            <EmptyIcon>
              <FaBook />
            </EmptyIcon>
            <EmptyTitle>
              {filtroGenero === 'todos' 
                ? "Nenhum livro encontrado"
                : `Nenhum livro de ${filtroGenero}`
              }
            </EmptyTitle>
            <EmptyDescription>
              {filtroGenero === 'todos'
                ? "Que tal descobrir alguns livros incríveis? Use o quiz de recomendações para encontrar seu próximo livro favorito!"
                : `Você ainda não curtiu nenhum livro de ${filtroGenero}. Continue explorando!`
              }
            </EmptyDescription>
            {filtroGenero === 'todos' && (
              <>
                <BackButton onClick={voltarParaHome}>
                  Descobrir Livros
                </BackButton>
                <BackButton 
                  onClick={() => navigate('/adicionar-livro')} 
                  style={{ 
                    background: 'linear-gradient(135deg, #27ae60 0%, #219a52 100%)',
                    marginTop: '10px'
                  }}
                >
                  📚 Adicionar Livro ao Catálogo
                </BackButton>
              </>
            )}
          </EmptyState>
        ) : (
          <BooksGrid>
            {livrosFiltrados.map((livro) => (
              <BookCard key={livro.id}>
                <RemoveButton 
                  onClick={() => removerLivro(livro.id, livro.titulo)}
                  title="Remover dos favoritos"
                >
                  <FaTrash />
                </RemoveButton>
                
                {livro.capaUrl ? (
                  <BookCover 
                    src={livro.capaUrl} 
                    alt={`Capa do livro ${livro.titulo}`}
                  />
                ) : (
                  <BookCoverPlaceholder>
                    📚<br/>Livro
                  </BookCoverPlaceholder>
                )}
                
                <BookInfo>
                  <BookTitle>{livro.titulo}</BookTitle>
                  <BookDetail>
                    <FaUser /> {livro.autor}
                  </BookDetail>
                  <BookDetail className="genre">
                    <FaTags /> {livro.genero}
                  </BookDetail>
                  <BookDetail className="pages">
                    {livro.numeroPaginas} páginas
                  </BookDetail>
                  {livro.dataCurtida && (
                    <BookDetail className="date">
                      <FaCalendarAlt /> Curtido em {formatarData(livro.dataCurtida)}
                    </BookDetail>
                  )}
                </BookInfo>
              </BookCard>
            ))}
          </BooksGrid>
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
