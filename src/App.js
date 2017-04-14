// @flow
import React from 'react';
import { AppRegistry, Platform } from 'react-native';
import codePush from 'react-native-code-push';
import { Provider } from 'react-redux';
import { TabNavigator, StackNavigator } from 'react-navigation';

import type { Store } from 'redux';
import type { ReduxState } from './redux/modules';
import type { Action } from '../types';

import configureStore from './store/configureStore';

import config from './constants/config';
import Feed from './screens/Feed';
import Profile from './screens/Profile';
import MapScreen from './screens/Map';
import EventDetail from './screens/EventDetail';

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
      screen: StackNavigator({
        Map: {
          screen: MapScreen,
        },
        EventDetail: {
          screen: EventDetail,
          path: 'eventdetail/:eventId',
        },
      }),
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
  }
);

const store: Store<ReduxState, Action<*>> = configureStore();
const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
};

const WrappedRoot = codePush(codePushOptions)(Root);
AppRegistry.registerComponent('Greaserocket', () => WrappedRoot);

export const AppComponent = Root;
export default WrappedRoot;
