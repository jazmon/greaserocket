exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', t => {
    t.timestamps(true, true);
    t.string('name');
    t.string('email');
    t.string('picture');
    t.string('nickname');
    // eslint-disable-next-line newline-per-chained-call
    t.string('user_id').primary().notNullable().unique().index();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users');
};
