
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

export const PageWrapper = styled.main`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #2d1b69 0%, #1a1a2e 50%, #0f0f23 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  padding: 20px;
`;
