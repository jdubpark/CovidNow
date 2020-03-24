require('dotenv').config({path: __dirname+'/../.env'});
// console.log(__dirname+'/../.env');

module.exports = {
  aws_table_name: '',
  aws_local_config: {
    region: 'local',
    endpoint: 'http://localhost:8000',
  },
  aws_remote_config: {
    // use .env for prod
    accessKeyId: process.env.CN_AWS_DDB_KEY,
    secretAccessKey: process.env.CN_AWS_DDB_SECRET,
    region: 'us-east-2',
  },
};
