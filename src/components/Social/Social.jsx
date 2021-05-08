import React from 'react';

import { StyledSocial } from './StyledSocial';

import { FaGithub } from 'react-icons/fa';

const Social = () => {
  return (
    <StyledSocial>
      <a href="https://github.com/Miever1" aria-label="Github">
        <FaGithub size={24} />
      </a>
    </StyledSocial>
  );
};

export default Social;
