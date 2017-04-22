// @flow
import React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';

import { login } from 'redux/modules/user';
import type { ThemeType } from 'constants/theme';

import type { ReduxState } from 'redux/modules';

type Props = {
  navigation: Object,
  route: Object,
  loading: boolean,
  login(): void,
  error: ?Error,
  profile: ?Auth0Profile,
  token: ?Auth0Token,
};

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.white};
  margin-top: 24;
  justify-content: center;
  padding: 16;
`;

class Login extends React.Component<*, Props, void> {
  componentDidMount() {
    this.props.login();
  }

  componentWillReceiveProps(nextProps: Props) {
    if (!!nextProps.token && nextProps.profile) {
      this.props.navigation.navigate('App');
    }
  }

  render() {
    const { profile, token, error } = this.props;
    if (profile && token) {
      return (
        <Container>
          <Text>Welcome {profile.name}</Text>
          <Text>Your email is: {profile.email}</Text>
        </Container>
      );
    } else if (error) {
      return (
        <Container>
          <Text>{error}</Text>
        </Container>
      );
    }
    return <Container />;
  }
}

const mapState = ({ user }: ReduxState) => ({ ...user });

const mapActions = (dispatch: Dispatch) => ({ login: () => dispatch(login()) });

export const LoginComponent = Login;
export default connect(mapState, mapActions)(Login);
