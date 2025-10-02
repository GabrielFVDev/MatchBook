
import styled from 'styled-components';

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
