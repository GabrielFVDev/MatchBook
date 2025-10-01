import styled from "styled-components";

export const PageWrapper = styled.main`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #1e1e2e 0%, #2a2a3e 50%, #3a3a5e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;

  /* Adicionar textura sutil de papel antigo */
  &::after {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="paper" patternUnits="userSpaceOnUse" width="100" height="100"><rect width="100" height="100" fill="%23f9f9f9" opacity="0.02"/><circle cx="50" cy="50" r="1" fill="%23000" opacity="0.05"/></pattern></defs><rect width="100" height="100" fill="url(%23paper)"/></svg>');
    pointer-events: none;
    z-index: -1;
  }
`;

export const Book = styled.section`
  width: 100vw;
  height: 100vh;
  background: #fff;
  border-radius: 0; /* Remover bordas para ocupar tudo */
  box-shadow: none; /* Remover sombra externa para imersão total */
  display: flex;
  position: relative;
  overflow: hidden;

  /* Efeito de dobra central mais pronunciado */
  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 0; bottom: 0;
    width: 4px;
    background: linear-gradient(
      180deg,
      #d0d0d0 0%,
      #a0a0a0 50%,
      #d0d0d0 100%
    );
    z-index: 2;
    box-shadow: 0 0 32px 0 #888;
    opacity: 0.8;
    transform: translateX(-2px);
  }

  /* Adicionar leve curvatura nas bordas para efeito de livro */
  &::after {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    border-radius: 20px;
    box-shadow: inset 0 0 40px rgba(0,0,0,0.1);
    pointer-events: none;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    &::before { display: none; }
    &::after { border-radius: 0; }
  }
`;

export const Left = styled.div`
  flex: 1 1 50%;
  padding: 80px 60px;
  background: linear-gradient(135deg, #f0f4f8 0%, #e8ecf2 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 1;
  position: relative;

  /* Adicionar leve textura */
  &::before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="texture" patternUnits="userSpaceOnUse" width="20" height="20"><circle cx="10" cy="10" r="0.5" fill="%23000" opacity="0.03"/></pattern></defs><rect width="100" height="100" fill="url(%23texture)"/></svg>');
    pointer-events: none;
  }

  @media (max-width: 900px) {
    padding: 40px 20px;
    min-height: 50vh;
  }
`;

export const Right = styled.div`
  flex: 1 1 50%;
  background: url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80') center/cover no-repeat;
  position: relative;
  z-index: 1;

  /* Overlay sutil para harmonizar */
  &::after {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%);
  }

  @media (max-width: 900px) {
    min-height: 50vh;
  }
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-family: 'Georgia', serif;
  color: #1a1a2e;
  margin-bottom: 1.5rem;
  letter-spacing: 2px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 400px;
`;

export const Label = styled.label`
  font-size: 1.2rem;
  color: #2a2a3e;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Input = styled.input`
  padding: 16px 18px;
  border-radius: 12px;
  border: 2px solid #d1d5db;
  background: #f9fafb;
  color: #1a1a2e;
  font-size: 1.1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #646cff;
    background: #eef2f7;
    box-shadow: 0 0 0 4px rgba(100,108,255,0.15);
    transform: scale(1.02);
  }
`;

export const SocialButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 10px;
  flex-wrap: wrap;
`;

export const SocialButton = styled.button`
  flex: 1 1 30%;
  padding: 12px 0;
  border-radius: 12px;
  border: 2px solid #e0e0e0;
  background: #f3f4f6;
  color: #9ca3af;
  font-size: 1rem;
  cursor: not-allowed;
  opacity: 0.7;
  transition: all 0.3s ease;

  &:not(:disabled) {
    cursor: pointer;
    background: #e5e7eb;
    color: #1a1a2e;
    &:hover {
      background: #d1d5db;
      transform: translateY(-2px);
    }
  }
`;

export const LoginButton = styled.button`
  margin-top: 20px;
  padding: 16px 0;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #646cff 0%, #4b63f2 100%);
  color: #fff;
  font-weight: 700;
  font-size: 1.2rem;
  letter-spacing: 1px;
  box-shadow: 0 4px 16px rgba(100,108,255,0.3);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 32px rgba(100,108,255,0.4);
  }

  &:active {
    transform: translateY(0) scale(1);
  }
`;