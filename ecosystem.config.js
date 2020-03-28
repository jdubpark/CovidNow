require('dotenv').config()

module.exports = {
  // using cwd allows no conflict with dotenv (and maybe other issues)
  // https://github.com/motdotla/dotenv/issues/229
  apps: [{
    name: 'api-global',
    cwd: './api/partials/',
    script: 'npm',
    args: 'run api-global',
    instances: 2,
    exec_mode: 'cluster_mode',
  }, {
    name: 'api-local',
    cwd: './api/partials/',
    script: 'npm',
    args: 'run api-local',
    instances: 2,
    exec_mode: 'cluster',
  }, {
    name: 'api-global-test',
    cwd: './api/partials/',
    script: 'api-global.js',
    instances: 2,
    exec_mode: 'cluster',
    // https://pm2.keymetrics.io/docs/usage/environment/
    instance_var: 'INSTANCE_ID',
    env: {
      NODE_EV: 'development',
      DEBUG: '*',
      CN_AWS_DDB_KEY: process.env.CN_AWS_DDB_KEY,
      CN_AWS_DDB_SECRET: process.env.CN_AWS_DDB_KEY,
      CN_AWS_S3_KEY: process.env.CN_AWS_S3_KEY,
      CN_AWS_S3_SECRET: process.env.CN_AWS_S3_SECRET,
      CN_GMAPS_API_KEY: process.env.CN_GMAPS_API_KEY,
    },
    // call with flag --production
    env_production: {
      NODE_EV: 'production',
    },
  }],
};
