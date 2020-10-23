'use strict';

const
  express = require('express'),
  http = require('http'),
  helmet = require('helmet'),
  app = express(),
  server = http.createServer(app),
  AWS = require('aws-sdk'),
  CronJob = require('cron').CronJob;

const
  ModGetNews = require('../../data/News/get'),
  CustomError = require('../modules/CustomError'),
  config = require(__dirname+'/../../config/aws-config.js'),
  ports = require(__dirname+'/../../config/ports.js');

if (typeof process.env.NODE_ENV == undefined){
  require('dotenv').config({path: '../../.env'});
}

const isDev = process.env.NODE_ENV == 'dev';
const isDevCors = isDev || process.env.NODE_CORS == 'dev';

AWS.config.update(isDev ? config.aws_local_config : config.aws_remote_config);

const docClient = new AWS.DynamoDB.DocumentClient();

const GetNews = new ModGetNews({docClient});

/*
    Get News data every 10 minutes
*/
// either bind class or use wrapped function (() => GetNews.execute())
// (bind!!! to access this)
if (!isDev){
  const getJob = new CronJob('0 */10 * * * *', GetNews.execute.bind(GetNews), null, true, 'America/Los_Angeles');
  GetNews.execute(); // init call
  getJob.start();
}


app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', isDevCors ? '*' : 'https://covidnow.com');
  res.header('Access-Control-Allow-Origin', 'https://covidnow.com');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  // res.header('Content-Type', 'application/json');
  next();
});

app.get('/api/v1/news/:type', (req, res, next) => {
  const {type} = req.params, allowed = ['usa', 'italy', 'spain'];

  if (!allowed.includes(type)) return next(new CustomError('404', req.path));

  let lang = 'US';
  if (type === 'italy') lang = 'IT';
  else if (type === 'spain') lang = 'ES_US';

  const params = {
    TableName: 'News',
    KeyConditionExpression: 'lang = :ln',
    ExpressionAttributeValues: {
      ':ln': lang,
    },
  };

  docClient.query(params, (err, data) => {
    if (err) return next(err);

    const {Items} = data;
    // returns {data, key (used for query), ts (last updated)}
    res.status(200).json(Items[0].data);
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

server.listen(ports.API_News, () => {
  const
    host = server.address().address,
    port = server.address().port;
  console.log('[CovidNow API News] listening at http://%s:%s', host, port);
});
