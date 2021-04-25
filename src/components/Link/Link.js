import React from 'react';
import styled from 'styled-components';

import { Link as GatsbyLink } from 'gatsby';

const StyledLink = styled((props) => <GatsbyLink {...props} />)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  font-size: 1.6rem;
  font-weight: 600;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
  margin: 20px;
  height: 55px;
  text-align: center;
  border-radius: var(--rounded-lg);
  background-size: 300% 100%;
  background-color: #3eecac;
  background-image: linear-gradient(19deg, #3eecac 0%, #4a90e2 100%);

  transition: all 0.4s ease-in-out;

  &:focus {
    outline: none;
  }

  &:hover {
    background-position: 100% 0;
    transition: all 0.4s ease-in-out;
    background-image: linear-gradient(19deg, #4a90e2 0%, #3eecac 100%);
  }
`;

const Link = (props) => {
  return (
    <StyledLink {...props}>
      <span>{props.children}</span>
    </StyledLink>
  );
};

export default Link;
