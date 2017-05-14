/* eslint-env node */
// TODO: add winston
require('dotenv').config();
const Promise = require('bluebird');

global.Promise = Promise;
const express = require('express');
const knex = require('./db');

const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 9000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/');
app.get('/health', async (req, res) => {
  res.status(200).send('Ok');
});
app
  .route('/users')
  .get(async (req, res) => {
    try {
      const collection = await knex
        .withSchema('public')
        .table('users')
        .select();
      return res.json({ error: false, data: collection });
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
        res
          .status(500)
          .set('Content-Type', 'application/json')
          .set('Content-Type', 'application/json')
          .json({
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
      const rows = await knex.table('messages').select();
      return res
        .status(200)
        .set('Content-Type', 'application/json')
        .json({ error: false, data: rows });
    } catch (e) {
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
      return res
        .status(500)
        .set('Content-Type', 'application/json')
        .json({ error: true, data: { message: e.message } });
    }
  });
app.get('/posts', async (req, res) => {
  try {
    const rows = await knex
      .table('posts')
      .innerJoin('users', 'posts.user_id', 'users.user_id')
      .select(knex.raw('posts.*, row_to_json(users.*) as author'));
    return res
      .status(200)
      .set('Content-Type', 'application/json')
      .json({ error: false, data: rows });
  } catch (e) {
    return res
      .status(500)
      .set('Content-Type', 'application/json')
      .json({ error: false, data: { message: e.message } });
  }
});
app.get('/locations', async (req, res) => {
  try {
    const rows = await knex.table('locations').select();
    return res
      .status(200)
      .set('Content-Type', 'application/json')
      .json({ error: false, data: rows });
  } catch (e) {
    return res
      .status(500)
      .set('Content-Type', 'application/json')
      .json({ error: false, data: { message: e.message } });
  }
});
io.on('connection', (socket) => {
  const defaultRoom = 'general';
  socket.on('new user', async(data) => {
    console.log('new user', data);
    await knex('users').insert({
      user_id: data.userId,
    });
    socket.join(defaultRoom);
    io.in(defaultRoom).emit('user joined', data);
  });
  socket.on('new message', async (data) => {
    console.log('new mewssage', data);
    // TODO: joi validation
    const messages = await knex.table('messages')
      .insert({
        content: data.content,
        user_id: data.userId,
      }).returning(['content', 'user_id']);
    console.log('message', messages);
    socket.emit('message', messages[0].content);
  });
});

server.listen(PORT, () => {
  console.log(`Greased launchpad listening on port ${PORT}!`);
});
