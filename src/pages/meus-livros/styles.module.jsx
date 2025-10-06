
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Reutilizando de home/styles.module.jsx
export const PageContainer = styled.main`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #2d1b69 0%, #1a1a2e 50%, #0f0f23 100%);
  display: flex;
  flex-direction: column;
  overflow-y: auto; /* Permitir scroll */
  position: relative;
`;

export const MainContent = styled.div`
  flex: 1;
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const HeaderNavigation = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
`;

export const BackButton = styled.button`
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
  color: white;
  border: 1px solid rgba(255,255,255,0.2);
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  }
`;

export const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: white;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 15px;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

export const StatCard = styled.div`
  background: linear-gradient(135deg, #f8f5f0 0%, #f2ede5 100%);
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
`;

export const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #2d1b69;
  margin-bottom: 5px;
`;

export const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

export const FilterButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  background: ${({ active }) => active ? 'linear-gradient(135deg, #f8f5f0 0%, #f2ede5 100%)' : 'rgba(248, 245, 240, 0.2)'};
  color: ${({ active }) => active ? '#2d1b69' : 'white'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(248, 245, 240, 0.3);

  &:hover {
    background: ${({ active }) => active ? 'linear-gradient(135deg, #f0f0f0 0%, #e8e3dc 100%)' : 'rgba(248, 245, 240, 0.3)'};
    transform: translateY(-2px);
  }
`;

export const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  width: 100%;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const BookCard = styled.div`
  background: linear-gradient(135deg, #f8f5f0 0%, #f2ede5 100%);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: row;
  gap: 15px;
  position: relative;
  width: 100%;
  min-height: 140px;
  box-sizing: border-box;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 15px 40px rgba(0, 0, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 76, 76, 0.9);
  color: white;
  border: none;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  opacity: 0;

  ${BookCard}:hover & {
    opacity: 1;
  }

  &:hover {
    background: rgba(255, 50, 50, 1);
    transform: scale(1.1);
  }
`;

export const BookCover = styled.img`
  width: 80px;
  height: 120px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
`;

export const BookCoverPlaceholder = styled.div`
  width: 80px;
  height: 120px;
  background: linear-gradient(135deg, #2d1b69, #1a1a2e);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  text-align: center;
  line-height: 1.2;
  flex-shrink: 0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

export const BookInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const BookTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  color: #2d1b69;
  font-weight: 700;
  line-height: 1.3;
`;

export const BookDetail = styled.p`
  margin: 0;
  color: #666;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;

  &.genre {
    color: #1a1a2e;
    font-size: 0.9rem;
    font-weight: 600;
  }

  &.pages {
    color: #888;
    font-size: 0.85rem;
  }

  &.date {
    color: #999;
    font-size: 0.8rem;
    font-style: italic;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, #f8f5f0 0%, #f2ede5 100%);
  border-radius: 25px;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
`;

export const EmptyIcon = styled.div`
  font-size: 4rem;
  color: #2d1b69;
  margin-bottom: 20px;
  opacity: 0.7;
`;

export const EmptyTitle = styled.h2`
  color: #2d1b69;
  margin: 0 0 15px 0;
  font-size: 1.8rem;
  font-weight: 600;
`;

export const EmptyDescription = styled.p`
  color: #666;
  margin: 0 0 30px 0;
  font-size: 1rem;
  line-height: 1.6;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
  color: white;
  font-size: 1.2rem;
  gap: 20px;

  svg {
    font-size: 3rem;
    opacity: 0.7;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { 
      opacity: 0.7; 
    }
    50% { 
      opacity: 1; 
    }
  }
`;

export const ErrorContainer = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, #f8f5f0 0%, #f2ede5 100%);
  border-radius: 25px;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 76, 76, 0.3);

  div {
    font-size: 1.2rem;
    margin-bottom: 20px;
    color: #2d1b69;
  }
`;
