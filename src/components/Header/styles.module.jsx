
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
    border: 2px solid ${props => props.isActive ? '#667eea' : '#d4a574'};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5em;
    color: ${props => props.isActive ? '#fff' : '#6b4423'};
    background: ${props => {
        if (props.isActive && props.isAddButton) return 'linear-gradient(135deg, #27ae60 0%, #219a52 100%)';
        if (props.isActive) return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        if (props.isAddButton) return 'linear-gradient(135deg, #27ae60 0%, #219a52 100%)';
        return 'transparent';
    }};
    transition: all 0.3s ease;

    &:hover {
        background: ${props => {
            if (props.isActive && props.isAddButton) return 'linear-gradient(135deg, #219a52 0%, #1e8449 100%)';
            if (props.isActive) return 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)';
            if (props.isAddButton) return 'linear-gradient(135deg, #27ae60 0%, #219a52 100%)';
            return '#f0f0f0';
        }};
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    ${props => props.isAddButton && `
        color: #fff;
        border-color: #27ae60;
    `}
`;

export const NavigationContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`;

export const LogoutButton = styled.button`
    background-color: #d4a574;
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    transition: all 0.3s ease;

    &:hover {
        background-color: #c09060;
        transform: translateY(-2px);
    }
`;
