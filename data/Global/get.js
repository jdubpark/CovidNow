const
  Global$JHU = require('./JHU'),
  utils = require('../utils');

module.exports = class GetGlobal{
  static get partials(){
    return {
      jhu: Global$JHU,
    };
  };

  constructor(opt){
    // opt = {docClient}
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
    // const proms = {
    //   'global-jhu': Global$JHU.fetch(),
    // };
    // return utils.objectPromise(proms);

    /*
        For now, only use jhu for global data

        JHU returns {countries: {}, stats: {}}
          which will then be changed to:
          global-countries, global-stats
    */
    return Global$JHU.fetch();
  }

  store(data2upd){
    const proms = {};

    utils.mapKey(data2upd, (data, key) => {
      // change keys a little bit
      // for JHU
      if (key === 'countries') key = 'global-countries';
      else if (key === 'stats') key = 'global-stats';

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

      const prom = new Promise((resolve, reject) => {
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

      proms[key] = prom;
    });

    return utils.objectPromise(proms);
  }
};
