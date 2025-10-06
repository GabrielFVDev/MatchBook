import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaCheck, FaHeart, FaBook, FaTimes } from 'react-icons/fa';

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(100px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 2rem;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  max-width: 500px;
  width: 100%;
  text-align: center;
  animation: ${slideUp} 0.5s ease-out;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #666;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: #f0f0f0;
    color: #333;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #27ae60 0%, #219a52 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2.5rem;
  animation: ${pulse} 2s infinite;
  box-shadow: 0 10px 30px rgba(39, 174, 96, 0.3);
`;

const HeartIcon = styled.div`
  color: #e74c3c;
  font-size: 2rem;
  animation: ${pulse} 2s infinite 0.5s;
`;

const BookIcon = styled.div`
  color: #3498db;
  font-size: 2rem;
  animation: ${pulse} 2s infinite 1s;
`;

const Title = styled.h2`
  color: #27ae60;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const BookTitle = styled.h3`
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  font-style: italic;
`;

const Message = styled.p`
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`;

const PrimaryButton = styled(Button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;

  &:hover {
    background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
  }
`;

const SecondaryButton = styled(Button)`
  background: #f8f9fa;
  color: #333;
  border: 2px solid #e9ecef;

  &:hover {
    background: #e9ecef;
  }
`;

export const SuccessModal = ({ 
  isOpen, 
  bookTitle, 
  onClose, 
  onViewFavorites, 
  onAddAnother 
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>

        <IconContainer>
          <BookIcon>
            <FaBook />
          </BookIcon>
          <SuccessIcon>
            <FaCheck />
          </SuccessIcon>
          <HeartIcon>
            <FaHeart />
          </HeartIcon>
        </IconContainer>

        <Title>Livro Adicionado com Sucesso! 🎉</Title>
        
        <BookTitle>"{bookTitle}"</BookTitle>
        
        <Message>
          Parabéns! Seu livro foi adicionado ao catálogo do MatchBook e 
          automaticamente incluído na sua lista de favoritos. ❤️
        </Message>

        <ActionButtons>
          <PrimaryButton onClick={onViewFavorites}>
            <FaHeart />
            Ver Meus Favoritos
          </PrimaryButton>
          <SecondaryButton onClick={onAddAnother}>
            <FaBook />
            Adicionar Outro Livro
          </SecondaryButton>
        </ActionButtons>
      </ModalContent>
    </ModalOverlay>
  );
};
