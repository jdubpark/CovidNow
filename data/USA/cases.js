const
  request = require('request'),
  csv = require('csv-parse'),
  // pako = require('pako'),
  utils = require('../utils');

module.exports = class USA$Cases{ // informally USA$UofW
  static get url(){
    return {
      cases: 'https://hgis.uw.edu/virus/assets/cases.csv',
      communities: 'https://hgis.uw.edu/virus/assets/communities.csv',
      // also included: states for US
      countries: 'https://hgis.uw.edu/virus/assets/virus.csv',
    };
  };

  static fetch(){
    /*
        for now, only get cases
    */
    const urls = {
      cases: this.url.cases,
    };
    return this.request(urls).then(res => {
      return this.process(res);
    }).catch(err => err);
  }

  static request(urls){
    const proms = {};

    Object.keys(urls).forEach(name => {
      const url = urls[name];
      proms[name] = new Promise((resolve, reject) => {
        // https://github.com/request/request
        // https://www.npmjs.com/package/csv-parser
        const resStream = request(url), results = [];
        resStream.on('error', err => reject(err));
        resStream.on('response', res => {
          if (res.statusCode == 200){
            resStream.pipe(csv())
              .on('data', data => results.push(data))
              .on('end', () => resolve(results));
          }
        });
      });
    });

    return utils.objectPromise(proms);
  }

  static process(res){
    const processed = {};

    processed.cases = this.cleanCases(res.cases);

    // 0 for meta
    const last300 = [res.cases[0], ...res.cases.slice(-300)];
    processed.cases300 = this.cleanCases(last300);

    return processed;
  }

  static cleanCases(cases){
    const cleaned = {
      raw: {
        meta: cases[0].slice(1), // remove id (used as key)
        data: {}, // {id1: arr1, id2: arr2, etc...}
      },
      states: {},
      dates: {},
    };

    // first item is meta, so slice it
    const metaArr = cases[0];
    // console.log(cleaned.raw.data.length);
    cases.slice(1).forEach(data => {
      /*
          match the metaArr keys to case data to auto create an object
          with {key: val} structure (sharing the same idx)
          key = metaArr[idx] and val = data[idx]
          > this allows keeping up to the data structure without manual review
          > and just use key value to get the data from array
      */
      const obj = data.reduce((acc, cur, idx) => (acc[metaArr[idx]] = cur, acc), {});
      cleaned.raw.data[obj.id] = data.slice(1);

      /*
          now, data manipulation & cleaning
          structure as of Mar 24:
          [id, no, date, county, state (abbr), lng, lat, note, reference,]
      */
      if (obj.state){
        let stateObj = cleaned.states[obj.state];
        if (!stateObj) stateObj = cleaned.states[obj.state] = {};

        let countyObj;
        if (obj.county){
          if (!stateObj[obj.county]) stateObj[obj.county] = [];
          countyObj = stateObj[obj.county];
        } else {
          if (!stateObj.statewide) stateObj.statewide = [];
          countyObj = stateObj.statewide;
        }

        // object used for referencing
        const refObj = {id: obj.id, date: obj.date};

        countyObj.push(refObj);
      }

      if (obj.date){
        if (!cleaned.dates[obj.date]) cleaned.dates[obj.date] = [];
        cleaned.dates[obj.date].push(obj.id);
      }
    });

    // const string = JSON.stringify(cases);
    // const compressed = pako.gzip(string, {to: 'string'});
    return cleaned;
  }
};
