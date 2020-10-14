require('dotenv').config({path: '../../.env'});

const AWS = require('aws-sdk');
const util = require('util');
const yaml = require('js-yaml');
const fs = require('fs');

// const s3Client = new (require('./aws/aws-s3-client.js'))(process.env.CN_AWS_S3_KEY, process.env.CN_AWS_S3_SECRET);

// AWS.config.update({
//   region: 'local',
//   endpoint: 'http://localhost:8000',
// });

AWS.config.update({
  // use .env for prod
  accessKeyId: process.env.CN_AWS_DDB_KEY,
  secretAccessKey: process.env.CN_AWS_DDB_SECRET,
  region: 'us-east-2',
});

const docClient = new AWS.DynamoDB.DocumentClient({
  convertEmptyValues: true, // ignore empty string error
});

const bytes = s => ~-encodeURI(s).split(/%..|./).length;
const jsonSize = s => bytes(JSON.stringify(s));

function queryExecute({params, docClient}){
  let items = [], queryCount = 0;
  const queryLoop = ({params, resolve, reject}) => {
    docClient.query(params, (err, res) => {
      queryCount += 1;
      if (err) return reject(err);

      if (res.Items) items = items.concat(res.Items);
      if (res.LastEvaluatedKey){
        params.ExclusiveStartKey = res.LastEvaluatedKey;
        // throughput is limited on dynamodb (unless it's on-demand)
        setTimeout(() => {
          queryLoop({params, resolve, reject});
        }, 50);
      } else {
        resolve({items, queryCount});
      }
    });
  };
  // promise
  return new Promise((resolve, reject) => queryLoop({params, resolve, reject}));
}

(async() => {
  //
  // Using GSI is not consistent since Strongly Consistent Read
  // is not available for GSI. This means that GSI query may not
  // return recently written, up-to-date data (instead returns stale data)
  // in other words, GSI leads to data discrepancy between DynamoDB server and user fetching
  //
  const
    tymd = (new Date()).toISOString().split('T')[0], // today yyyy-mm-dd
    tmrw = (d => new Date(d.setDate(d.getDate()+1)))(new Date),
    tmrwymd = tmrw.toISOString().split('T')[0];
  const params = {
    TableName: 'USA_States',
    IndexName: 'date-index', // GSI
    KeyConditionExpression: '#dt = :date',
    ExpressionAttributeNames: {'#dt': 'date'},
    ExpressionAttributeValues: {
      ':date': tymd,
      // ':date': tmrwymd,
    },
  };

  queryExecute({params, docClient})
    .then(({items, queryCount}) => {
      if (!items.length){
        console.log('EMPTY DATE! Stepping one day back');
        // data for today is empty (? might be future day), so get yesterday
        const yymd = (d => new Date(d.setDate(d.getDate()-1)))(tmrw);
        console.log('STEPPING BACK TO: ', yymd);
        params.ExpressionAttributeValues[':date'] = yymd.toISOString().split('T')[0];
        return queryExecute({params, docClient});
      }
      // today data is found, proceed
      return {items, queryCount};
    })
    .then(({items, queryCount}) => {
      console.log(items);
      console.log(items.length, queryCount);
      console.log(jsonSize(items), 'bytes');
    })
    .catch(err => {
      console.log(err);
    });
})();
