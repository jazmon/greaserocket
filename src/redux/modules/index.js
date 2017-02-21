// @flow
import { combineReducers } from 'redux-loop';
import feed from './feed';
import user from './user';
import map from './map';

const rootReducer = combineReducers({ feed, user, map });

export default rootReducer;
