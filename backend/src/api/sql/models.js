const knex = require('../../db');

class Messages {
  getAll() {
    return knex('messages').then(rows => rows);
  }
  getMessageById(id) {
    const query = knex('messages').where({ id });
    return query.then(([row]) => row);
  }
}
exports.Messages = Messages;
class Posts {
  getPostById(id) {
    const query = knex('posts').where({ id });
    return query.then(([row]) => row);
  }
}
exports.Posts = Posts;
class Locations {
  getLocationById(id) {
    const query = knex('locations').where({ id });
    return query.then(([row]) => row);
  }
}
exports.Locations = Locations;
class Users {
  getUserById(id) {
    const query = knex('users').where({ user_id: id });
    return query.then(([row]) => row);
  }
}
exports.Users = Users;
