const { property, constant } = require('lodash');

exports.schema = [
  `
  type Post {
    # The SQL ID of this entry
    id: Int!
    createdAt: String!
    updatedAt: String!
    content: String
    user: User!
    # comments(limit: Int, offset: Int): [Comment]!
  }
  type Message {
    # The SQL ID of this entry
    id: Int!
    createdAt: String!
    updatedAt: String!
    content: String
    user: User!
  }
  type Location {
    # The SQL ID of this entry
    id: Int!
    createdAt: String!
    updatedAt: String!
    latitude: Float!
    longitude: Float!
    title: String
    description: String
  }
  type User {
    # The ID of this entry from Auth0
    user_id: String!
    createdAt: String!
    updatedAt: String!
    name: String
    email: String
    picture: String
    nickname: String
  }
`,
];
exports.resolvers = {
  Message: {
    createdAt: property('created_at'),
    updatedAt: property('updated_at'),
    user({ user_id }, _, context) {
      return context.Users.getUserById(user_id);
    },
  },
  Post: {
    createdAt: property('created_at'),
    updatedAt: property('updated_at'),
    user({ user_id }, _, context) {
      return context.Users.getUserById(user_id);
    },
  },
  User: {
    createdAt: property('created_at'),
    updatedAt: property('updated_at'),
  },
  Location: {
    createdAt: property('created_at'),
    updatedAt: property('updated_at'),
  },
};
