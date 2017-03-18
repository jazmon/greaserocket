// @flow
import { handleActions } from 'redux-actions';
import { loop, Effects } from 'redux-loop';
import { createSelector } from 'reselect';
import Auth0Lock from 'react-native-lock';
import { REHYDRATE } from 'redux-persist/constants';

import { uniqueAction, uniqueActionGroup } from '../../utils/actions';
import config from '../../constants/config';

const actions = ['start', 'success', 'error'];

// actionTypes
export const refreshSession = uniqueActionGroup('REFRESH_SESSION', actions);
export const login = uniqueActionGroup('LOGIN', actions);
export const logout = uniqueActionGroup('LOGOUT', actions);

// actions
function doLogin(token: ?Auth0Token) {
  console.log('dologin');
  const lock = new Auth0Lock({ clientId: config.AUTH.CLIENT_ID, domain: config.AUTH.DOMAIN });
  const auth0 = lock.authenticationAPI();

  console.log('token', token);
  return new Promise((resolve, reject) => {
    // if no token (user not logged in) show login
    console.log('token', token);
    if (!token) {
      lock.show({}, (err, profile, tkn) => {
        if (err) {
          reject(login.error(err));
        }

        console.log('profile', profile);
        console.log('token', token);
        console.log('Logged in with Auth0!');
        resolve(login.success({ token: tkn, profile }));
      });
    } else {
      console.log('token', token);

      auth0
        .refreshToken(token.refreshToken)
        .then(
          response =>
            console.log('response', response) || resolve(refreshSession.success({ response })),
        )
        .catch(error => reject(refreshSession.error(error)));
    }
  });
}

type State = { profile: ?Auth0Profile, token: ?Auth0Token, loginDate: ?Date, error: ?Error };

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
      profile: action.payload.profile,
      token: action.payload.token,
      loginDate: new Date(),
    }),
    [login.error]: (state: StateType, action: ActionType) => ({ ...state, error: action.payload }),
    [refreshSession.success]: (state: StateType, action: ActionType) => ({
      ...state,
      inProgress: false,
      error: null,
      loginDate: new Date(),
      token: {
        ...state.token,
        ...action.payload,
      },
    }),
    [refreshSession.error]: (state: StateType, action: ActionType) => ({
      ...state,
      inProgress: false,
      error: action.payload,
    }),
    [REHYDRATE]: (state: StateType, action: ActionType) => {
      const incoming = action.payload.user;
      console.log('incoming', incoming);
      if (incoming) {
        return loop({ ...state, ...incoming }, Effects.promise(doLogin, incoming.token));
      }
      return loop({ ...state, ...incoming }, Effects.promise(doLogin, state.token));
    },
  },
  initialState,
);

export default reducer;
