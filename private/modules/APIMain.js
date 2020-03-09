const
  AWS = require('aws-sdk'),
  Bluebird = require('bluebird'),
  config = require('../../config/aws-config.js');

// AWS.config.update({
//   region: 'us-east-2',
//   endpoint: 'http://localhost:8000',
// });

const
  ModDDB = require('./DynamoDB');

module.exports = class APIMain{
  constructor(conf = {}){
    this.isDev = conf.isDev;
    AWS.config.update(this.isDev ? config.aws_local_config : config.aws_remote_config);
    this.DDB = new ModDDB({}, AWS);

    // core
    this.coreGetTypes = ['usa', 'countries', 'cases', 'stats'];
  }

  get core(){
    return {
      // bind this to attach Class object scope
      // bind returns the function (don't use call/apply)
      get: this.coreGet.bind(this),
      getAll: this.coreGetAll.bind(this),
    };
  }

  coreGet(type){
    if (!this.coreGetTypes.includes(type)) return Promise.reject(`Core Get type ${type} is not allowed`);
    return this.DDB.search(type)
      .then(res => {
        // console.log(res);
        return res.Items[0];
      })
      .catch(err => console.log(err));
  }

  coreGetAll(){
    const reqs = this.coreGetTypes.map(type => this.coreGet(type));
    return new Promise((resolve, reject) => {
      Bluebird.all(reqs)
        .spread((...res) => {
          const mapped = {};
          // data: res.Items[0]
          res.forEach((data, key) => mapped[this.coreGetTypes[key]] = data);
          resolve(mapped);
        })
        .catch(err => reject(err)); // at least one request failed
    });
  }

  err404(req){
    return {code: 404, error: 'page-not-found', endpoint: req.path};
  }

  err422(req){
    return {code: 404, error: 'unprocessable-entity', endpoint: req.path};
  }
};
