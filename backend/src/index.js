/* eslint-env node */
const express = require('express');
const morgan = require('morgan');
const Promise = require('bluebird');

const data = require('./data');

const getLocations = (count = 10) => {
  const locations = [];
  for (let i = 0; i < count; i++) {
    locations.push({
      id: `location-${i}`,
      latitude: 61.504678 + 0.001 * i * (i % 2 ? -1 : 1),
      longitude: 23.774825 + 0.001 * i * (i % 4 ? -1 : 1),
      title: `Cool event #${i + 1}`,
      description: 'herp derp 🐶'
    });
  }
  return locations;
};

const PORT = process.env.PORT || 9000;

global.Promise = Promise;

const app = express();
app.use(morgan('dev'));

app.get('/health', async (req, res) => {
  res.status(200).send('Ok');
});

app.get('/feed', async (req, res) => {
  setTimeout(
    () => {
      res.status(200).set('Content-Type', 'application/json').json(data);
    },
    3000
  );
});

app.get('/locations', async (req, res) => {
  setTimeout(
    () => {
      res.status(200).set('Content-Type', 'application/json').json(getLocations(10));
    },
    3000
  );
});

app.listen(PORT, () => {
  console.log(`Greased launchpad listening on port ${PORT}!`);
});
