
import styled from 'styled-components';

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
