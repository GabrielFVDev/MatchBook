
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HeaderContainer, Logo, IconWrapper, LogoutButton, NavigationContainer } from "./styles.module.jsx";
import { FaUser, FaHome, FaSignOutAlt, FaHeart } from "react-icons/fa";
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
                {currentPath !== "/home" && (
                    <Link to="/home" title="Início">
                        <IconWrapper>
                            <FaHome />
                        </IconWrapper>
                    </Link>
                )}
                {currentPath !== "/meus-livros" && (
                    <Link to="/meus-livros" title="Meus Livros Favoritos">
                        <IconWrapper>
                            <FaHeart />
                        </IconWrapper>
                    </Link>
                )}
                {currentPath !== "/profile" && (
                    <Link to="/profile" title="Perfil">
                        <IconWrapper>
                            <FaUser />
                        </IconWrapper>
                    </Link>
                )}
                <LogoutButton onClick={handleLogout}>
                    Sair
                </LogoutButton>
            </NavigationContainer>
        </HeaderContainer>
    );
}
