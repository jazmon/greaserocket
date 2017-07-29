// @flow
import { Middleware, MiddlewareAPI, Dispatch } from 'redux';
import config from 'constants/config';
import { Action } from 'types';
import { Auth0Token } from 'types/auth';
import { ReduxState } from 'redux/modules';

function trimBaseUrl(url: string): string {
  return url.endsWith('/') ? url.substring(0, url.length - 1) : url;
}
const BASE_URL: string = trimBaseUrl(config.BACKEND.URL);

export const CALL_API = 'CALL_API';

class ResponseError extends Error {
  response: Response;
}

type JsonData = Object[] | Object;

export function checkStatus(response: Response): Response {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new ResponseError(response.statusText);
  error.response = response;
  throw error;
}

export async function callApi(
  endpoint: string,
  authenticated: boolean,
  token: Auth0Token | null,
): Promise<JsonData> {
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
    const response: Response | {} = await Promise.race([
      fetch(url, fetchConfig),
      new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('request timeout')), 5000);
      }),
    ]);
    if (!(response instanceof Response)) {
      throw new Error('request timed out, response was not response');
    }
    checkStatus(response);
    const json: JsonData = await response.json();
    return json;
  } catch (e) {
    return Promise.reject(e);
  }
}

type ApiActionProps = {
  types: string[];
  authenticated?: boolean;
  endpoint: string;
};

// export type ApiAction = Action<ApiActionProps>;
export type ApiAction = {
  type: 'CALL_API';
  payload: ApiActionProps;
};
interface ActionType {
  type: string;
}
export const middleware: Middleware = (store: MiddlewareAPI<ReduxState>) => (
  next: Dispatch<ReduxState>,
) => async (action: Action<any>): Promise<any> => {
  if (action.type !== CALL_API) {
    return next(action);
  }

  const token: Auth0Token | null = store.getState().user.token;
  console.log('store.getState()', store.getState());
  console.log('FOOBAR token', token);
  // cast the type now that it's known
  const apiAction: ApiAction = action as ApiAction;
  const { endpoint, types, authenticated = true } = apiAction.payload;
  const [startType, successType, errorType] = types;
  // Dispatch that the action has started
  store.dispatch({
    type: startType,
  });
  try {
    const response = await callApi(endpoint, authenticated, token);
    // dispatch the success action
    return next({
      payload: response,
      meta: authenticated,
      type: successType,
    });
  } catch (error) {
    // dispatch the failure action
    return next({
      payload: error,
      meta: error.message || 'Error during api call',
      type: errorType,
    });
  }
};

export default middleware;
