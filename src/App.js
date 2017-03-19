// @flow
import React from 'react';
import { AppRegistry, Platform } from 'react-native';

import { Provider } from 'react-redux';
import { TabNavigator } from 'react-navigation';

import type { Store } from 'redux';
import type { ReduxState } from './redux/modules';
import type { Action } from '../types';

import configureStore from './store/configureStore';

import config from './constants/config';
import Feed from './screens/Feed';
import Profile from './screens/Profile';
import MapScreen from './screens/Map';

const App = TabNavigator(
  {
    Profile: {
      screen: Profile,
      path: 'profile/:name',
    },
    Feed: {
      screen: Feed,
      path: 'feed',
    },
    Map: {
      screen: MapScreen,
      path: 'map',
    },
  },
  {
    animationEnabled: true,
    swipeEnabled: true,
    lazyLoad: true,
    screenProps: {
      foo: 'bar',
    },
    initialTab: 'Feed',
    tabBarOptions: {
      activeTintColor: '#e91e63',
    },
    containerOptions: {
      // on Android, the URI prefix typically contains a host in addition to scheme
      URIPrefix: Platform.OS === 'android'
        ? `${config.NAVIGATION.URI_PREFIX}://${config.NAVIGATION.URI_PREFIX}/`
        : `${config.NAVIGATION.URI_PREFIX}://`,
    },
  },
);

const store: Store<ReduxState, Action<*>> = configureStore();
const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent('Greaserocket', () => Root);

export default Root;
