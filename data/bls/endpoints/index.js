const
  fs = require('fs'),
  path = require('path'),
  yaml = require('js-yaml');

const
  docPath = path.join(__dirname, 'national_employment.yaml'),
  doc = yaml.safeLoad(fs.readFileSync(docPath, 'utf-8'));

const series = doc['series'];
console.log(series);
