const { Posts } = require('../api/sql/models');
const { createJsonRoute } = require('../utils/endpoint');

const posts = new Posts();
const getPosts = createJsonRoute(async () => {
  const ps = await posts.getAll();
  return ps;
});

module.exports = {
  getPosts,
};
