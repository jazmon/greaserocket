// @flow
// https://gist.github.com/grabbou/16484dfb1aa9f787bb2d0b8f7dd08d29
type Action = {
  type: string,
  payload: Object,
};

// type State = Object;

type Handler<S> = () => S;

type Handlers = Array<Handler>;

function createReducer<S>(initialState: ?Object, handlers: Object): S {
  return function reducer(state: ?Object = initialState, action: Action) {
    return typeof handlers[action.type] === 'function'
      ? handlers[action.type](state, action)
      : state;
  };
}
export default createReducer;
