import { execute } from 'graphql';
import * as express from 'express';
import { graphqlExpress } from 'graphql-server-express';
import { ExpressHandler } from 'graphql-server-express/dist/expressApollo';
import { Messages, Users, Locations, Posts } from '../api/sql/models';
import { GraphQLOptions } from 'graphql-server-core';
import schema from '../api/schema';
import { MyRequest, User } from '../types';

export interface Context {
  user: User | null,
  Messages: Messages,
  Users: Users,
  Locations: Locations,
  Posts: Posts,
}

const graphql = graphqlExpress((req: express.Request) => {
  // Get the query, the same way express-graphql does it
  // https://github.com/graphql/express-graphql/blob/3fa6e68582d6d933d37fa9e841da5d2aa39261cd/src/index.js#L257
  const query = req.query.query || req.body.query;
  if (query && query.length > 2000) {
    // None of our app's queries are this long
    // Probably indicates someone trying to send an overly expensive query
    throw new Error('Query too large.');
  }

  let user;
  if (req.user) {
    user = Object.assign({}, req.user);
  }

  return {
    schema,
    context: {
      user,
      Messages: new Messages(),
      Users: new Users(),
      Locations: new Locations(),
      Posts: new Posts(),
    },
  };
});

export default graphql;
