// @flow
import {
  AppRegistry,
  Platform,
} from 'react-native';

// $FlowIssue
import { TabNavigator } from 'react-navigation';

import Feed from './screens/Feed';
import Profile from './screens/Profile';
import MapScreen from './screens/Map';

const App = TabNavigator({
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
}, {
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
    URIPrefix: Platform.OS === 'android' ? 'greaserocket://greaserocket/' : 'greaserocket://',
  },
});


AppRegistry.registerComponent('Greaserocket', () => App);

export default App;
