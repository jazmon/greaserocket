import { StatelessComponent, ComponentClass } from 'react';
import { Image } from 'react-native';
type Component<P> = ComponentClass<P> | StatelessComponent<P>;

// declare module 'react-native-image-progress' {

// }

export function createImageProgress<P>(
  ImageComponent: Component<P>,
): ComponentClass<P>;

export default createImageProgress(Image);
