const
  axios = require('axios');

module.exports = class General$USA{
  constructor(){
    this.urls = {
      map: 'https://usafactsstatic.blob.core.windows.net/public/2020/coronavirus-timeline/map.json',
      topology: 'https://usafactsstatic.blob.core.windows.net/public/2020/coronavirus-timeline/states.json',
      statewide: 'https://usafactsstatic.blob.core.windows.net/public/2020/coronavirus-timeline/allData.json',
    };
  }

  fetch(){
    return axios(this.urls.statewide)
      .then(res => this.clean(res.data) || []);
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
