import { useEffect } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 90%;
  text-align: center;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateY(-50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const ModalTitle = styled.h2`
  color: ${props => props.type === 'success' ? '#27ae60' : '#e74c3c'};
  margin-bottom: 15px;
  font-size: 24px;
`;

const ModalMessage = styled.p`
  color: #333;
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 1.5;
`;

const ModalButton = styled.button`
  background: #8b4513;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: #a0522d;
  }
`;

const IconContainer = styled.div`
  font-size: 48px;
  margin-bottom: 15px;
`;

export const NotificationModal = ({ 
  isOpen, 
  onClose, 
  type = 'success', 
  title, 
  message, 
  autoClose = false,
  autoCloseDelay = 3000 
}) => {
  
  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, autoCloseDelay, onClose]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '✅';
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <IconContainer>{getIcon()}</IconContainer>
        <ModalTitle type={type}>{title}</ModalTitle>
        <ModalMessage>{message}</ModalMessage>
        <ModalButton onClick={onClose}>
          {type === 'success' ? 'Continuar' : 'Tentar novamente'}
        </ModalButton>
      </ModalContainer>
    </ModalOverlay>
  );
};
