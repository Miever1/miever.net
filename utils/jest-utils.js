import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { themes, breakPoints, maxWidth, themeTransition, colors } from '../src/components/Layout/Theme';

export const renderWithTheme = (component) =>
  render(
    <ThemeProvider
      theme={{
        mode: themes[`light`],
        ...breakPoints,
        maxWidth,
        themeTransition,
        colors: { ...colors },
      }}
    >
      {component}
    </ThemeProvider>
  );
