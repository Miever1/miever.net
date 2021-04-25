import React from 'react';
import Theme from '../src/components/Layout/Theme';
import { GlobalStyle } from '../src/components/Layout/Layout';
import { ThemeProvider } from 'styled-components';
import { action } from '@storybook/addon-actions';

// Gatsby's Link overrides:
// Gatsby Link calls the `enqueue` & `hovering` methods on the global variable ___loader.
// This global object isn't set in storybook context, requiring you to override it to empty functions (no-op),
// so Gatsby Link doesn't throw any errors.
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
};
// This global variable is prevents the "__BASE_PATH__ is not defined" error inside Storybook.
global.__BASE_PATH__ = '/';
// Navigating through a gatsby app using gatsby-link or any other gatsby component will use the `___navigate` method.
// In Storybook it makes more sense to log an action than doing an actual navigate. Checkout the actions addon docs for more info: https://github.com/storybookjs/storybook/tree/master/addons/actions.
window.___navigate = (pathname) => {
  action('NavigateTo:')(pathname);
};

// Global decorator to apply the styles to all stories
export const decorators = [
  (Story) => (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },

  backgrounds: {
    default: 'white',
    values: [
      {
        name: 'twitter',
        value: '#00aced',
      },
      {
        name: 'facebook',
        value: '#3b5998',
      },

      {
        name: 'white',
        value: `#F4F4F4`,
        default: true,
      },
      {
        name: `black`,
        value: `#010101`,
      },
    ],
  },
};
