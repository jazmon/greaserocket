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
  profilePictureUrl: string,
  name: string,
};

export type Story = {
  id: string,
  text: string,
  author: Author,
};
