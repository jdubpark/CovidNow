'use strict';
// requires
const
  AWS = require('aws-sdk'),
  shortid = require('shortid');
// modules
const ModJHU = require('./modules/jhu');
const JHU = new ModJHU();

AWS.config.update({
  region: 'us-east-2',
  endpoint: 'http://localhost:8000',
});
const
  ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'}),
  config = require('../config/aws-config.js'),
  isDev = process.env.NODE_ENV !== 'production';

function updateAWSConf(conf, dev=true){
  AWS.config.update(dev ? conf.aws_local_config : conf.aws_remote_config);
}

function apiTest(app){
  const params = require('../config/tables/tempcoredata.json');
  // ddb.createTable(params, (err, data) => {
  //   if (err) console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2));
  //   else console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
  // });
  // Gets all fruits
  app.get('/api/fruits', (req, res, next) => {
    updateAWSConf(conf, isDev);

    const
      docClient = new AWS.DynamoDB.DocumentClient(),
      params = {TableName: config.aws_table_name};

    docClient.scan(params, (err, data) => {
      if (err) res.send({success: false, message: 'Error: Server error'});
      else {
        const {Items} = data;
        res.send({
          success: true,
          message: 'Loaded fruits',
          fruits: Items,
        });
      }
    });
  });

  // Get a single fruit by id
  app.get('/api/fruit', (req, res, next) => {
    updateAWSConf(conf, isDev);

    const
      fruitId = req.query.id,
      docClient = new AWS.DynamoDB.DocumentClient(),
      params = {
        TableName: config.aws_table_name,
        KeyConditionExpression: 'fruitId = :i',
        ExpressionAttributeValues: {
          ':i': fruitId,
        },
      };

    docClient.query(params, (err, data) => {
      if (err) res.send({success: false, message: 'Error: Server error'});
      else {
        console.log('data', data);
        const {Items} = data;
        res.send({
          success: true,
          message: 'Loaded fruits',
          fruits: Items,
        });
      }
    });
  });

  // Add a fruit
  app.post('/api/fruit', (req, res, next) => {
    updateAWSConf(conf, isDev);

    const
      {type, color} = req.body,
      // Not actually unique and can create problems.
      fruitId = (Math.random() * 1000).toString(),
      docClient = new AWS.DynamoDB.DocumentClient(),
      params = {
        TableName: config.aws_table_name,
        Item: {
          fruitId: fruitId,
          fruitType: type,
          color: color,
        },
      };

    docClient.put(params, (err, data) => {
      if (err) res.send({success: false, message: 'Error: Server error'});
      else {
        console.log('data', data);
        res.send({
          success: true,
          message: 'Added fruit',
          fruitId: fruitId,
        });
      }
    });
  });
};

const params = {
  TableName: 'TempCoreData',
  // ProjectionExpression: 'id, #ty, #da, ts',
  // FilterExpression: '#ty = :t',
  // ExpressionAttributeNames: {
  //   // get around reserved keywords
  //   // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ReservedWords.html
  //   '#ty': 'type',
  //   '#da': 'data',
  // },
  // ExpressionAttributeValues: {
  //   ':t': 'usa',
  // },
};
const docClient = new AWS.DynamoDB.DocumentClient();
docClient.scan(params, onScan);
function onScan(err, data){
  if (err) console.error(JSON.stringify(err, null, 2));
  else {
    const {Items} = data;
    console.log(Items);

    // continue scanning if we have more movies, because
    // scan can retrieve a maximum of 1MB of data
    // if (typeof data.LastEvaluatedKey != 'undefined'){
    //   console.log('Scanning for more...');
    //   params.ExclusiveStartKey = data.LastEvaluatedKey;
    //   docClient.scan(params, onScan);
    // }
    // ddbDelete(Items);
  }
}


// JHU.run()
//   .then(res => {
//     // console.log(res);
//     const usa = JHU.compileUSA(res.usa);
//     const stats = JHU.compileStats({total: res.nTotal, death: res.nDeath, recov: res.nRecov});
//     const cases = JHU.compileCases(res.cases);
//     const geo = JHU.compileGeo(res.geo);
//     // console.log(usa, stats, cases, geo);
//     // console.log(usa);
//     const coreData = {usa, stats, cases, geo};
//     // console.log(coreData.cases);
//     ddbAddData(coreData);
//     // ddbSearch('id', 'usa');
//   })
//   .catch(err => console.log(err));

function ddbAddData(data2add){
  const docClient = new AWS.DynamoDB.DocumentClient();
  Object.keys(data2add).forEach(name => {
    const data = data2add[name];
    const params = {
      TableName: 'TempCoreData',
      Item: {
        'id': shortid.generate(),
        'type': name,
        // storing JSON as list/map vs. string
        // https://stackoverflow.com/questions/45429490/storing-json-as-string-in-dynamodb-vs-list-map-types
        'data': data, // JSON.stringify(data)
        'ts': Date.now(),
      },
    };

    docClient.put(params, (err, data) => {
      if (err) console.error(JSON.stringify(err, null, 2));
      else console.log('PutItem succeeded');
    });
  });
}

function ddbSearch(id, type){
  const params = {
    TableName: 'TempCoreData',
    KeyConditionExpression: 'id = :i and #ty = :t',
    ExpressionAttributeNames: {
      // get around reserved keywords
      // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ReservedWords.html
      '#ty': 'type',
    },
    ExpressionAttributeValues: {
      ':i': id,
      ':t': type,
    },
  };

  const docClient = new AWS.DynamoDB.DocumentClient();
  docClient.query(params, (err, data) => {
    if (err) console.error(JSON.stringify(err, null, 2));
    else {
      const {Items} = data;
      console.log(Items);
    }
  });
}

function ddbDelete(items){
  // items: {Items} = data
  const buildKey = obj => ({'id': obj['id'], 'type': obj['type']}); // hash key, range key
  items.forEach((val, key) => {
    const parms = {
      TableName: 'TempCoreData',
      Key: buildKey(val),
      ReturnValues: 'NONE', // optional (NONE | ALL_OLD)
      ReturnConsumedCapacity: 'NONE', // optional (NONE | TOTAL | INDEXES)
      ReturnItemCollectionMetrics: 'NONE', // optional (NONE | SIZE)
    };
    docClient.delete(parms, function(err, data){
      if (err) console.log(err); // an error occurred
      else console.log(data); // successful response
    });
  });
}
