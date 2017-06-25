import * as Joi from 'joi';
import { HttpError } from '../types';

export const validateRequest = (value: Object, schema: Object) => {
  Joi.validate(value, schema, err => {
    if (err) {
      const error = new HttpError(err.message);
      error.status = 400;
      throw error;
    }
  });
};

