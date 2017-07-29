// @flow

import { loop, Effects } from 'redux-loop';
import moment from 'moment';

import Auth0Lock from 'react-native-lock';
import { REHYDRATE } from 'redux-persist/constants';

import config from 'constants/config';

import { Action, Maybe } from 'types';
import { ReduxState } from './index';

export const REFRESH_SESSION = 'REFRESH_SESSION';
export const REFRESH_SESSION_SUCCESS = 'REFRESH_SESSION_SUCCESS';
export const REFRESH_SESSION_FAILURE = 'REFRESH_SESSION_FAILURE';
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_START = 'LOGOUT_START';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

type LoginData = {
  token: Auth0Token;
  profile: Auth0Profile;
};

type RefreshData = {
  token: Auth0Token;
};

export type UserState = {
  profile: Maybe<Auth0Profile>;
  token: Maybe<Auth0Token>;
  loading: boolean;
  loginDate: Maybe<Date>;
  error: Mayve<Error>;
};

export type UserAction =
  | { type: 'REFRESH_SESSION' }
  | { type: 'REFRESH_SESSION_SUCCESS'; payload: RefreshData }
  | { type: 'REFRESH_SESSION_FAILURE'; payload: Error }
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: LoginData }
  | { type: 'LOGIN_FAILURE'; payload: Error }
  | { type: 'LOGOUT_START' }
  | { type: 'LOGOUT_SUCCESS' }
  | { type: 'persist/REHYDRATE'; payload: ReduxState };

export function login(): UserAction {
  return {
    type: LOGIN_START,
  };
}

export function doLogin(token: Maybe<Auth0Token>) {
  const lock = new Auth0Lock({
    clientId: config.AUTH.CLIENT_ID,
    domain: config.AUTH.DOMAIN,
  });
  const auth0 = lock.authenticationAPI();

  // TODO refactor this
  return new Promise((resolve, reject) => {
    // if no token (user not logged in) show login
    if (!token) {
      lock.show({}, (err, profile, tkn) => {
        if (err) {
          const action: Action<Error> = {
            type: LOGIN_FAILURE,
            error: true,
            payload: err,
          };
          reject(action);
        }

        const action: Action<LoginData> = {
          type: LOGIN_SUCCESS,
          error: false,
          payload: { token: tkn, profile },
        };
        resolve(action);
      });
    } else {
      auth0
        .refreshToken(token.refreshToken)
        .then(tkn => {
          const action: Action<RefreshData> = {
            type: REFRESH_SESSION_SUCCESS,
            error: false,
            payload: tkn,
          };
          resolve(action);
        })
        .catch((error: any) => {
          const action: Action<Error> = {
            type: REFRESH_SESSION_FAILURE,
            error: true,
            payload: error,
          };
          reject(action);
        });
    }
  });
}

const initialState: UserState = {
  profile: null,
  token: null,
  loginDate: null,
  loading: true,
  error: null,
};

export default function user(
  state: UserState = initialState,
  action: UserAction,
) {
  switch (action.type) {
    case LOGIN_START:
      return loop(
        { ...state, loading: true, error: null },
        Effects.promise(doLogin, state.token),
      );
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        profile: action.payload.profile,
        token: action.payload.token,
        loginDate: new Date(),
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case REFRESH_SESSION:
      return state;
    case REFRESH_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        loginDate: new Date(),
        token: {
          ...state.token,
          ...action.payload,
        },
      };
    case REFRESH_SESSION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case REHYDRATE:
      if (
        // $FlowIssue
        action.payload.user &&
        action.payload.user.loginDate &&
        moment(action.payload.user.loginDate).isBefore(
          moment().subtract(1, 'weeks'),
        )
      ) {
        return state;
      }
      // $FlowIssue
      return { ...state, ...action.payload.user };

    default:
      return state;
  }
}
