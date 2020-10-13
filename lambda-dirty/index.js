const AWS = require('aws-sdk');

AWS.config.update({
  // use .env for prod
  accessKeyId: process.env.CN_AWS_DDB_KEY,
  secretAccessKey: process.env.CN_AWS_DDB_SECRET,
  region: 'us-east-2',
});

const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient({
  convertEmptyValues: true, // ignore empty string error
});

const GetData = new (require('./scripts/get-data'))({ddb: dynamodb, docClient});
const allowedFetchTypes = [
  'global_overview', 'global_extensive',
  'USA_overview', 'USA_extensive',
];

exports.handler = async function(event, context){
  // return context.logStreamName
  const {fetchType} = event;
  let getData = undefined;
  if (allowedFetchTypes.includes(fetchType)){
    getData = await GetData.execute(fetchType);
    // getData = JSON.stringify(getData);
  }

  // console.log('Lambda GetData EVENT: \n' + JSON.stringify(event, null, 2));
  console.log('Lambda GetData END:');
  console.log(getData);
  return context.logStreamName;
};
