// @flow
import { CALL_API } from 'redux/middleware/api';
import createReducer from 'utils/createReducer';

import type { Action, Handler, Story } from 'types';

// Constants
export const FETCH_FEED_START = 'GREASEROCKET/FEED/FETCH_FEED_START';
export const FETCH_FEED_SUCCESS = 'GREASEROCKET/FEED/FETCH_FEED_SUCCESS';
export const FETCH_FEED_FAILURE = 'GREASEROCKET/FEED/FETCH_FEED_FAILURE';
export const REFETCH_FEED_START = 'GREASEROCKET/FEED/REFETCH_FEED_START';
export const REFETCH_FEED_SUCCESS = 'GREASEROCKET/FEED/REFETCH_FEED_SUCCESS';
export const REFETCH_FEED_FAILURE = 'GREASEROCKET/FEED/REFETCH_FEED_FAILURE';

export type State = { loading: boolean, refetching: boolean, stories: Array<Story>, error: ?Error };

const initialState: State = { loading: false, refetching: false, stories: [], error: null };

export function fetchStories() {
  return {
    type: CALL_API,
    payload: {
      endpoint: 'feed',
      authenticated: false,
      types: [FETCH_FEED_START, FETCH_FEED_SUCCESS, FETCH_FEED_FAILURE],
    },
  };
}

export const refetchStories = () => ({
  type: CALL_API,
  payload: {
    endpoint: 'feed',
    authenticated: false,
    types: [REFETCH_FEED_START, REFETCH_FEED_SUCCESS, REFETCH_FEED_FAILURE],
  },
});

const handlers: Handler<State> = {
  [FETCH_FEED_START](state: State) {
    return {
      ...state,
      loading: true,
    };
  },
  [FETCH_FEED_SUCCESS](state: State, action: Action<Array<Story>>) {
    return {
      ...state,
      loading: false,
      error: null,
      stories: action.payload || [],
    };
  },
  [FETCH_FEED_FAILURE](state: State, action: Action<Error>) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
  [REFETCH_FEED_START](state: State) {
    return {
      ...state,
      refetching: true,
    };
  },
  [REFETCH_FEED_SUCCESS](state: State, action: Action<Array<Story>>) {
    return {
      ...state,
      refetching: false,
      error: null,
      stories: action.payload || [],
    };
  },
  [REFETCH_FEED_FAILURE](state: State, action: Action<Error>) {
    return {
      ...state,
      refetching: false,
      error: action.payload,
    };
  },
};

export default createReducer(initialState, handlers);
