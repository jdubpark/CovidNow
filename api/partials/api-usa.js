'use strict';

const
  express = require('express'),
  http = require('http'),
  helmet = require('helmet'),
  pako = require('pako'),
  AWS = require('aws-sdk'),
  isDateValid = require('date-fns/isValid');

const
  CustomError = require('../modules/CustomError'),
  config = require(__dirname+'/../../config/aws-config.js'),
  ports = require(__dirname+'/../../config/ports.js'),
  utils = require(__dirname+'/utils');

if (typeof process.env.NODE_ENV == undefined){
  require('dotenv').config({path: '../../.env'});
}

const isDev = process.env.NODE_ENV == 'dev';
const isDevCors = isDev || process.env.NODE_CORS == 'dev';

const app = express(), server = http.createServer(app);

// const s3Client = new S3Client(process.env.CN_AWS_S3_KEY, process.env.CN_AWS_S3_SECRET);

console.log(`[CovidNow API USA] Configuring AWS to ${isDev ? 'DEVELOPMENT' : 'PRODUCTION'}`);
AWS.config.update(isDev ? config.aws_local_config : config.aws_remote_config);

const docClient = new AWS.DynamoDB.DocumentClient({
  convertEmptyValues: true, // ignore empty string error
});

/*
* For USA County
*/
function getCountyData(item){
  return [item.cases, item.deaths];
}

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', isDevCors ? '*' : 'https://covidnow.com');
  // res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  // res.header('Content-Type', 'application/json');
  next();
});

app.get('/api/v1/usa/:type(states|counties)', (req, res, next) => {
  const {type} = req.params, allowed = ['states', 'counties'];

  if (!allowed.includes(type)) return next(new CustomError('404', req.path));

  const
    dobj = (new Date()),
    ydobj = utils.oneDayAgo(dobj),
    tymd = utils.yyyymmdd(dobj);

  let params = {}, cleaner = undefined;

  if (type == 'states'){
    let {date: qDate} = req.query;
    if (typeof qDate == 'undefined') qDate = tymd;
    else if (!/^[0-9\-]+$/.test(qDate) || !isDateValid(new Date(qDate))) return next(new CustomError('400', req.path));

    params = {
      TableName: 'USA_States',
      IndexName: 'date-index', // GSI
      KeyConditionExpression: '#dt = :date',
      ExpressionAttributeNames: {'#dt': 'date'},
      ExpressionAttributeValues: {':date': qDate},
    };
    cleaner = items => {
      const out = {date: qDate, data: {}};
      items.forEach(item => {
        out.data[item.state] = {
          cases: [item.cases, item.confirmed_cases || '?', item.probable_cases || '?'],
          deaths: [item.deaths, item.confirmed_deaths || '?', item.probable_deaths || '?'],
        };
      });
      return out;
    };
  } else { // type == 'counties'
    const {state, county} = req.query;
    let {ndays} = req.query;
    if (typeof ndays == 'undefined'){
      if (county) ndays = 7; // one-week data for specific county
      else ndays = 2; // two-day data for all counties
    }

    if (state){
      // state can only contain alphabet and space
      if (!/^[a-z ]+$/i.test(state) || !/^\d+$/.test(ndays)) return next(new CustomError('400', req.path));
      if (county){
        // specific county is fips (num)
        if (!/^\d+$/.test(county)) return next(new CustomError('400', req.path));
        params = {
          KeyConditionExpression: '#st = :state and begins_with(fips_date, :fips)',
          FilterExpression: '#dt >= :date', // > will exclude one past data
          // go figure out the state & county name from request
          // don't waste resource
          ProjectionExpression: '#dt, cases, deaths',
          ExpressionAttributeNames: {'#st': 'state', '#dt': 'date'},
          ExpressionAttributeValues: {
            ':state': state,
            ':fips': county,
            ':date': utils.yyyymmdd(utils.nDaysAgo_(dobj, ndays)),
          },
        };
        cleaner = items => {
          const out = {state, county, data: {}};
          items.forEach(item => out.data[item.date] = getCountyData(item));
          return out;
        };
      } else {
        // all counties in the state
        // -1 to account for today's data
        let eymd;
        if (ndays > 1){
          eymd = utils.yyyymmdd(utils.nDaysAgo_(dobj, ndays-1));
        } else {
          eymd = utils.yyyymmdd(dobj);
        }

        params = {
          IndexName: 'state-date-index',
          KeyConditionExpression: '#st = :state and #dt >= :date',
          ProjectionExpression: '#dt, county, fips, cases, deaths',
          ExpressionAttributeNames: {'#st': 'state', '#dt': 'date'},
          ExpressionAttributeValues: {
            ':state': state,
            ':date': eymd,
          },
        };
        cleaner = items => {
          const out = {state, date: {start: '', end: ''}, data: []}, counties = {};
          // all items
          items.forEach(item => {
            // console.log(item, item.date);
            if (!counties[item.county]) counties[item.county] = {_META: {county: item.county, fips: item.fips}};
            counties[item.county][item.date] = getCountyData(item);
          });

          // make it into an array of objects
          out.data = Object.keys(counties).map(key => counties[key]);

          // sample item to find & sort dates by asc
          const allDates = Object.keys(out.data[0]);
          allDates.splice(allDates.indexOf('_META'), 1);
          allDates.sort((a, b) => new Date(a) - new Date(b));

          out.date.start = allDates[0];
          out.date.end = allDates[allDates.length-1];
          return out;
        };
      }
    }
    // else {
    //   params = {
    //     IndexName: 'date-index', // GSI
    //     KeyConditionExpression: '#dt = :date',
    //     ExpressionAttributeNames: {'#dt': 'date'},
    //     ExpressionAttributeValues: {':date': tymd},
    //   };
    // }

    params.TableName = 'USA_Counties';
  }

  // https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html

  utils.queryExecute({params, docClient})
    .then(items => {
      if (!items.length){
        // data for today is empty (? might be future day, wrong clock),
        // so minus one date to get the previous day
        params.ExpressionAttributeValues[':date'] = utils.yyyymmdd(ydobj);
        return utils.queryExecute({params, docClient});
      }
      // today data is found, proceed
      return items;
    })
    .then(items => cleaner ? cleaner(items) : items)
    .then(items => {
      console.log(items);
      return items;
    })
    .then(items => res.status(200).json(items))
    .catch(err => next(err));
});

app.get('*', (req, res, next) => {
  if (!res.headersSent) res.status(404).json(CustomError.err404(req));
});

// error handler // comes last
app.use((err, req, res, next) => {
  if (err.type === '404') res.status(404).json(CustomError.err404(req));
  else if (err.type === '422') res.status(422).json(CustomError.err422(req));
  else {
    console.log(Date.now(), err);
    res.status(500).json({code: 500, error: 'internal-error'});
  }
});

server.listen(ports.API_USA, () => {
  const
    host = server.address().address,
    port = server.address().port;
  console.log('[CovidNow API USA] listening at http://%s:%s', host, port);
});
