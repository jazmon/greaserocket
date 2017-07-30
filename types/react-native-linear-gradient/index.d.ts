// Type definitions for react-native-linear-gradient 2.0.0
// Project: React Native Linear Gradient
// Definitions by: Atte Huhtakangas https://twitter.com/attehuhtakangas
// TypeScript Version: 2.3

import * as React from 'react';
import * as ReactNative from 'react-native';

export type Component<P> =
  | React.ComponentClass<P>
  | React.StatelessComponent<P>;
export interface LinearGradientProps extends ReactNative.View {}

export function Lineargradient(
  props: LinearGradientProps,
): React.ComponentClass<LinearGradientProps>;
// declare module 'react-native-linear-gradient' {

// }
export default Lineargradient;
