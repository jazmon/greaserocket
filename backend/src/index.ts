/* eslint-env node */
import * as dotenv from 'dotenv';
dotenv.config();

import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';

import * as cors from 'cors';
import * as http from 'http';
import * as helmet from 'helmet';
import * as jwt from 'express-jwt';

import logger from './logger';
import router from './router';
import authenticator from './middleware/authenticator';
import errorHandler from './middleware/errorHandler';
import graphiql from './middleware/graphiql';
import graphql from './middleware/graphql';
import createSocketServer from './socketServer';

const app = express();
const server: http.Server = http.createServer(app);
createSocketServer(server);

const PORT: number = process.env.PORT || 9000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use('/graphiql', graphiql);
app.use('/graphql', graphql);

app.use(jwt({ secret: process.env.AUTH0_SECRET, credentialsRequired: false }));
app.use(authenticator);

app.use('/v1', router);


app.get('/health', async (req: express.Request, res: express.Response) => {
  res.status(200).send('Ok');
});

app.use(errorHandler);

server.listen(PORT, () => {
  logger.info(`Greased launchpad listening on port ${PORT}!`);
});
