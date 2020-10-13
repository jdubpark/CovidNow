const
  axios = require('axios'),
  request = require('request'),
  csv = require('csv-parse'),
  utils = require('../utils');

module.exports = class Worker{
  constructor(source){
    this.src = source;
    this.cfg = {
      urls: this.src.urls,
      fetch: {
        interval: 12, // in hours
      },
    };
  }

  // all urls from src
  get _urls(){
    return this.src.urls;
  }

  // all urls to fetch
  get urls(){
    return this.urls;
  }

  get getConfig(){
    return this.cfg;
  }

  setConfig(newConf){
    this.cfg = utils.deepExtend(this.cfg, newConf);
    if (utils.isObject(newConf.urls)) this.setUrls(newConf.urls);
  }

  /*
  * Strictly for changing which urls to fetch.
  * Doesn't actually change the urls of the source (this.src.urls)
  * newUrls => (e.g.) obj{
      # urls to get
      live: [overview, states, counties]
      historical: [overview, states, counties]
      maskUsage: [counties]
    }
  */
  setUrls(newUrls){
    const urls = {};
    utils.mapKey(newUrls, (urlList, pKey) => {
      // parent key, child key
      // supports 2-leveled scheme {parent: {child: [arr]}} for now
      urls[pKey] = {};
      urlList.forEach(cKey => urls[pKey][cKey] = this.src.urls[pKey][cKey]);
    });
    this.cfg.urls = urls;
  }

  fetch(modUrls=undefined){
    const proms = {};

    if (utils.isObject(modUrls)) this.setUrls(modUrls);

    console.log(this.cfg.urls);

    utils.mapKey(this.cfg.urls, (urlList, pKey) => {
      proms[pKey] = {};

      utils.mapKey(urlList, (url, cKey) => {
        proms[pKey][cKey] = new Promise((resolve, reject) => {
          // IF: csv (special)
          // ELSE: non-csv (normal)
          // for now, non-csv is simply regarded as axios.get
          // in the future, consider implementing an array [url, type]
          // where if type == 'special', use a special function supplied
          // by the user (e.g. post with specific payload)
          if (url.split('.').pop() == 'csv'){
            const resStream = request(url), results = [];
            resStream.on('error', err => reject(err));
            resStream.on('response', res => {
              if (res.statusCode == 200){
                resStream.pipe(csv({delimiter: ','}))
                  .on('data', row => results.push(row))
                  .on('end', () => resolve(results));
              }
            });
          } else {
            axios(url).then(resolve).catch(reject);
          }
        });
      });
    });

    return Promise.all(
      Object.keys(proms).map(pKey => Promise.all(
        Object.keys(proms[pKey]).map(cKey => {
          return Promise.resolve(proms[pKey][cKey])
            .then(val => ({pKey, cKey, val}));
        })
      ))
    ).then(pItems => {
      let result = {};
      pItems.forEach(pItem => {
        // each item is wrapped again, probably the promise.all chains above
        // to make it work when using one pKey and multiple cKey within
        pItem.forEach(item => {
          if (!result[item.pKey]) result[item.pKey] = {};
          result[item.pKey][item.cKey] = item.val;
        });
      });
      return result;
    });

    return utils.objectPromise(proms)
      .then(resObj => {
        // resObj = proms
        // (except now we are manipulating the data returned from promise)
        utils.mapKey(resObj, (cProms, pKey) => {
          utils.mapKey(cProms, (cProm, cKey) => {
            if (this.src.processData) resObj[pKey][cKey] = this.src.processData(cProm, pKey+'/'+cKey);
          });
        });
        return resObj;
      });
  }
};
