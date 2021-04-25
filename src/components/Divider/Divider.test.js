import React from 'react';
import { render } from '@testing-library/react';

import Divider from './Divider';

test(`Divider is rendered properly`, () => {
  const { container } = render(<Divider />);
  expect(container).toMatchSnapshot();
});
