const { execute, subscribe } = require('graphql');
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const { Messages, Users, Locations, Posts } = require('./api/sql/models');
const schema = require('./api/schema');

const graphql = graphqlExpress(req => {
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

const graphiql = graphiqlExpress({
  endpointURL: '/graphql',
  query: `{
  messages {
    id
  }
}
`,
});

module.exports = {
  graphql,
  graphiql,
};
