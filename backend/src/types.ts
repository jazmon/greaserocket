import * as express from 'express';

export interface User {
  userId: string,
}

export interface MyRequest extends express.Request {
  user: User | null,
}

export class HttpError extends Error {
  status: number;
}
