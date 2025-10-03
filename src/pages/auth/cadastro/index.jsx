
import { useState } from "react";
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
import { Checkbox } from "../../../components/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../../../hooks/useAuth";
import { validarEmail, normalizarDadosUsuario } from "../../../utils/formatters";
import { NotificationModal } from "../../../components/NotificationModal";
import styles from "./styles.module.css";

export default function CadastroPage() {
  const navigate = useNavigate();
  const { register, loading, error, success, setError } = useRegister();
  
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    dataNascimento: "",
    generoFavorito: "",
    livrosLidos: 0,
    autorPreferido: "",
    nivelLeitura: "",
    receberRecomendacoes: false,
    biografia: ""
  });

  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: 'success',
    title: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
    // Limpa erro quando usuário começa a digitar
    if (error) {
      setError(null);
    }
  };

  // Função para verificar se as senhas coincidem
  const senhasConferem = () => {
    return formData.senha && formData.confirmarSenha && 
           formData.senha === formData.confirmarSenha;
  };

  // Função para verificar se a senha tem o tamanho mínimo
  const senhaValida = () => {
    return formData.senha && formData.senha.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validações básicas
    if (!formData.nome || !formData.email || !formData.senha || !formData.confirmarSenha) {
      setModalConfig({
        type: 'error',
        title: 'Campos Obrigatórios ⚠️',
        message: 'Por favor, preencha todos os campos obrigatórios (nome, email, senha e confirmação de senha).'
      });
      setShowModal(true);
      return;
    }

    if (!validarEmail(formData.email)) {
      setModalConfig({
        type: 'error',
        title: 'Email Inválido ⚠️',
        message: 'Por favor, insira um email válido.'
      });
      setShowModal(true);
      return;
    }

    if (formData.senha.length < 6) {
      setModalConfig({
        type: 'error',
        title: 'Senha Muito Curta ⚠️',
        message: 'A senha deve ter pelo menos 6 caracteres.'
      });
      setShowModal(true);
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      setModalConfig({
        type: 'error',
        title: 'Senhas Não Coincidem ⚠️',
        message: 'A senha e a confirmação de senha devem ser iguais.'
      });
      setShowModal(true);
      return;
    }

    // Remove confirmação de senha dos dados a serem enviados
    const { confirmarSenha, ...dadosParaEnvio } = formData;
    
    // Normaliza e prepara dados para envio
    const userData = normalizarDadosUsuario(dadosParaEnvio);

    console.log("Enviando dados:", userData);

    const resultado = await register(userData);
    
    console.log("Resultado:", resultado);
    
    if (resultado.success) {
      // Mostra modal de sucesso
      setModalConfig({
        type: 'success',
        title: 'Conta Criada com Sucesso! 🎉',
        message: `Olá ${userData.nome}! Sua conta foi criada com sucesso. Você será redirecionado para fazer login em instantes.`
      });
      setShowModal(true);
      
      // Redireciona após 3 segundos
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      // Mostra modal de erro se houver
      if (resultado.error) {
        setModalConfig({
          type: 'error',
          title: 'Erro no Cadastro ❌',
          message: resultado.error
        });
        setShowModal(true);
      }
    }
  };
  return (
    <PageWrapper>
      <BookContainer>
        <LeftPage>
          <div className={styles.formSection}>
            <div className={styles.sectionHeader}>
              <Title className={styles.sectionTitle}>Crie sua Conta</Title>
              <p className={styles.sectionSubtitle}>Preencha seus dados pessoais</p>
            </div>
            
            <div className={styles.fieldGroup}>
              <FormRow className={styles.formRow}>
                <InputGroup>
                  <Label htmlFor="nome">Nome Completo *</Label>
                  <Input 
                    id="nome"
                    type="text" 
                    placeholder="Seu nome completo"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required 
                  />
                </InputGroup>
              </FormRow>
              
              <FormRow className={styles.formRow}>
                <InputGroup>
                  <Label htmlFor="email">Email *</Label>
                  <Input 
                    id="email"
                    type="email" 
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </InputGroup>
              </FormRow>
              
              <FormRow className={styles.formRow}>
                <InputGroup>
                  <Label htmlFor="senha">Senha * (mín. 6 caracteres)</Label>
                  <Input 
                    id="senha"
                    type="password" 
                    placeholder="••••••••"
                    value={formData.senha}
                    onChange={handleInputChange}
                    className={`${styles.passwordInput} ${
                      formData.senha ? (senhaValida() ? styles.valid : styles.invalid) : ''
                    }`}
                    required 
                  />
                  {formData.senha && (
                    <div className={`${styles.validationMessage} ${
                      senhaValida() ? styles.success : styles.error
                    }`}>
                      {senhaValida() ? '✓ Senha válida' : '✗ Muito curta (mín. 6 caracteres)'}
                    </div>
                  )}
                </InputGroup>
              </FormRow>
              
              <FormRow className={styles.formRow}>
                <InputGroup>
                  <Label htmlFor="confirmarSenha">Confirmar Senha *</Label>
                  <Input 
                    id="confirmarSenha"
                    type="password" 
                    placeholder="Repita sua senha"
                    value={formData.confirmarSenha}
                    onChange={handleInputChange}
                    className={`${styles.passwordInput} ${
                      formData.confirmarSenha ? (senhasConferem() ? styles.valid : styles.invalid) : ''
                    }`}
                    required 
                  />
                  {formData.confirmarSenha && (
                    <div className={`${styles.validationMessage} ${
                      senhasConferem() ? styles.success : styles.error
                    }`}>
                      {senhasConferem() ? '✓ Senhas coincidem' : '✗ Senhas não coincidem'}
                    </div>
                  )}
                </InputGroup>
              </FormRow>
              
              <FormRow className={styles.formRow}>
                <InputGroup>
                  <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                  <Input 
                    id="dataNascimento"
                    type="date"
                    value={formData.dataNascimento}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </FormRow>
            </div>
          </div>
        </LeftPage>
        
        <RightPage>
          <div className={styles.rightPageContainer}>
            <Form onSubmit={handleSubmit}>
              <div className={`${styles.formSection} ${styles.compactSpacing}`}>
                <div className={styles.sectionHeader}>
                  <p className={styles.sectionSubtitle}>Conte-nos sobre seus gostos literários</p>
                </div>
                
                <div className={`${styles.fieldGroup} ${styles.tightSpacing}`}>
                <FormRow className={styles.formRow}>
                  <InputGroup>
                    <Label htmlFor="generoFavorito">Gênero Favorito</Label>
                    <Input 
                      id="generoFavorito"
                      type="text" 
                      placeholder="Ex: Ficção Científica, Romance, etc."
                      value={formData.generoFavorito}
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                </FormRow>
                
                <FormRow className={styles.formRow}>
                  <InputGroup>
                    <Label htmlFor="livrosLidos">Livros Lidos (Quantidade)</Label>
                    <Input 
                      id="livrosLidos"
                      type="number" 
                      placeholder="0"
                      min="0"
                      value={formData.livrosLidos}
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                </FormRow>
                
                <FormRow className={styles.formRow}>
                  <InputGroup>
                    <Label htmlFor="autorPreferido">Autor Preferido</Label>
                    <Input 
                      id="autorPreferido"
                      type="text" 
                      placeholder="Ex: Machado de Assis, Agatha Christie, etc."
                      value={formData.autorPreferido}
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                </FormRow>
                
                <FormRow className={styles.formRow}>
                  <InputGroup>
                    <Label htmlFor="nivelLeitura">Nível de Leitura</Label>
                    <Input 
                      id="nivelLeitura"
                      type="text" 
                      placeholder="Iniciante, Intermediário ou Avançado"
                      value={formData.nivelLeitura}
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                </FormRow>
                
                <FormRow className={styles.formRow}>
                  <InputGroup>
                    <Label htmlFor="biografia">Biografia (Opcional)</Label>
                    <Input 
                      id="biografia"
                      type="text" 
                      placeholder="Conte um pouco sobre seus gostos literários..."
                      value={formData.biografia}
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                </FormRow>
              </div>
              
              <div className={styles.checkboxContainer}>
                <Checkbox 
                  id="receberRecomendacoes"
                  type="checkbox"
                  checked={formData.receberRecomendacoes}
                  onChange={handleInputChange}
                />
                <Label htmlFor="receberRecomendacoes">Desejo receber recomendações personalizadas</Label>
              </div>
              
              <div className={styles.submitSection}>
                <Button 
                  type="submit" 
                  disabled={loading}
                  className={styles.submitButton}
                >
                  {loading ? "Criando conta..." : "Criar Conta"}
                </Button>
                <div className={styles.loginLink}>
                  <Link to="/">Já tem uma conta? Faça login</Link>
                </div>
              </div>
            </div>
          </Form>
          </div>
        </RightPage>
      </BookContainer>
      
      <NotificationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        type={modalConfig.type}
        title={modalConfig.title}
        message={modalConfig.message}
        autoClose={modalConfig.type === 'success'}
        autoCloseDelay={3000}
      />
    </PageWrapper>
  );
}
