const { Locations } = require('../api/sql/models');
const { createJsonRoute } = require('../utils/endpoint');

const locations = new Locations();
const getLocations = createJsonRoute(async () => {
  const locs = await locations.getAll();
  return locs;
});

module.exports = {
  getLocations,
};
