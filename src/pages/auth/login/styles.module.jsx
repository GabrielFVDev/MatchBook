import styled from 'styled-components';

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