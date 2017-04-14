// @flow
import type { Middleware, MiddlewareAPI, Dispatch } from 'redux';
import config from 'constants/config';
import type { Action } from 'types';
import type { ReduxState } from 'redux/modules';

function trimBaseUrl(url: string): string {
  return url.endsWith('/') ? url.substring(0, url.length - 1) : url;
}
const BASE_URL: string = trimBaseUrl(config.BACKEND.URL);

export const CALL_API = 'greaserocket/api/CALL_API';

class ResponseError extends Error {
  response: Response;
}

type JsonData = Array<Object> | Object;

declare class Response {
  constructor(
    input?: string | URLSearchParams | FormData | Blob,
    init?: ResponseOptions
  ): void,
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

function checkStatus(response: Response): Response {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new ResponseError(response.statusText);
  error.response = response;
  throw error;
}

async function callApi(
  endpoint: string,
  authenticated: boolean,
  token: ?Auth0Token
): Promise<any> {
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
    const response: Response = await Promise.race([
      fetch(url, fetchConfig),
      new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('request timeout')), 5000);
      }),
    ]);
    checkStatus(response);
    const json: JsonData = await response.json();
    return json;
  } catch (e) {
    return Promise.reject(e);
  }
}

type ApiAction = Action<{
  types: Array<string>,
  authenticated?: boolean,
  endpoint: string,
}>;

const middleware: Middleware<ReduxState, Action<any>> = (
  store: MiddlewareAPI<ReduxState, Action<any>>
) => (next: Dispatch<Action<any>>) => (
  action: ApiAction
): Promise<Dispatch<Action<any>>> => {
  if (action.type !== CALL_API) {
    return next(action);
  }

  const token: ?Auth0Token = store.getState().user.token;
  const { endpoint, types, authenticated } = action.payload;
  const [startType, successType, errorType] = types;
  store.dispatch({
    type: startType,
  });
  return callApi(endpoint, authenticated, token)
    .then(
      (response: JsonData) =>
        next({
          payload: response,
          meta: authenticated,
          error: false,
          type: successType,
        }),
      (error: Error) =>
        next({
          payload: error,
          error: true,
          meta: error.message || 'Error during api call',
          type: errorType,
        })
    )
    .catch((error: Error) =>
      next({
        payload: error,
        error: true,
        meta: error.message || 'Error during api call',
        type: errorType,
      })
    );
};

export default middleware;
