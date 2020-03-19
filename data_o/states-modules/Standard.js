const
  axios = require('axios'),
  cheerio = require('cheerio');

const
  isArray = a => Array.isArray(a), // a => a && typeof a === "object" && a.constructor === Array, // alt for no ES5
  isObject = o => o && typeof o === 'object' && o.constructor === Object,
  isDictionary = d => isObject(d) && !isArray(d);

module.exports = class Standard{
  constructor(stateData){
    this.axios = axios;
    this.cheerio = cheerio;
    // for easier coding, set binary genders and sort others to 'unknown' for now
    // FIX THIS LATER.
    this.sexTypes = ['male', 'female'];
    // configed in each state
    this.state = ''; // abbr.
    this.url = '';
    this.stateData = stateData;
  }

  run(){
    return this.request()
      .then(async res => {
        const data = res.data ? res.data : res;
        const pre = await this._preprocess(data);
        const mid = await this._midprocess(pre);
        return mid;
      })
      .catch(err => {
        Promise.reject(err);
      });
  }

  // default data structure
  defaultStructure(){
    return this.deepExtend({}, {
      stats: {total: 0, deaths: 0, recovered: 0},
      county: {},
      sex: {male: 0, female: 0, unknown: 0},
      age: {},
      exposure: {},
      hospitalized: {yes: 0, no: 0, unknown: 0},
      monitor: {total: 0, current: 0},
      tests: {total: 0, negative: 0, pending: 0},
    });
  }

  // Create deepExtend, but only change keys that exist in prev obj
  deepExtend(...extend){
    let end = undefined;
    for (let val of extend){
      if (isDictionary(val)){
        // contains dictionary
        if (!isObject(end)) end = {}; // change end to {} if end is not object
        for (let k in val) end[k] = this.deepExtend(end[k], val[k]); // loops through all nested objects
      } else end = val;
    }
    return end;
  }

  // get available counties based on passed stateData
  getCounties(){
    if (!this.stateData.countyAvailable) return {};
    let keys = Object.keys(this.stateData);
    // remove non-county keys
    ['state', 'stateShowsCounty', 'count', 'countyAvailable'].forEach(key => {
      keys.splice(keys.indexOf(key), 1);
    });
    // replace camel cases with spaces
    keys = keys.map(key => key.replace(/([a-z])([A-Z])/g, '$1 $2'));
    return keys;
  }

  /*
  * Only fetch data and pass on, nothing else
  */
  request(){
    return this.axios(this.url)
      .then(res => {
        return res;
      })
      .catch(err => {
        Promise.reject(err);
      });
  }

  /*
  * Data processor right after fetching the data
  * Prettify data and pass on
  */
  preprocess(data, resolve, reject){
    const $ = this.cheerio.load(data), collected = [];

    // preprocess data here (get important ones out, mostly tables for .gov)

    resolve(collected);
  }

  // promise version
  _preprocess(...args){
    return new Promise((resolve, reject) => {
      return this.preprocess(...args, resolve, reject);
    }).catch(err => Promise.reject(err));
  }

  /*
  * Data processor after preprocess()
  * Extract information, i.e. county name, its numbers, etc.
  */
  midprocess(data, resolve, reject){
    const collected = [];

    // extract county/city names and values, etc.

    resolve(collected);
  }

  // promise version
  _midprocess(...args){
    return new Promise((resolve, reject) => {
      return this.midprocess(...args, resolve, reject);
    }).catch(err => Promise.reject(err));
  }
};
