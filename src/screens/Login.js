// @flow
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { login as doLogin } from '../redux/modules/user';

type Props = {
  navigator: Object,
  route: Object,
  loading: boolean,
  login(): void,
  error: ?Error,
  profile: ?Auth0Profile,
  token: ?Auth0Token,
};

type State = {};

// type State = {error: ?Error, profile: ?Auth0Profile, token: ?Auth0Token};

// const initialState: State = { error: null, profile: null, token: null };

class Login extends React.Component {
  props: Props;

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.loading && !nextProps.loading) {
      this.props.navigator.navigate('App');
    }
  }

  state: State;

  render() {
    const { profile, token, error } = this.props;
    if (profile && token) {
      return (
        <View style={styles.container}>
          <Text>Welcome {profile.name}</Text>
          <Text>Your email is: {profile.email}</Text>
        </View>
      );
    } else if (error) {
      return (
        <View style={styles.container}>
          <Text>{error}</Text>
        </View>
      );
    }
    return <View />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    marginTop: 24,
    justifyContent: 'center',
    padding: 16,
  },
});

const mapState = ({ user }) => ({ ...user, loading: user.inProgress });

const mapActions = dispatch => ({ login: () => dispatch(doLogin.start()) });

export const LoginComponent = Login;
export default connect(mapState, mapActions)(Login);