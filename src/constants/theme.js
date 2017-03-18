// @flow
import color from 'color';

const theme = {
  DARK_PRIMARY_COLOR: '#388E3C',
  DEFAULT_PRIMARY_COLOR: '#4CAF50',
  LIGHT_PRIMARY_COLOR: '#C8E6C9',
  TEXT_PRIMARY_COLOR: '#FFFFFF',
  ACCENT_COLOR: '#FFC107',
  PRIMARY_TEXT_COLOR: 'rgba(0, 0, 0, 0.87)',
  SECONDAY_TEXT_COLOR: 'rgba(0, 0, 0, 0.54)',
  DIVIDER_COLOR: 'rgba(0, 0, 0, 0.12)',
  DISABLED_TEXT_COLOR: 'rgba(0, 0, 0, 0.38)',
  WHITE: '#FFF',
  BLACK: '#000',
};

export default {
  ...theme,
  LIGHT_STATUS_BAR: color(theme.DARK_PRIMARY_COLOR).dark(),
};
