// @flow
import React from 'react';
import type { Children } from 'react';
import { StatusBar } from 'react-native';
import styled, { withTheme } from 'styled-components/native';
import { getStatusBarTextColor } from 'constants/theme';

import type { ThemeType } from 'constants/theme';

type Props = {
  style?: Style,
  children?: ?Children,
  theme: ThemeType,
};

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.white};
`;

const Base = ({ children, style, theme }: Props): ElementType => (
  <Container style={style}>
    <StatusBar
      backgroundColor={theme.colors.primary.dark}
      barStyle={getStatusBarTextColor(theme.colors.primary.dark)}
    />
    {children}
  </Container>
);

export default withTheme(Base);
