/* eslint-env node */
const express = require('express');
const morgan = require('morgan');
const Promise = require('bluebird');

const data = require('./data');

const PORT = process.env.PORT || 9000;

global.Promise = Promise;

const app = express();
app.use(morgan('dev'));


app.get('/health', async (req, res) => {
  res.status(200).send('Ok');
});

app.get('/feed', async (req, res) => {
  setTimeout(() => {
    res
      .status(200)
      .set('Content-Type', 'application/json')
      .json(data);
  }, 200);
});

app.listen(PORT, () => {
  console.log(`Greased launchpad listening on port ${PORT}!`);
});
