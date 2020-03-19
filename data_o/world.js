'use strict';

const
  AWS = require('aws-sdk');

AWS.config.update({
  region: 'local',
  endpoint: 'http://localhost:8000',
});

const
  ModWHO = require('./world/WHO'),
  ModDDB = require('./modules/DynamoDB');

const
  WHO = new ModWHO(),
  DDB = new ModDDB({tableName: 'WorldData'}, AWS);

// DDB.deleteByKey(20200223);
// DDB.search(20200223)
//   .then(res => {
//     if (!res.Count){
//       console.log('empty');
//       return;
//     }
//     const {Items: [{data: data}]} = res;
//     console.log(data);
//     // DDB.deleteByKey(20200223);
//   })
//   .catch(err => console.log(err));

WHO.get()
  .then(data => {
    // console.log(data);
    DDB.update(data);
  })
  .catch(err => {
    console.log(err);
  });
