import styled from 'styled-components';

export const PageContainer = styled.main`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #2d1b69 0%, #1a1a2e 50%, #0f0f23 100%);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`;

export const Header = styled.header`
  width: 100%;
  padding: 20px 40px;
  background: rgba(248, 245, 240, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 2px solid #d4a574;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
`;

export const Logo = styled.h1`
  font-family: 'Crimson Text', serif;
  font-size: 1.8em;
  color: #6b4423;
  margin: 0;
  font-weight: 600;
`;

export const SearchContainer = styled.div`
  flex: 1;
  max-width: 600px;
  margin: 0 40px;
  position: relative;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 12px 50px 12px 20px;
  border: 2px solid #d4a574;
  border-radius: 25px;
  font-size: 1em;
  background: rgba(255, 255, 255, 0.9);
  color: #6b4423;
  font-family: 'Crimson Text', serif;
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

export const SearchIcon = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #6b4423;
  font-size: 1.2em;
  cursor: pointer;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  line-height: 1;

  &:hover {
    color: #a67c52;
  }
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const ProfileButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #d4a574;
  background: linear-gradient(135deg, #6b4423 0%, #8b5a2b 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #8b5a2b 0%, #6b4423 100%);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(107, 68, 35, 0.3);
  }
`;

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: 
    radial-gradient(ellipse at center, rgba(248, 245, 240, 0.1) 0%, transparent 70%),
    linear-gradient(45deg, transparent 25%, rgba(248, 245, 240, 0.02) 25%),
    linear-gradient(-45deg, transparent 25%, rgba(248, 245, 240, 0.02) 25%);
`;

export const BookDiscoveryCard = styled.div`
  background: linear-gradient(135deg, #f8f5f0 0%, #f2ede5 100%);
  border-radius: 20px;
  padding: 60px 40px;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 600px;
  width: 100%;
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
    border-radius: inherit;
    pointer-events: none;
  }
`;

export const DiscoveryTitle = styled.h2`
  font-size: 2.5em;
  color: #6b4423;
  font-family: 'Crimson Text', serif;
  font-weight: 600;
  margin-bottom: 40px;
  text-shadow: 0 2px 4px rgba(107, 68, 35, 0.1);
  line-height: 1.2;
`;

export const QuestionIcon = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #d4a574 0%, #a67c52 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4em;
  color: white;
  box-shadow: 
    0 10px 30px rgba(212, 165, 116, 0.4),
    inset 0 2px 10px rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 40px;
  
  &:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 
      0 15px 40px rgba(212, 165, 116, 0.6),
      inset 0 2px 10px rgba(255, 255, 255, 0.3);
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

export const PrimaryButton = styled.button`
  padding: 15px 30px;
  background: linear-gradient(135deg, #6b4423 0%, #8b5a2b 100%);
  color: white;
  border: none;
  border-radius: 25px;
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

export const SecondaryButton = styled.button`
  padding: 15px 30px;
  background: transparent;
  color: #6b4423;
  border: 2px solid #d4a574;
  border-radius: 25px;
  font-size: 1.1em;
  cursor: pointer;
  font-family: 'Crimson Text', serif;
  font-weight: 600;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: #d4a574;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(212, 165, 116, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;
