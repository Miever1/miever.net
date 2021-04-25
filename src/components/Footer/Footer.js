import React, { Suspense } from 'react';
import styled from 'styled-components';

import Heading from '../../components/Heading';
import Stack from '../../components/Stack';
import { useBreakpoint } from '../../hooks/useBreakpoint';

const StyledMap = styled.div`
  margin: var(--margin-6) auto;
  transition: background-color ${(props) => props.theme.themeTransition};
  width: 100%;
  max-width: var(--max-width);
  ${(props) => props.theme.small} {
    margin: var(--margin-0);
  }
  ${(props) => props.theme.medium} {
    margin: var(--margin-1) auto;
  }
`;

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

const LazyWorldMap = React.lazy(() => import(`../Map/ReactMap` /* webpackChunkName: "ReactMap" */));

const Footer = () => {
  const breakpoint = useBreakpoint();
  return (
    <StyledFooterWrapper>
      <StyledFooter>
        <Stack>
          {breakpoint.name === 'xsmall' || breakpoint.name === 'small' ? null : (
            <>
              <Heading
                appearance={`H3`}
                css={`
                  padding-top: var(--padding-4);
                  text-align: ${breakpoint.name === 'medium' ? 'center' : 'left'};
                `}
              >
                Countries I have traveled
              </Heading>
              <StyledMap>
                {typeof window === `undefined` ? null : (
                  <Suspense fallback={<div>Loading...</div>}>
                    <LazyWorldMap />
                    {` `}
                  </Suspense>
                )}
              </StyledMap>
            </>
          )}
        </Stack>
      </StyledFooter>
    </StyledFooterWrapper>
  );
};

export default Footer;
