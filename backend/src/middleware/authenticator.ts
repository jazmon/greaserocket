import { AuthenticationClient } from 'auth0';
import { Request, Response } from 'express';
import * as jwt from 'jwt-decode';

// HACK: set to any since auth0 type doesn't have tokens property correctly
const auth0: any = new AuthenticationClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
});

export default async (req: Request, res: Response, next: Function) => {
  try {
    // Extract token from headers, and strip away the 'Bearer'
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next();
    }
    if (authHeader instanceof Array) {
      return next(new Error());
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
