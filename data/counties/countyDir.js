const
  glob = require('glob'),
  path = require('path');

module.exports = dirname => {
  const
    countyFiles = glob.sync(path.join(dirname, '*.js')),
    // states = {},
    countyClasses = {};

  countyFiles.forEach(path => {
    let fileName = path.split('/');
    fileName = fileName[fileName.length-1].split('.')[0];
    if (fileName === 'index') return;
    // fileName = countyName // static classes
    countyClasses[fileName] = require(path);
  });

  return countyClasses;
};
