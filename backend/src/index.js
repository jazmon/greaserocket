/* eslint-env node */
// TODO: add winston
require('dotenv').config();
const Promise = require('bluebird');

global.Promise = Promise;
const express = require('express');
const logger = require('./logger');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const jwt = require('express-jwt');
const createRouter = require('./router');
const authenticator = require('./middleware/authenticator');
const errorHandler = require('./middleware/errorHandler');
const { graphql, graphiql } = require('./graphql');

const app = express();
const server = require('http').createServer(app);
// const io = require('socket.io')(server);
require('./socketServer')(server);

const PORT = process.env.PORT || 9000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use('/graphiql', graphiql);
app.use('/graphql', graphql);

app.use(jwt({ secret: process.env.AUTH0_SECRET, credentialsRequired: false }));
app.use(authenticator);

app.use('/v1', createRouter());


app.get('/health', async (req, res) => {
  res.status(200).send('Ok');
});

app.use(errorHandler);

server.listen(PORT, () => {
  logger.info(`Greased launchpad listening on port ${PORT}!`);
});
