// @flow
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import Auth0Lock from 'react-native-lock';
import { connect } from 'react-redux';

// import config from '../constants/config';

import { login as doLogin } from '../redux/modules/user';

// const lock = new Auth0Lock({ clientId: config.AUTH.CLIENT_ID, domain: config.AUTH.DOMAIN });

type Props = {navigator: Object, route: Object, relay: Object, loading: boolean, login: () => void};

type State = {error: ?Error, profile: ?Auth0Profile, token: ?Auth0Token};

const initialState: State = { error: null, profile: null, token: null };

class Login extends React.Component {
  props: Props;

  state: State = initialState;

  componentDidMount() {
    this.props.login();
    // const auth0 = lock.authenticationAPI();
    //
    // lock.show({}, (err, profile, token) => {
    //   if (err) {
    //     console.log(err);
    //     this.setState({ error: err });
    //     return;
    //   }
    //   console.log('profile', profile);
    //   console.log('token', token);
    //   this.setState({ profile, token });
    //   // Authentication worked!
    //   console.log('Logged in with Auth0!');
    // });
  }

  state: State;

  attemptLogin = (): void => {
    this.setState({ error: null, profile: null, token: null });
  };

  isLoggedIn = (): boolean => {
    const { profile, token } = this.state;
    return !!profile && !!token;
  };

  render() {
    if (this.isLoggedIn()) {
      return (
        <View style={styles.container}>
          <Text>Welcome {this.state.profile.name}</Text>
          <Text>Your email is: {this.state.profile.email}</Text>
        </View>
      );
    } else if (this.state.error) {
      return (
        <View style={styles.container}>
          <Text>{this.state.error}</Text>
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
  text: { color: '#000', fontSize: 16 },
});

const mapState = ({ login }) => ({
  ...login,
});

const mapActions = (dispatch) => ({
  login: () => dispatch(doLogin.start()),
});

export const LoginComponent = Login;
export default connect(mapState, mapActions)(Login);
