require('dotenv').config();

module.exports = {
  // using cwd allows no conflict with dotenv (and maybe other issues)
  // https://github.com/motdotla/dotenv/issues/229
  apps: [{
    name: 'api-usa',
    cwd: './api/partials/',
    script: 'api-usa.js',
    instances: 2,
    exec_mode: 'cluster',
    // https://pm2.keymetrics.io/docs/usage/environment/
    instance_var: 'INSTANCE_ID',
    env: {
      NODE_ENV: 'development',
      // DEBUG: '*',
      CN_AWS_DDB_KEY: process.env.CN_AWS_DDB_KEY,
      CN_AWS_DDB_SECRET: process.env.CN_AWS_DDB_SECRET,
      CN_AWS_S3_KEY: process.env.CN_AWS_S3_KEY,
      CN_AWS_S3_SECRET: process.env.CN_AWS_S3_SECRET,
      CN_GMAPS_API_KEY: process.env.CN_GMAPS_API_KEY,
    },
    // call with flag --env production
    // inherits all from env: {} and overrides
    env_production: {
      NODE_ENV: 'production',
    },
  }],
};
