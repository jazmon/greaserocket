// Type definitions for redux-loop 2.2.2
// Project: Redux Loop
// Definitions by: Atte Huhtakangas https://twitter.com/attehuhtakangas
// import { StatelessComponent, ComponentClass } from 'react';
// import { View } from 'react-native';
// import * as Redux from 'redux';

declare module 'redux-loop' {
  export function combineReducers(
    reducers: any,
    state?: any,
    get?: any,
    set?: any,
  ): any;
  export function install(): any;
}
