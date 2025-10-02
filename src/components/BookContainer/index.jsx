
import styled, { keyframes } from 'styled-components';

const bookOpen = keyframes`
  from {
    transform: perspective(1000px) rotateY(-5deg) scale(0.95);
    opacity: 0;
  }
  to {
    transform: perspective(1000px) rotateY(0deg) scale(1);
    opacity: 1;
  }
`;

export const BookContainer = styled.section`
  width: 90%;
  max-width: 1200px;
  height: 80vh;
  min-height: 600px;
  background: #f8f5f0;
  border-radius: 20px;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  display: flex;
  position: relative;
  overflow: hidden;
  animation: ${bookOpen} 0.8s ease-out;

  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, #d4a574 0%, #a67c52 50%, #d4a574 100%);
    box-shadow: 0 0 20px rgba(212, 165, 116, 0.5);
    transform: translateX(-1.5px);
    z-index: 2;
  }
`;
