// @flow
import color from 'color';

const theme = {
  colors: {
    primary: {
      normal: '#4CAF50',
      dark: '#388E3C',
      light: '#C8E6C9',
    },
    accent: {
      normal: '#FFC107',
    },
    white: '#FFFFFF',
    black: '#000000',
    transparent: 'transparent',
  },
  text: {
    colors: {
      light: '#FFFFFF',
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      divider: 'rgba(0, 0, 0, 0.12)',
    },
    size: 12,
  },
};

export type ThemeType = typeof theme;

export function getStatusBarTextColor(
  backgroundColor: string = 'light-content',
): 'light-content' | 'dark-content' {
  return color(backgroundColor).dark() ? 'light-content' : 'dark-content';
}

export default theme;
