// @flow
import { combineReducers } from 'redux-loop';
import type { Reducer } from 'redux';
import feed from './feed';
import user from './user';
import map from './map';

import type { FeedState, FeedAction } from './feed';
import type { UserState, UserAction } from './user';
import type { MapState, MapAction } from './map';
import type { ApiAction } from '../middleware/api';

export type ReduxState = {
  feed: FeedState,
  user: UserState,
  map: MapState,
};

export type ReduxAction = FeedAction | MapAction | UserAction | ApiAction;
const rootReducer: Reducer<ReduxState, ReduxAction> = combineReducers({
  feed,
  user,
  map,
});

export default rootReducer;
