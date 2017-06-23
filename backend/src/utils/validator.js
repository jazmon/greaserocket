const Joi = require('joi');

const validateRequest = (value, schema) => {
  Joi.validate(value, schema, err => {
    if (err) {
      const error = new Error(err.message);
      error.status = 400;
      throw error;
    }
  });
};

module.exports = {
  validateRequest,
};
