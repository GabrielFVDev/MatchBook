
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HeaderContainer, Logo, IconWrapper, LogoutButton, NavigationContainer } from "./styles.module.jsx";
import { FaUser, FaHome, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const isProfilePage = location.pathname === "/profile";

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <HeaderContainer>
            <Logo to="/">Matchbook</Logo>
            <NavigationContainer>
                {isProfilePage ? (
                    <Link to="/home">
                        <IconWrapper>
                            <FaHome />
                        </IconWrapper>
                    </Link>
                ) : (
                    <Link to="/profile">
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
