import { StatelessComponent, ComponentClass } from 'react';
import { View } from 'react-native';
type Component<P> = ComponentClass<P> | StatelessComponent<P>;
export interface LinearGradientProps extends View {}

export function Lineargradient(
  props: LinearGradientProps,
): ComponentClass<LinearGradientProps>;
// declare module 'react-native-linear-gradient' {

// }
export default Lineargradient;
