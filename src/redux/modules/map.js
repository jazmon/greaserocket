// @flow
import { CALL_API } from 'redux/middleware/api';

import type { Location } from 'types';

export const FETCH_LOCATIONS_START = 'FETCH_LOCATIONS_START';
export const FETCH_LOCATIONS_SUCCESS = 'FETCH_LOCATIONS_SUCCESS';
export const FETCH_LOCATIONS_FAILURE = 'FETCH_LOCATIONS_FAILURE';

export type MapState = {|
  +loading: boolean,
  +locations: Array<Location>,
  +error: ?Error,
|};

type Payload = {
  data: Array<Location>,
  error: boolean,
};

export type MapAction =
  | { type: 'FETCH_LOCATIONS_START' }
  | { type: 'FETCH_LOCATIONS_SUCCESS', payload: Payload }
  | { type: 'FETCH_LOCATIONS_FAILURE', payload: Error, +meta?: string };

const initialState: MapState = { loading: false, locations: [], error: null };

export function fetchLocations() {
  return {
    type: CALL_API,
    payload: {
      endpoint: 'locations',
      authenticated: true,
      types: [
        FETCH_LOCATIONS_START,
        FETCH_LOCATIONS_SUCCESS,
        FETCH_LOCATIONS_FAILURE,
      ],
    },
  };
}

export default function map(state: MapState = initialState, action: MapAction) {
  switch (action.type) {
  case FETCH_LOCATIONS_START:
    return {
      ...state,
      loading: true,
    };
  case FETCH_LOCATIONS_SUCCESS:
    return {
      ...state,
      loading: false,
      error: null,
      locations: action.payload.data || [],
    };
  case FETCH_LOCATIONS_FAILURE:
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  default:
    return state;
  }
}
