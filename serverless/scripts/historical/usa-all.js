const axios = require('axios');

const urls = {
  overview: 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/live/us.csv',
  states: 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/live/us-states.csv',
  counties: 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/live/us-counties.csv',
};

module.exports.historicalUSAAll =
