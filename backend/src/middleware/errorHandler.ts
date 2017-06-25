import logger from '../logger';
import { Request, Response } from 'express';
import { HttpError } from '../types';

const errorHandler = (err: Error | HttpError, req: Request, res: Response, next: Function) => {
  logger.error(err.message, err.stack);
  let status: number = 500;
  if (err instanceof HttpError) {
    status = err.status;
  }
  res
    .status(status)
    .json({ error: true, message: err.message || 'Something went wrong' });
};

export default errorHandler;
