'use strict';
// requires
const
  AWS = require('aws-sdk'),
  CronJob = require('cron').CronJob,
  config = require(__dirname+'/../config/aws-config.js');

AWS.config.update(process.env.NODE_ENV === 'production' ? config.aws_remote_config : config.aws_local_config);

// modules
const
  ModJHU = require('./modules/JHU'),
  ModDDB = require('./modules/DynamoDB');
const
  JHU = new ModJHU(),
  DDB = new ModDDB({}, AWS);

function fetchJHU(){
  console.log(Date.now(), ' :: JHU fetching job running...');
  JHU.get()
    .then(data => {
      // console.log(data);
      // console.log(data.usa);
      // DDB.add(data);
      DDB.update(data);
    })
    .catch(err => console.log(err));
}

// cron, every five minutes
const workerJob = new CronJob('0 */5 * * * *', fetchJHU, null, true, 'America/Los_Angeles');

fetchJHU(); // init fn call
workerJob.start();
