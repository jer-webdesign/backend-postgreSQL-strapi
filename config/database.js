const path = require('path');

module.exports = ({ env }) => ({
const useExternalDB = env.bool('USE_EXTERNAL_DB', false);

  if (!useExternalDB) {
    return {};
  }  
  return {
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'wumupngcsqjcnixorxoi.supabase.co'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'postgres'),
      user: env('DATABASE_USERNAME', 'postgres'),
      password: env('DATABASE_PASSWORD'),
      ssl: env.bool('DATABASE_SSL') ? { rejectUnauthorized: false } : false,
    },
    pool: {
      min: 2,
      max: 15,   // increase max connections if needed
    },
  },
 },   
});

