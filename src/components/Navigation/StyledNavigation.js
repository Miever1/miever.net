import styled from 'styled-components';
import { zIndexLogo, zIndexNavigation } from '../../components/Styles/zIndex';
import { sizes } from '../Layout/Theme';

export const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-background);
  z-index: ${zIndexNavigation};
  border-top: 2px solid ${(props) => props.theme.colors.primary};
  border-bottom: 1px solid #201c29;
`;

export const StyledNavWrapper = styled.div`
  display: grid;
  width: 100%;
  max-width: 1024px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 70px;
  grid-gap: 20px;
  height: 70px;
  float: right;
  box-shadow: none;
  transition: height 0.25s ease-in-out 0s, box-shadow 0.2s ease-in-out 0.05s, background-color var(--theme-transition);
  a {
    color: var(--color-text);
  }
  a:hover,
  a:focus {
    color: var(--color-primary);
  }
`;

export const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  height: 70px;

  @media (max-width: ${sizes.phone}px) {
    mask-image: linear-gradient(to right, transparent, black 20px, black 90%, transparent);
    margin-left: 200px;
    width: 250px;
    overflow-x: auto;
    overflow-y: hidden;
    position: absolute;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const StyledNavLogo = styled.svg`
  width: 140px;
  height: 140px;
  transition: all 0.25s ease-out 0s;
  margin-top: 5px; /* green top border margin */
  z-index: ${zIndexLogo};
  background: var(--color-background);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  ${(props) => props.theme.xsmall} {
    width: 150px;
    height: 150px;
  }

  ${(props) => props.theme.medium} {
    width: 140px;
    height: 140px;
    left: 70px;
    display: inline-block;
  }
  ${(props) => props.theme.large} {
    width: 140px;
    height: 140px;
    left: 70px;
    display: inline-block;
  }

  @media (min-width: 2000px) {
    display: ${(props) => (props.scrollPositionY > 0 ? `visible` : `none`)};
    position: fixed;
  }

  svg {
    width: 100%;
    display: inline-block;
    transition: all 0.25s ease-out 0s;
    z-index: ${zIndexLogo};
  }
`;

export const StyledNavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
`;

export const StyledNavListLink = styled.li`
  margin-bottom: 0px;

  a,
  button {
    font-size: var(--font-size-xl);
    font-weight: 600;
    padding: 1rem 3rem;
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
      margin-top: 2rem;
      bottom: 0.1em;
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
