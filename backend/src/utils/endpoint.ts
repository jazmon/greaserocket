import logger from '../logger';
import * as express from 'express';
import { Response } from 'express-serve-static-core';

export const createJsonRoute = (handler: Function) => async (req: express.Request, res: express.Response) => {
  try {
    const result = await handler(req, res);
    return res.json({
      data: result,
      error: false,
    });
  } catch (err) {
    logger.error(err);
    return res
      .status(500)
      .set('Content-Type', 'application/json')
      .json({ error: true, data: { message: err.message } });
  }
};

