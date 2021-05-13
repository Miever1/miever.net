import React from 'react';
import styled from 'styled-components';

import Stack from '../../components/Stack';
import Social from '../Social'
import { useBreakpoint } from '../../hooks/useBreakpoint';

export const StyledFooterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledFooter = styled.footer`
  display: flex;
  flex-shrink: 0;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-top: var(--margin-3);
  border-top: 1px solid #201c29;
  max-width: var(--max-width);
`;

const Footer = () => {
  const breakpoint = useBreakpoint();
  return (
    <StyledFooterWrapper>
      <StyledFooter>
        <Stack>
          {breakpoint.name === 'xsmall' || breakpoint.name === 'small' ? null : (
            <>
              <Social />
            </>
          )}
        </Stack>
      </StyledFooter>
    </StyledFooterWrapper>
  );
};

export default Footer;
