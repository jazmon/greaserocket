export type Maybe<T> = T | null;
export type Readonly<T> = { readonly [P in keyof T]: T[P] };
export type Partial<T> = { [P in keyof T]?: T[P] };
export type Nullable<T> = { [P in keyof T]: T[P] | null };

export class HttpError extends Error {
  status: number;
}

export interface BaseModel {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface Action<T> {
  type: string;
  error?: boolean | null;
  payload: T;
  meta?: any;
}

export interface Handler<S> {
  [key: string]: (state: S, action: Action<any>) => S;
}

export interface Location {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
  description: string;
}

export interface Author {
  id: string;
  picture: string | null;
  name: string;
  nickname: string;
}

export interface Story {
  id: string;
  content: string;
  author: Author;
}
