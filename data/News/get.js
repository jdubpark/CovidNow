const
  News$Google = require('./google-news'),
  utils = require('../utils');

module.exports = class GetNews{
  static get partials(){
    return {
      google: News$Google,
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
    //   'google-news': News$Google.fetch(),
    // };
    // return utils.objectPromise(proms);
    /*
        Just Google news for now
    */
    return News$Google.fetch();
  }

  store(data2upd){
    const proms = {};

    utils.mapKey(data2upd, (data, lang) => {
      const params = {
        TableName: 'News',
        Key: {
          'lang': lang,
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
            // console.error(JSON.stringify(err, null, 2));
            console.log(Date.now(), ` :: UpdateItem Error [${lang}]`);
            reject(err);
          } else {
            console.log(Date.now(), ` :: UpdateItem succeeded [${lang}]`);
            resolve(true);
          }
        });
      });

      proms[lang] = prom;
    });

    return utils.objectPromise(proms);
  }
};
