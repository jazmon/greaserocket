// @flow

import { loop, Effects } from 'redux-loop';
import moment from 'moment';

import Auth0Lock from 'react-native-lock';
import { REHYDRATE } from 'redux-persist/constants';

import config from '../../constants/config';
import createReducer from '../../utils/createReducer';

import type { Action, Handler } from '../../../types';

export const REFRESH_SESSION = 'GREASEROCKET/USER/REFRESH_SESSION';
export const REFRESH_SESSION_SUCCESS = 'GREASEROCKET/USER/REFRESH_SESSION_SUCCESS';
export const REFRESH_SESSION_FAILURE = 'GREASEROCKET/USER/REFRESH_SESSION_FAILURE';
export const LOGIN_START = 'GREASEROCKET/USER/LOGIN_START';
export const LOGIN_SUCCESS = 'GREASEROCKET/USER/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'GREASEROCKET/USER/LOGIN_FAILURE';
export const LOGOUT_START = 'GREASEROCKET/USER/LOGOUT_START';
export const LOGOUT_SUCCESS = 'GREASEROCKET/USER/LOGOUT_SUCCESS';

type LoginData = {
  token: Auth0Token,
  profile: Auth0Profile,
};
type RefreshData = {
  token: Auth0Token,
};

export function login() {
  const action: Action<*> = {
    type: LOGIN_START,
  };
  return action;
}

export function doLogin(token: ?Auth0Token) {
  const lock = new Auth0Lock({ clientId: config.AUTH.CLIENT_ID, domain: config.AUTH.DOMAIN });
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
        .catch(error => {
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

type State = { profile: ?Auth0Profile, token: ?Auth0Token, loginDate: ?Date, error: ?Error };

const initialState: State = {
  profile: null,
  token: null,
  loginDate: null,
  loading: true,
  error: null,
};

const handlers: Handler<State> = {
  [LOGIN_START](state: State, action: Action<*>) {
    return loop({ ...state, loading: true, error: null }, Effects.promise(doLogin, state.token));
  },
  [LOGIN_SUCCESS](state: State, action: Action<LoginData>) {
    return {
      ...state,
      loading: false,
      error: null,
      profile: action.payload.profile,
      token: action.payload.token,
      loginDate: new Date(),
    };
  },
  [LOGIN_FAILURE](state: State, action: Action<Error>) {
    return {
      ...state,
      error: action.payload,
      loading: false,
    };
  },
  [REFRESH_SESSION_SUCCESS](state: State, action: Action<RefreshData>) {
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
  },
  [REFRESH_SESSION_FAILURE](state: State, action: Action<Error>) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
  [REHYDRATE](state: State, action: Action<Object>) {
    if (
      action.payload.user &&
      action.payload.user.loginDate &&
      moment(action.payload.user.loginDate).isBefore(moment().subtract(20, 'seconds'))
    ) {
      return state;
    }
    return { ...state, ...action.payload.user };
  },
};

export default createReducer(initialState, handlers);
