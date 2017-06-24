import { graphiqlExpress } from 'graphql-server-express';
import * as express from 'express';

const graphiql = graphiqlExpress({
  endpointURL: '/graphql',
  query: `{
  messages {
    id
  }
}
`,
});

export default graphiql;
