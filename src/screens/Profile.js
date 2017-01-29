// @flow
import React from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  navigation: Object,
};

type State = {
  text: string,
};

class Profile extends React.Component {
  static navigationOptions = {
    tabBar: {
      label: 'Profile',
      icon: ({ tintColor }) => (
        <Icon
          name="ios-person"
          size={30}
          color={tintColor}
        />
     ),
    },
  }

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
