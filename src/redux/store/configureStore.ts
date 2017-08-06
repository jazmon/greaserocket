// @flow
const configureStore =
  process.env.NODE_ENV === 'production'
    ? require('./configureStore.prod.ts').default
    : require('./configureStore.dev.ts').default;

export default configureStore;
