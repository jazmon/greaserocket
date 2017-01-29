// @flow
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

type Props = {
  navigation: Object,
};

type State = {
  text: string,
};

class Profile extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  props: Props;

  constructor(props: Props) {
    super(props);

    this.state = {
      text: 'Profile',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#000',
    fontSize: 16,
  },
});

export default Profile;
