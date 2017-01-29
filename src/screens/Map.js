// @flow
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

type Props = {
  navigator: Object,
  route: Object,
  relay: Object,
  loading: boolean,
};

type State = {
  text: string,
};

class Map extends React.Component {
  props: Props;

  constructor(props: Props) {
    super(props);

    this.state = {
      text: 'Map',
    };
  }

  state: State;

  render() {
    const { text } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  text: {
    color: '#000',
    fontSize: 16,
  },
});

export default Map;
