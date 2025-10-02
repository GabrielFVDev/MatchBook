import { Route, BrowserRouter, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/login";
import CadastroPage from "./pages/auth/cadastro";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
