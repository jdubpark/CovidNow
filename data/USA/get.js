const
  USA$States = require('./states'),
  USA$Counties = require('./counties'),
  USA$Cases = require('./cases'),
  USA$Historical = require('./historical'),
  utils = require('../utils');

module.exports = class GetUSA{
  static get partials(){
    return {
      states: USA$States,
      counties: USA$Counties,
      cases: USA$Cases,
      historical: USA$Historical,
    };
  };

  constructor(opt){
    // opt = {s3Client, docClient}
    this.s3Client = opt.s3Client;
    this.docClient = opt.docClient;
  }

  execute(){
    return new Promise((resolve, reject) => {
      this.fetch()
        .then(data => this.store(data))
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }

  fetch(){
    const proms = {
      'usa-states': USA$States.fetch(),
      'usa-counties': USA$Counties.fetch(),
      'usa-cases': USA$Cases.fetch(),
      // 'usa-historical': USA$Historical.fetch(), // being prepared
    };

    return utils.objectPromise(proms);
  }

  store(data2upd){
    const proms = {};

    utils.mapKey(data2upd, (data, key) => {
      let prom;
      /*
          save big json to S3
          and small json to DynamoDB
      */
      if (key === 'usa-cases'){
        prom = new Promise((resolve, reject) => {
          const bucketDir = 'covidnow/data/usa';
          const s3PutReq = {
            cases: this.s3Client.createPutJsonRequest(
              bucketDir, 'cases.json', JSON.stringify(data.cases),
            ),
            cases300: this.s3Client.createPutJsonRequest(
              bucketDir, 'cases300.json', JSON.stringify(data.cases300),
            ),
          };

          const s3Proms = {
            cases: this.s3Client.put(s3PutReq.cases),
            cases300: this.s3Client.put(s3PutReq.cases300),
          };

          utils.objectPromise(s3Proms)
            .then(s3Res => {
              console.log(s3Res);
              console.log(Date.now(), ' :: S3 PutItem succeeded [usa-cases]');
              resolve(true);
            })
            .catch(err => reject(err));
        });
      } else {
        const params = {
          TableName: 'Data',
          Key: {
            'key': key,
          },
          UpdateExpression: 'SET #dt = :dt, ts = :ts',
          ExpressionAttributeNames: {
            '#dt': 'data',
          },
          ExpressionAttributeValues: {
            ':dt': data,
            ':ts': Date.now(),
          },
        };

        prom = new Promise((resolve, reject) => {
          this.docClient.update(params, (err, res) => {
            if (err){
              // console.error(key, JSON.stringify(err, null, 2));
              console.log(Date.now(), ` :: UpdateItem Error [${key}]`);
              reject(err);
            } else {
              console.log(Date.now(), ` :: UpdateItem succeeded [${key}]`);
              resolve(true);
            }
          });
        });
      }

      proms[key] = prom;
    });

    return utils.objectPromise(proms);
  }
};
