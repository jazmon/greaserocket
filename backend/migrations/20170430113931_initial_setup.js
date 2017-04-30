const table = t => {
  // t.increments.primary();
  t.timestamps(true, true);
  t.string('name');
  t.string('email');
  t.string('picture');
  t.string('nickname');
  t.string('user_id').primary();
  t.unique('user_id');
};

exports.up = function (knex, Promise) {
  return knex.schema
    .createTable('users', table)
    .then(() => {
      console.log('Users Table created');
    })
    .catch(() => {
      console.log('There was an error with the users table');
    });
};

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTable('users')
    .then(() => {
      console.log('users table deleted');
    })
    .catch(() => {
      console.log('there was an error deleting users table');
    });
};
