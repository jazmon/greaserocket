// @flow
import { handleActions } from 'redux-actions';

import { loop, Effects } from 'redux-loop';
import { uniqueAction, uniqueActionGroup } from '../../utils/actions';
import config from '../../constants/config';

export const foobar = uniqueAction('greaserocket/feed/FOOBAR');
export const fetchData = uniqueActionGroup('FETCH_DATA', ['start', 'success', 'error']);

type State = {
  foo: string,
  isFetching: boolean,
  data: Array<Object>,
  error: ?Error,
};

const initialState: State = {
  foo: 'bar',
  isFetching: false,
  data: [],
  error: null,
};

const url = config.BACKEND.URL;

const dofetchData = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return fetchData.success(data);
  } catch (err) {
    return fetchData.error(err);
  }
};

const reducer = handleActions({
  [foobar]: (state: StateType, action: ActionType) => ({
    ...state,
    foo: action.payload,
  }),
  [fetchData.start]: (state: StateType) => loop({
    ...state,
    isFetching: true,
    error: null,
  }, Effects.promise(dofetchData)),
  [fetchData.success]: (state: StateType, action: ActionType) => ({
    ...state,
    isFetching: false,
    data: action.payload,
    error: null,
  }),
  [fetchData.error]: (state: StateType, action: ActionType) => ({
    ...state,
    isFetching: false,
    error: action.error,
  }),
}, initialState);

export default reducer;
