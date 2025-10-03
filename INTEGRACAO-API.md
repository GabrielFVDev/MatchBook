# 🔌 Integração com API - MatchBook

## 📁 Estrutura dos Arquivos de Integração

```
src/
├── apis/
│   ├── api.js          # Configuração base do Axios
│   └── services.js     # Serviços específicos (auth, user)
├── hooks/
│   └── useAuth.js      # Hooks para autenticação
├── utils/
│   └── formatters.js   # Utilitários de formatação/validação
└── components/
    └── ProtectedRoute/  # Componentes para proteção de rotas
```

## 🚀 Funcionalidades Implementadas

### ✅ Login

- **Endpoint:** Busca todos usuários e valida credenciais localmente
- **Validação:** Email e senha obrigatórios
- **Estado:** Loading, error e success
- **Persistência:** Dados do usuário salvos no localStorage
- **Redirecionamento:** Para /home após login bem-sucedido

### ✅ Cadastro

- **Endpoint:** `POST /api/usuario/create`
- **Validações:**
  - Campos obrigatórios: nome, email, senha
  - Email deve ser válido
  - Senha mínimo 6 caracteres
  - Normalização de dados
- **Estado:** Loading, error e success
- **Redirecionamento:** Para login após cadastro bem-sucedido

### ✅ Proteção de Rotas

- **ProtectedRoute:** Redireciona para login se não autenticado
- **PublicRoute:** Redireciona para home se já autenticado

### ✅ Logout

- **Funcionalidade:** Remove dados do localStorage
- **Integração:** Header com botão de logout

## 🔧 Como Usar

### Hook useAuth

```jsx
import { useAuth } from '../hooks/useAuth';

function MeuComponente() {
  const { login, logout, isLoggedIn, getCurrentUser, loading, error } = useAuth();

  // Login
  const resultado = await login('email@test.com', 'senha123');
  if (resultado.success) {
    // Login bem-sucedido
  }

  // Verificar se está logado
  if (isLoggedIn()) {
    // Usuário está autenticado
  }

  // Obter usuário atual
  const usuario = getCurrentUser();
}
```

### Hook useRegister

```jsx
import { useRegister } from '../hooks/useAuth';

function CadastroComponente() {
  const { register, loading, error, success } = useRegister();

  const userData = {
    nome: "João Silva",
    email: "joao@email.com",
    senha: "123456",
    // ... outros campos
  };

  const resultado = await register(userData);
  if (resultado.success) {
    // Cadastro bem-sucedido
  }
}
```

### Serviços de API

```jsx
import { authService, userService } from "../apis/services";

// Login
const loginResult = await authService.login("email", "senha");

// Cadastro
const registerResult = await authService.cadastrar(userData);

// Buscar usuário
const userResult = await userService.buscarPorId(1);

// Atualizar usuário
const updateResult = await userService.atualizar(userData);
```

## 🛡️ Proteção de Rotas

### Rotas Protegidas (necessitam login)

```jsx
<Route
  path="/home"
  element={
    <ProtectedRoute>
      <HomePage />
    </ProtectedRoute>
  }
/>
```

### Rotas Públicas (redirecionam se logado)

```jsx
<Route
  path="/login"
  element={
    <PublicRoute>
      <LoginPage />
    </PublicRoute>
  }
/>
```

## 📝 Estados de Loading e Error

### Visual de Loading

```jsx
<Button type="submit" disabled={loading}>
  {loading ? "Carregando..." : "Enviar"}
</Button>
```

### Display de Erros

```jsx
{
  error && (
    <div
      style={{
        color: "#e74c3c",
        backgroundColor: "#fdf2f2",
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #fecaca",
        marginBottom: "16px",
      }}
    >
      {error}
    </div>
  );
}
```

## 🔄 Fluxo de Autenticação

1. **Usuário acessa página de login**
2. **Digita credenciais e submete**
3. **Hook useAuth valida dados**
4. **API busca todos usuários**
5. **Valida credenciais localmente**
6. **Se válido, salva no localStorage**
7. **Redireciona para /home**
8. **ProtectedRoute permite acesso**

## 🎯 Próximos Passos

### Melhorias Sugeridas:

- [ ] Implementar endpoint específico de login no backend
- [ ] Adicionar refresh token para sessões
- [ ] Implementar cache de dados do usuário
- [ ] Adicionar validações mais robustas
- [ ] Implementar sistema de recuperação de senha
- [ ] Adicionar testes unitários

### Para Adicionar Novas Funcionalidades:

1. **Criar serviço em `services.js`**
2. **Criar hook específico em `hooks/`**
3. **Integrar com componentes**
4. **Adicionar tratamento de erros**

## 🚨 Importante

- **Backend deve estar rodando em `http://localhost:8080`**
- **Configurar CORS no Spring Boot**
- **Dados ficam no localStorage (considerar segurança)**
- **Login atual é simulado (busca todos e valida localmente)**

## 📋 Dependências Adicionadas

```json
{
  "axios": "^1.x.x"
}
```
