// @flow
import { CALL_API } from '../middleware/api';
import createReducer from '../../utils/createReducer';

import type { Action, Handler } from '../../../types';

// Constants
export const FETCH_FEED_START = 'GREASEROCKET/FEED/FETCH_FEED';
export const FETCH_FEED_SUCCESS = 'GREASEROCKET/FEED/FETCH_FEED_SUCCESS';
export const FETCH_FEED_FAILURE = 'GREASEROCKET/FEED/FETCH_FEED_FAILURE';

type Data = Array<{
  id: string,
  text: string,
  author: {
    id: string,
    profilePictureUrl: string,
    name: string,
  },
}>;

type State = { isFetching: boolean, data: Data, error: ?Error };

const initialState: State = { isFetching: false, data: [], error: null };

export function fetchFeed() {
  return {
    [CALL_API]: {
      endpoint: 'feed',
      types: [FETCH_FEED_START, FETCH_FEED_SUCCESS, FETCH_FEED_FAILURE],
    },
  };
}

const handlers: Handler<State> = {
  [FETCH_FEED_START](state: State, action: Action<*>) {
    return {
      ...state,
      isFetching: true,
    };
  },
  [FETCH_FEED_SUCCESS](state: State, action: Action<Data>) {
    return {
      ...state,
      isFetching: false,
      error: null,
      data: action.payload || [],
    };
  },
  [FETCH_FEED_FAILURE](state: State, action: Action<Error>) {
    return {
      ...state,
      isFetching: false,
      error: action.payload,
    };
  },
};

export default createReducer(initialState, handlers);
