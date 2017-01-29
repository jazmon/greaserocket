// @flow
import {
  AppRegistry,
} from 'react-native';

// $FlowIssue
import { TabNavigator } from 'react-navigation';

import Feed from './screens/Feed';
import Profile from './screens/Profile';
import MapScreen from './screens/Map';

const App = TabNavigator({
  Profile: {
    screen: Profile,
  },
  Feed: {
    screen: Feed,
  },
  Map: {
    screen: MapScreen,
  },
}, {
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
});


AppRegistry.registerComponent('Greaserocket', () => App);

export default App;
