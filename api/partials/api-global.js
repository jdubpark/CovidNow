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
  ModGetGlobal = require('../../data/Global/get'),
  CustomError = require('../modules/CustomError'),
  config = require(__dirname+'/../../config/aws-config.js'),
  ports = require(__dirname+'/../../config/ports.js');

const isDev = process.env.NODE_ENV !== 'production';

AWS.config.update(isDev ? config.aws_local_config : config.aws_remote_config);

const docClient = new AWS.DynamoDB.DocumentClient();

const GetGlobal = new ModGetGlobal({docClient});

/*
    Get Global data every 10 minutes
    (starting at 5 to avoid conflict with USA data)
*/
// (bind!!! to access this)
const getJob = new CronJob('0 5,15,25,35,45,55 * * * *', GetGlobal.execute.bind(GetGlobal), null, true, 'America/Los_Angeles');
GetGlobal.execute(); // init call
getJob.start();


app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', isDev ? '*' : 'https://covidnow.com');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  // res.header('Content-Type', 'application/json');
  next();
});

app.get('/api/v1/global/:type', (req, res, next) => {
  const {type} = req.params, allowed = ['countries', 'stats'];

  if (!allowed.includes(type)) return next(new CustomError('404', req.path));

  // every global data key has the prefix 'global-'
  // to make human reading easier for DDB
  const key = 'global-'+type;

  const params = {
    TableName: 'Data',
    KeyConditionExpression: '#k = :k',
    ExpressionAttributeNames: {
      '#k': 'key',
    },
    ExpressionAttributeValues: {
      ':k': key,
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

server.listen(ports.API_Global, () => {
  const
    host = server.address().address,
    port = server.address().port;
  console.log('[CovidNow API Global] listening at http://%s:%s', host, port);
});
