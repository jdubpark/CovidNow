// const
//   AWS = require('aws-sdk'),
//   CronJob = require('cron').CronJob;
// const config = require(__dirname+'/../config/aws-config.js');
// AWS.config.update(process.env.NODE_ENV === 'production' ? config.aws_remote_config : config.aws_local_config);
// const docClient = new AWS.DynamoDB.DocumentClient();

const Global$JHU = require('./Global/Jhu');

Global$JHU.fetch()
  .then(res => {
    // console.log(res);
    Object.keys(res.countries).forEach(key => {
      console.log(key, res.countries[key].nationwide);
    });
  })
  .catch(err => {
    console.log(err);
  });
