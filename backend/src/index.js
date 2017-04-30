/* eslint-env node */
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

const data = require('./data');

const getLocations = (count = 10) => {
  const locations = [];
  for (let i = 0; i < count; i++) {
    locations.push({
      id: `location-${i}`,
      latitude: 61.504678 + 0.001 * i * (i % 2 ? -1 : 1),
      longitude: 23.774825 + 0.001 * i * (i % 4 ? -1 : 1),
      title: `Cool event #${i + 1}`,
      description: 'herp derp 🐶',
    });
  }
  return locations;
};
const PORT = process.env.PORT || 9000;
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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
      .then(id => {
        res.json({
          error: false,
          data: {
            id,
          },
        });
      })
      .catch(err => {
        res.status(500).json({
          error: true,
          data: {
            message: err.message,
          },
        });
      });
  });
app
  .route('/messages')
  .get(async (req, res) => {
    try {
      const rows = await knex.table('messages').select();
      return res.status(200).json({ error: false, data: rows });
    } catch (e) {
      return res
        .status(500)
        .json({ error: false, data: { message: e.message } });
    }
  })
  .post(async (req, res) => {
    try {
      const id = await knex('messages')
        .returning('id')
        .insert(Object.assign({}, req.body));
      return res.status(200).json({ error: false, data: { id } });
    } catch (e) {
      return res
        .status(500)
        .json({ error: true, data: { message: e.message } });
    }
  }); // app.post('/login', async (req, res) => {});
app.get('/feed', async (req, res) => {
  setTimeout(() => {
    res.status(200).set('Content-Type', 'application/json').json(data);
  }, 3000);
});
app.get('/locations', async (req, res) => {
  setTimeout(() => {
    res
      .status(200)
      .set('Content-Type', 'application/json')
      .json(getLocations(10));
  }, 3000);
});
io.on('connection', () => {});
server.listen(PORT, () => {
  console.log(`Greased launchpad listening on port ${PORT}!`);
});
