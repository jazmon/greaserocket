exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('locations').del().then(() =>
    // Inserts seed entries
    knex('locations').insert([
      {
        id: 1,
        latitude: 61.504678,
        longitude: 23.774825,
        title: 'Concert',
        description: '',
      },
      {
        id: 2,
        latitude: 61.524678,
        longitude: 23.764825,
        title: 'Party',
        description: 'Cool party!',
      },
      {
        id: 3,
        latitude: 61.504278,
        longitude: 23.772825,
        title: 'Museum',
        description: 'spooky!',
      },
    ])
  );
};
