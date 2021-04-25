import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { Helmet } from 'react-helmet';
import '@fontsource/raleway';
import '@fontsource/raleway/600.css';

import { useMedia } from '../../hooks/useMedia';
import { useLocalStorageState } from '../../hooks/useLocalStorage';
import Navigation from '../Navigation';
import Footer from '../Footer';
import StyledLayout from './StyledLayout';
import {
  themes,
  breakPoints,
  maxWidth,
  themeTransition,
  colors,
  textShadows,
  fontSizes,
  lineHeights,
  borders,
  borderRadius,
  linearGradients,
} from './Theme';

export const GlobalStyle = createGlobalStyle`
   :root {
    /** COLOR */
    --color-text: ${colors.white};
    --color-background: ${colors.black};
    --color-primary: ${colors.primary};
    --color-secondary: ${colors.secondary};
    
    --color-lightGrey: ${colors.lightGrey};
    --color-darkGrey: ${colors.darkGrey};
    --color-grey-100: ${colors.grey100};
    --color-grey-200: ${colors.grey200};
    --color-grey-300: ${colors.grey300};
    --color-grey-400: ${colors.grey400};
    --color-grey-500: ${colors.grey500};
    --color-grey-600: ${colors.grey600};
    --color-grey-700: ${colors.grey700};
    --color-grey-800: ${colors.grey800};

    /** FONTSIZE */
    --font-size-xs: ${fontSizes.fontSizeXs};
    --font-size-sm: ${fontSizes.fontSizeSm};
    --font-size-base: ${fontSizes.fontSizeBase};
    --font-size-lg: ${fontSizes.fontSizeLg};
    --font-size-xl: ${fontSizes.fontSizeLg};
    --font-size-2xl: ${fontSizes.fontSize2Xl};
    --font-size-3xl: ${fontSizes.fontSize3Xl};
    --font-size-4xl: ${fontSizes.fontSize4Xl};
    --font-size-5xl: ${fontSizes.fontSize5Xl};
    --font-size-6xl: ${fontSizes.fontSize6Xl};
    --font-size-7xl: ${fontSizes.fontSize7Xl};
    --font-size-8xl: ${fontSizes.fontSize8Xl};
    
    --line-height-xs: ${lineHeights.lineHeightXs};
    --line-height-sm: ${lineHeights.lineHeightSm};
    --line-height-base: ${lineHeights.lineHeightBase};
    --line-height-lg: ${lineHeights.lineHeightLg};
    --line-height-xl: ${lineHeights.lineHeightXl};

    --border-0: ${borders.border0};
    --border-1: ${borders.border1};
    --border-2: ${borders.border2};
    --border-3: ${borders.border3};
    --border-4: ${borders.border4};
    
    --border: ${borders.border};

    --rounded-sm: ${borderRadius.roundedSm};
    --rounded-md: ${borderRadius.roundedMd};
    --rounded-lg: ${borderRadius.roundedLg};
    --rounded: ${borderRadius.rounded};


    --theme-transition: 1s ease-in-out;
    --text-shadow: ${textShadows.dark};
   
    --linear-gradient: ${linearGradients.dark};

    --margin-0: 0;
    --margin-1: 0.8rem;
    --margin-2: 1.6rem;
    --margin-3: 2.4rem;
    --margin-4: 3.2rem;
    --margin-5: 4.0rem;
    --margin-6: 4.8rem;
    
    --padding-0: 0;
    --padding-1: 0.8rem;
    --padding-2: 1.6rem;
    --padding-3: 2.4rem;
    --padding-4: 3.2rem;
    --padding-5: 4.0rem;

    //BREAKPOINTS 
    --br-x-small: ${breakPoints.xsmall};
    --br-small: ${breakPoints.small};
    --br-medium: ${breakPoints.medium};
    --br-large: ${breakPoints.large};
    --br-x-large: ${breakPoints.xlarge};


    --max-width: ${maxWidth};

  }
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  main,
  menu,
  nav,
  section,
  summary {
    display: block;
  }
  audio,
  canvas,
  progress,
  video {
    display: inline-block;
  }
  audio:not([controls]) {
    display: none;
    height: 0;
  }
  progress {
    vertical-align: baseline;
  }
  [hidden],
  template {
    display: none;
  }
  a {
    color: var(--color-text);
    background-color: transparent;
    text-decoration: none;
    -webkit-text-decoration-skip: objects;
  }
  a:active,
  a:hover {
    outline-width: 0;
  }
  abbr[title] {
    border-bottom: none;
    text-decoration: underline;
    text-decoration: underline dotted;
  }
  b,
  strong {
    font-weight: inherit;
    font-weight: 800;
  }
  dfn {
    font-style: italic;
  }
  
  mark {
    background-color: #ff0;
    color: #000;
  }
  small {
    font-size: 80%;
  }
  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  sub {
    bottom: -0.25em;
  }
  sup {
    top: -0.5em;
  }
  img {
    border-style: none;
  }
  svg:not(:root) {
    overflow: hidden;
  }
  code,
  kbd,
  pre,
  samp {
    font-family: monospace, monospace;
    font-size: 1em;
  }
  figure {
    margin: 1em 40px;
  }
  hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible;
  }
  button,
  input,
  optgroup,
  select,
  textarea {
    font: inherit;
    margin: 0;
  }
  optgroup {
    font-weight: 800;
  }
  button,
  input {
    overflow: visible;
  }
  button,
  select {
    text-transform: none;
  }
  [type="reset"],
  [type="submit"],
  button,
  html [type="button"] {
    -webkit-appearance: button;
  }
  [type="button"]::-moz-focus-inner,
  [type="reset"]::-moz-focus-inner,
  [type="submit"]::-moz-focus-inner,
  button::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }
  [type="button"]:-moz-focusring,
  [type="reset"]:-moz-focusring,
  [type="submit"]:-moz-focusring,
  button:-moz-focusring {
    outline: 1px dotted ButtonText;
  }
  fieldset {
    border: 1px solid silver;
    margin: 0 2px;
    padding: 0.35em 0.625em 0.75em;
  }
  legend {
    box-sizing: border-box;
    color: inherit;
    display: table;
    max-width: 100%;
    padding: 0;
    white-space: normal;
  }
  textarea {
    overflow: auto;
  }
  [type="checkbox"],
  [type="radio"] {
    box-sizing: border-box;
    padding: 0;
  }
  [type="number"]::-webkit-inner-spin-button,
  [type="number"]::-webkit-outer-spin-button {
    height: auto;
  }
  [type="search"] {
    -webkit-appearance: textfield;
    outline-offset: -2px;
  }
  [type="search"]::-webkit-search-cancel-button,
  [type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-input-placeholder {
    color: inherit;
    opacity: 0.54;
  }
  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
  }
  html {  
    font-family: "Raleway", sans-serif;
    font-size: 62.5%;
    box-sizing: border-box;
    overflow-y: scroll;
  }
  * {
    box-sizing: inherit;
  }
  *:before {
    box-sizing: inherit;
  }
  *:after {
    box-sizing: inherit;
  }
  body {
    color: var(--color-text);
    background-color:  var(--color-background);
    font-size: var(--font-size-base);
    font-family: "Raleway", sans-serif;
    font-weight: normal;
    word-wrap: break-word;
    font-kerning: normal;
    -moz-font-feature-settings: "kern", "liga", "clig", "calt";
    -ms-font-feature-settings: "kern", "liga", "clig", "calt";
    -webkit-font-feature-settings: "kern", "liga", "clig", "calt";
    font-feature-settings: "kern", "liga", "clig", "calt";
    margin: 0;
  }

  img {
    max-width: 100%;
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.45rem;
  }
  h1 {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.45rem;
    color: inherit;
    font-family: "Raleway", sans-serif;
    font-weight: 600;
    text-rendering: optimizeLegibility;
    font-size: 2.25rem;
    line-height: 1.1;
  }
  h2 {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.45rem;
    color: inherit;
    font-family: "Raleway", sans-serif;
    font-weight: 600;
    text-rendering: optimizeLegibility;
    font-size: 1.62671rem;
    line-height: 1.1;
  }
  h3 {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.45rem;
    color: inherit;
    font-family: "Raleway", sans-serif;
    font-weight: 600;
    text-rendering: optimizeLegibility;
    font-size: 1.38316rem;
    line-height: 1.1;
  }
  h4 {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.45rem;
    color: inherit;
    font-family: "Raleway", sans-serif;
    font-weight: 600;
    text-rendering: optimizeLegibility;
    font-size: 1rem;
    line-height: 1.1;
  }
  h5 {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.45rem;
    color: inherit;
    font-family: "Raleway", sans-serif;
    font-weight: 600;
    text-rendering: optimizeLegibility;
    font-size: 0.85028rem;
    line-height: 1.1;
  }
  h6 {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.45rem;
    color: inherit;
    font-family: "Raleway", sans-serif;
    font-weight: 600;
    text-rendering: optimizeLegibility;
    font-size: 0.78405rem;
    line-height: 1.1;
  }
  hgroup {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.45rem;
  }
  ul {
    margin-left: 1.45rem;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.45rem;
    list-style-position: outside;
    list-style-image: none;
  }
  ol {
    margin-left: 1.45rem;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.45rem;
    list-style-position: outside;
    list-style-image: none;
  }
  dl {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.45rem;
  }
  dd {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.45rem;
  }
  p {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.45rem;
  }
  figure {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.45rem;
  }
  pre {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.45rem;
    font-size: 0.85rem;
    line-height: 1.42;
    background: hsla(0, 0%, 0%, 0.04);
    border-radius: 3px;
    overflow: auto;
    word-wrap: normal;
    padding: 1.45rem;
  }
  table {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.45rem;
    font-size: 1rem;
    line-height: 1.45rem;
    border-collapse: collapse;
    width: 100%;
  }
  fieldset {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.45rem;
  }
  blockquote {
    margin-left: 1.45rem;
    margin-right: 1.45rem;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.45rem;
  }
  form {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.45rem;
  }
  noscript {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.45rem;
  }
  iframe {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.45rem;
  }
  hr {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: calc(1.45rem - 1px);
    background: hsla(0, 0%, 0%, 0.2);
    border: none;
    height: 1px;
  }
  address {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.45rem;
  }
  b {
    font-weight: 600;
  }
  strong {
    font-weight: 600;
  }
  dt {
    font-weight: 600;
  }
  th {
    font-weight: 600;
  }
  li {
    margin-bottom: calc(1.45rem / 2);
  }
  ol li {
    padding-left: 0;
  }
  ul li {
    padding-left: 0;
  }
  li > ol {
    margin-left: 1.45rem;
    margin-bottom: calc(1.45rem / 2);
    margin-top: calc(1.45rem / 2);
  }
  li > ul {
    margin-left: 1.45rem;
    margin-bottom: calc(1.45rem / 2);
    margin-top: calc(1.45rem / 2);
  }
  blockquote *:last-child {
    margin-bottom: 0;
  }
  li *:last-child {
    margin-bottom: 0;
  }
  p *:last-child {
    margin-bottom: 0;
  }
  li > p {
    margin-bottom: calc(1.45rem / 2);
  }
  code {
    font-size: 0.85rem;
    line-height: 1.45rem;
  }
  kbd {
    font-size: 0.85rem;
    line-height: 1.45rem;
  }
  samp {
    font-size: 0.85rem;
    line-height: 1.45rem;
  }
  abbr {
    border-bottom: 1px dotted hsla(0, 0%, 0%, 0.5);
    cursor: help;
  }
  acronym {
    border-bottom: 1px dotted hsla(0, 0%, 0%, 0.5);
    cursor: help;
  }
  abbr[title] {
    border-bottom: 1px dotted hsla(0, 0%, 0%, 0.5);
    cursor: help;
    text-decoration: none;
  }
  thead {
    text-align: left;
  }
  td,
  th {
    text-align: left;
    border-bottom: 1px solid hsla(0, 0%, 0%, 0.12);
    font-feature-settings: "tnum";
    -moz-font-feature-settings: "tnum";
    -ms-font-feature-settings: "tnum";
    -webkit-font-feature-settings: "tnum";
    padding-left: 0.96667rem;
    padding-right: 0.96667rem;
    padding-top: 0.725rem;
    padding-bottom: calc(0.725rem - 1px);
  }
  th:first-child,
  td:first-child {
    padding-left: 0;
  }
  th:last-child,
  td:last-child {
    padding-right: 0;
  }
  tt,
  code {
    background-color: hsla(0, 0%, 0%, 0.04);
    border-radius: 3px;
    font-family: "SFMono-Regular", Consolas, "Roboto Mono", "Droid Sans Mono",
      "Liberation Mono", Menlo, Courier, monospace;
    padding: 0;
    padding-top: 0.2em;
    padding-bottom: 0.2em;
  }
  pre code {
    background: none;
    line-height: 1.42;
  }
  code:before,
  code:after,
  tt:before,
  tt:after {
    letter-spacing: -0.2em;
    content: " ";
  }
  pre code:before,
  pre code:after,
  pre tt:before,
  pre tt:after {
    content: "";
  }
  ::selection { background: ${(props) => props.theme.colors.primary}; }
  code[class*='language-'],
  pre[class*='language-'] {
    font-size: 1.4rem;
    color: #d6deeb;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
  
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
  
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }
  
  pre[class*='language-']::-moz-selection,
  pre[class*='language-'] ::-moz-selection,
  code[class*='language-']::-moz-selection,
  code[class*='language-'] ::-moz-selection {
    text-shadow: none;
    background: #011627;
  }
  
  pre[class*='language-']::selection,
  pre[class*='language-'] ::selection,
  code[class*='language-']::selection,
  code[class*='language-'] ::selection {
    text-shadow: none;
    background: #011627;
  }
  
  @media print {
    code[class*='language-'],
    pre[class*='language-'] {
      text-shadow: none;
    }
  }
  
  /* Code blocks */
  pre {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
  }
  
  :not(pre) > code,
  pre {
    background: #011627;
  }
  
  :not(pre) > code {
    padding: 0.1em;
    border-radius: 0.3em;
    white-space: normal;
  }
  
  .token.comment,
  .token.prolog,
  .token.cdata {
    color: rgb(99, 119, 119);
    font-style: italic;
  }
  
  .token.punctuation {
    color: rgb(199, 146, 234);
  }
  
  .namespace {
    color: rgb(178, 204, 214);
  }
  
  .token.deleted {
    color: rgba(239, 83, 80, 0.56);
    font-style: italic;
  }
  
  .token.symbol,
  .token.property {
    color: rgb(128, 203, 196);
  }
  
  .token.tag,
  .token.operator,
  .token.keyword {
    color: rgb(127, 219, 202);
  }
  
  .token.boolean {
    color: rgb(255, 88, 116);
  }
  
  .token.number {
    color: rgb(247, 140, 108);
  }
  
  .token.constant,
  .token.function,
  .token.builtin,
  .token.char {
    color: rgb(130, 170, 255);
  }
  
  .token.selector,
  .token.doctype {
    color: rgb(199, 146, 234);
    font-style: italic;
  }
  
  .token.attr-name,
  .token.inserted {
    color: rgb(173, 219, 103);
    font-style: italic;
  }
  
  .token.string,
  .token.url,
  .token.entity,
  .language-css .token.string,
  .style .token.string {
    color: rgb(173, 219, 103);
  }
  
  .token.class-name,
  .token.atrule,
  .token.attr-value {
    color: rgb(255, 203, 139);
  }
  
  .token.regex,
  .token.important,
  .token.variable {
    color: rgb(214, 222, 235);
  }
  
  .token.important,
  .token.bold {
    font-weight: bold;
  }
  
  .token.italic {
    font-style: italic;
  }
  
  .gatsby-highlight-code-line {
    background-color: hsla(207, 95%, 15%, 1);
    display: block;
    margin-right: -1.3125rem;
    margin-left: -1.3125rem;
    padding-right: 1em;
    padding-left: 0.75em;
    border-left: 0.25em solid #50E3C2;
  }
  
  .gatsby-highlight {
    margin-bottom: 1.75rem;
    margin-left: -1.3125rem;
    margin-right: -1.3125rem;
    border-radius: 10px;
    background: #011627;
    -webkit-overflow-scrolling: touch;
    overflow: auto;
  }
  
  @media (max-width: 672px) {
    .gatsby-highlight {
      border-radius: 0;
    }
  }
  
  .gatsby-highlight pre[class*='language-'] {
    float: left;
    min-width: 100%;
  }

  [aria-current] {
    color: ${colors.primary} !important;
  }
  * {
  box-sizing: border-box;
}

  `;

