'use strict';
// requires
const
  AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-2',
  endpoint: 'http://localhost:8000',
});

// modules
const
  ModJHU = require('./modules/JHU'),
  ModDDB = require('./modules/DynamoDB');
const
  JHU = new ModJHU(),
  DDB = new ModDDB({}, AWS);

function fetchJHU(){
  JHU.get()
    .then(data => {
      // console.log(data);
      // console.log(data.usa);
      // DDB.add(data);
      DDB.update(data);
    })
    .catch(err => console.log(err));
}
