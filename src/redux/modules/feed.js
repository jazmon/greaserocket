import { handleActions } from 'redux-actions';

import { loop, Effects } from 'redux-loop';
import { uniqueAction, uniqueActionGroup } from '../../utils/actions';

export const FOOBAR = uniqueAction('greaserocket/feed/FOOBAR');
export const FETCH_DATA = uniqueActionGroup('FETCH_DATA', ['START', 'SUCCESS', 'ERROR']);

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

const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:3000/');
    const data = await response.json();
    return { type: FETCH_DATA.SUCCESS.toString(), payload: data };
  } catch (err) {
    return { type: FETCH_DATA.ERROR.toString(), payload: err };
  }
};

const reducer = handleActions({
  [FOOBAR]: (state: StateType, action: ActionType) => ({
    ...state,
    foo: action.payload,
  }),
  [FETCH_DATA.START]: (state: StateType) => loop({
    ...state,
    isFetching: true,
    error: null,
  }, Effects.promise(fetchData)),
  [FETCH_DATA.SUCCESS]: (state: StateType, action: ActionType) => ({
    ...state,
    isFetching: false,
    data: action.payload,
    error: null,
  }),
  [FETCH_DATA.ERROR]: (state: StateType, action: ActionType) => ({
    ...state,
    isFetching: false,
    error: action.error,
  }),
}, initialState);

export default reducer;
