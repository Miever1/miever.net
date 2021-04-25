export const sizes = {
  smallPhone: 380,
  phone: 576,
  tablet: 768,
  desktop: 1024,
  giant: 1200,
};

export const maxWidth = `1024px`;

export const breakPoints = {
  xsmall: `@media (min-width: ${sizes.smallPhone}px)`,
  small: `@media (min-width: ${sizes.phone}px)`,
  medium: `@media (min-width: ${sizes.tablet}px)`,
  large: `@media (min-width: ${sizes.desktop}px)`,
  xlarge: `@media (min-width: ${sizes.giant}px)`,
};

export const themeTransition = `1s ease-in-out`;

export const colors = {
  white: `#F4F4F4`,
  black: `#010101`,
  primary: `#50E3C2`,
  secondary: `#4A90E2`,
  darkGrey: `#201c29`,
  lightGrey: `#535B68`,
  grey100: `#F3F4F6`,
  grey200: `#E5E7EB`,
  grey300: `#D1D5DB`,
  grey400: `#9CA3AF`,
  grey500: `#6B7280`,
  grey600: `#4B5563`,
  grey700: `#374151`,
  grey800: `#1F2937`,
  red500: `#EF4444`,
  red600: `#DC2626`,
};

export const textShadows = {
  light: `2px 2px 0 rgba(0,0, 0,0.3)`,
  dark: `2px 2px 0 rgba(255,255, 255,0.3)`,
};

export const borders = {
  border0: `0`,
  border1: `0.2rem`,
  border2: `0.4rem`,
  border8: `0.8rem`,
  border: `0.1rem`,
};

export const paddings = {
  padding0: `0`,
  padding1: `0.25rem`,
  padding2: `0.5rem`,
  padding3: `0.75rem`,
  padding4: `1rem`,
  padding5: `1.25rem`,
  padding6: `1.5rem`,
  padding7: `1.75rem`,
  padding8: `2rem`,
};

export const fontSizes = {
  fontSizeXs: `1.2rem`,
  fontSizeSm: `1.4rem`,
  fontSizeBase: `1.5rem`,
  fontSizeLg: `1.8rem`,
  fontSizeXl: `2rem`,
  fontSize2Xl: `2.4rem`,
  fontSize3Xl: `3rem`,
  fontSize4Xl: `3.6rem`,
  fontSize5Xl: `4.8rem`,
  fontSize6Xl: `6rem`,
  fontSize7Xl: `7.2rem`,
  fontSize8Xl: `9.6rem`,
};

export const lineHeights = {
  lineHeightXs: `1.6rem`,
  lineHeightSm: `2.0rem`,
  lineHeightBase: `1.6rem`,
  lineHeightLg: `1.8rem`,
  lineHeightXl: `2rem`,
};

export const fontWeights = {
  fontThin: `100`,
  fontNormal: `400`,
  fontBold: `700`,
};

export const borderRadius = {
  roundedSm: `0.1rem`,
  rounded: `0.2rem`,
  roundedMd: `0.5rem`,
  roundedLg: `1rem`,
  borderRound: `9999px`,
};

export const linearGradients = {
  dark: `linear-gradient(rgba(1, 1, 1, 0.95), rgba(1, 1, 1, 0.95))`,
  light: `linear-gradient(rgba(244, 244, 244, 0.95), rgba(244, 244, 244, 0.95))`,
};

export const themes = {
  dark: `dark`,
  light: `light`,
};

const Theme = {
  mode: themes[`light`],
  ...breakPoints,
  maxWidth,
  themeTransition,
  colors: { ...colors },
};

export default Theme;
