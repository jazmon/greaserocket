// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import { install as installLoop } from 'redux-loop';
import rootReducer from '../redux/modules/index';

// Middleware you want to use in production:
const enhancer = compose(
  installLoop(),
  // applyMiddleware(
  // )
);

const configureStore = (initialState?: Object) =>
  createStore(rootReducer, initialState, enhancer);

// export default configureStore;
module.exports = configureStore;
