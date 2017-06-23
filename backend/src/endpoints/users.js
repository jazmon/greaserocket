const Joi = require('joi');
const { Users } = require('../api/sql/models');
const { createJsonRoute } = require('../utils/endpoint');
const { validateRequest } = require('../utils/validator');

const users = new Users();
const getUsers = createJsonRoute(async () => {
  const usrs = await users.getAll();
  return usrs;
});

const createUser = createJsonRoute(async req => {
  const user = req.user;
  const schema = {
    userId: Joi.string().required(),
    name: Joi.string(),
    nickname: Joi.string(),
    picture: Joi.string(),
    email: Joi.string(),
  };

  validateRequest(user, schema);
  return users.createUser(user);
});

module.exports = {
  getUsers,
  createUser,
};
