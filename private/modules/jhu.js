const
  Bluebird = require('bluebird'),
  rp = require('request-promise'),
  jsonfile = require('jsonfile'),
  BN = require('bignumber.js');

module.exports = class JHU{
  constructor(){
    this.base = 'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services';
    // &cacheHint=true
    this.ext = {
      countries: '/ncov_cases/FeatureServer/1/query?f=json&where=Confirmed%20%3E%200&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Confirmed%20desc%2CCountry_Region%20asc%2CProvince_State%20asc&resultOffset=0&resultRecordCount=1000',
      usa: '/ncov_cases/FeatureServer/1/query?f=json&where=(Confirmed%20%3E%200)%20AND%20(Country_Region%20=%20%27US%27)&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Confirmed%20desc%2CCountry_Region%20asc%2CProvince_State%20asc&resultOffset=0&resultRecordCount=1000',
      cases: '/cases_time_v3/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Report_Date_String%20asc&resultOffset=0&resultRecordCount=2000',
      nTotal: '/ncov_cases/FeatureServer/1/query?f=json&where=Confirmed%20%3E%200&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Confirmed%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D',
      nDeath: '/ncov_cases/FeatureServer/1/query?f=json&where=Confirmed%20%3E%200&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Deaths%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D',
      nRecov: '/ncov_cases/FeatureServer/1/query?f=json&where=Confirmed%20%3E%200&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Recovered%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D',
    };
  }

  get(){
    return new Promise((resolve, reject) => {
      this.fetch()
        .then(res => {
          const data = this.process(res);
          resolve(data);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  }

  fetch(){
    const
      exts = Object.keys(this.ext),
      links = exts.map(key => this.base+this.ext[key]),
      reqs = links.map(link => rp(link));

    //
    // do i need to wrap Bluebird?
    //
    return new Promise((resolve, reject) => {
      Bluebird.all(reqs)
        .spread((...res) => {
          // all requests succeeded
          const mapped = {};
          res.forEach((val, key) => mapped[exts[key]] = JSON.parse(val));
          resolve(mapped);
        })
        .catch(err => {
          // at least one request failed
          console.log(err);
          reject(err);
        });
    });
  }

  process(res){
    const data = {
      usa: this.compileUSA(res.usa),
      stats: this.compileStats({total: res.nTotal, deaths: res.nDeath, recovered: res.nRecov}),
      cases: this.compileCases(res.cases),
      countries: this.compileCountries(res.countries),
    };
    return data;
  }

  compileUSA(dataUSA){
    // dataUSA: res.usa
    const usaNon = jsonfile.readFileSync(__dirname+'/../usa-non.json'); // update every read
    const clt = {}; // collected
    const geo = {list: [], ref: {}}; // geo-location
    dataUSA.features.forEach(feature => {
      const
        data = feature.attributes,
        [prov, state] = data.Province_State.split(', '),
        marker = state ? usaNon[state] ? usaNon[state] : state.trim() : usaNon[prov] ? usaNon[prov] : prov;

      if (typeof clt[marker] === 'undefined') clt[marker] = {total: 0, deaths: 0, recovered: 0, cases: []};
      const
        ref = clt[marker], // target ref to store data (cleaner code)
        loc = [data.Lat, data.Long_], // latitude, longitude
        loc1n = data.Lat+'_'+data.Long_; // loc 1 name (as object key)

      geo.list.push(loc);
      const obj = {
        location: data.Province_State,
        confirmed: data.Confirmed,
        deaths: data.Deaths,
        recovered: data.Recovered,
      };
      geo.ref[loc1n] = obj;

      ref.total += data.Confirmed;
      ref.deaths += data.Deaths;
      ref.recovered += data.Recovered;
      ref.cases.push(obj);
    });

    // compiled
    const cmp = {all: {total: 0, deaths: 0, recovered: 0}, states: {total: 0, deaths: 0, recovered: 0}, non: {total: 0, deaths: 0, recovered: 0}};
    Object.keys(clt).forEach(state => {
      // is legitimate state
      const data = clt[state], cobj = state.length == 2 ? cmp.states : cmp.non;
      cmp.all.total += data.total;
      cmp.all.deaths += data.deaths;
      cmp.all.recovered += data.recovered;
      cobj.total += data.total;
      cobj.deaths += data.deaths;
      cobj.recovered += data.recovered;
    });

    return {collected: clt, compiled: cmp, geo};
  }

  compileStats(data){
    const compiled = {};
    Object.keys(data).forEach(key => {
      const _data = data[key], stat = _data.features;
      compiled[key] = stat[0].attributes.value;
    });
    return compiled;
  }

  compileCases(data){
    const compiled = {};
    let prevTs = 0;
    data.features.forEach(({attributes: cData}) => {
      const timestamp = cData.Report_Date;
      const obj = {
        // id: cData.ObjectId,
        date: cData.Report_Date_String,
        confirmed: {
          mlChina: cData.Mainland_China, // Mainland China
          others: cData.Other_Locations, // Other Locations (excl. Maindland China)
          world: cData.Total_Confirmed, // World Total
          _delta: {
            mlChina: 0,
            others: 0,
            world: cData.Delta_Confirmed,
          },
        },
        recovered: {
          total: cData.Total_Recovered || 0,
          _delta: cData.Delta_Recovered || 0,
        },
        stats: {}, // calculated stats (next loop)
      };

      if (prevTs){
        const prevCase = compiled[prevTs];
        obj.confirmed._delta = this._caseDeltaStat(obj, prevCase);
      }

      compiled[timestamp] = obj;
      prevTs = timestamp;
    });

    const lastTs = prevTs, allTs = Object.keys(compiled);
    for (let i = 3; i < allTs.length; i++){
      // stats interval of 3 days and 7 days
      const now = compiled[allTs[i]], prev3 = compiled[allTs[i-3]];
      // console.log(now.date, prev3.date)
      now.stats.int3 = this._caseDeltaStat(now, prev3);

      // 7-day stat
      if (i >= 7){
        const prev7 = compiled[allTs[i-7]];
        now.stats.int7 = this._caseDeltaStat(now, prev7);
      }

      // console.log(now.date);
      // console.log(now.stats);
    }

    compiled._last = lastTs;
    return compiled;
  }

  _caseDeltaStat(now, prev){
    const cfrm = {
      mlChina: this.getDiff(now.confirmed.mlChina, prev.confirmed.mlChina),
      others: this.getDiff(now.confirmed.others, prev.confirmed.others),
      world: this.getDiff(now.confirmed.world, prev.confirmed.world),
    };
    const recv = this.getDiff(now.recovered.total, prev.recovered.total);
    // [delta, deltaPerc]
    return {confirmed: cfrm, recovered: recv};
  }

  compileCountries(data){
    const byCountry = {_others: {total: 0, deaths: 0, recovered: 0, cases: []}};
    data.features.forEach(({attributes: cData}) => {
      const country = cData.Country_Region.split(' ').join('_');
      // prepare country-specific object
      if (!byCountry[country]) byCountry[country] = {total: 0, deaths: 0, recovered: 0, cases: []};
      // reformat data
      const obj = {
        name: cData.Province_State,
        lat: cData.Lat,
        long: cData.Long_,
        confirmed: cData.Confirmed,
        deaths: cData.Deaths,
        recovered: cData.Recovered,
        updated: cData.Last_Update,
      };
      byCountry[country].total += obj.confirmed;
      byCountry[country].deaths += obj.deaths;
      byCountry[country].recovered += obj.recovered;
      byCountry[country].cases.push(obj);
      if (country !== 'Mainland_China' && country !== 'US'){
        byCountry._others.total += obj.confirmed;
        byCountry._others.deaths += obj.deaths;
        byCountry._others.recovered += obj.recovered;
      }
    });
    return byCountry;
  }

  getDiff(newTotal, oldTotal, fixed=2){
    const diff = newTotal - oldTotal;
    const perc = new BN(diff).dividedBy(oldTotal).multipliedBy(100).toFixed(fixed);
    // keep perc as string for dynamodb (can't process float)
    return [diff, perc];
  }
};
