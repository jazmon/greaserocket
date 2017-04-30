exports.up = function (knex, Promise) {
  return knex.schema
    .createTable('messages', t => {
      t.increments().primary();
      t.timestamps(true, true);
      t.text('content');
      t.string('user_id').references('users.user_id');
      // t.foreign('user_id')
    })
    .then(() => {
      console.log('messages table created');
    })
    .catch(() => {
      console.log('There was an error with the messages table');
    });
};

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTable('messages')
    .then(() => {
      console.log('messages table deleted');
    })
    .catch(() => {
      console.log('there was an error deleting messages table');
    });
};
