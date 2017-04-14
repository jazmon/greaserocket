// @flow
import { combineReducers } from 'redux-loop';
import type { Reducer } from 'redux';
import type { Action } from 'types';
import feed from './feed';
import user from './user';
import map from './map';

import type { State as FeedState } from './feed';
import type { State as UserState } from './user';
import type { State as MapState } from './map';

export type ReduxState = {
  feed: FeedState,
  user: UserState,
  map: MapState,
};

const rootReducer: Reducer<ReduxState, Action> = combineReducers({
  feed,
  user,
  map,
});

export default rootReducer;
