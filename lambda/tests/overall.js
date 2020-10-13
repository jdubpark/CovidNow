const AWS = require('aws-sdk');
const yaml = require('js-yaml');
const fs = require('fs');
const util = require('util');

const S3Client = require('../aws/aws-s3-client');
const SchemaCleaner = require('../schema/cleaner');
const DataFetcher = require('../scripts/fetcher');
const dataCleaner = require('../cleaners');
const DataStorer = require('../scripts/storer');

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

// const storer = new DataStorer({AWSkey});

let schemaMain = yaml.safeLoad(fs.readFileSync('../schema/main.yaml', 'utf8'));
schemaMain = SchemaCleaner.main(schemaMain);

const fetches = {}, proms = {};
// console.log(schemaMain.overview)
fetches.overview = new DataFetcher(schemaMain.overview);
fetches.extensive = new DataFetcher(schemaMain.extensive);

proms.overview = fetches.overview.setFetch();
proms.extensive = fetches.extensive.setFetch();

fetches.overview.setCleaner(dataCleaner);
// fetches.extensive.setCleaner(dataCleaner);

// fetches.overview.setStorer(storer);
// fetches.overview.setStorer(storer);

console.log(util.inspect(proms, false, null, true));

fetches.overview.doFetch();
// proms.overview.doFetch();

// run fetched data through cleaners
// const fetched
// fetches.overview = DataCleaner.clean(fetches.overview);
// fetches.extensive = DataCleaner.clean(fetches.extensive);
