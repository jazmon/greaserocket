// @flow
import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import type { ReduxState } from '../redux/modules';

// import type {
//   NavigationScreenProp,
//   NavigationAction
// } from 'react-navigation/lib/TypeDefinition';

import { login } from '../redux/modules/user';
import theme from '../constants/theme';

type Props = {
  // navigation: NavigationScreenProp<*, NavigationAction>,
  login(): void,
  loginDate: Date,
  profile: ?Auth0Profile,
  loading: boolean,
};

class Profile extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Profile',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-person" size={30} color={tintColor} />
    ),
  };

  props: Props;

  componentDidMount() {
    setTimeout(() => {
      // FIXME
      if (
        !this.props.profile ||
        moment(this.props.loginDate).isBefore(moment().subtract(20, 'seconds'))
      ) {
        this.props.login();
      }
    }, 400);
  }

  render() {
    const { profile, loading } = this.props;
    return (
      <View style={styles.container}>
        {loading &&
          <View style={styles.loadingContainer}>
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
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { color: theme.BLACK, fontSize: 16 },
});

const mapState = ({ user }: ReduxState) => ({ ...user });

const mapActions = (dispatch: Dispatch) => ({ login: () => dispatch(login()) });

export const ProfileComponent = Profile;
export default connect(mapState, mapActions)(Profile);
