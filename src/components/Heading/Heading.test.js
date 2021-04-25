import React from 'react';

import { renderWithTheme } from '../../../utils/jest-utils';
import Heading, { APPEARANCES } from './Heading';

Object.keys(APPEARANCES).forEach(appearance => {
  test(`should render a ${appearance} header tags`, () => {
    const { container } = renderWithTheme(<Heading appearance={appearance}>I am a {appearance} headline</Heading>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
