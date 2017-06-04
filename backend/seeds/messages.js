exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del().then(() =>
    // Inserts seed entries
    knex('users')
      .insert([
        {
          name: 'Kikki Hiiri',
          picture: 'https://i.ytimg.com/vi/nWMMXPlpeRM/hqdefault.jpg',
          nickname: 'Kikki',
          user_id: 'kikki',
        },
        {
          name: 'Gooby',
          picture: 'https://i.imgur.com/e91m7sk.jpg',
          nickname: 'Gooby',
          user_id: 'gooby',
        },
      ])
      .then(() => knex('messages').del().then(() =>
          // Inserts seed entries
          knex('messages').insert([
            { id: 1, content: 'moro äiät :D', user_id: 'kikki' },
            { id: 2, content: 'dolan y u do dis', user_id: 'gooby' },
          ])
        ))
  );
};
