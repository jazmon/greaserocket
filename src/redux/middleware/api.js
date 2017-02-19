// @flow
import { AsyncStorage } from 'react-native';
import config from '../../constants/config';

function trimBaseUrl(url) {
  return url.endsWith('/') ? url.substring(0, url.length - 1) : url;
}
const BASE_URL = trimBaseUrl(config.BACKEND.URL);

export const CALL_API = 'greaserocket/api/CALL_API';
const TOKEN_IDENTIFIER = 'GREASEROCKET/TOKEN';

async function callApi(endpoint: string, authenticated: boolean): Promise<*> {
  console.log('callApi');
  const token: ?Auth0Token = await AsyncStorage.getItem(TOKEN_IDENTIFIER);
  let fetchConfig = {};

  if (authenticated) {
    if (token) {
      fetchConfig = { ...fetchConfig, headers: { Authorization: `${token.type} ${token.idToken}` } };
    } else {
      throw new Error('No token saved!');
    }
  }
  const url = `${BASE_URL}/${endpoint}`;
  console.log('url', url)

  try {
    const response = await fetch(url, fetchConfig);
    console.log('response', response);
    const json = await response.json();
    console.log('json', json);
    return json;
  } catch (e) {
    return Promise.reject(e);
  }
}

export default (store: Object) => (next: Function) => (action: Object): Promise<*> => {
  const callAPI = action[CALL_API];

  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const { endpoint, types, authenticated } = callAPI;
  const [, successType, errorType] = types;
  console.log('api middleware');
  return callApi(endpoint, authenticated).then(
    response => next({ response, authenticated, type: successType.toString() }),
    error => next({ error: error.message || 'Error during api call', type: errorType.toString() }),
  );
};
