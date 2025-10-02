
import styled from 'styled-components';

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
