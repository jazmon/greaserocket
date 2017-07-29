// @flow
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import styled from 'styled-components/native';

import { ReduxState } from 'redux/modules';
import { TestComponent } from 'components/TestComponent';
import { Maybe } from 'types';
import { Dispatch } from 'redux';

// import type {
//   NavigationScreenProp,
//   NavigationAction
// } from 'react-navigation/lib/TypeDefinition';

import { login } from 'redux/modules/user';
import { ThemeType } from 'constants/theme';

interface Props {
  // navigation: NavigationScreenProp<*, NavigationAction>,
  login(): void;
  loginDate: Date;
  profile: Maybe<Auth0Profile>;
  loading: boolean;
  token: Maybe<Auth0Token>;
}

const Container = styled.View`
  flex-grow: 1;
  flex-direction: column;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.white};
  align-items: center;
  justify-content: center;
`;

const LoadingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const BaseText = styled.Text`
  color: ${({ theme }: { theme: ThemeType }) => theme.text.colors.primary};
  font-size: 16;
`;

class Profile extends React.Component<Props, void> {
  static navigationOptions = {
    tabBarLabel: 'Profile',
    tabBarIcon: ({ tintColor }: { tintColor: string }) =>
      <Icon name="ios-person" size={30} color={tintColor} />,
  };

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
    console.log('token', this.props.token);
    const { profile, loading } = this.props;
    return (
      <Container>
        {loading &&
          <LoadingContainer>
            <ActivityIndicator size="large" />
          </LoadingContainer>}
        {profile &&
          <View>
            <TestComponent />
            <BaseText>
              {profile.name}
            </BaseText>
            <BaseText>
              {profile.email}
            </BaseText>
          </View>}
      </Container>
    );
  }
}

const mapState = ({ user }: ReduxState) => ({ ...user });

const mapActions = (dispatch: Dispatch<ReduxState>) => ({
  login: () => dispatch(login()),
});

export const ProfileComponent = Profile;
export default connect(mapState, mapActions)(Profile);
