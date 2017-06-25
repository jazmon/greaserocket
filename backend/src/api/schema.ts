import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';
import { schema as sqlSchema, resolvers as sqlResolvers } from './sql/schema';
import { GraphQLSchema } from 'graphql';
import { Context } from '../middleware/graphql';
const rootSchema = [
  `
    type Query {
      posts: [Post]
      messages: [Message]
      locations: [Location]
      users: [User]
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
    messages(root: any, args: any, context: Context) {
      return context.Messages.getAll();
    },
    currentUser(root: any, args: any, context: Context) {
      return context.user || null;
    },
    posts(root: any, args: any, context: Context) {
      return context.Posts.getAll();
    },
    locations(root: any, args: any, context: Context) {
      return context.Locations.getAll();
    },
    users(root: any, args: any, context: Context) {
      return context.Users.getAll();
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

export default executableSchema;
