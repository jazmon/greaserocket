// @flow
import React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { Dispatch } from 'redux';

import { login } from 'redux/modules/user';
import { ThemeType } from 'constants/theme';

import { ReduxState } from 'redux/modules';
import { Maybe } from 'types';
import { Auth0Profile, Auth0Token } from 'types/auth';

type Props = {
  navigation: Object;
  route: Object;
  loading: boolean;
  login(): void;
  error: Maybe<Error>;
  profile: Maybe<Auth0Profile>;
  token: Maybe<Auth0Token>;
};

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.white};
  margin-top: 24px;
  justify-content: center;
  padding: 16px;
`;

class Login extends React.Component<Props, void> {
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
          <Text>
            Welcome {profile.name}
          </Text>
          <Text>
            Your email is: {profile.email}
          </Text>
        </Container>
      );
    } else if (error) {
      return (
        <Container>
          <Text>
            {error}
          </Text>
        </Container>
      );
    }
    return <Container />;
  }
}

const mapState = ({ user }: ReduxState) => ({ ...user });

const mapActions = (dispatch: Dispatch<ReduxState>) => ({
  login: () => dispatch(login()),
});

export const LoginComponent = Login;
export default connect(mapState, mapActions)(Login);
