// @flow
// https://gist.github.com/grabbou/16484dfb1aa9f787bb2d0b8f7dd08d29

import type { Reducer } from 'redux';
import type { Action } from 'types';

type Handler = (state: Object, action: Action<mixed>) => Object;

type Handlers = { [key: string]: Handler };

function createReducer(
  initialState: Object,
  handlers: Handlers
): Reducer<*, Action<mixed>> {
  return function reducer(state: Object = initialState, action: Action<mixed>) {
    return typeof handlers[action.type] === 'function'
      ? handlers[action.type](state, action)
      : state;
  };
}
export default createReducer;