const getInitialTheme = (preferedTheme) => {
  const savedTheme = JSON.parse(localStorage.getItem(`theme`));
  return savedTheme ? savedTheme : preferedTheme;
};

const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development';

const Layout = ({ children, location }) => {
  const prefersDarkMode = usePrefersDarkMode();
  let defaultThemeMode = `dark`;
  if (typeof window !== `undefined`) {
    defaultThemeMode = getInitialTheme(prefersDarkMode ? `dark` : `light`);
  }

  const [themeMode, setThemeMode] = useLocalStorageState('theme', defaultThemeMode);

  const changeTheme = () => {
    if (themeMode === 'light') {
      setThemeMode('dark');
      updateCSSProperties('dark');
    } else {
      setThemeMode('light');
      updateCSSProperties('light');
    }
  };

  React.useEffect(() => {
    const root = window.document.documentElement;
    const initialTheme = root.style.getPropertyValue('--initial-color-mode');
    updateCSSProperties(initialTheme);
  }, []);

  const updateCSSProperties = (themeMode) => {
    const root = window.document.documentElement;
    // 3. Update each color
    root.style.setProperty('--color-text', themeMode === 'light' ? colors.black : colors.white);
    root.style.setProperty('--color-background', themeMode === 'light' ? colors.white : colors.black);
    root.style.setProperty('--color-primary', themeMode === 'light' ? colors.primary : colors.primary);
    root.style.setProperty('--text-shadow', themeMode === 'light' ? textShadows.dark : textShadows.white);
    root.style.setProperty('--color-primary', themeMode === 'light' ? colors.primary : colors.primary);
    root.style.setProperty('--linear-gradient', themeMode === 'light' ? linearGradients.light : linearGradients.dark);
  };

  return (
    <ThemeProvider
      theme={{
        mode: themes[themeMode],
        ...breakPoints,
        maxWidth,
        themeTransition,
        colors: { ...colors },
      }}
    >
      <Helmet>
        {activeEnv !== 'development' ? (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon='{"token": "27f1e6ab8f5743bd8e1e770722db344b"}'
          ></script>
        ) : null}
      </Helmet>
      <StyledLayout>
        <Navigation location={location} changeTheme={changeTheme} />
        {children}
        <Footer />
      </StyledLayout>
      <GlobalStyle />
    </ThemeProvider>
  );
};

const usePrefersDarkMode = () => {
  return useMedia([`(prefers-color-scheme: dark)`], [true], true);
};

export default Layout;
