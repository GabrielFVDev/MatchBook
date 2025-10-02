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

export const LeftPage = styled.div`
  flex: 1;
  padding: 60px 50px;
  background: linear-gradient(135deg, #f8f5f0 0%, #f2ede5 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start; /* alinhar à esquerda */
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 20% 80%, rgba(212, 165, 116, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(212, 165, 116, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

export const RightPage = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #f2ede5 0%, #ede5d8 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 60px 50px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 30% 70%, rgba(212, 165, 116, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

export const Title = styled.h1`
  font-size: 3em;
  margin-bottom: 30px;
  text-align: left;
  color: #6b4423;
  font-family: 'Crimson Text', serif;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(107, 68, 35, 0.1);
`;

export const Form = styled.form`
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 1.1em;
  color: #6b4423;
  font-family: 'Crimson Text', serif;
  font-weight: 500;
`;

export const Input = styled.input`
  width: 100%;
  padding: 15px 20px;
  border: 2px solid #d4a574;
  border-radius: 8px;
  font-size: 1em;
  background: rgba(255, 255, 255, 0.9);
  color: #6b4423;
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #a67c52;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 0 15px rgba(212, 165, 116, 0.3);
  }

  &::placeholder {
    color: rgba(107, 68, 35, 0.5);
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 15px;
  margin-top: 10px;
  background: linear-gradient(135deg, #6b4423 0%, #8b5a2b 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1em;
  cursor: pointer;
  font-family: 'Crimson Text', serif;
  font-weight: 600;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: linear-gradient(135deg, #8b5a2b 0%, #6b4423 100%);
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(107, 68, 35, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const IllustrationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

export const BookStack = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Book = styled.div`
  width: 80px;
  height: 100px;
  border-radius: 5px;
  position: relative;
  margin: -10px 0;
  
  &:nth-child(1) {
    background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%);
    transform: rotate(-5deg);
    z-index: 3;
  }
  
  &:nth-child(2) {
    background: linear-gradient(135deg, #800080 0%, #9932CC 100%);
    transform: rotate(2deg);
    z-index: 2;
  }
  
  &:nth-child(3) {
    background: linear-gradient(135deg, #4682B4 0%, #5F9EA0 100%);
    transform: rotate(-3deg);
    z-index: 1;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.1) 50%, transparent 100%);
    border-radius: inherit;
  }

  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

export const QuoteText = styled.p`
  font-size: 1.3em;
  color: #6b4423;
  font-family: 'Crimson Text', serif;
  font-style: italic;
  text-align: center;
  line-height: 1.6;
  max-width: 250px;
  margin: 0;
  text-shadow: 0 1px 2px rgba(107, 68, 35, 0.1);
`;

export const AlternativeLogins = styled.div`
  display: flex;
  justify-content: flex-start; /* alinhar ícones à esquerda */
  gap: 15px;
`;
