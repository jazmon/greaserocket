import { Platform } from 'react-native';

const isAndroid = Platform.OS === 'android';
export default {
  NAVIGATION: {
    URI_PREFIX: 'greaserocket',
  },
  BACKEND: {
    URL: `http://${isAndroid ? '10.0.2.2' : 'localhost'}:9000/`,
  },
  AUTH: {
    CLIENT_ID: 'U1uzzaXr5XKqf7yUZwqpwn8ENofO1KMo',
    DOMAIN: 'jaz.eu.auth0.com',
  },
};
