// @flow
const configureStore =
  process.env.NODE_ENV === 'production'
    ? require('./configureStore.prod.ts')
    : require('./configureStore.dev.ts');

export default configureStore;
