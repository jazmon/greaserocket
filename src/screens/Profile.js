// @flow
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import styled from 'styled-components/native';

import type { ReduxState } from 'redux/modules';

// import type {
//   NavigationScreenProp,
//   NavigationAction
// } from 'react-navigation/lib/TypeDefinition';

import { login } from 'redux/modules/user';
import type { ThemeType } from 'constants/theme';

type Props = {
  // navigation: NavigationScreenProp<*, NavigationAction>,
  login(): void,
  loginDate: Date,
  profile: ?Auth0Profile,
  loading: boolean,
};

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
      <Container>
        {loading &&
          <LoadingContainer>
            <ActivityIndicator size="large" />
          </LoadingContainer>}
        {profile &&
          <View>
            <BaseText>{profile.name}</BaseText>
            <BaseText>{profile.email}</BaseText>
          </View>}
      </Container>
    );
  }
}

const mapState = ({ user }: ReduxState) => ({ ...user });

const mapActions = (dispatch: Dispatch) => ({ login: () => dispatch(login()) });

export const ProfileComponent = Profile;
export default connect(mapState, mapActions)(Profile);
