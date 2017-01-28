// @flow
import React from 'react';
import {
  AppRegistry,
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

class App extends React.Component {
  props: Props;

  constructor(props: Props) {
    super(props);

    this.state = {
      text: 'Greaserocket',
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
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  text: {
    color: '#000',
    fontSize: 16,
  },
});

export default App;

AppRegistry.registerComponent('Greaserocket', () => App);
