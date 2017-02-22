// @flow
import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { DARK_PRIMARY_COLOR, LIGHT_STATUS_BAR } from '../constants/theme';

type Props = {
  style: Style,
};

const Base = ({ children, style }: Props): ElementType => (
  <View style={[styles.container, style]}>
    <StatusBar
      backgroundColor={DARK_PRIMARY_COLOR}
      barStyle={LIGHT_STATUS_BAR ? 'light-content' : 'dark-content'}
    />
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Base;
