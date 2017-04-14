export type Action<T> = {
  type: string,
  error?: ?boolean,
  payload?: ?T,
  error?: ?Boolean,
  meta?: ?string,
};

export type Handler<T> = {
  [key: string]: (state: T, action: Action<*>) => T,
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
}

export type Story = {
  id: string,
  text: string,
  author: Author,
};
