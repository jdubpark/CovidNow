const AWS = require('aws-sdk');
const yaml = require('js-yaml');
const fs = require('fs');

const ModGetUSA = require('./scripts/usa');
const S3Client = require('./aws-s3-client');
const DataFetcher = require('./scripts/fetcher');
const DataCleaner = require('./cleaners');
const DataStorer = require('./scripts/storer');

AWS.config.update({
  // use .env for prod
  accessKeyId: process.env.CN_AWS_DDB_KEY,
  secretAccessKey: process.env.CN_AWS_DDB_SECRET,
  region: 'us-east-2',
});

const s3Client = new S3Client(process.env.CN_AWS_S3_KEY, process.env.CN_AWS_S3_SECRET)
const docClient = new AWS.DynamoDB.DocumentClient({
  convertEmptyValues: true, // ignore empty string error
});

exports.handler = async function(event, context){
  // loading schema
  const schemaMain = yaml.safeLoad(fs.readFileSync('./schema/main.yaml', 'utf8'));

  // set up fetchers
  const fetches = {};
  fetches.overview = new DataFetcher(schemaMain.overview);
  fetches.extensive = new DataFetcher(schemaMain.extensive);

  // run fetchers
  fetches.overview.fetch();
  fetches.extensive.fetch();

  // run fetched data through cleaners
  // const fetched
  fetches.overview = DataCleaner.clean(fetches.overview);
  fetches.extensive = DataCleaner.clean(fetches.extensive);

  // save cleaned data from fetchers
  DataStorer.store(fetches.overview, 'overview');
  DataStorer.store(fetches.extensive, 'extensive');

  // debugging
  console.log('Lambda USA EVENT: \n' + JSON.stringify(event, null, 2));
  console.log(JSON.stringify(execute));

  // end
  return context.logStreamName;
};
