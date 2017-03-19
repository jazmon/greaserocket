// @flow
import { CALL_API } from '../middleware/api';
import createReducer from '../../utils/createReducer';

import type { Action, Handler, Location } from '../../../types';

export const FETCH_LOCATIONS_START = 'GREASEROCKET/MAP/FETCH_LOCATIONS_START';
export const FETCH_LOCATIONS_SUCCESS = 'GREASEROCKET/MAP/FETCH_LOCATIONS_SUCCESS';
export const FETCH_LOCATIONS_FAILURE = 'GREASEROCKET/MAP/FETCH_LOCATIONS_FAILURE';

export type State = { loading: boolean, locations: Array<Location>, error: ?Error };

const initialState: State = { loading: false, locations: [], error: null };

export function fetchLocations() {
  return {
    type: CALL_API,
    payload: {
      endpoint: 'locations',
      authenticated: false,
      types: [FETCH_LOCATIONS_START, FETCH_LOCATIONS_SUCCESS, FETCH_LOCATIONS_FAILURE],
    },
  };
}

const handlers: Handler<State> = {
  [FETCH_LOCATIONS_START](state: State, action: Action<*>) {
    return {
      ...state,
      loading: true,
    };
  },
  [FETCH_LOCATIONS_SUCCESS](state: State, action: Action<Array<Location>>) {
    return {
      ...state,
      loading: false,
      error: null,
      locations: action.payload || [],
    };
  },
  [FETCH_LOCATIONS_FAILURE](state: State, action: Action<Error>) {
    return {
      ...state,
      error: action.payload,
    };
  },
};

export default createReducer(initialState, handlers);
