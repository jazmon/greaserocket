// @flow
import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  navigation: Object,
  router: Object,
};

class Map extends React.Component {
  static navigationOptions = {
    tabBar: {
      label: 'Map',
      icon: ({ tintColor }) => (
        <Icon
          name="ios-map"
          size={30}
          color={tintColor}
        />
     ),
    },
  }

  props: Props;

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
