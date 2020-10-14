/*
* For fixing date stored on DDB using UpdateItem
* as using PutItem for lots of records will be costly
*/

require('dotenv').config({path: '../../.env'});

const AWS = require('aws-sdk');

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

function queryExecute(params){
  let items = []; // queryCount = 0;
  const queryLoop = ({params, resolve, reject}) => {
    docClient.query(params, (err, res) => {
      // queryCount += 1;
      // console.log(err);
      // console.log(res);
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

const tableName = 'USA_Counties';
const params = {
  TableName: tableName,
  FilterExpression: 'attribute_not_exists(#dt)',
  ExpressionAttributeNames: {'#dt': 'date'},
};

// scan returns max 1mb, loop
// scan 1 -> update on 1mb data -> scan 2 -> update 2 -> scan 3 -> etc...

let idx = 0;
function fixData(params){
  return new Promise((resolve, reject) => {
    docClient.scan(params, (err, res) => {
      if (err) throw err;

      const {Items: items} = res;
      // console.log(items.length);
      if (!items.length) return resolve('No Items Left');

      const proms = items.map((item, i) => {
        const [fips, date] = item.fips_date.split('#');
        const uParams = {
          TableName: tableName,
          // adding DATE and FIPS columns separately for GSI query
          Key: {'state': item.state, 'fips_date': item.fips_date},
          UpdateExpression: 'SET #dt = :dt, fips = :fips',
          // ConditionExpression: 'attribute_not_exists(#dt)',
          // update only if date doesn't exist (i.e. wrong or doesn't exist)
          // ConditionExpression: '#dt <> :dt',
          ExpressionAttributeNames: {'#dt': 'date'},
          ExpressionAttributeValues: {':dt': date, ':fips': fips},
        };

        return new Promise((lResolve, lReject) => {
          setTimeout(() => {
            docClient.update(uParams, (err, res) => {
              if (err) return lReject(err);
              if (!((idx+1)%10)) console.log('Fixing data', Date.now(), `[${idx+1}/${items.length}]`);
              idx += 1;
              lResolve(true);
            });
          }, i*10);
        });
      });

      Promise.all(proms).then(() => {
        if (res.LastEvaluatedKey){
          params.ExclusiveStartKey = res.LastEvaluatedKey;
          resolve(fixData(params));
        } else {
          resolve('Fixed all data at', Date.now());
        }
      }).catch(reject);
    });
  });
}

fixData(params)
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
