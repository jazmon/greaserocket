// @flow
import { handleActions } from 'redux-actions';
import { loop, Effects } from 'redux-loop';
import { createSelector } from 'reselect';
import Auth0Lock from 'react-native-lock';

import { uniqueAction, uniqueActionGroup } from '../../utils/actions';
import config from '../../constants/config';

const lock = new Auth0Lock({ clientId: config.AUTH.CLIENT_ID, domain: config.AUTH.DOMAIN });

// actionTypes
export const refreshSession = uniqueActionGroup('REFRESH_SESSION', ['start', 'success', 'error']);
export const login = uniqueActionGroup('LOGIN', ['start', 'success', 'error']);

// actions
async function doRefreshSession(refreshToken: string) {
  try {
    return { type: refreshSession.success.toString(), payload: '' };
  } catch (err) {
    return { type: refreshSession.error.toString(), payload: err };
  }
}

async function doLogin(token: ?Auth0Token) {
  try {
    // if no token (user not logged in) show login
    if (!token) {
      lock.show({}, (err, profile, tkn) => {
        if (err) {
          console.log(err);
          return { type: login.error.toString(), payload: err };
        }
        console.log('profile', profile);
        console.log('token', token);
        // Authentication worked!
        console.log('Logged in with Auth0!');
        return { tkn, profile };
      });
    }

    const auth0 = lock.authenticationAPI();

    auth0
      .authentication(config.AUTH.CLIENT_ID)
      .refreshToken(token.refreshToken)
      .then(response => ({ type: login.success.toString(), payload: response }))
      .catch(error => ({ type: login.error.toString(), payload: error }));
  } catch (err) {
    return { type: login.error.toString(), payload: err };
  }
}

type State = {profile: ?Auth0Profile, token: ?Auth0Token, loginDate: ?Date};

const initialState: State = {
  profile: null,
  token: null,
  loginDate: null,
  inProgress: false,
  error: null,
};

// Reducer
const reducer = handleActions(
  {
    [login.start]: (state: StateType) =>
      loop({ ...state, inProgress: true, error: null }, Effects.promise(doLogin, state.token)),
    [login.success]: (state: StateType, action: ActionType) => ({
      ...state,
      inProgress: false,
      error: null,
      profile: action.payload.profile || state.profile,
      token: action.payload.token || state.token,
      loginDate: new Date(),
    }),
    [login.error]: (state: StateType, action: ActionType) => ({ ...state, error: action.payload }),
  },
  initialState,
);

export default reducer;
