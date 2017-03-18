const _ = require('lodash');

const data = [
  {
    id: 'story-0',
    text: 'Hello, World!',
    author: {
      id: 'author-0',
      profilePictureUrl: 'http://loremflickr.com/320/240/dog?asdf=0',
      name: 'Jack Johnson',
    },
  },
  {
    id: 'story-1',
    text: 'I like trains',
    author: {
      id: 'author-1',
      profilePictureUrl: 'http://loremflickr.com/320/240/dog?foo=1',
      name: 'John Jackson',
    },
  },
];

function getRandomString(length = 7) {
  return Math.random().toString(36).substring(length);
}

function generateFeedData(count = 10) {
  return _.range(count).map(e => ({
    id: `story-${e}`,
    text: getRandomString(24),
    author: {
      id: `author-${e}`,
      profilePictureUrl: `http://loremflickr.com/320/240/dog?${getRandomString(4)}=${e}`,
      name: getRandomString(12),
    },
  }));
}
const foobar = generateFeedData(10);

module.exports = foobar;
