import React from 'react';

import { StyledSocial } from './StyledSocial';

import { FaTwitter, FaFacebook, FaBehance, FaGithub } from 'react-icons/fa';

const Social = () => {
  return (
    <StyledSocial>
      <a href="https://twitter.com/JCofman" aria-label="Twitter">
        <FaTwitter size={24} />
      </a>
      <a href="https://www.facebook.com/jac.cof" aria-label="Facebook">
        <FaFacebook size={24} />
      </a>
      <a href="https://www.behance.net/jacobcofman" aria-label="Behance">
        <FaBehance size={24} />
      </a>
      <a href="https://github.com/JCofman" aria-label="Github">
        <FaGithub size={24} />
      </a>
    </StyledSocial>
  );
};

export default Social;
