import * as Joi from 'joi';
import * as express from 'express';
import { Response } from 'express-serve-static-core';
import { Messages } from '../api/sql/models';
import { createJsonRoute } from '../utils/endpoint';
import { validateRequest } from '../utils/validator';
import { MyRequest } from '../types';

const messages = new Messages();

export const getMessages = createJsonRoute(async () => {
  const msgs = await messages.getAllWithUsers();
  return msgs;
});

export const submitMessage = createJsonRoute(async (req: MyRequest) => {
  // validate
  const user = req.user;
  const schema = {
    userId: Joi.string().allow(null),
    content: Joi.string().required(),
  };
  const data = Object.assign({}, { userId: user ? user.userId : null }, req.body);

  validateRequest(data, schema);
  return messages.submitMessage(data);
});
