// @flow
import { combineReducers } from 'redux-loop';
import feed from './feed';
import user from './user';

const rootReducer = combineReducers({ feed, user });

export default rootReducer;
