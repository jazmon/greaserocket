// @flow
import { combineReducers } from 'redux-loop';
import feed from './feed';

const rootReducer = combineReducers({
  feed,
});

export default rootReducer;
