
import styled from 'styled-components';

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
