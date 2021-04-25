import React, { Suspense } from 'react';
import styled from 'styled-components';

import Social from '../../components/Social';
import Heading from '../../components/Heading';
import Stack from '../../components/Stack';
import { NavLink } from '../../components/Navigation/Navigation';
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

const NavListWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 2rem;
  ${(props) => props.theme.small} {
    grid-template-columns: 1 1fr;
  }
  ${(props) => props.theme.medium} {
    grid-template-columns: repeat(3, 1fr);
  }
  ${(props) => props.theme.large} {
    grid-template-columns: repeat(3, 1fr);
  }
  ${(props) => props.theme.xlarge} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const NavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FooterListLink = styled.li`
  margin-bottom: var(--margin-0);

  a {
    font-size: 2rem;
    font-weight: 600;
    padding: var(--padding-1) var(--padding-3);
    margin-bottom: var(--margin-0);
    background: none;
    border: none;
    display: flex;
    position: relative;
    cursor: pointer;
    align-items: center;
    text-transform: uppercase;
    color: var(--color-text);

    &:after {
      height: 2px;
      background: var(--color-primary);
      content: '';
      width: 0;
      position: absolute;
      transform: translateX(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
      left: 50%;
      margin-top: var(--margin-3);
    }
    &:hover,
    &:focus {
      outline: none;
      &:after {
        width: calc(100% - 60px);
      }
    }
  }
`;
const LazyWorldMap = React.lazy(() => import(`../Map/ReactMap` /* webpackChunkName: "ReactMap" */));

const Footer = () => {
  const breakpoint = useBreakpoint();
  console.log(breakpoint.name);
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

          <NavListWrapper>
            <NavList>
              <NavLink to="/">Home</NavLink>
              <FooterListLink></FooterListLink>
            </NavList>
            <Social />
            <NavList>
              <NavLink to="/about">About</NavLink>
            </NavList>
          </NavListWrapper>
        </Stack>
      </StyledFooter>
    </StyledFooterWrapper>
  );
};

export default Footer;
