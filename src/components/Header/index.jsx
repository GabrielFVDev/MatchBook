
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HeaderContainer, Logo, IconWrapper, LogoutButton, NavigationContainer } from "./styles.module.jsx";
import { FaUser, FaHome, FaSignOutAlt, FaHeart, FaPlus } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const currentPath = location.pathname;

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <HeaderContainer>
            <Logo to="/">Matchbook</Logo>
            <NavigationContainer>
                <Link to="/home" title="Início">
                    <IconWrapper isActive={currentPath === "/home"}>
                        <FaHome />
                    </IconWrapper>
                </Link>
                <Link to="/meus-livros" title="Meus Livros Favoritos">
                    <IconWrapper isActive={currentPath === "/meus-livros"}>
                        <FaHeart />
                    </IconWrapper>
                </Link>
                <Link to="/adicionar-livro" title="Adicionar Livro">
                    <IconWrapper 
                        isActive={currentPath === "/adicionar-livro"}
                        isAddButton={true}
                    >
                        <FaPlus />
                    </IconWrapper>
                </Link>
                <Link to="/profile" title="Perfil">
                    <IconWrapper isActive={currentPath === "/profile"}>
                        <FaUser />
                    </IconWrapper>
                </Link>
                <LogoutButton onClick={handleLogout}>
                    Sair
                </LogoutButton>
            </NavigationContainer>
        </HeaderContainer>
    );
}
