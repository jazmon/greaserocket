// @flow
import { handleActions } from 'redux-actions';

import { loop, Effects } from 'redux-loop';
import { uniqueAction, uniqueActionGroup } from '../../utils/actions';
import { CALL_API } from '../middleware/api';

export const fetchData = uniqueActionGroup('FETCH_LOCATIONS', ['start', 'success', 'error']);

type Location = { lat: number, lng: number, title: string };
type State = { isFetching: boolean, locations: Array<Location>, error: ?Error };

const initialState: State = { isFetching: false, locations: [], error: null };

export function fetchLocations() {
  return {
    [CALL_API]: {
      endpoint: 'locations',
      types: [fetchData.start, fetchData.success, fetchData.error],
    },
  };
}

const reducer = handleActions(
  {
    [fetchData.start]: (state: StateType) =>
      loop({ ...state, isFetching: true, error: null }, Effects.none()),
    [fetchData.success]: (state: StateType, action: ActionType) => ({
      ...state,
      isFetching: false,
      locations: action.payload.locations,
      error: null,
    }),
    [fetchData.error]: (state: StateType, action: ActionType) => ({
      ...state,
      isFetching: false,
      error: action.payload,
    }),
  },
  initialState,
);

export default reducer;
