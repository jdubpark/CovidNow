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
  Local$Geo = require('../../functions/data/Local/geo'),
  USA$Counties = (require('../../functions/data/USA/counties')),
  CustomError = require('../modules/CustomError'),
  config = require(__dirname+'/../../config/aws-config.js'),
  ports = require(__dirname+'/../../config/ports.js');

const isDev = process.env.NODE_ENV !== 'production';

AWS.config.update(isDev ? config.aws_local_config : config.aws_remote_config);

const docClient = new AWS.DynamoDB.DocumentClient();

/*
    Cache US counties data every 3 minutes
    (starting at 5 to avoid conflict with USA data)
*/
let countiesData;
const wrappedFn = () => {
  USA$Counties.load(docClient)
    .then(res => {
      console.log(Date.now(), ' :: API Local USA Counties Data fetched');
      countiesData = res;
    })
    .catch(err => Promise.reject(err));
};
wrappedFn(); // init call
const getJob = new CronJob(
  '0 */3 * * * *',
  wrappedFn,
  null, true, 'America/Los_Angeles',
);
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

app.get('/api/v1/local/:type', (req, res, next) => {
  const {type} = req.params, allowed = ['geocoding', 'reverse', 'finder'];

  if (!allowed.includes(type)) return next(new CustomError('404', req.path));

  const qs = req.query; // querystring
  let func, args; // used for calling

  switch (type){
  case 'geocoding':
    func = Local$Geo.geocoding.bind(Local$Geo);
    args = {address: qs.address};
    break;
  case 'reverse':
    func = Local$Geo.reverse.bind(Local$Geo);
    args = {lat: qs.lat, lng: qs.long};
    break;
  case 'finder':
    func = Local$Geo.finder.bind(Local$Geo);
    args = {address: qs.address, locations: countiesData.data, unit: qs.unit || 'mi'};
  default: break;
  }

  // make sure args are provided and not invalid
  // this method allows returning CustomError and not moving on to next code lines
  let allGood = true;
  Object.keys(args).forEach(name => {
    if (typeof args[name] === undefined || args[name] == '') return allGood = false;
  });
  if (!allGood) return next(new CustomError('422', 'Missing Argument'));

  // pass on args as one obj to function, no need to spread its values
  // make sure the function is a promised version (need to wrap some)
  func(args)
    .then(data => {
      res.status(200).json(data);
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

server.listen(ports.API_Local, () => {
  const
    host = server.address().address,
    port = server.address().port;
  console.log('[CovidNow API Local] listening at http://%s:%s', host, port);
});
