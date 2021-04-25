import React from 'react';

import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledG = styled.g`
  fill: var(--color-text);
`;

const StyledDivider = styled.svg`
  display: block;
  width: 55px;
  height: 12px;
  margin: 0 auto;
`;

const Divider = (props) => (
  <StyledDivider>
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" {...props}>
      <StyledG transform="translate(-483.000000, -1059.000000)">
        <g transform="translate(182.000000, 936.000000)">
          <g transform="translate(301.000000, 123.000000)">
            <rect fillOpacity="0.3" x="0" y="0" width="35" height="12" />
            <rect fillOpacity="0.1" x="20" y="0" width="35" height="12" />
          </g>
        </g>
      </StyledG>
    </g>
  </StyledDivider>
);

PropTypes.displayName = `Divider`;

export default Divider;
