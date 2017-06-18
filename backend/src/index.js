/* eslint-env node */
// TODO: add winston
require('dotenv').config();
const Promise = require('bluebird');

global.Promise = Promise;
const express = require('express');
const knex = require('./db');
const logger = require('./logger');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { execute, subscribe } = require('graphql');
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const helmet = require('helmet');
const schema = require('./api/schema');
const { Messages, Users } = require('./api/sql/models');
const createRouter = require('./router');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 9000;

const printJson = json => JSON.stringify(json, null, 2);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

app.use('/v1', createRouter());

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
    query: `{
    messages {
      id
    }
  }
`,
  })
);
app.use(
  '/graphql',
  graphqlExpress(req => {
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
  })
);

app.get('/health', async (req, res) => {
  res.status(200).send('Ok');
});
app
  .route('/users')
  .get(async (req, res) => {
    try {
      const users = await knex.withSchema('public').table('users').select();
      logger.debug('users', { users: printJson(users) });
      return res.json({ error: false, data: users });
    } catch (e) {
      return res.status(500).json({
        error: true,
        data: {
          message: e.message,
        },
      });
    }
  })
  .post(async (req, res) => {
    console.log('req.body', req.body); // TODO: validation w/ joi
    logger.silly('req.body', req.body);

    knex('users')
      .returning('user_id')
      .insert(Object.assign({}, req.body))
      .then(id =>
        res.status(200).set('Content-Type', 'application/json').json({
          error: false,
          data: {
            id,
          },
        })
      )
      .catch(err =>
        res.status(500).set('Content-Type', 'application/json').json({
          error: true,
          data: {
            message: err.message,
          },
        })
      );
  });
app
  .route('/messages')
  .get(async (req, res) => {
    try {
      const messages = await knex('messages')
        .select(knex.raw('messages.*, row_to_json(users.*) as user'))
        .innerJoin('users', 'messages.user_id', 'users.user_id');
      logger.debug('messages', printJson(messages));
      return res
        .status(200)
        .set('Content-Type', 'application/json')
        .json({ error: false, data: messages });
    } catch (e) {
      logger.error('messages GET', e);
      return res
        .status(500)
        .set('Content-Type', 'application/json')
        .json({ error: false, data: { message: e.message } });
    }
  })
  .post(async (req, res) => {
    try {
      const id = await knex('messages')
        .returning('id')
        .insert(Object.assign({}, req.body));
      return res
        .status(200)
        .set('Content-Type', 'application/json')
        .json({ error: false, data: { id } });
    } catch (e) {
      logger.error('messages POST', e);
      return res
        .status(500)
        .set('Content-Type', 'application/json')
        .json({ error: true, data: { message: e.message } });
    }
  });
app.get('/posts', async (req, res) => {
  try {
    const posts = await knex
      .table('posts')
      .innerJoin('users', 'posts.user_id', 'users.user_id')
      .select(knex.raw('posts.*, row_to_json(users.*) as author'));
    logger.debug('posts', posts);
    return res
      .status(200)
      .set('Content-Type', 'application/json')
      .json({ error: false, data: posts });
  } catch (e) {
    logger.error(e);
    return res
      .status(500)
      .set('Content-Type', 'application/json')
      .json({ error: false, data: { message: e.message } });
  }
});
// app.get('/locations', async (req, res) => {
//   try {
//     const locations = await knex.table('locations').select();
//     logger.debug('locations', locations);
//     return res
//       .status(200)
//       .set('Content-Type', 'application/json')
//       .json({ error: false, data: locations });
//   } catch (e) {
//     logger.error(e);
//     return res
//       .status(500)
//       .set('Content-Type', 'application/json')
//       .json({ error: false, data: { message: e.message } });
//   }
// });

io.on('connection', socket => {
  const defaultRoom = 'general';
  socket.on('connection', async data => {
    const maybeUsers = await knex('users')
      .select('user_id')
      .where('user_id', data.userId);
    logger.debug('maybeUsers', maybeUsers);
    if (maybeUsers.length === 0) {
      logger.silly('inserting new user', data.userId);
      await knex('users').insert({
        user_id: data.userId,
        email: data.userId,
        name: data.name,
        nickname: data.nickname,
        picture: data.picture,
      });
      logger.silly('inserted new user', data.userId);
    }
    socket.join(defaultRoom);
    io.in(defaultRoom).emit('user joined', data);
  });
  socket.on('disconnect', () => {
    logger.info('user disconnected');
  });
  socket.on('new_message', async data => {
    logger.debug('new message', data);
    // TODO: joi validation
    const messages = await knex
      .table('messages')
      .insert({
        content: data.content,
        user_id: data.userId,
      })
      .returning('*');
    const message = messages[0];
    logger.debug('message', message);
    // get the user

    const user = await knex
      .table('users')
      .where('user_id', message.user_id)
      .select('*');
    const msgWithUser = Object.assign({}, message, { user: user[0] });
    logger.debug('msgWithUser', printJson(msgWithUser));
    socket.emit('message_emitted', msgWithUser);
  });
});

server.listen(PORT, () => {
  logger.info(`Greased launchpad listening on port ${PORT}!`);
});
