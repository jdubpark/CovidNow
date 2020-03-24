const
  request = require('request'),
  csv = require('csv-parse');

module.exports = class General$USA{
  constructor(){
    this.urls = {
      cases: 'https://hgis.uw.edu/virus/assets/cases.csv',
      communities: 'https://hgis.uw.edu/virus/assets/communities.csv',
      // also included: states for US
      countries: 'https://hgis.uw.edu/virus/assets/virus.csv',
    };
  }

  fetch(){
    return this.request().then(res => {
      // res.forEach
      console.log(res)
    }).catch(err => err);
  }

  request(){
    // https://github.com/request/request
    // https://www.npmjs.com/package/csv-parser
    return new Promise((resolve, reject) => {
      const resStream = request(this.urls.countries), results = [];
      resStream.on('error', err => reject(err));
      resStream.on('response', res => {
        if (res.statusCode == 200){
          resStream.pipe(csv())
            .on('data', data => results.push(data))
            .on('end', () => resolve(results));
        }
      });
    });
  }

  clean(counties){
    const cleaned = {};

    counties.forEach(county => {
      const
        obj = {},
        state = {
          name: county.stateAbbr,
          FIPS: county.stateFIPS,
        };

      let stateObj = cleaned[state.name], countyName = county.county;
      if (!stateObj) stateObj = cleaned[state.name] = {};

      obj.FIPS = county.countyFIPS;
      obj.deaths = county.deaths;
      obj.confirmed = county.confirmed;
      // obj.recovered = county.recovered;

      if (obj.FIPS === '00' || countyName === 'Statewide Unallocated') countyName = 'unallocated';

      // add county obj to the state obj
      stateObj[countyName] = obj;

      // add county data to the state's statewide data
      if (!stateObj.statewide){
        stateObj.statewide = {
          FIPS: null,
          progress: {confirmed: obj.confirmed, deaths: obj.deaths, recovered: []},
          stats: {confirmed: 0, deaths: 0, recovered: 0},
        };
      } else {
        const
          swsObj = stateObj.statewide.stats,
          swpObj = stateObj.statewide.progress;

        const
          // last num in array is the aggregated num
          countyConfDeath = obj.confirmed.slice(-1)[0],
          countyTotalDeath = obj.deaths.slice(-1)[0];

        // sum stats numbers (last num in obj)
        swsObj.confirmed += countyConfDeath;
        swsObj.deaths += countyTotalDeath;
        // sum progress arrays
        swpObj.confirmed = swpObj.confirmed.map((num, key) => num + (obj.confirmed[key] || 0));
        swpObj.deaths = swpObj.deaths.map((num, key) => num + (obj.deaths[key] || 0));

        // for lighter obj, simplify [0, 0, 0, ...] => 0 death to ['none']
        if (countyTotalDeath == 0) obj.deaths = ['none'];
      }
    });

    return cleaned;
  }
};
