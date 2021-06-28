import React from 'react';

import { StyledSocial } from './StyledSocial';

import { AiFillGithub, AiFillZhihuCircle } from 'react-icons/ai';

const Social = () => {
  return (
    <StyledSocial>
      <a href="https://github.com/Miever1" aria-label="Github">
        <AiFillGithub size={24} />
      </a>
      <a href="https://www.zhihu.com/people/miever" aria-label="知乎">
        <AiFillZhihuCircle size={24} />
      </a>
    </StyledSocial>
  );
};

export default Social;
