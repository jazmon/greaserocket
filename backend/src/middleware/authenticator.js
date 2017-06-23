const AuthenticationClient = require('auth0').AuthenticationClient;
const jwt = require('jwt-decode');

const auth0 = new AuthenticationClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
});

module.exports = async (req, res, next) => {
  try {
    // Extract token from headers, and strip away the 'Bearer'
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next();
    }
    const token = authHeader.split('Bearer ')[0];
    // verify token
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
    return next(e);
  }
};
