import * as express from 'express';

export interface User {
  userId: string,
  name: string,
  picture: string,
  nickname: string,
  email: string,
}

export interface MyRequest extends express.Request {
  user: User | null,
}

export class HttpError extends Error {
  status: number;
}
