// @flow
import React from 'react';
import { View, Text, Platform, ActivityIndicator, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import { login } from '../redux/modules/user';
import theme from '../constants/theme';

type Props = { navigation: Object, login(): void, profile: ?Auth0Profile, loading: boolean };

type State = { text: string };

class Profile extends React.Component {
  static navigationOptions = {
    tabBar: {
      label: 'Profile',
      icon: ({ tintColor }) => <Icon name="ios-person" size={30} color={tintColor} />,
    },
  };

  props: Props;

  constructor(props: Props) {
    super(props);

    this.state = { text: 'Profile' };
  }

  state: State;

  render() {
    const { text } = this.state;
    const { profile, loading } = this.props;
    return (
      <View style={styles.container}>
        {loading &&
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" />
          </View>}
        {profile &&
          <View>
            <Text style={styles.text}>{profile.name}</Text>
            <Text style={styles.text}>{profile.email}</Text>
          </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { color: theme.BLACK, fontSize: 16 },
});

const mapState = ({ user }) => ({ ...user, loading: user.inProgress });

const mapActions = dispatch => ({ login: () => dispatch(login()) });

export const ProfileComponent = Profile;
export default connect(mapState, mapActions)(Profile);
