// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import { install as installLoop } from 'redux-loop';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import rootReducer from '../redux/modules/index';
import apiMiddleware from '../redux/middleware/api';

// Middleware you want to use in production:
const enhancer = compose(installLoop(), applyMiddleware(apiMiddleware), autoRehydrate());

const configureStore = (initialState?: Object) => {
  const store = createStore(rootReducer, initialState, enhancer);
  // begin periodically persisting the store
  persistStore(store, { storage: AsyncStorage });

  return store;
};

// export default configureStore;
module.exports = configureStore;
