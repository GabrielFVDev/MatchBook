
import { Route, BrowserRouter, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/login";
import CadastroPage from "./pages/auth/cadastro";
import HomePage from "./pages/home";
import ProfilePage from "./pages/profile";
import MeusLivrosPage from "./pages/meus-livros";
import AdicionarLivroPage from "./pages/adicionar-livro";
import { ProtectedRoute, PublicRoute } from "./components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } />
        <Route path="/cadastro" element={
          <PublicRoute>
            <CadastroPage />
          </PublicRoute>
        } />
        <Route path="/home" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/meus-livros" element={
          <ProtectedRoute>
            <MeusLivrosPage />
          </ProtectedRoute>
        } />
        <Route path="/adicionar-livro" element={
          <ProtectedRoute>
            <AdicionarLivroPage />
          </ProtectedRoute>
        } />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

