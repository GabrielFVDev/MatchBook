// Script para testar a conectividade com a API
// Execute no console do navegador ou como um componente de teste

import api from './apis/api';

// Teste simples de conectividade
export const testarAPI = async () => {
  console.log("🔍 Testando conectividade com a API...");
  
  try {
    // Testa se a API está respondendo
    const response = await api.get('/usuario/all');
    console.log("✅ API está respondendo!");
    console.log("📋 Usuários encontrados:", response.data?.length || 0);
    console.log("👥 Dados dos usuários:", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("❌ Erro ao conectar com a API:", error);
    
    if (error.code === 'NETWORK_ERROR' || error.message.includes('Network Error')) {
      console.log("🚫 Erro de rede - Backend provavelmente não está rodando");
      console.log("💡 Certifique-se de que o Spring Boot está rodando em http://localhost:8080");
    } else if (error.response?.status === 404) {
      console.log("🔍 Endpoint não encontrado - verifique a URL da API");
    } else if (error.response?.status >= 500) {
      console.log("🔧 Erro interno do servidor - verifique os logs do backend");
    } else {
      console.log("⚠️ Outro erro:", error.response?.status, error.response?.data);
    }
    
    return { success: false, error: error.message };
  }
};

// Teste de cadastro com dados fake
export const testarCadastro = async () => {
  console.log("🔍 Testando cadastro de usuário...");
  
  const dadosTeste = {
    nome: "Teste Usuario",
    email: `teste${Date.now()}@email.com`,
    senha: "123456",
    dataNascimento: "1990-01-01",
    generoFavorito: "Ficção",
    livrosLidos: 10,
    autorPreferido: "Test Author",
    nivelLeitura: "Intermediário",
    receberRecomendacoes: true,
    biografia: "Usuário de teste"
  };
  
  try {
    const response = await api.post('/usuario/create', dadosTeste);
    console.log("✅ Cadastro realizado com sucesso!");
    console.log("👤 Usuário criado:", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("❌ Erro no cadastro:", error);
    console.error("📝 Detalhes:", error.response?.data);
    return { success: false, error: error.message };
  }
};

// Função para executar todos os testes
export const executarTodosTestes = async () => {
  console.log("🚀 Iniciando testes da API...\n");
  
  // Teste 1: Conectividade
  await testarAPI();
  
  console.log("\n" + "=".repeat(50) + "\n");
  
  // Teste 2: Cadastro
  await testarCadastro();
  
  console.log("\n✨ Testes concluídos!");
};

// Para usar no console do navegador:
// window.testarAPI = testarAPI;
// window.testarCadastro = testarCadastro;
// window.executarTodosTestes = executarTodosTestes;
