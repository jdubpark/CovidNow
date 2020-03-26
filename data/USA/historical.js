const
  axios = require('axios');

/*

    Need fix

*/
module.exports = class USA$Historical{
  static get url(){
    return {
      // usafacts.org
      map: 'https://usafactsstatic.blob.core.windows.net/public/2020/coronavirus-timeline/map.json',
      topology: 'https://usafactsstatic.blob.core.windows.net/public/2020/coronavirus-timeline/states.json',
      statewide: 'https://usafactsstatic.blob.core.windows.net/public/2020/coronavirus-timeline/allData.json',
    };
  };

  static fetch(){
    return axios(this.urls.statewide)
      .then(res => this.clean(res.data) || []);
  }

  static clean(counties){
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

      const
        // last num in array is the aggregated num
        countyTotalConf = obj.confirmed.slice(-1)[0],
        countyTotalDeath = obj.deaths.slice(-1)[0];

      if (obj.FIPS === '00' || countyName === 'Statewide Unallocated') countyName = 'unallocated';

      /*
          append county data obj to the state obj
      */
      // for lighter obj, simplify [0, 0, 0, ...] => 0 death to ['none']
      if (!countyTotalConf) obj.confirmed = ['none'];
      if (!countyTotalDeath) obj.deaths = ['none'];

      stateObj[countyName] = obj;


      /*
          add county data to the state's statewide data
      */
      // #1: initiate statewide object
      if (!stateObj.statewide){
        stateObj.statewide = {
          FIPS: null,
          progress: {confirmed: obj.confirmed, deaths: obj.deaths, recovered: []},
          stats: {confirmed: 0, deaths: 0, recovered: 0},
        };
      } else {
        // #2: add on
        const
          swsObj = stateObj.statewide.stats,
          swpObj = stateObj.statewide.progress;

        // sum stats numbers (last num in obj)
        // sum progress arrays
        swsObj.confirmed += countyTotalConf;
        swpObj.confirmed = swpObj.confirmed.map((num, key) => num + (obj.confirmed[key] || 0));

        swsObj.deaths += countyTotalDeath;
        swpObj.deaths = swpObj.deaths.map((num, key) => num + (obj.deaths[key] || 0));
      }

      if (state.name == 'NJ') console.log(state.name, stateObj.statewide)
    });

    return cleaned;
  }
};
