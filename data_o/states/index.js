const
  glob = require('glob'),
  path = require('path');

const
  stateFiles = glob.sync(path.join(__dirname, '*.js')),
  // states = {},
  stateClasses = {};

stateFiles.forEach(path => {
  let fileName = path.split('/');
  fileName = fileName[fileName.length-1].split('.')[0];
  if (fileName === 'index') return;
  // states[fileName.toUpperCase()] = path;
  const stateAbbr = fileName.toUpperCase();
  stateClasses[stateAbbr] = new (require(path));
});

module.exports = stateClasses;
