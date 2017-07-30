// Type definitions for react-native-image-progress 1.0.1
// Project: React Native Image Progress
// Definitions by: Atte Huhtakangas https://twitter.com/attehuhtakangas

// import { StatelessComponent, ComponentClass } from 'react';
// import { Image } from 'react-native';
/// <reference types="react" />
/// <reference types="react-native" />

type Component<P> = React.ComponentClass<P> | React.StatelessComponent<P>;
export interface someType {
  name: string;
  length: number;
  extras?: string[];
}

export function createImageProgress<P>(
  ImageComponent: Component<P>,
): React.ComponentClass<P>;

// export default createImageProgress(Image);

// declare module 'react-native-image-progress' {
//   function createImageProgress<P>(
//     ImageComponent: Component<P>,
//   ): ComponentClass<P>;

//   export default createImageProgress(Image);
// }
