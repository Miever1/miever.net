import styled from 'styled-components';
import { zIndexLogo } from '../../components/Styles/zIndex';
import { BgImage } from 'gbimage-bridge';

export const StyledLogo = styled.svg`
  display: none;
  position: ${(props) => (props.scrollPositionY > 0 ? `fixed` : `static`)};
  top: -235px;
  left: -200px;
  margin-top: 20px;
  align-self: flex-start;
  z-index: ${zIndexLogo};
  height: 60rem;
  width: 40rem;
  transition: all 0.25s ease-out 0s;
  transform: ${(props) => (props.scrollPositionY > 0 ? `scale(0.2)` : `scale(1.0)`)};

  ${(props) => props.theme.xsmall} {
    display: none;
  }
  ${(props) => props.theme.small} {
    display: none;
  }
  ${(props) => props.theme.medium} {
    display: none;
  }
  ${(props) => props.theme.large} {
    display: none;
  }
  ${(props) => props.theme.large} {
    display: none;
  }
  @media (min-width: 2000px) {
    position: absolute;
    top: 100px;
    left: 80px;
    height: 80rem;
    display: ${(props) => (props.scrollPositionY > 0 ? `none` : `visible`)};
  }
`;

export const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75vh;
`;

export const StyledInformation = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--color-text);
  max-width: ${(props) => props.theme.maxWidth};
  align-items: center;
  justify-content: center;
  position: initial;
  padding-top: 18rem;
  padding-bottom: 3rem;
  margin-left: 2rem;
  margin-right: 2rem;
  text-shadow: var(--text-shadow);

  ${(props) => props.theme.small} {
    position: initial;
    padding-top: 18rem;
    padding-bottom: 3rem;
    margin-left: 2rem;
    margin-right: 2rem;
  }
  ${(props) => props.theme.medium} {
    position: initial;
    padding-top: 25rem;
    padding-bottom: 3rem;
    margin-left: 2rem;
    margin-right: 2rem;
  }

  span {
    font-size: 1.5rem;
    font-weight: 400;
    align-self: flex-start;

    ${(props) => props.theme.small} {
      font-size: 1.5rem;
    }
    ${(props) => props.theme.medium} {
      font-size: 2rem;
    }
    ${(props) => props.theme.large} {
      font-size: 2rem;
    }
  }

  h1 {
    font-size: 3rem;
    transition: color ${(props) => props.theme.themeTransition};
    ${(props) => props.theme.xsmall} {
      font-size: 3rem;
    }
    ${(props) => props.theme.small} {
      font-size: 4rem;
    }
    ${(props) => props.theme.medium} {
      font-size: 4rem;
    }
    ${(props) => props.theme.large} {
      font-size: 5rem;
    }
    span {
      font-size: 3rem;
      align-self: flex-start;

      ${(props) => props.theme.xsmall} {
        font-size: 3rem;
      }
      ${(props) => props.theme.small} {
        font-size: 4rem;
      }
      ${(props) => props.theme.medium} {
        font-size: 4rem;
      }
      ${(props) => props.theme.large} {
        font-size: 5rem;
      }
    }
  }
`;

export const StyledHeaderBG = styled(BgImage)`
  /* Full height */
  display: flex;
  background-size: cover;
  flex-direction: column;
  background-repeat: no-repeat;
  height: 1024px;
  height: 100vh;
  width: 100%;
  ${(props) => props.theme.medium} {
    height: 600px;
    height: 100vh;
  }
  ${(props) => props.theme.large} {
    height: 800px;
    height: 100vh;
  }
`;

export const StyledName = styled.span`
  font-size: 1.5rem;
  padding: 20px;
  font-style: italic;
  display: flex;
  justify-content: center;
`;
