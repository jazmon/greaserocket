// Update with your config settings.
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.PG_HOST || 'localhost',
      database: process.env.PG_DATABASE || 'greaserocket',
      user: process.env.PG_USER || 'greaserocket',
      password: process.env.PG_PASSWORD || 'greaserocket',
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    acquireConnectionTimeout: 1000,
    // debug: true,
  },

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user: 'username',
  //     password: 'password',
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },
  // },
  //
  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user: 'username',
  //     password: 'password',
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations',
  //   },
  // },
};
