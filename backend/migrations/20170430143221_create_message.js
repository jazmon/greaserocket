exports.up = function (knex, Promise) {
  return knex.schema.createTable('messages', t => {
    t.bigIncrements().primary();
    t.timestamps(true, true);
    t.text('content');
    t
      .string('user_id')
      .references('users.user_id')
      .onUpdate('CASCADE')
      .onDelete('SET NULL');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('messages');
};
