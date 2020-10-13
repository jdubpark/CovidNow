'use strict';

const
  express = require('express'),
  http = require('http'),
  helmet = require('helmet'),
  pako = require('pako'),
  app = express(),
  AWS = require('aws-sdk');

const
  CustomError = require('../modules/CustomError'),
  config = require(__dirname+'/../../config/aws-config.js'),
  ports = require(__dirname+'/../../config/ports.js');

const isDev = process.env.NODE_ENV !== 'production';

const server = http.createServer(app);

// const s3Client = new S3Client(process.env.CN_AWS_S3_KEY, process.env.CN_AWS_S3_SECRET);

console.log(`[CovidNow API USA] Configuring AWS to ${isDev ? 'DEVELOPMENT' : 'PRODUCTION'}`);
AWS.config.update(isDev ? config.aws_local_config : config.aws_remote_config);

const docClient = new AWS.DynamoDB.DocumentClient({
  convertEmptyValues: true, // ignore empty string error
});

//
// Execute dynamodb query in loop to get all results
// since ddb outputs only up to 1mb per query result
//
function queryExecute({params, docClient}){
  let items = []; // queryCount = 0;
  const queryLoop = ({params, resolve, reject}) => {
    docClient.query(params, (err, res) => {
      // queryCount += 1;
      if (err) return reject(err);

      if (res.Items) items = items.concat(res.Items);
      if (res.LastEvaluatedKey){
        params.ExclusiveStartKey = res.LastEvaluatedKey;
        // throughput is limited on dynamodb (unless it's on-demand)
        setTimeout(() => {
          queryLoop({params, resolve, reject});
        }, 50);
      } else {
        resolve(items); // , queryCount
      }
    });
  };
  // promise
  return new Promise((resolve, reject) => queryLoop({params, resolve, reject}));
}


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

  let tableName = '';

  if (type == 'states') tableName = 'USA_States';
  else tableName = 'USA_Counties';

  const dnow = (new Date()), tymd = dnow.toISOString().split('T')[0]; // today yyyy-mm-dd

  // https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html
  const params = {
    TableName: tableName,
    IndexName: 'date-index', // GSI
    KeyConditionExpression: '#dt = :date',
    ExpressionAttributeNames: {'#dt': 'date'},
    ExpressionAttributeValues: {':date': tymd},
  };

  queryExecute({params, docClient})
    .then(items => {
      if (!items.length){
        // data for today is empty (? might be future day, wrong clock),
        // so minus one date to get the previous day
        const tymdM1 = (d => new Date(d.setDate(d.getDate()-1)))(dnow);
        params.ExpressionAttributeValues[':date'] = tymdM1.toISOString().split('T')[0];
        return queryExecute({params, docClient});
      }
      // today data is found, proceed
      return items;
    })
    .then(items => res.status(200).json(items))
    .catch(err => next(err));
});

// app.get('/api/v1/usa/cases', (req, res, next) => {
//   const s3GetReq = s3Client.getObjectRequest('covidnow/data/usa', 'cases300.json');
//   s3Client.get(s3GetReq)
//     .then(data => {
//       // console.log(data);
//       // returns the case data right away, no obj key wraps
//       const objData = JSON.parse(data.Body.toString('utf-8'));
//       res.status(200).json(objData);
//     })
//     .catch(err => next(err));
// });

app.get('/api/v1/usa/historical', (req, res, next) => {
  const {type} = req.query, allowed = ['states', 'counties'];

  if (!allowed.includes(type)) return next(new CustomError('404', req.path));

  const params = {
    TableName: 'Data',
    KeyConditionExpression: '#k = :k',
    ExpressionAttributeNames: {
      '#k': 'key',
    },
    ExpressionAttributeValues: {
      ':k': 'usa-historical-'+type,
    },
  };

  docClient.query(params, (err, data) => {
    if (err) return next(err);

    const {Items} = data;
    // returns {data, key (used for query), ts (last updated)}

    let sendObj = Items[0].data;
    // console.log(sendObj);

    if (type === 'counties') sendObj = JSON.parse(pako.inflate(sendObj, {to: 'string'}));

    res.status(200).json(sendObj);
  });
});

// app.get('/api/v1/usa/tests', (req, res, next) => {
//   const {type} = req.query, allowed = ['states'];
//
//   if (!allowed.includes(type)) return next(new CustomError('404', req.path));
//
//   const params = {
//     TableName: 'Data',
//     KeyConditionExpression: '#k = :k',
//     ExpressionAttributeNames: {
//       '#k': 'key',
//     },
//     ExpressionAttributeValues: {
//       ':k': 'usa-tests-'+type,
//     },
//   };
//
//   docClient.query(params, (err, data) => {
//     if (err) return next(err);
//
//     const {Items} = data;
//     // returns {data, key (used for query), ts (last updated)}
//
//     let sendObj = Items[0].data;
//
//     // if (type === 'counties') sendObj = JSON.parse(pako.inflate(sendObj, {to: 'string'}));
//
//     res.status(200).json(sendObj);
//   });
// });

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
