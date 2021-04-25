import React from 'react';

import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FaListUl } from 'react-icons/fa';

import Divider from '../Divider';
import Heading from '../Heading';

const StyledTableOfContentsNavigation = styled.nav`
  display: none;
  padding: 1.6rem;
  margin-left: 1rem;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  max-width: 300px;
  font-family: 'Raleway', sans-serif;
  color: var(--color-text);
  background: var(--color-background);
  position: sticky;
  top: 70px;

  ${(props) => props.theme.xlarge} {
    display: flex;
  }
  h2 {
    font-size: 1.8rem;
    font-weight: var(--font-weight-medium);
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    text-rendering: optimizelegibility;
    margin-bottom: 16px;
  }

  a {
    display: block;
    opacity: 0.8;
    text-decoration: none;
    transition: opacity 500ms ease 0s;
    margin-top: 1rem;
    text-align: left;
  }

  a:hover,
  a:focus {
    color: var(--color-primary);
  }
`;

const TableOfContents = (props) => {
  const { items } = props;
  return (
    <div>
      {items && items.length > 0 ? (
        <StyledTableOfContentsNavigation>
          <Heading appearance={`H2`}>
            <FaListUl></FaListUl> Table of contents
          </Heading>

          <Divider></Divider>
          {items.map((item) => {
            const { url, title } = item;
            return (
              <a key={title} href={`${url}`}>
                {title}
              </a>
            );
          })}
        </StyledTableOfContentsNavigation>
      ) : null}
    </div>
  );
};

PropTypes.displayName = `TableOfContents`;

export default TableOfContents;
