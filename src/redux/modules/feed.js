// @flow
import { CALL_API } from 'redux/middleware/api';

import type { Story } from 'types';

// Constants
export const FETCH_FEED_START = 'FETCH_FEED_START';
export const FETCH_FEED_SUCCESS = 'FETCH_FEED_SUCCESS';
export const FETCH_FEED_FAILURE = 'FETCH_FEED_FAILURE';
export const REFETCH_FEED_START = 'REFETCH_FEED_START';
export const REFETCH_FEED_SUCCESS = 'REFETCH_FEED_SUCCESS';
export const REFETCH_FEED_FAILURE = 'REFETCH_FEED_FAILURE';

export type FeedState = {|
  +loading: boolean,
  +refetching: boolean,
  +stories: Array<Story>,
  +error: ?Error,
|};

const initialState: FeedState = {
  loading: false,
  refetching: false,
  stories: [],
  error: null,
};

export function fetchStories() {
  return {
    type: CALL_API,
    payload: {
      endpoint: 'feed',
      authenticated: false,
      types: ['FETCH_FEED_START', 'FETCH_FEED_SUCCESS', 'FETCH_FEED_FAILURE'],
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

export type FeedAction =
  | { +type: 'FETCH_FEED_START' }
  | { +type: 'FETCH_FEED_SUCCESS', +payload: Array<Story> }
  | { +type: 'FETCH_FEED_FAILURE', +payload: Error, +meta?: string }
  | { +type: 'REFETCH_FEED_START' }
  | { +type: 'REFETCH_FEED_SUCCESS', +payload: Array<Story> }
  | { +type: 'REFETCH_FEED_FAILURE', +payload: Error, +meta?: string };

export default function feed(
  state: FeedState = initialState,
  action: FeedAction
) {
  switch (action.type) {
  case FETCH_FEED_START:
    return { ...state, loading: true };
  case FETCH_FEED_SUCCESS:
    return { ...state, loading: false, error: null, stories: action.payload };
  case FETCH_FEED_FAILURE:
    return { ...state, loading: false, error: action.payload };
  case REFETCH_FEED_START:
    return { ...state, refetching: true };
  case REFETCH_FEED_SUCCESS:
    return {
      ...state,
      refetching: false,
      error: null,
      stories: action.payload || [],
    };
  case REFETCH_FEED_FAILURE:
    return {
      ...state,
      refetching: false,
      error: action.payload,
    };
  default:
    return state;
  }
}
