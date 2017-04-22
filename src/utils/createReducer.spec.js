import createReducer from './createReducer';

describe('createReducer', () => {
  it('should return a reducer', () => {
    const initialState = { foo: 'bar', num: 1 };
    const handlers = {
      FOO: (state, action) => {},
    };
    expect(createReducer(initialState, handlers)).toBeInstanceOf(Function);
  });
  it('returned reducer should return back state if no handler for action', () => {
    const initialState = { foo: 'bar', num: 1 };
    const handlers = {
      FOO: (state, action) => {},
    };
    const reducer = createReducer(initialState, handlers);
    const state = reducer(initialState, { type: 'BAR' });
    expect(state).toEqual(initialState);
  })
});
