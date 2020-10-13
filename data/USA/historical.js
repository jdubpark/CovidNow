const
  request = require('request'),
  csv = require('csv-parse'),
  utils = require('../utils'),
  usaJSON = require('../json/usa.json'),
  usaStatesJSON = require('../json/usa-states.json');

/*

    Need fix

*/
module.exports = class USA$Historical{
  static get url(){
    return {
      // nytimes
      states: 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv',
      counties: 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv',
    };
  };

  static fetch(urls=this.url){
    const proms = {};

    utils.mapKey(urls, (url, key) => {
      proms[key] = new Promise((resolve, reject) => {
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

    return utils.objectPromise(proms)
      .then(resObj => {
        utils.mapKey(resObj, (data, key) => {
          resObj[key] = this.process(data, key);
        });
        return resObj;
      });
  }

  static process(data, name){
    let cleaned = {};

    if (name === 'states') cleaned = this.cleanStates(data);
    else if (name === 'counties') cleaned = this.cleanCounties(data);

    return cleaned;
  }

  static cleanStates(data){
    const cln = {};
    const idx = this.getMetaIdx(data[0]);

    // slice to skip meta
    data.slice(1).forEach(arr => {
      const
        date = arr[idx.date],
        FIPS = arr[idx.fips],
        confirmed = Number(arr[idx.cases]) || 0,
        deaths = Number(arr[idx.deaths]) || 0,
        recovered = arr[idx.recovered] || 0; // nyt doesn't report it yet
      let state = arr[idx.state];

      const abbr = this.getStateAbbr(state);

      /*
          Initiate state obj
          If nonstate, leave it as a sub obj system
      */
      if (!cln[abbr]){
        const obj = {
          name: state,
          FIPS,
          timeline: {},
          latest: null,
        };

        cln[abbr] = {}; // make everything a sub obj system
        // process for states
        if (abbr !== 'nonstate') cln[abbr] = obj;
      }

      /*
          Initiate nonstate obj
      */
      if (abbr === 'nonstate'){
        const state_ = state;
        state = usaJSON[state] || state; // try to shorten nonstate's name
        cln[abbr][state] = {
          name: state_,
          FIPS,
          timeline: {},
          latest: null,
        };
      }

      /*
          Add data obj to state timeline obj
          Assume there is only one data per date per state
            (just override otherwise)
      */
      const pointer = abbr === 'nonstate' ? cln[abbr][state] : cln[abbr];
      pointer.timeline[date] = {confirmed, deaths, recovered};
      pointer.latest = date; // gets updated to the latest date
    });

    return cln;
  }

  static cleanCounties(data){
    const cln = {};
    const idx = this.getMetaIdx(data[0]);

    // slice to skip meta
    data.slice(1).forEach(arr => {
      const
        date = arr[idx.date],
        state = arr[idx.state],
        county = arr[idx.county],
        FIPS = arr[idx.fips],
        confirmed = Number(arr[idx.cases]) || 0,
        deaths = Number(arr[idx.deaths]) || 0,
        recovered = arr[idx.recovered] || 0; // nyt doesn't report it yet

      const abbr = this.getStateAbbr(state);

      /*
          Initiate state obj
          If nonstate, leave it as a sub obj system
      */
      if (!cln[abbr]){
        const obj = {
          name: state,
          counties: {},
        };

        cln[abbr] = {}; // make everything a sub system
        // process for states
        if (abbr !== 'nonstate') cln[abbr] = obj;
      }

      /*
          Create nonstate obj
          Nonstates don't have any counties,
            so their reported 'Unknown' county is their entire number
      */
      if (abbr === 'nonstate'){
        cln[abbr][state] = {
          name: state,
          // FIPS, // no FIPS for nonstate
          confirmed, deaths, recovered,
          latest: date,
        };
      }

      // nonstate obj already created above, so below codes
      // are only for states
      if (abbr === 'nonstate') return;

      /*
          Initiate county obj
      */
      if (!cln[abbr].counties[county]){
        cln[abbr].counties[county] = {
          FIPS,
          timeline: {},
          latest: null,
        };
      }

      /*
          Add county data obj to state counties obj
          Again, assume there is only one data per date per county
      */
      cln[abbr].counties[county].timeline[date] = {FIPS, confirmed, deaths, recovered};
      cln[abbr].counties[county].latest = date;
    });

    return cln;
  }

  static getStateAbbr(state){
    return usaStatesJSON[state] ? usaStatesJSON[state] : 'nonstate';
  }

  static getMetaIdx(meta){
    // get idx of items in meta
    const idx = {};
    meta.forEach((key, i) => idx[key] = i);
    return idx;
  }
};
