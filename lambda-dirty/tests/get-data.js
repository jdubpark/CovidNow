require('dotenv').config({path: '../../.env'});

const AWS = require('aws-sdk');
const util = require('util');
const yaml = require('js-yaml');
const fs = require('fs');

// const s3Client = new (require('./aws/aws-s3-client.js'))(process.env.CN_AWS_S3_KEY, process.env.CN_AWS_S3_SECRET);

AWS.config.update({
  region: 'local',
  endpoint: 'http://localhost:8000',
});

// AWS.config.update({
//   // use .env for prod
//   accessKeyId: process.env.CN_AWS_DDB_KEY,
//   secretAccessKey: process.env.CN_AWS_DDB_SECRET,
//   region: 'us-east-2',
// });

const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient({
  convertEmptyValues: true, // ignore empty string error
});
const checkTables = false;

if (checkTables){
  const testTables = ['Global', 'Global_Countries', 'USA_Overview', 'USA_States', 'USA_Counties', 'USA_MaskUsage'];

  const tablesDoc = yaml.safeLoad(fs.readFileSync('./aws/tables.yaml'), 'utf-8');

  dynamodb.listTables({}, function(err, data){
    if (err) console.log(err, err.stack); // an error occurred
    console.log('Local DynamoDB Tables', data.TableNames);
    if (data.TableNames != null){
      testTables.forEach(tableName => {
        if (data.TableNames.indexOf(tableName) > -1) return;

        const params = tablesDoc[tableName] || tablesDoc.generic;
        params.TableName = tableName;
        params.ProvisionedThroughput = {ReadCapacityUnits: 50, WriteCapacityUnits: 50};

        dynamodb.createTable(params, (err, data) => {
          if (err) console.log(err, err.stack); // an error occurred
          else console.log(data); // successful response
        });
      });
    }
  });
}

const GetData = new (require('../scripts/get-data'))({ddb: dynamodb, docClient});

(async() => {
  // [
  //   'global_overview', 'global_extensive',
  //   'USA_overview', 'USA_extensive',
  // ]
  ['global_overview', 'global_extensive', 'USA_overview', 'USA_extensive'].forEach(async type => {
    const executeOverview = await GetData.execute(type);
    console.log(util.inspect(executeOverview, false, null, true));
  });
})();
