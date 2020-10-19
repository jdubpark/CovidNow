'use strict';

const
  debugApp = require('debug')('app:global'),
  express = require('express'),
  http = require('http'),
  helmet = require('helmet'),
  app = express(),
  server = http.createServer(app),
  AWS = require('aws-sdk');

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

console.log(`[CovidNow API Global] Configuring AWS to ${isDev ? 'DEVELOPMENT' : 'PRODUCTION'}`);
AWS.config.update(isDev ? config.aws_local_config : config.aws_remote_config);

const docClient = new AWS.DynamoDB.DocumentClient();

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

app.get('/api/v1/global/:type', (req, res, next) => {
  debugApp('%d - Cluster %d received request', Date.now(), process.env.INSTANCE_ID);

  const {type} = req.params, allowed = ['countries', 'stats'];

  if (!allowed.includes(type)) return next(new CustomError('404', req.path));

  // every global data key has the prefix 'global-'
  // to make human reading easier for DDB

  const dnow = (new Date()), tymd = dnow.toISOString().split('T')[0];

  const allParams = {};
  if (type == 'stats'){
    ['deaths', 'recovered', 'total'].forEach(key => {
      allParams[key] = {
        TableName: 'Global',
        KeyConditionExpression: 'dtype = :dtype and begins_with(#dt, :dt)',
        ProjectionExpression: '#dt, val, ts',
        ExpressionAttributeNames: {'#dt': 'date#time'},
        ScanIndexForward: false, // false = descending, true = ascending
        Limit: 1, // grab the latest of the given date
        ExpressionAttributeValues: {':dtype': key, ':dt': tymd},
      };
    });
  } else if (type == 'countries'){
    allParams['countries'] = {
      TableName: 'Global_Countries',
      IndexName: 'date-index',
      KeyConditionExpression: '#dt = :dt',
      ExpressionAttributeNames: {'#dt': 'date'},
      ExpressionAttributeValues: {':dt': tymd},
    };
  }

  Object.keys(allParams).forEach(paramKey => {
    const params = allParams[paramKey];
    allParams[paramKey] = new Promise((resolve, reject) => {
      docClient.query(params, (err, data) => {
        if (err) return reject(err);
        const {Items: items} = data;
        // console.log(items);
        resolve(items);
        // returns {data, key (used for query), ts (last updated)}
      });
    });
  });

  return Promise.all(
    Object
      .keys(allParams)
      .map(key => Promise.resolve(allParams[key]).then(val => ({key: key, val: val})))
  ).then(items => {
    let result = {};
    items.forEach(item => {
      if (type == 'stats') result[item.key] = item.val[0];
      else result[item.key] = item.val;
    });
    return result;
  }).then(result => {
    res.status(200).json(result);
    debugApp('%d - Cluster %d processed request', Date.now(), process.env.INSTANCE_ID);
  });
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

server.listen(ports.API_Global, () => {
  const
    host = server.address().address,
    port = server.address().port;
  console.log('[CovidNow API Global Cluster %s] listening at http://%s:%s', process.env.INSTANCE_ID, host, port);
});
