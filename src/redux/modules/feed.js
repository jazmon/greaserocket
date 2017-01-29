import { createAction } from 'redux-actions';

export const FOOBAR = 'greaserocket/feed/FOOBAR';

type Action = {
  type: Symbol,
  payload: any,
  error?: boolean,
};

type State = {
  foo: string,
};

const initialState: State = {
  foo: 'bar',
};

// export const setFoo = (foo: string) =>
//   ({ type: FOOBAR, payload: foo });

export const setFoo = createAction(FOOBAR);


const reducer = (state: Object = initialState, action: Action = {}) => {
  switch (action.type) {
  case FOOBAR:
    return { ...state, foo: action.payload };
  default:
    return state;
  }
};

export default reducer;
