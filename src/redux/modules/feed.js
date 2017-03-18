// @flow
import { handleActions } from 'redux-actions';

import { loop, Effects } from 'redux-loop';
import { uniqueAction, uniqueActionGroup } from '../../utils/actions';
import { CALL_API } from '../middleware/api';

export const fetchData = uniqueActionGroup('FETCH_FEED', ['start', 'success', 'error']);

type State = { isFetching: boolean, data: Array<Object>, error: ?Error };

const initialState: State = { isFetching: false, data: [], error: null };

export function fetchFeed() {
  return {
    [CALL_API]: { endpoint: 'feed', types: [fetchData.start, fetchData.success, fetchData.error] },
  };
}

const reducer = handleActions(
  {
    [fetchData.start]: (state: StateType) =>
      loop({ ...state, isFetching: true, error: null }, Effects.none()),
    [fetchData.success]: (state: StateType, action: ActionType) => ({
      ...state,
      isFetching: false,
      data: action.payload,
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
