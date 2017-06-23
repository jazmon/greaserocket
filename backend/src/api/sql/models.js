const knex = require('../../db');

class Messages {
  async getAll() {
    return knex('messages');
  }
  async getAllWithUsers() {
    const messages = await knex('messages')
      .select(knex.raw('messages.*, row_to_json(users.*) as user'))
      .innerJoin('users', 'messages.user_id', 'users.user_id');
    return messages;
  }
  getMessageById(id) {
    const query = knex('messages').where({ id });
    return query.then(([row]) => row);
  }

  async submitMessage({ content, userId }) {
    const id = await knex.transaction(trx =>
      trx('messages').insert({
        content,
        user_id: userId,
      })
    );
    return id;
  }
}

exports.Messages = Messages;

class Posts {
  async getAll() {
    return knex('posts');
  }
  async getAllWithUsers() {
    const posts = await knex
      .table('posts')
      .innerJoin('users', 'posts.user_id', 'users.user_id')
      .select(knex.raw('posts.*, row_to_json(users.*) as author'));
    return posts;
  }
  getPostById(id) {
    const query = knex('posts').where({ id });
    return query.then(([row]) => row);
  }
}

exports.Posts = Posts;

class Locations {
  async getAll() {
    return knex('locations');
  }
  getLocationById(id) {
    const query = knex('locations').where({ id });
    return query.then(([row]) => row);
  }
}

exports.Locations = Locations;

class Users {
  async getAll() {
    return knex('users');
  }
  getUserById(id) {
    const query = knex('users').where({ user_id: id });
    return query.then(([row]) => row);
  }
  async createUser({ userId, name, email, picture, nickname }) {
    return knex('users')
      .insert({ user_id: userId, name, email, picture, nickname })
      .returning('user_id');
  }
}

exports.Users = Users;
