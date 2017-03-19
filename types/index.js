
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
