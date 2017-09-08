import * as React from 'react';
import { AppRegistry, Platform } from 'react-native';
// import codePush from 'react-native-code-push';
import { Provider } from 'react-redux';
import {
  TabNavigator,
  StackNavigator,
  TabNavigatorConfig,
} from 'react-navigation';
import { ThemeProvider } from 'styled-components';
import { Store } from 'redux';
import { ReduxState } from 'redux/modules';
import { Action } from 'types';

import configureStore from 'redux/store/configureStore';
import config from 'constants/config';
import Feed from 'screens/Feed';
import Profile from 'screens/Profile';
import MapScreen from 'screens/Map';
import Messages from 'screens/Messages';
import EventDetail from 'screens/EventDetail';
import theme from 'constants/theme';

import { graphql, ApolloProvider } from 'react-apollo';

import ApolloClient, { createNetworkInterface } from 'apollo-client';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:9000/graphql',
  }),
});

const TabNav = TabNavigator(
  {
    Feed: {
      screen: Feed,
      path: 'feed',
    },
    Messages: {
      screen: Messages,
      path: 'messages',
    },
    Profile: {
      screen: Profile,
      path: 'profile/:name',
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
    // lazyLoad: true,
    screenProps: {
      foo: 'bar',
    },
    initialTab: 'Feed',
    tabBarOptions: {
      activeTintColor: '#e91e63',
    },
    // on Android, the URI prefix typically contains a host in addition to scheme
    uriPrefix:
      Platform.OS === 'android'
        ? `${config.NAVIGATION.URI_PREFIX}://${config.NAVIGATION.URI_PREFIX}/`
        : `${config.NAVIGATION.URI_PREFIX}://`,
  } as TabNavigatorConfig,
);

const store: Store<ReduxState> = configureStore({ client });
const Root = () =>
  <ApolloProvider client={client}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <TabNav />
      </ThemeProvider>
    </Provider>
  </ApolloProvider>;

// const codePushOptions = {
//   checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
// };

// const WrappedRoot = codePush(codePushOptions)(Root);
AppRegistry.registerComponent('Greaserocket', () => Root);

export const AppComponent = Root;
// export default Root;
