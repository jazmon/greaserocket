// @flow
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

import { fetchLocations } from '../redux/modules/map';
import theme from '../constants/theme';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 61.497421;
const LONGITUDE = 23.757292;
const LATITUDE_DELTA = 0.0322;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const REGION = {
  latitude: LATITUDE,
  longitude: LONGITUDE,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

type Location = {
  id: string,
  latitude: number,
  longitude: number,
  title: string,
  description: string,
};

type Props = {
  navigation: Object,
  fetchLocations: Function,
  router: Object,
  loading: boolean,
  locations: Array<Location>,
};

function toMarker(location: Location): MapMarker {
  return {
    latlng: { latitude: location.latitude, longitude: location.longitude },
    title: location.title,
    description: location.description,
    id: location.id,
  };
}

class MapScreen extends React.Component {
  map: Object;
  static navigationOptions = {
    tabBar: {
      label: 'Map',
      icon: ({ tintColor }) => <Icon name="ios-map" size={30} color={tintColor} />,
    },
  };

  static defaultProps = {
    locations: [],
  };

  componentDidMount() {
    this.props.fetchLocations();
  }

  componentWillReceiveProps(nextProps: Props) {
    if (!isEqual(nextProps.locations, this.props.locations)) {
      const edgePadding: EdgePadding = {
        top: 40,
        right: 40,
        bottom: 40,
        left: 40,
      };
      const coords: Array<LatLng> = this.props.locations
        .filter(location => !!location.latitude && !!location.longitude)
        .filter(latlng => {
          const center: LatLng = {
            latitude: 61.497418,
            longitude: 23.757059,
          };
          const MAX_DELTA_LONGITUDE = 0.2;
          const MAX_DELTA_LATITUDE = 0.2;
          const diff = {
            latitude: center.latitude - latlng.latitude,
            longitude: center.longitude - latlng.longitude,
          };
          const outside = Math.abs(diff.longitude) > MAX_DELTA_LONGITUDE ||
            Math.abs(diff.latitude) > MAX_DELTA_LATITUDE;
          return !outside;
        });
      if (!!this.map && coords && coords.length > 1) {
        this.map.fitToCoordinates(coords, {
          edgePadding,
          animated: true,
        });
      }
    }
  }

  props: Props;

  render() {
    const { locations, loading } = this.props;
    return (
      <View style={styles.container}>
        <MapView
          ref={map => {
            this.map = map;
          }}
          style={styles.map}
          initialRegion={REGION}
          loadingEnabled={false}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {!loading &&
            locations
              .map(toMarker)
              .map(marker => (
                <MapView.Marker
                  key={marker.id}
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
    backgroundColor: theme.WHITE,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const mapState = ({ map }) => ({
  ...map,
  loading: map.isFetching,
});

const mapDispatchtoProps = dispatch => ({ fetchLocations: () => dispatch(fetchLocations()) });

export const MapScreenComponent = MapScreen;
export default connect(mapState, mapDispatchtoProps)(MapScreen);
