
import { Link, useLocation } from "react-router-dom";
import { HeaderContainer, Logo, IconWrapper } from "./styles.module.jsx";
import { FaUser, FaHome } from "react-icons/fa";

export default function Header() {
    const location = useLocation();
    const isProfilePage = location.pathname === "/profile";

    return (
        <HeaderContainer>
            <Logo to="/">Matchbook</Logo>
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
        </HeaderContainer>
    );
}
