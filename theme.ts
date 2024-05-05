import { CSSVariablesResolver, createTheme } from "@mantine/core";

export const theme = createTheme({
  other: {
    colors: {
      purple: ['#F2ECFA', '#E5D5FA', '#D1B4F8', '#BD93F7', '#9854F6', '#541F9D' ],
    }
  }
});

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    '--mantine-color-purple-0': theme.other.colors.purple[0],
    '--mantine-color-purple-1': theme.other.colors.purple[1],
    '--mantine-color-purple-2': theme.other.colors.purple[2],
    '--mantine-color-purple-3': theme.other.colors.purple[3],
    '--mantine-color-purple-4': theme.other.colors.purple[4],
    '--mantine-color-purple-5': theme.other.colors.purple[5],
    '--mantine-primary-color-filled': theme.other.colors.purple[4],
    '--mantine-primary-color-filled-hover': theme.other.colors.purple[3],
  },
  light: {},
  dark: {},
});
