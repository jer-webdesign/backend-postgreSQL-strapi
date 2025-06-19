const path = require('path');

// module.exports = ({ env }) => ({
//   connection: {
//     client: 'postgres',
//     connection: {
//       host: env('DATABASE_HOST', 'localhost'),
//       port: env.int('DATABASE_PORT', 5432),
//       database: env('DATABASE_NAME', 'strapi'),
//       user: env('DATABASE_USERNAME', 'strapi'),
//       password: env('DATABASE_PASSWORD', 'strapi'),
//       ssl: env.bool('DATABASE_SSL', false) && {
//         rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
//       },
//       schema: env('DATABASE_SCHEMA', 'public'),
//     },
//     pool: {
//       min: env.int('DATABASE_POOL_MIN', 2),
//       max: env.int('DATABASE_POOL_MAX', 10),
//     },
//     acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
//   },
// });

module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST'),
      port: env.int('DATABASE_PORT'),
      database: env('DATABASE_NAME'),
      user: env('DATABASE_USERNAME'),
      password: env('DATABASE_PASSWORD'),
      ssl: env.bool('DATABASE_SSL') ? { rejectUnauthorized: false } : false,
    },
  },
});

