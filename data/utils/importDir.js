const
  glob = require('glob'),
  path = require('path');

/*
    Import all files in a specified directory except exclFiles
    (default exclude index.js)
    usage: (index.js)
      module.exports = require('../utils/importDir')(__dirname);
*/
module.exports = (dirname, exclFiles = ['index']) => {
  const
    files = glob.sync(path.join(dirname, '*.js')),
    mapped = {};

  files.forEach(path => {
    let fileName = path.split('/');
    fileName = fileName[fileName.length-1].split('.')[0];
    if (exclFiles.includes[fileName]) return;
    // fileName = countyName // static classes
    mapped[fileName] = require(path);
  });

  return mapped;
};
