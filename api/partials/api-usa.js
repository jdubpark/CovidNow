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
  getNews = require('../../data/get-news'),
  CustomError = require('../../private/modules/CustomError'),
  config = require(__dirname+'/../../config/aws-config.js');

const isDev = process.env.NODE_ENV !== 'production';

AWS.config.update(isDev ? config.aws_local_config : config.aws_remote_config);

const docClient = new AWS.DynamoDB.DocumentClient();

// get news data every 15 minutes
const wrappedFn = (docClient => () => getNews(docClient))(docClient);
const getJob = new CronJob('0 */15 * * * *', wrappedFn, null, true, 'America/Los_Angeles');
getNews(docClient); // init call
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

app.get('/api/news/:type', (req, res, next) => {
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
    res.status(200).json(Items[0]);
  });
});

app.get('*', (req, res, next) => {
  if (!res.headersSent) res.status(404).json(APIM.err404(req));
});

// error handler // comes last
app.use((err, req, res, next) => {
  if (err.type === '404') res.status(404).json(APIM.err404(req));
  else if (err.type === '422') res.status(422).json(APIM.err422(req));
  else {
    console.log(Date.now(), err);
    res.status(500).json({code: 500, error: 'internal-error'});
  }
});

server.listen(8013, () => {
  const
    host = server.address().address,
    port = server.address().port;
  console.log('[CovidNow API News] listening at http://%s:%s', host, port);
});
