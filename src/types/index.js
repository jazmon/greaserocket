// @flow
export type Action<T> = {
  type: string,
  error?: ?boolean,
  payload: T,
  meta?: ?any,
};

export type Handler<S> = {
  [key: string]: (state: S, action: Action<any>) => S,
};

export type Location = {
  id: string,
  latitude: number,
  longitude: number,
  title: string,
  description: string,
};

type Author = {
  id: string,
  picture: ?string,
  name: string,
  nickname: string,
};

export type Story = {
  id: string,
  content: string,
  author: Author,
};
