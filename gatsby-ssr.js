import React from 'react';
import Transition from './src/components/Transition';
import { colors } from './src/components/Layout/Theme';
const MagicScriptTag = () => {
  let codeToRunOnClient = `
(function() {
  function getInitialColorMode() {
    const persistedColorPreference = JSON.parse(window.localStorage.getItem('theme'));
    const hasPersistedPreference = typeof persistedColorPreference === 'string';
  // If the user has explicitly chosen light or dark,
  // let's use it. Otherwise, this value will be null.
  if (hasPersistedPreference) {
    return persistedColorPreference;
  }
  // If they haven't been explicit, let's check the media
  // query
  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  const hasMediaQueryPreference = typeof mql.matches === 'boolean';
  if (hasMediaQueryPreference) {
    return mql.matches ? 'dark' : 'light';
  }
  // If they are using a browser/OS that doesn't support
  // color themes, let's default to 'light'.
  return 'light';
  }
  const colorMode = getInitialColorMode();
  const root = document.documentElement;
  root.style.setProperty(
    '--color-text',
    colorMode === 'light'
      ? '${colors.black}'
      : '${colors.white}'
  );
  root.style.setProperty(
    '--color-background',
    colorMode === 'light'
      ? '${colors.white}'
      : '${colors.black}'
  );
  root.style.setProperty(
    '--color-primary',
    colorMode === 'light'
      ? '${colors.primary}'
      : '${colors.primary}'
  );
  root.style.setProperty('--initial-color-mode', colorMode);
})()`;
  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />;
};

export const wrapPageElement = ({ element, props }) => {
  return <Transition {...props}>{element}</Transition>;
};

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(<MagicScriptTag />);
};
