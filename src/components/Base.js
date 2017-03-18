// @flow
import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import theme from '../constants/theme';

type Props = {
  style?: Style,
  children?: ?Children,
};

const Base = ({ children, style }: Props): ElementType => (
  <View style={[styles.container, style]}>
    <StatusBar
      backgroundColor={theme.DARK_PRIMARY_COLOR}
      barStyle={theme.LIGHT_STATUS_BAR ? 'light-content' : 'dark-content'}
    />
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.WHITE,
  },
});

export default Base;
