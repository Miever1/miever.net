import styled from 'styled-components';

export const StyledSocial = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text);
  a {
    color: var(--color-text);
    margin: 2rem;
  }
  svg {
    transition: all 0.5s ease;
    &:hover,
    &:focus {
      color: var(--color-text);
      transform: scale(1.5);
    }
  }
`;
