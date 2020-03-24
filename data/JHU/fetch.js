const
  axios = require('axios'),
  utils = require('../utils'),
  countryJSON = require('../json/country.json'),
  usaJSON = require('../json/usa.json');

module.exports = class Fetch$JHU{
  constructor(){
    this.base = 'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services';
    this.urls = {
      countries: '/ncov_cases/FeatureServer/1/query?f=json&where=Confirmed%20%3E%200&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Confirmed%20desc%2CCountry_Region%20asc%2CProvince_State%20asc&outSR=102100&resultOffset=0&resultRecordCount=250&cacheHint=true',
      // states for usa
      states: '/ncov_cases/FeatureServer/1/query?f=json&where=(Confirmed%20%3E%200)%20AND%20(Country_Region%3D%27US%27)&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Confirmed%20desc%2CCountry_Region%20asc%2CProvince_State%20asc&outSR=102100&resultOffset=0&resultRecordCount=250&cacheHint=true',
      // worldwide
      total: '/ncov_cases/FeatureServer/1/query?f=json&where=Confirmed%20%3E%200&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Confirmed%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&cacheHint=true',
      deaths: '/ncov_cases/FeatureServer/1/query?f=json&where=Confirmed%20%3E%200&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Deaths%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&cacheHint=true',
      recovered: '/ncov_cases/FeatureServer/1/query?f=json&where=Confirmed%20%3E%200&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Recovered%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&cacheHint=true',
    };
  }

  fetch(){
    const proms = {};
    Object.keys(this.urls).forEach(name => {
      const url = this.base+this.urls[name];
      proms[name] = axios(url).then(res => {
        return res.data.features.map(features => features.attributes);
      }).catch(err => err);
    });

    return utils.objectPromise(proms)
      .then(resObj => {
        // console.log(resObj)
        return this.process(resObj);
      })
      .catch(err => {
        console.log(err);
      });
  }

  process(resObj){
    const processed = {stats: {}};

    processed.stats = this.cleanStats({
      total: this.cleanStats(resObj.total),
      deaths: this.cleanStats(resObj.deaths),
      recovered: this.cleanStats(resObj.recovered),
    });
    processed.countries = this.cleanCountries(resObj.countries);
    processed.usa = this.cleanStates(resObj.states);

    return processed;
  }

  // total, deaths, recovered
  cleanStats(data){
    return data[0] && data[0].value ? data[0].value : null;
  }

  cleanCountries(dataArr){
    let cleaned = {};

    dataArr.forEach(data => this.cleanCommonT1(data, cleaned));
    cleaned = this.swapKeyNames(cleaned, countryJSON);
    cleaned.US = this.swapKeyNames(cleaned.US, usaJSON);

    return cleaned;
  }

  cleanStates(dataArr){
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

  cleanCommonT1(data, cleaned){
    const
      countryName = data.Country_Region,
      // stateName can be null for a lot of countries
      stateName = data.Province_State || 'nationwide';

    const obj = {
      name: data.Combined_Key,
      updated: data.Last_Update,
      confirmed: data.Confirmed,
      deaths: data.Deaths,
      recovered: data.Recovered,
      // active: data.Active, // just subtract deaths & recovered from confirmed
    };

    let countryObj = cleaned[countryName]; // pointer
    if (!countryObj) countryObj = cleaned[countryName] = {};

    let stateObj = cleaned[countryName][stateName]; // pointer
    if (!stateObj) stateObj = cleaned[countryName][stateName] = obj;
    else {
      // if state/nationwide object already exists for some reason
      // just sum up values
      const updateKeys = ['confirmed', 'deaths', 'recovered'];
      updateKeys.forEach(key => stateObj[key] += obj[key]);
    }
  }

  swapKeyNames(data, json){
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
