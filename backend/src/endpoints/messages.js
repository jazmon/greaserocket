const Joi = require('joi');
const { Messages } = require('../api/sql/models');
const { createJsonRoute } = require('../utils/endpoint');
const { validateRequest } = require('../utils/validator');

const messages = new Messages();

const getMessages = createJsonRoute(async () => {
  const msgs = await messages.getAllWithUsers();
  return msgs;
});

const submitMessage = createJsonRoute(async req => {
  // validate
  const user = req.user;
  const schema = {
    userId: Joi.string().required(),
    content: Joi.string().required(),
  };
  const data = Object.assign({}, { userId: user.userId }, req.body);

  validateRequest(data, schema);
  return messages.submitMessage(data);
});

module.exports = {
  getMessages,
  submitMessage,
};
