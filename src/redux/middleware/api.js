// @flow
import config from '../../constants/config';

function trimBaseUrl(url) {
  return url.endsWith('/') ? url.substring(0, url.length - 1) : url;
}
const BASE_URL = trimBaseUrl(config.BACKEND.URL);

export const CALL_API = 'greaserocket/api/CALL_API';

class ResponseError extends Error {
  response: Response;
}

declare class Response {
  constructor(input?: string | URLSearchParams | FormData | Blob, init?: ResponseOptions): void,
  clone(): Response,
  static error(): Response,
  static redirect(url: string, status: number): Response,

  type: ResponseType,
  url: string,
  useFinalURL: boolean,
  ok: boolean,
  status: number,
  statusText: string,
  headers: Headers,

  // Body methods and attributes
  bodyUsed: boolean,
  body: ?ReadableStream,

  arrayBuffer(): Promise<ArrayBuffer>,
  blob(): Promise<Blob>,
  formData(): Promise<FormData>,
  json(): Promise<any>,
  text(): Promise<string>,
}

function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new ResponseError(response.statusText);
  error.response = response;
  throw error;
}

async function callApi(endpoint: string, authenticated: boolean, token: ?Auth0Token): Promise<*> {
  let fetchConfig = {};

  if (authenticated) {
    if (token) {
      fetchConfig = {
        ...fetchConfig,
        headers: { Authorization: `${token.tokenType} ${token.idToken}` },
      };
    } else {
      throw new Error('No token saved!');
    }
  }
  const url = `${BASE_URL}/${endpoint}`;

  try {
    const response = await Promise.race([
      fetch(url, fetchConfig),
      new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('request timeout')), 5000);
      }),
    ]);
    checkStatus(response);
    const json = await response.json();
    return json;
  } catch (e) {
    return Promise.reject(e);
  }
}

export default (store: Object) =>
  (next: Function) =>
    (action: Object): Promise<*> => {
      const callAPI = action[CALL_API];

      if (typeof callAPI === 'undefined') {
        return next(action);
      }

      const token: ?Auth0Token = store.getState().user.token;

      const { endpoint, types, authenticated } = callAPI;
      const [, successType, errorType] = types;
      return callApi(endpoint, authenticated, token)
        .then(
          response =>
            next({ payload: response, meta: authenticated, type: successType.toString() }),
          // error => next({
          //   payload: error,
          //   meta: error.message || 'Error during api call',
          //   type: errorType.toString(),
          // }),
          error => next(errorType(error)),
        )
        .catch(err => next(errorType(err)));
    };
