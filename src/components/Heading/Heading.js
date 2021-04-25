import React from 'react';
import PropTypes from 'prop-types';
import {
  StyledHeadingH1,
  StyledHeadingH2,
  StyledHeadingH3,
  StyledHeadingH4,
  StyledHeadingH5,
  StyledHeadingH6,
} from './StyledHeading';

export const APPEARANCES = {
  H1: `H1`,
  H2: `H2`,
  H3: `H3`,
  H4: `H4`,
  H5: `H5`,
  H6: `H6`,
};

export const BACKGROUND_STYLES = {
  PARALLELOGRAM: 'PARALLELOGRAM',
  TRIANGLE: 'TRIANGLE',
  CIRCLE: 'CIRCLE',
};

const Heading = ({ appearance, children, backgroundStyle = 'TRIANGLE', ...rest }) => {
  const { ...headingProps } = rest;
  switch (appearance) {
    case `H1`:
      return (
        <StyledHeadingH1 backgroundStyle={backgroundStyle} {...headingProps}>
          {children}
        </StyledHeadingH1>
      );
    case `H2`:
      return (
        <StyledHeadingH2 backgroundStyle={backgroundStyle} {...headingProps}>
          {children}
        </StyledHeadingH2>
      );
    case `H3`:
      return (
        <StyledHeadingH3 backgroundStyle={backgroundStyle} {...headingProps}>
          {children}
        </StyledHeadingH3>
      );
    case `H4`:
      return (
        <StyledHeadingH4 backgroundStyle={backgroundStyle} {...headingProps}>
          {children}
        </StyledHeadingH4>
      );
    case `H5`:
      return (
        <StyledHeadingH5 backgroundStyle {...headingProps}>
          {children}
        </StyledHeadingH5>
      );
    case `H6`:
      return (
        <StyledHeadingH6 backgroundStyle {...headingProps}>
          {children}
        </StyledHeadingH6>
      );
    default:
      return null;
  }
};

Heading.displayName = `Heading`;

Heading.propTypes = {
  /** any nodes to be rendered (usually text nodes) */
  children: PropTypes.any,

  /** typography of the heading */
  appearance: PropTypes.oneOf(Object.keys(APPEARANCES)),
};

Heading.defaultProps = {
  appearance: APPEARANCES.H1,
};

export default Heading;
