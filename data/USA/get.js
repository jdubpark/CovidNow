const
  pako = require('pako'),
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
      // 'usa-cases': USA$Cases.fetch(), // off for now, source is inconsistent
      // separate for saving differently
      'usa-historical-states': USA$Historical.fetch(
        {states: USA$Historical.url.states}
      ),
      'usa-historical-counties': USA$Historical.fetch(
        {counties: USA$Historical.url.counties}
      ),
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

          let s3PutReq = {}, s3Proms = {};
          if (key === 'usa-cases'){
            /*
                USA cases (from UofV)
                Temporarily paused
            */
            s3PutReq = {
              cases: this.s3Client.createPutJsonRequest(
                bucketDir, 'cases.json', JSON.stringify(data.cases),
              ),
              cases300: this.s3Client.createPutJsonRequest(
                bucketDir, 'cases300.json', JSON.stringify(data.cases300),
              ),
            };

            s3Proms = {
              cases: this.s3Client.put(s3PutReq.cases),
              cases300: this.s3Client.put(s3PutReq.cases300),
            };
          }
          // else if (key === 'usa-historical-counties'){
          //   /*
          //       USA historical cases
          //       From github.com/nytimes/covid-19-data
          //   */
          //   s3PutReq = {
          //     counties: this.s3Client.createPutJsonRequest(
          //       bucketDir,
          //       'historical-counties.txt',
          //       pako.deflate(JSON.stringify(data.counties), {to: 'string'}),
          //     ),
          //   };
          //
          //   s3Proms = {
          //     counties: this.s3Client.put(s3PutReq.counties),
          //   };
          // }

          utils.objectPromise(s3Proms)
            .then(s3Res => {
              console.log(s3Res);
              console.log(Date.now(), ` :: S3 PutItem succeeded [${key}]`);
              resolve(true);
            })
            .catch(err => reject(err));
        });
      } else {
        if (key === 'usa-historical-counties'){
          data = pako.deflate(JSON.stringify(data.counties), {to: 'string'});
        }

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
              console.log(Date.now(), ` :: UpdateItem error [${key}]`);
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
