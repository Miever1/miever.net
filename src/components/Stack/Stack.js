import React from 'react';
import styled from 'styled-components';

const StyledStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap, 1.6rem);
`;

const Stack = (props) => {
  const { children, gap = '1.6rem' } = props;
  return <StyledStack style={{ '--gap': gap }}>{children}</StyledStack>;
};

export default Stack;
