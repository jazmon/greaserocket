// @flow
import { handleActions } from 'redux-actions';
import { loop, Effects } from 'redux-loop';
import { createSelector } from 'reselect';
import Auth0Lock from 'react-native-lock';

import { uniqueAction, uniqueActionGroup } from '../../utils/actions';
import config from '../../constants/config';

const lock = new Auth0Lock({ clientId: config.AUTH.CLIENT_ID, domain: config.AUTH.DOMAIN });
const auth0 = lock.authenticationAPI();

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

function doLogin(token: ?Auth0Token) {
  return new Promise((resolve, reject) => {
    // if no token (user not logged in) show login
    console.log('-----1-----');
    console.log('token', token);
    if (!token) {
      console.log('-----2-----');

      lock.show({}, (err, profile, tkn) => {
        console.log('-----3-----');

        if (err) {
          console.log('-----4-----');

          // console.log(err);
          reject(login.error(err));
          // return login.error(err);
          // return { type: login.error.toString(), payload: err };
        }
        console.log('-----5-----');

        console.log('profile', profile);
        console.log('token', token);
        // Authentication worked!
        console.log('Logged in with Auth0!');
        // return login.success({ token: tkn, profile });
        resolve(login.success({ token: tkn, profile }));
        // return { type: login.success.toString(), payload: { token: tkn, profile } };
      });
    } else {
      console.log('-----6-----');

      console.log('token', token);

      // try {
      //   console.log('-----7-----');
      //
      //   const response = await auth0.refreshToken(token.refreshToken);
      //   console.log('response', response);
      //   // return login.success(response);
      //   resolve(login.success(response));
      // } catch (err) {
      //   console.log('-----8-----');
      //   reject(login.error(err));
      //
      //   // return login.error(err);
      // }
      console.log('-----9-----');

      auth0
        .refreshToken(token.refreshToken)
        .then(response => resolve(login.success(response)))
        .catch(error => reject(login.error(error)));
    }
  });

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
      profile: action.payload || state.profile,
      token: action.payload || state.token,
      loginDate: new Date(),
    }),
    [login.error]: (state: StateType, action: ActionType) => ({ ...state, error: action.payload }),
  },
  initialState,
);

export default reducer;
