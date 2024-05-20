import { CSSVariablesResolver, createTheme, rem } from "@mantine/core";

export const theme = createTheme({
  other: {
    colors: {
      purple: ['#f2ebf9', '#E5D5FA', '#D1B4F8', '#BD93F7', '#9854F6', '#541F9D' ],
      black: '#000',
      grey: ['#f5f5f6', '#eaebed', '#d5d6dc', '#acadb9', '#7b7c88'],
      white: '#fff',
      yellow: '#fab005'
    },
    fontWeight: {
      sm: 400,
      md: 500,
      lg: 600,
      xl: 700,
    }
  },
  fontSizes: {
    sm: rem(14),
    md: rem(16),
    lg: rem(20),
    xl: rem(32),
  },
  lineHeights: {
    xs: '1',
    sm: '1.25',
    md: '1.4',
    lg: '1.43'
  },
  radius: {
    xs: '4px',
    sm: '8px',
    md: '9px',
    lg: '12px',
  },
  defaultRadius: 'sm',
  fontFamily: 'Inter, sans-serif'
});

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    '--color-purple-0': theme.other.colors.purple[0],
    '--color-purple-1': theme.other.colors.purple[1],
    '--color-purple-2': theme.other.colors.purple[2],
    '--color-purple-3': theme.other.colors.purple[3],
    '--color-purple-4': theme.other.colors.purple[4],
    '--color-purple-5': theme.other.colors.purple[5],
    '--color-grey-0': theme.other.colors.grey[0],
    '--color-grey-1': theme.other.colors.grey[1],
    '--color-grey-2': theme.other.colors.grey[2],
    '--color-grey-3': theme.other.colors.grey[3],
    '--color-grey-4': theme.other.colors.grey[4],
    '--color-black': theme.other.colors.black,
    '--color-white': theme.other.colors.white,
    '--color-yellow': theme.other.colors.yellow,

    '--font-weight-sm': theme.other.fontWeight.sm,
    '--font-weight-md': theme.other.fontWeight.md,
    '--font-weight-lg': theme.other.fontWeight.lg,
    '--font-weight-xl': theme.other.fontWeight.xl,

    '--mantine-primary-color-filled': theme.other.colors.purple[4],
    '--mantine-primary-color-filled-hover': theme.other.colors.purple[3],
    '--pagination-control-radius': theme.radius.xs,
  },
  light: {},
  dark: {},
});
