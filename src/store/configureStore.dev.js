// @flow
/* eslint-disable import/no-extraneous-dependencies */
import { createStore, applyMiddleware, compose } from 'redux';
import devTools from 'remote-redux-devtools';
import createLogger from 'redux-logger';
import { install as installLoop } from 'redux-loop';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import rootReducer from '../redux/modules/index';
import apiMiddleware from '../redux/middleware/api';

const loggerMiddleware = createLogger();

const enhancer = compose(
  installLoop(),
  // Middleware you want to use in development:
  applyMiddleware(apiMiddleware, loggerMiddleware),
  autoRehydrate(),
  devTools(),
);

const configureStore = (initialState?: Object) => {
  const store = createStore(rootReducer, initialState, enhancer);

  // begin periodically persisting the store
  persistStore(store, { storage: AsyncStorage });

  if (module.hot) {
    // eslint-disable-next-line max-len
    // $FlowIssue Line below produces "call of method `accept`. Method cannot be called on 'hot' of unknown type".
    module.hot.accept('../redux/modules/index', () =>
      // eslint-disable-next-line global-require
      store.replaceReducer(require('../redux/modules/index').default));
  }

  return store;
};

// export default configureStore;
module.exports = configureStore;
