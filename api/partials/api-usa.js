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
  ModGetUSA = require('../../data/USA/get'),
  CustomError = require('../modules/CustomError'),
  S3Client = require('../../aws/aws-s3-client.js'),
  config = require(__dirname+'/../../config/aws-config.js'),
  ports = require(__dirname+'/../../config/ports.js');

const isDev = process.env.NODE_ENV !== 'production';

const s3Client = new S3Client(process.env.CN_AWS_S3_KEY, process.env.CN_AWS_S3_SECRET);

AWS.config.update(isDev ? config.aws_local_config : config.aws_remote_config);

const docClient = new AWS.DynamoDB.DocumentClient({
  convertEmptyValues: true, // ignore empty string error
});

const GetUSA = new ModGetUSA({s3Client, docClient});

/*
    Get USA data every 10 minutes
    (starting at 0 to avoid conflict with Global data)
*/
// (bind!!! to access this)
const getJob = new CronJob('0 */10 * * * *', GetUSA.execute.bind(GetUSA), null, true, 'America/Los_Angeles');
GetUSA.execute(); // init call
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

app.get('/api/v1/usa/:type(states|counties)', (req, res, next) => {
  const {type} = req.params, allowed = ['states', 'counties'];

  if (!allowed.includes(type)) return next(new CustomError('404', req.path));

  const params = {
    TableName: 'Data',
    KeyConditionExpression: '#k = :k',
    ExpressionAttributeNames: {
      '#k': 'key',
    },
    ExpressionAttributeValues: {
      ':k': 'usa-'+type,
    },
  };

  docClient.query(params, (err, data) => {
    if (err) return next(err);

    const {Items} = data;
    // returns {data, key (used for query), ts (last updated)}
    res.status(200).json(Items[0].data);
  });
});

app.get('/api/v1/usa/cases', (req, res, next) => {
  const s3GetReq = s3Client.getObjectRequest('covidnow/data/usa', 'cases300.json');
  s3Client.get(s3GetReq)
    .then(data => {
      // console.log(data);
      // returns the case data right away, no obj key wraps
      const objData = JSON.parse(data.Body.toString('utf-8'));
      res.status(200).json(objData);
    })
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
