// @flow
import { handleActions } from 'redux-actions';

import { loop, Effects } from 'redux-loop';
import { createSelector } from 'reselect';
import { uniqueAction, uniqueActionGroup } from '../../utils/actions';
import config from '../../constants/config';

// actionTypes
export const refreshSession = uniqueActionGroup('REFRESH_SESSION', ['start', 'success', 'error']);

// actions
async function doRefreshSession(refreshToken: string) {
  try {
    return {
      type: refreshSession.success.toString(),
      payload: '',
    }
  } catch (err) {
    return {
      type: refreshSession.error.toString(),
      payload: err
    }
  }
}

type State = {
  profile: ?Auth0Profile,
  token: ?Auth0Token,
  loginDate: ?Date,
};

const initialState: State = {
  profile: null,
  token: null,
  loginDate: null,
};


// Reducer
const reducer = handleActions({

}, initialState);

export default reducer;
