const AuthenticationClient = require('auth0').AuthenticationClient;
const jwt = require('jwt-decode');
const Joi = require('joi');

const auth0 = new AuthenticationClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
});

module.exports = async (req, res, next) => {
  // Extract token from headers, and strip away the 'Bearer'
  const token = req.get('authorization').substr(7);
  try {
    // verify tokenn
    jwt(token);

    const user = await auth0.tokens.getInfo(token);
    // eslint-disable-next-line no-param-reassign
    req.user = {
      email: user.email,
      userId: user.user_id,
      picture: user.picture,
      name: user.name,
      nickname: user.nickname,
    };
    return next();
  } catch (e) {
    throw e;
  }
};
