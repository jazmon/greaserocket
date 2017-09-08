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
    CLIENT_ID: 'twHGVJBerXcIaUcPOQ2Yg7kJgrGn9lhm',
    DOMAIN: 'jaz.eu.auth0.com',
  },
};
