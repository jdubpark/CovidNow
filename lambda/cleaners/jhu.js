const Shared = require('./shared');
module.exports = class JHU extends Shared{
  static _processData(data, category){
    if (category == 'stats') return this.cleanStats(data);
    else if (category == 'countries') return this.cleanCountries(data);
    else return null;
  }

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
