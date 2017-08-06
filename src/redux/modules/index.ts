// @flow
import { combineReducers } from 'redux-loop';
import { Reducer } from 'redux';
import feed from './feed';
// import user from './user';
import map from './map';

import { FeedState, FeedAction } from './feed';
// import { UserState, UserAction } from './user';
import { MapState, MapAction } from './map';
import { ApiAction } from '../middleware/api';

export type ReduxState = {
  feed: FeedState;
  // user: UserState;
  map: MapState;
};

export type ReduxAction = FeedAction | MapAction /*| UserAction */ | ApiAction;
const rootReducer: Reducer<ReduxState> = combineReducers({
  feed,
  // user,
  map,
});

export default rootReducer;
