const
  axios = require('axios'),
  cheerio = require('cheerio');

const
  isArray = a => Array.isArray(a), // a => a && typeof a === "object" && a.constructor === Array, // alt for no ES5
  isObject = o => o && typeof o === 'object' && o.constructor === Object,
  isDictionary = d => isObject(d) && !isArray(d);

module.exports = class Standard{
  static get axios(){
    return axios;
  }

  static get cheerio(){
    return cheerio;
  }

  static get defaultStructure(){
    return this.deepExtend({}, {
      total: null, // total cases (excl. deaths)
      deaths: null,
      recovered: null,
      pending: null, // pending tests
      negative: null, // negative tests
      hospitalized: null,
      causes: {}, // causes of spread
    });
  }

  static deepExtend(...extend){
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
};
