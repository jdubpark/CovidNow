const papa = require('papaparse');
const {request} = require('gaxios');
// const prcNYT = require('./processors/nyt');

const url = 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/live/us-counties.csv';
const cacheBuster = '?_='+(new Date).getTime();
const data = [];

const reqOptions = {
  method: 'get',
  url: url+cacheBuster,
  responseType: 'stream', // for pipe
};

// https://github.com/mholt/PapaParse/blob/master/README.md#papa-parse-for-node
// https://github.com/mholt/PapaParse/issues/440
const parseStream = papa.parse(papa.NODE_STREAM_INPUT, {});
parseStream.on('data', row => data.push(row));
parseStream.on('end', () => console.log('csv papa end'));

request(reqOptions)
  .then(res => {
    return new Promise((resolve, reject) => {
      res.data.pipe(parseStream)
        .on('error', err => reject(err))
        .on('end', () => resolve(data));
    });
  })
  .then(data => {
    console.log(data.length);
    // data = prcNYT.processData(data, 'counties');
    // console.log(data);
  })
  .catch(err => console.log(err));
