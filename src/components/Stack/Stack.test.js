import React from 'react';
import { render } from '@testing-library/react';

import Stack from './Stack';

test(`Stack is rendered properly`, () => {
  const { getByText } = render(
    <Stack>
      <div>Home</div>
      <div>About</div>
    </Stack>
  );

  getByText(/Home/i);
  getByText(/About/i);
});
