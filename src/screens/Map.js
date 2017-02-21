// @flow
import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import { fetchLocations } from '../redux/modules/map';

type Props = {
  navigation: Object,
  fetchLocations: Function,
  router: Object,
  loading: boolean,
  locations: Array<Location>,
};

function toMarker(location: Location): Marker {
  return {
    latlng: { latitude: location.lat, longitude: location.lng },
    title: location.title,
    description: '',
  };
}

class MapScreen extends React.Component {
  static navigationOptions = {
    tabBar: {
      label: 'Map',
      icon: ({ tintColor }) => <Icon name="ios-map" size={30} color={tintColor} />,
    },
  };

  componentDidMount() {
    this.props.fetchLocations();
  }

  props: Props;

  render() {
    const { locations, loading } = this.props;
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 65.78825,
            longitude: 23.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {!loading && locations
            .map(toMarker)
            .map(marker => (
              <MapView.Marker
                coordinate={marker.latlng}
                title={marker.title}
                description={marker.description}
              />
            ))}
        </MapView>
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

const mapState = ({ map }) => ({
  ...map,
  loading: map.isFetching,
});

const mapActions = dispatch => ({ fetchLocations: () => dispatch(fetchLocations()) });

export const MapScreenComponent = MapScreen;
export default connect(mapState, mapActions)(MapScreen);
