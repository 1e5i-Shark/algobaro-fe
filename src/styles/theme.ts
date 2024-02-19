const size = {
  XS: '0.5rem',
  S: '1rem',
  M: '1.5rem',
  L: '2rem',
  XL: '2.5rem',
  XXL: '3rem',
  full: '100%',
  half: '50%',
  none: '0%',
  icon: {
    XS: '2.6rem',
    S: '3.6rem',
    M: '4.6rem',
    L: '5.6rem',
    XL: '6.6rem',
  },
};

const shape = {
  circle: '50%',
  round: '5px',
  square: '0px',
};

const device = {
  laptop: `(max-width: 1024px)`,
};

const fontWeight = {
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
  black: 900,
};

const commonTheme = {
  black_primary: '#262626',
  white_primary: '#FAFAFA',
  primary_color: '#A5F1F6',
  secondary_color: '#CFBEFF',
  gray_50: '#909090',
  gray_30: '#B3B3B3',
  gray_20: '#E3E3E3',
  gray_10: '#EFEFEF',
  red: '#FF7C60',
  green: '#72EC5E',
};

export const lightTheme = {
  mode: 'light',
  color: {
    background_primary: '#FFFFFF',
    background_second: '#E9E9E9',
    background_modal: '#ffffff',
    text_primary_color: '#2C2C2C',
    text_secondary_color: '#F0F0F0',
    transparent_10: '#B3B3B310',
    transparent_30: '#B3B3B330',
    transparent_50: '#B3B3B350',
    transparent_90: '#B3B3B390',
    ...commonTheme,
  },
  size,
  shape,
  fontWeight,
  device,
};

export const darkTheme = {
  mode: 'dark',
  color: {
    background_primary: '#1E1B1A',
    background_second: '#131010',
    background_modal: '#1e1e1e',
    text_primary_color: '#F0F0F0',
    text_secondary_color: '#2C2C2C',
    transparent_10: '#FEFEFE10',
    transparent_30: '#FEFEFE30',
    transparent_50: '#FEFEFE50',
    transparent_90: '#FEFEFE90',
    ...commonTheme,
  },
  size,
  shape,
  fontWeight,
  device,
};

export const theme = {
  lightTheme,
  darkTheme,
};

export type ThemeType = typeof lightTheme;
