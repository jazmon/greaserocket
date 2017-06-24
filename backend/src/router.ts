const express = require('express');
const locations = require('./endpoints/locations');
const messages = require('./endpoints/messages');
const users = require('./endpoints/users');
const posts = require('./endpoints/posts');

const router = express.Router();

router.get('/locations', locations.getLocations);

router.get('/messages', messages.getMessages);
router.post('/messages', messages.submitMessage);

router.get('/users', users.getUsers);
router.post('/users', users.createUser);

router.get('/posts', posts.getPosts);

export default router;
