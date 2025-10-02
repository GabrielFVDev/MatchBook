
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
  font-size: 0.9em;
  color: #6b4423;
  text-decoration: none;
  font-family: 'Crimson Text', serif;

  &:hover {
    text-decoration: underline;
  }
`;
