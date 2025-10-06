import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { NotificationModal } from "../../components/NotificationModal";
import { SuccessModal } from "../../components/SuccessModal";
import { FaBook, FaArrowLeft, FaPlus, FaImage, FaCheck } from 'react-icons/fa';
import { useAuth } from "../../hooks/useAuth";
import { livroService, recomendacaoService } from "../../apis/services";
import {
  PageContainer,
  MainContent,
  HeaderNavigation,
  BackButton,
  PageTitle,
  FormContainer,
  FormSection,
  FormRow,
  FormGroup,
  Label,
  Input,
  TextArea,
  Select,
  ImagePreview,
  ImagePlaceholder,
  SubmitButton,
  LoadingSpinner,
  ErrorMessage,
  SuccessMessage,
  HelpText
} from './styles.module.jsx';

export default function AdicionarLivroPage() {
  const { getCurrentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successBookTitle, setSuccessBookTitle] = useState('');
  
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    editora: '',
    genero: '',
    anoPublicacao: '',
    numeroPaginas: '',
    idioma: 'Português',
    isbn: '',
    sinopse: '',
    capaUrl: '',
    disponivel: true
  });

  const [errors, setErrors] = useState({});
  const [imageError, setImageError] = useState(false);

  const generos = [
    'Romance',
    'Ficção Científica',
    'Fantasia',
    'Mistério',
    'Terror',
    'Aventura',
    'Drama',
    'Comédia',
    'História',
    'Biografia',
    'Autoajuda',
    'Técnico',
    'Acadêmico',
    'Infantil',
    'Jovem Adulto',
    'Distopia',
    'Thriller',
    'Policial',
    'Suspense',
    'Outros'
  ];

  const idiomas = [
    'Português',
    'Inglês',
    'Espanhol',
    'Francês',
    'Alemão',
    'Italiano',
    'Japonês',
    'Outros'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Limpar erro do campo quando usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageLoad = () => {
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const validateForm = () => {
    const newErrors = {};

    // Campos obrigatórios
    if (!formData.titulo.trim()) {
      newErrors.titulo = 'Título é obrigatório';
    }

    if (!formData.autor.trim()) {
      newErrors.autor = 'Autor é obrigatório';
    }

    if (!formData.genero) {
      newErrors.genero = 'Gênero é obrigatório';
    }

    if (!formData.sinopse.trim()) {
      newErrors.sinopse = 'Sinopse é obrigatória';
    } else if (formData.sinopse.length < 50) {
      newErrors.sinopse = 'Sinopse deve ter pelo menos 50 caracteres';
    }

    // Validações numéricas
    if (formData.anoPublicacao && (formData.anoPublicacao < 1000 || formData.anoPublicacao > new Date().getFullYear() + 1)) {
      newErrors.anoPublicacao = 'Ano deve estar entre 1000 e ' + (new Date().getFullYear() + 1);
    }

    if (formData.numeroPaginas && (formData.numeroPaginas < 1 || formData.numeroPaginas > 10000)) {
      newErrors.numeroPaginas = 'Número de páginas deve estar entre 1 e 10.000';
    }

    // Validação URL da capa (opcional mas se preenchida deve ser válida)
    if (formData.capaUrl && !isValidUrl(formData.capaUrl)) {
      newErrors.capaUrl = 'URL da capa deve ser válida (ex: https://...)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setNotification({
        type: 'error',
        title: 'Erro de Validação',
        message: 'Por favor, corrija os erros no formulário.'
      });
      return;
    }

    const usuario = getCurrentUser();
    if (!usuario) {
      navigate('/login');
      return;
    }

    setLoading(true);

    try {
      // Preparar dados para envio (remover campos vazios opcionais)
      const dadosLivro = {
        ...formData,
        anoPublicacao: formData.anoPublicacao ? parseInt(formData.anoPublicacao) : null,
        numeroPaginas: formData.numeroPaginas ? parseInt(formData.numeroPaginas) : null,
        capaUrl: formData.capaUrl || null
      };

      const response = await livroService.criar(dadosLivro);

      if (response.success) {
        const livroId = response.data.id;
        
        // Adicionar automaticamente aos favoritos do usuário
        try {
          const favoritoResponse = await recomendacaoService.curtirLivro(usuario.id, livroId);
          
          if (favoritoResponse.success) {
            // Mostrar modal de sucesso ao invés de notificação simples
            setSuccessBookTitle(formData.titulo);
            setShowSuccessModal(true);
            
            // Limpar formulário
            setFormData({
              titulo: '',
              autor: '',
              editora: '',
              genero: '',
              anoPublicacao: '',
              numeroPaginas: '',
              idioma: 'Português',
              isbn: '',
              sinopse: '',
              capaUrl: '',
              disponivel: true
            });
          } else {
            // Se falhar ao adicionar aos favoritos, ainda é sucesso parcial
            setNotification({
              type: 'success',
              title: 'Livro Adicionado! 📚',
              message: `"${formData.titulo}" foi adicionado ao catálogo com sucesso!`
            });
            console.warn('Erro ao adicionar aos favoritos:', favoritoResponse.error);
            
            setTimeout(() => {
              navigate('/meus-livros');
            }, 2000);
          }
        } catch (favoritoError) {
          // Se falhar ao adicionar aos favoritos, ainda é sucesso parcial
          console.warn('Erro ao adicionar aos favoritos:', favoritoError);
          setNotification({
            type: 'success',
            title: 'Livro Adicionado! 📚',
            message: `"${formData.titulo}" foi adicionado ao catálogo com sucesso!`
          });
          
          setTimeout(() => {
            navigate('/meus-livros');
          }, 2000);
        }
      } else {
        setNotification({
          type: 'error',
          title: 'Erro ao Adicionar',
          message: response.error || 'Erro desconhecido ao adicionar livro.'
        });
      }
    } catch (error) {
      console.error('Erro ao adicionar livro:', error);
      setNotification({
        type: 'error',
        title: 'Erro',
        message: 'Erro de conexão. Verifique sua internet e tente novamente.'
      });
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

  const handleViewFavorites = () => {
    setShowSuccessModal(false);
    navigate('/meus-livros');
  };

  const handleAddAnother = () => {
    setShowSuccessModal(false);
    // O formulário já foi limpo, apenas fechar o modal
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate('/home');
  };

  return (
    <PageContainer>
      <Header />
      
      <MainContent>
        <HeaderNavigation>
          <BackButton onClick={voltarParaHome}>
            <FaArrowLeft /> Voltar
          </BackButton>
          <PageTitle>
            <FaPlus /> Adicionar Novo Livro
          </PageTitle>
        </HeaderNavigation>

        <FormContainer>
          <form onSubmit={handleSubmit}>
            <FormSection>
              <h3>📚 Informações Básicas</h3>
              
              <FormRow>
                <FormGroup>
                  <Label>
                    Título *
                  </Label>
                  <Input
                    type="text"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleInputChange}
                    placeholder="Digite o título do livro"
                    maxLength="255"
                  />
                  {errors.titulo && <ErrorMessage>{errors.titulo}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                  <Label>
                    Autor *
                  </Label>
                  <Input
                    type="text"
                    name="autor"
                    value={formData.autor}
                    onChange={handleInputChange}
                    placeholder="Nome do autor"
                    maxLength="255"
                  />
                  {errors.autor && <ErrorMessage>{errors.autor}</ErrorMessage>}
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <Label>
                    Editora
                  </Label>
                  <Input
                    type="text"
                    name="editora"
                    value={formData.editora}
                    onChange={handleInputChange}
                    placeholder="Nome da editora"
                    maxLength="255"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>
                    Gênero *
                  </Label>
                  <Select
                    name="genero"
                    value={formData.genero}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecione um gênero</option>
                    {generos.map(genero => (
                      <option key={genero} value={genero}>
                        {genero}
                      </option>
                    ))}
                  </Select>
                  {errors.genero && <ErrorMessage>{errors.genero}</ErrorMessage>}
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <Label>
                    Ano de Publicação
                  </Label>
                  <Input
                    type="number"
                    name="anoPublicacao"
                    value={formData.anoPublicacao}
                    onChange={handleInputChange}
                    placeholder="Ex: 2023"
                    min="1000"
                    max={new Date().getFullYear() + 1}
                  />
                  {errors.anoPublicacao && <ErrorMessage>{errors.anoPublicacao}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                  <Label>
                    Número de Páginas
                  </Label>
                  <Input
                    type="number"
                    name="numeroPaginas"
                    value={formData.numeroPaginas}
                    onChange={handleInputChange}
                    placeholder="Ex: 320"
                    min="1"
                    max="10000"
                  />
                  {errors.numeroPaginas && <ErrorMessage>{errors.numeroPaginas}</ErrorMessage>}
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <Label>
                    Idioma
                  </Label>
                  <Select
                    name="idioma"
                    value={formData.idioma}
                    onChange={handleInputChange}
                  >
                    {idiomas.map(idioma => (
                      <option key={idioma} value={idioma}>
                        {idioma}
                      </option>
                    ))}
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label>
                    ISBN (opcional)
                  </Label>
                  <Input
                    type="text"
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleInputChange}
                    placeholder="Ex: 978-85-123-4567-8"
                    maxLength="20"
                  />
                </FormGroup>
              </FormRow>
            </FormSection>

            <FormSection>
              <h3>📝 Descrição</h3>
              
              <FormGroup>
                <Label>
                  Sinopse *
                </Label>
                <TextArea
                  name="sinopse"
                  value={formData.sinopse}
                  onChange={handleInputChange}
                  placeholder="Escreva uma descrição do livro (mínimo 50 caracteres)"
                  rows="4"
                  maxLength="1000"
                />
                <HelpText>
                  {formData.sinopse.length}/1000 caracteres (mínimo 50)
                </HelpText>
                {errors.sinopse && <ErrorMessage>{errors.sinopse}</ErrorMessage>}
              </FormGroup>
            </FormSection>

            <FormSection>
              <h3>🖼️ Imagem da Capa</h3>
              
              <FormGroup>
                <Label>
                  URL da Capa (opcional)
                </Label>
                <Input
                  type="url"
                  name="capaUrl"
                  value={formData.capaUrl}
                  onChange={handleInputChange}
                  placeholder="https://exemplo.com/capa-do-livro.jpg"
                />
                <HelpText>
                  Cole a URL de uma imagem da capa do livro (JPEG, PNG, etc.)
                </HelpText>
                {errors.capaUrl && <ErrorMessage>{errors.capaUrl}</ErrorMessage>}
              </FormGroup>

              {formData.capaUrl && (
                <ImagePreview>
                  {!imageError ? (
                    <img
                      src={formData.capaUrl}
                      alt="Preview da capa"
                      onLoad={handleImageLoad}
                      onError={handleImageError}
                    />
                  ) : (
                    <ImagePlaceholder>
                      <FaImage />
                      <span>Não foi possível carregar a imagem</span>
                    </ImagePlaceholder>
                  )}
                </ImagePreview>
              )}
            </FormSection>

            <div style={{
              background: 'linear-gradient(135deg, #e8f5e8 0%, #f0f8f0 100%)',
              border: '2px solid #27ae60',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              <div style={{ 
                fontSize: '1.1rem', 
                color: '#27ae60', 
                fontWeight: '600',
                marginBottom: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}>
                ❤️ Adicionado automaticamente aos seus favoritos!
              </div>
              <div style={{ 
                fontSize: '0.9rem', 
                color: '#666',
                lineHeight: '1.4'
              }}>
                Quando você adiciona um livro ao catálogo, ele automaticamente vai para sua lista de livros favoritos, 
                pois assumimos que você conhece e gosta do livro que está compartilhando.
              </div>
            </div>

            <SubmitButton type="submit" disabled={loading}>
              {loading ? (
                <>
                  <LoadingSpinner />
                  Adicionando aos Favoritos...
                </>
              ) : (
                <>
                  <FaCheck />
                  Adicionar aos Favoritos & Catálogo
                </>
              )}
            </SubmitButton>
          </form>
        </FormContainer>
      </MainContent>

      {notification && (
        <NotificationModal
          type={notification.type}
          title={notification.title}
          message={notification.message}
          onClose={fecharNotificacao}
        />
      )}

      <SuccessModal
        isOpen={showSuccessModal}
        bookTitle={successBookTitle}
        onClose={handleCloseSuccessModal}
        onViewFavorites={handleViewFavorites}
        onAddAnother={handleAddAnother}
      />
    </PageContainer>
  );
}
