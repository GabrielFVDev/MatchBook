
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 40px;
    background-color: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
`;

export const Logo = styled(Link)`
    font-family: 'Crimson Text', serif;
    font-size: 2em;
    color: #6b4423;
    text-decoration: none;
    font-weight: 600;
`;

export const IconWrapper = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid #d4a574;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5em;
    color: #6b4423;
    transition: all 0.3s ease;

    &:hover {
        background-color: #f0f0f0;
        transform: translateY(-2px);
    }
`;
