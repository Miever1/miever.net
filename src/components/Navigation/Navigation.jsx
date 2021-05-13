import React from 'react';
import { Link } from 'gatsby';
import { withTheme, css } from 'styled-components';
import styled from 'styled-components';
import { Location } from '@reach/router';
import { FormattedMessage } from "react-intl";
import { FaMoon, FaSun, FaWindowClose } from 'react-icons/fa';

import useModal from '../../hooks/useModal';
import { useMedia } from '../../hooks/useMedia';

import {
  StyledNav,
  StyledNavList,
  StyledNavWrapper,
  StyledNavListLink,
  StyledWrapper,
} from './StyledNavigation';

const StyledModalCloseButton = styled.button`
  position: absolute;
  top: 14px;
  right: 12px;
  background-color: transparent;
  color: var(--color-text);
  cursor: pointer;
  border: none;
`;

const StyledModal = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-background);
  z-index: 100;
  width: 80%;
  height: 80vh;
  padding: 8px;
`;

const StyledDarkLightModeSwitcherButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border-radius: var(--border-4);
  color: var(--color-text);
  border: var(--border-2) solid transparent;
  ${(props) =>
    props.primary &&
    css`
      background: ${(props) => props.theme.colors.primary};
      color: ${(props) => props.theme.colors.white};
    `}
  &:hover, &:focus {
    border: var(--border-2) solid ${(props) => props.theme.colors.primary};

    cursor: pointer;
  }
`;

export const NavLink = (props) => (
  <StyledNavListLink>
    <Link {...props} />
  </StyledNavListLink>
);

const Navigation = (props) => {
  const {
    theme: { mode },
    language
  } = props;
  const { closeModal, isOpen, Modal } = useModal();
  const searchBarRef = React.useRef(null);

  React.useEffect(() => {
    if (isOpen) {
      if (searchBarRef.current !== null) {
        searchBarRef.current.querySelector(`input`).focus();
      }
    }
  }, [isOpen]);

  const isMobile = useMedia(
    // Media queries
    [`(max-width: 576px)`],
    //
    [true],
    // default
    [false]
  );

  if (Array.isArray(isMobile) && isMobile[0] === false && isOpen) {
    closeModal();
  }

  return (
    <Location>
      {() => (
        <StyledWrapper>
          <StyledNavWrapper>
            {isOpen && (
              <Modal>
                <StyledModal>
                  <StyledModalCloseButton onClick={() => closeModal()}>
                    <FaWindowClose></FaWindowClose>
                  </StyledModalCloseButton>
                </StyledModal>
              </Modal>
            )}
            <StyledNav>
              <StyledNavList>
                <NavLink to="/">
                  <FormattedMessage id="text_0001" />
                </NavLink>
                <NavLink to="/blog">
                  <FormattedMessage id="text_0002" />
                </NavLink>
                <NavLink to="/project">
                  <FormattedMessage id="text_0003" />
                </NavLink>
                <NavLink to="/about">
                  <FormattedMessage id="text_0004" />
                </NavLink>
              </StyledNavList>
              <StyledNavList>
                <li
                  css={`
                    padding: 1rem 1rem;
                    margin-bottom: 0;
                    float: right
                  `}
                >
                  <StyledDarkLightModeSwitcherButton
                    onClick={() => {
                      props.changeTheme();
                    }}
                    aria-label="Switch dark and light mode"
                  >
                    {mode === `light` ? <FaSun /> : <FaMoon />}
                  </StyledDarkLightModeSwitcherButton>
                </li>
                <li
                  css={`
                    padding: 1rem 1rem;
                    margin-bottom: 0;
                  `}
                >
                  <StyledDarkLightModeSwitcherButton
                    onClick={() => {
                      props.changeLanguage();
                    }}
                    aria-label="Switch Language"
                  >
                    {language === 'en' ? <FormattedMessage id="text_0005" /> : 'EN' }
                  </StyledDarkLightModeSwitcherButton>
                </li>
              </StyledNavList>
            </StyledNav>
          </StyledNavWrapper>
        </StyledWrapper>
      )}
    </Location>
  );
};

export default withTheme(Navigation);
