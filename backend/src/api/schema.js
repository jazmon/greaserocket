const { merge } = require('lodash');
const { makeExecutableSchema } = require('graphql-tools');
const { schema: sqlSchema, resolvers: sqlResolvers } = require('./sql/schema');

const rootSchema = [
  `
type Query {
  #posts: [Post]
  messages: [Message]
  #locations: [Location]
  #users: [User]
  # Return the currently logged in user, or null if nobody is logged in
  currentUser: User
}
schema {
  query: Query
}
`,
];

const rootResolvers = {
  Query: {
    messages(root, args, context) {
      return context.Messages.getAll();
    },
    currentUser(root, args, context) {
      return context.user || null;
    },
  },
};

// Put schema together into one array of schema strings
// and one map of resolvers, like makeExecutableSchema expects
const schema = [...rootSchema, ...sqlSchema];
const resolvers = merge(rootResolvers, sqlResolvers);

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

module.exports = executableSchema;
