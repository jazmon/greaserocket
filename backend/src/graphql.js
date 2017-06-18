const { execute, subscribe } = require('graphql');
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const { Messages, Users } = require('./api/sql/models');
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
    // We get req.user from passport-github with some pretty oddly named fields,
    // let's convert that to the fields in our schema, which match the GitHub
    // API field names.
    user = {
      login: req.user.username,
      html_url: req.user.profileUrl,
      avatar_url: req.user.photos[0].value,
    };
  }

  return {
    schema,
    context: {
      user,
      Messages: new Messages(),
      Users: new Users(),
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
