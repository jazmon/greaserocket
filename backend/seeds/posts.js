exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del().then(() =>
    // Inserts seed entries
    knex('posts').insert([
      {
        id: 1,
        content: ':D moro äiät :D',
        user_id: 'test',
      },
      {
        id: 2,
        content: '🍺🍺🍺🍺🍺🍺🍺',
        user_id: 'test',
      },
      {
        id: 3,
        content: 'vähä hiliast',
        user_id: 'test',
      },
      {
        id: 4,
        content: 'mikä meno',
        user_id: 'test',
      },
    ])
  );
};
