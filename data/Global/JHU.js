const
  axios = require('axios'),
  utils = require('../utils'),
  countryJSON = require('../json/country.json'),
  usaJSON = require('../json/usa.json');

module.exports = class Global$JHU{
  static get base(){
    return 'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services';
  }

  static get url(){
    return {
      countries: '/ncov_cases/FeatureServer/1/query?f=json&where=Confirmed%20%3E%200&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Confirmed%20desc%2CCountry_Region%20asc%2CProvince_State%20asc&outSR=102100&resultOffset=0&resultRecordCount=250&cacheHint=true',
      // states for usa
      states: '/ncov_cases/FeatureServer/1/query?f=json&where=(Confirmed%20%3E%200)%20AND%20(Country_Region%3D%27US%27)&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Confirmed%20desc%2CCountry_Region%20asc%2CProvince_State%20asc&outSR=102100&resultOffset=0&resultRecordCount=250&cacheHint=true',
      // worldwide
      total: '/ncov_cases/FeatureServer/1/query?f=json&where=Confirmed%20%3E%200&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Confirmed%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&cacheHint=true',
      deaths: '/ncov_cases/FeatureServer/1/query?f=json&where=Confirmed%20%3E%200&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Deaths%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&cacheHint=true',
      recovered: '/ncov_cases/FeatureServer/1/query?f=json&where=Confirmed%20%3E%200&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Recovered%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&cacheHint=true',
    };
  }

  static fetch(){
    const proms = {};

    Object.keys(this.url).forEach(name => {
      const url = this.base+this.url[name];
      proms[name] = axios(url)
        .then(res => res.data.features.map(features => features.attributes))
        .catch(err => err);
    });

    return utils.objectPromise(proms)
      .then(resObj => {
        return this.process(resObj);
      })
      .catch(err => {
        console.log(err);
        Promise.reject(err);
      });
  }

  static process(resObj){
    const processed = {stats: {}};

    processed.stats = {
      total: this.cleanStats(resObj.total),
      deaths: this.cleanStats(resObj.deaths),
      recovered: this.cleanStats(resObj.recovered),
    };
    processed.countries = this.cleanCountries(resObj.countries);
    // processed.usa = this.cleanStates(resObj.states);

    return processed;
  }

  // total, deaths, recovered
  static cleanStats(data){
    return data[0] && data[0].value ? data[0].value : null;
  }

  static cleanCountries(dataArr){
    let cln = {};

    dataArr.forEach(data => {
      const dt = this.extract(data);

      /*
          Initiate country obj with nationwide data
      */
      if (!cln[dt.country]){
        cln[dt.country] = {
          nationwide: {
            update: 'varies', // changed for no-state-data countries
            confirmed: 0,
            deaths: 0,
            recovered: 0,
          },
        };
      }

      /*
          For countries with no state/providence data
            transfer to nationwide
      */
      if (!dt.state){
        cln[dt.country].nationwide = {
          update: dt.update,
          confirmed: dt.confirmed,
          deaths: dt.deaths,
          recovered: dt.recovered,
        };
        return;
      }

      /*
          For countries with state/providence data,
            sum data in country.nationwide obj
            and append state/providence obj to country obj
      */
      // sum up the data in the nation
      cln[dt.country].nationwide.confirmed += dt.confirmed;
      cln[dt.country].nationwide.deaths += dt.deaths;
      cln[dt.country].nationwide.recovered += dt.recovered;

      // append state/providence data obj to the country's obj
      cln[dt.country][dt.state] = {
        update: dt.update, // individual update time
        confirmed: dt.confirmed,
        deaths: dt.deaths,
        recovered: dt.recovered,
      };
    });

    // replace long/weird country names with normalized ones
    cln = this.swapKeyNames(cln, countryJSON);

    // replace US States with abbr.
    cln.US = this.swapKeyNames(cln.US, usaJSON);

    return cln;
  }

  /*
      USA data has been moved to the USA folder (with diff. sources)
  */
  /*
  static cleanStates(dataArr){
    const cleaned = {}, usData = {};

    dataArr.forEach(data => this.cleanCommonT1(data, cleaned));

    usData.territories = {};
    usData.cruise_ships = {};
    usData.states = {};
    usData.evacuees = {};
    Object.keys(cleaned.US).forEach(name => {
      const data = cleaned.US[name];
      if (usaJSON[name]) name = usaJSON[name]; // shorter name

      if (usaJSON.TERRITORY.includes(name)) usData.territories[name] = data;
      else if (usaJSON.CRUSE_SHIPS.includes(name)) usData.cruise_ships[name] = data;
      else if (name === 'Wuhan Evacuee') usData.evacuees[name] = data;
      else usData.states[name] = data;
    });

    // cleaned.US = this.swapKeyNames(cleaned.US, usaJSON);

    return usData;
  }
  */

  static extract(data){
    return {
      country: data.Country_Region,
      state: data.Province_State || null,
      // name: data.Combined_Key,
      update: data.Last_Update,
      confirmed: data.Confirmed,
      deaths: data.Deaths,
      recovered: data.Recovered,
      // active: data.Active, // just subtract deaths & recovered from confirmed
    };
  }

  static swapKeyNames(data, json){
    Object.keys(data).forEach(name => {
      const newName = json[name];
      if (newName){
        data[newName] = data[name];
        delete data[name];
      }
    });
    return data;
  }
};
