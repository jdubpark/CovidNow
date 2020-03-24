module.exports = {
  // using cwd allows no conflict with dotenv (and maybe other issues)
  // https://github.com/motdotla/dotenv/issues/229
  apps: [{
    name: 'api-main',
    cwd: './private/',
    script: 'npm',
    args: 'start',
  }, {
    name: 'worker-data',
    cwd: './private/',
    script: 'npm',
    args: 'run worker',
  }, {
    name: 'api-news',
    cwd: './api/partials/',
    script: 'npm',
    args: 'run api-news',
  }],
};
