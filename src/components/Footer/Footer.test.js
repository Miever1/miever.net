import React from 'react';
import { render } from '@testing-library/react';

import Footer from './Footer';

test(`Footer is rendered properly`, async () => {
  const { getByText } = render(<Footer />);

  getByText(/Home/i);
  getByText(/About/i);
});
