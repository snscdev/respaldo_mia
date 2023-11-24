import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export type ColorSchema = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    neutral: string;
    purpel: {
      lighter: string;
      light: string;
      main: string;
      dark: string;
      darker: string;
      contrastText: string;
    };
  }
  interface SimplePaletteColorOptions {
    lighter: string;
    darker: string;
  }
  interface PaletteColor {
    lighter: string;
    darker: string;
  }
}

// SETUP COLORS

const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
};

const PRIMARY = {
  lighter: '#ffe75a',
  light: '#ffd433',
  main: '#FF9E2D',
  dark: '#FF9E2D',
  darker: '#996000',
  contrastText: '#FFFFFF',
};

export const PURPLE = {
  lighter: '#d884ff',
  light: '#bf49ff',
  main: '#A300DC',
  dark: '#7300a6',
  darker: '#520078',
  contrastText: '#FFFFFF',
};

const SECONDARY = {
  lighter: '#ff6ba3',
  light: '#ff1f5a',
  main: '#DC0073',
  dark: '#a5004e',
  darker: '#750034',
  contrastText: '#FFFFFF',
};

const INFO = {
  lighter: '#85c2ff',
  light: '#4fa2ff',
  main: '#2D9AFF',
  dark: '#006dd2',
  darker: '#004d9a',
  contrastText: '#FFFFFF',
};

const SUCCESS = {
  lighter: '#69d0a2',
  light: '#37c083',
  main: '#06b164',
  dark: '#048d50',
  darker: '#036a3c',
  contrastText: '#ffffff',
};

const WARNING = {
  lighter: '#d09569',
  light: '#c07237  ',
  main: '#b14f06',
  dark: '#8d3f04',
  darker: '#6a2f03',
  contrastText: GREY[800],
};

const ERROR = {
  lighter: '#d06969  ',
  light: '#c03737',
  main: '#b10606',
  dark: '#8d0404  ',
  darker: '#6a0303',
  contrastText: '#FFFFFF',
};

const COMMON = {
  common: {
    black: '#000000',
    white: '#FFFFFF',
  },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: alpha(GREY[500], 0.2),
  action: {
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export function palette(mode: 'light' | 'dark') {
  const light = {
    ...COMMON,
    mode: 'light',
    text: {
      primary: GREY[800],
      secondary: GREY[600],
      disabled: GREY[500],
    },
    background: {
      paper: '#FFFFFF',
      default: '#FFFFFF',
      neutral: GREY[200],
      purpel: PURPLE,
    },
    action: {
      ...COMMON.action,
      active: GREY[600],
    },
  };

  const dark = {
    ...COMMON,
    mode: 'dark',
    text: {
      primary: '#FFFFFF',
      secondary: GREY[500],
      disabled: GREY[600],
    },
    background: {
      paper: GREY[800],
      default: GREY[900],
      neutral: alpha(GREY[500], 0.12),
    },
    action: {
      ...COMMON.action,
      active: GREY[500],
    },
  };

  return mode === 'light' ? light : dark;
}
