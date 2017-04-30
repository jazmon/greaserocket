exports.up = function (knex, Promise) {
  const locationsPromise = knex.schema
    .createTable('locations', t => {
      t.increments().primary();
      t.timestamps(true, true);
      t.float('latitude');
      t.float('longitude');
      t.string('title');
      t.text('description');
    })
    .then(() => {
      console.log('messages table created');
    })
    .catch(() => {
      console.log('There was an error with the messages table');
    });
  const postsPromise = knex.schema.createTable('posts', t => {
    t.increments().primary();
    t.timestamps(true, true);
    t.text('content');
    t.string('user_id').references('users.user_id');
  });
  return Promise.all([locationsPromise, postsPromise]);
};

exports.down = function (knex, Promise) {
  const locationsPromise = knex.schema.dropTable('locations');
  const postsPromise = knex.schema.dropTable('posts');

  return Promise.all([locationsPromise, postsPromise]);
};
