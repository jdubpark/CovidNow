const zip2fips = require('./zip2fips.json');
const fs = require('fs');
const fips2zip = {};

Object.keys(zip2fips).forEach(key => fips2zip[key] = zip2fips[key]);

fs.writeFileSync('./fips2zip.json', JSON.stringify(fips2zip));
