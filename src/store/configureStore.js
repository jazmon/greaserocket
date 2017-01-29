// @flow
/* eslint-disable import/no-extraneous-dependencies */
import { createStore, applyMiddleware, compose } from 'redux';
import devTools from 'remote-redux-devtools';
import createLogger from 'redux-logger';
import { install as installLoop } from 'redux-loop';

// import { apiMiddleware } from 'redux/middleware/api';
import rootReducer from '../redux/modules/index';

const loggerMiddleware = createLogger();

const middlewares = [
];

const devMiddlewares = [
  ...middlewares,
  loggerMiddleware,
];

const enhancers = [
  applyMiddleware(...middlewares),
];

const devEnhancers = [
  applyMiddleware(...devMiddlewares),
  devTools(),
];

const enhancer = compose(
  installLoop(),
  ...__DEV__ ? devEnhancers : enhancers,
);

const configureStore = (initialState?: Object) => {
  const store = createStore(rootReducer, initialState, enhancer);

  if (__DEV__ && module.hot) {
    // $FlowIssue
    module.hot.accept('../redux/modules/index', () =>
      // eslint-disable-next-line global-require
      store.replaceReducer(require('../redux/modules/index').default)
    );
  }

  return store;
};

// export default configureStore;
module.exports = configureStore;
