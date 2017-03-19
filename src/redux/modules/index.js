// @flow
import { combineReducers } from 'redux-loop';
import type { Reducer } from 'react-redux';
import feed from './feed';
import user from './user';
import map from './map';

const rootReducer: Reducer = combineReducers({ feed, user, map });

export default rootReducer;
