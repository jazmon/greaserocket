// @flow
import { ApolloClient } from 'react-apollo';

export interface ConfigureStoreProps {
  initialState?: Object;
  client: ApolloClient;
}

const configureStore =
  process.env.NODE_ENV === 'production'
    ? require('./configureStore.prod.ts').default
    : require('./configureStore.dev.ts').default;

export default configureStore;
