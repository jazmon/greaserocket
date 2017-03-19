// @flow
import { CALL_API } from '../middleware/api';
import createReducer from '../../utils/createReducer';

import type { Action, Handler, Story } from '../../../types';

// Constants
export const FETCH_FEED_START = 'GREASEROCKET/FEED/FETCH_FEED';
export const FETCH_FEED_SUCCESS = 'GREASEROCKET/FEED/FETCH_FEED_SUCCESS';
export const FETCH_FEED_FAILURE = 'GREASEROCKET/FEED/FETCH_FEED_FAILURE';

type State = { loading: boolean, stories: Array<Story>, error: ?Error };

const initialState: State = { loading: false, stories: [], error: null };

export function fetchStories() {
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
};

export default createReducer(initialState, handlers);
