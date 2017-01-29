declare type StateType = Object;
declare type ActionType = {
  type: string,
  payload?: Object | number | string,
  error?: Error,
  meta?: any,
}
