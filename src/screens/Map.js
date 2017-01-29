// @flow
import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import MapView from 'react-native-maps';

type Props = {
  navigation: Object,
  router: Object,
};

// eslint-disable-next-line react/prefer-stateless-function
class Map extends React.Component {
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
