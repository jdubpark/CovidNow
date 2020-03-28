module.exports = {
  // using cwd allows no conflict with dotenv (and maybe other issues)
  // https://github.com/motdotla/dotenv/issues/229
  apps: [{
    name: 'api-news',
    cwd: './api/partials/',
    script: 'npm',
    args: 'run api-news',
    instances: 1,
    exec_mode: 'cluster',
  }, {
    name: 'api-usa',
    cwd: './api/partials/',
    script: 'npm',
    args: 'run api-usa',
    instances: 1,
    exec_mode: 'cluster',
  }, {
    name: 'api-global',
    cwd: './api/partials/',
    script: 'npm',
    args: 'run api-global',
    instances: 1,
    exec_mode: 'cluster',
  }, {
    name: 'api-local',
    cwd: './api/partials/',
    script: 'npm',
    args: 'run api-local',
    instances: 1,
    exec_mode: 'cluster',
  }],
};
