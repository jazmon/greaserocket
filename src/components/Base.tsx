import React, { ReactChildren } from 'react';
import { StatusBar, ViewStyle } from 'react-native';
import styled, { withTheme } from 'styled-components/native';
import { getStatusBarTextColor, ThemeType } from 'constants/theme';
import { Maybe } from 'types';

interface Props {
  style?: ViewStyle;
  children?: Maybe<ReactChildren>;
  theme: any;
}

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: any }) => theme.colors.white};
`;

const Base = ({ children, style, theme }: Props) =>
  <Container style={style}>
    <StatusBar
      backgroundColor={theme.colors.primary.dark}
      barStyle={getStatusBarTextColor(theme.colors.primary.dark)}
    />
    {children}
  </Container>;

export default withTheme(Base);
