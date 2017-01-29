/* eslint-env node */
const express = require('express');
const Promise = require('bluebird');

const data = require('./data');

global.Promise = Promise;

const app = express();

app.get('/', async (req, res) => {
  setTimeout(() => {
    res
      .status(200)
      .set('Content-Type', 'application/json')
      .json(data);
  }, 200);
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
