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
      geo: '/ncov_cases/FeatureServer/1/query?f=json&where=Confirmed%20%3E%200&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Confirmed%20desc%2CCountry_Region%20asc%2CProvince_State%20asc&resultOffset=0&resultRecordCount=1000',
      usa: '/ncov_cases/FeatureServer/1/query?f=json&where=(Confirmed%20%3E%200)%20AND%20(Country_Region%20=%20%27US%27)&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Confirmed%20desc%2CCountry_Region%20asc%2CProvince_State%20asc&resultOffset=0&resultRecordCount=1000',
      cases: '/cases_time_v3/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Report_Date_String%20asc&resultOffset=0&resultRecordCount=2000',
      nTotal: '/ncov_cases/FeatureServer/1/query?f=json&where=Confirmed%20%3E%200&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Confirmed%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D',
      nDeath: '/ncov_cases/FeatureServer/1/query?f=json&where=Confirmed%20%3E%200&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Deaths%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D',
      nRecov: '/ncov_cases/FeatureServer/1/query?f=json&where=Confirmed%20%3E%200&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Recovered%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D',
    };
  }

  run(){
    return new Promise((resolve, reject) => {
      this.fetch()
        .then(res => {
          this.process(res);
          resolve(res);
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

  process(data){
    return data;
  }

  compileUSA(dataUSA){
    // dataUSA: res.usa
    const usaNon = jsonfile.readFileSync('./usa-non.json'); // update every read
    const clt = {}; // collected
    dataUSA.features.forEach(feature => {
      const
        data = feature.attributes,
        [prov, state] = data.Province_State.split(', '),
        marker = state ? state.trim() : usaNon[prov] ? usaNon[prov] : prov;

      if (typeof clt[marker] === 'undefined'){
        clt[marker] = {total: 0, deaths: 0, recovered: 0, cases: []};
      }

      clt[marker].total += data.Confirmed;
      clt[marker].deaths += data.Deaths;
      clt[marker].recovered += data.Recovered;
      clt[marker].cases.push(data);
    });

    // compiled
    const cmp = {total: 0, states: {total: 0, deaths: 0, recovered: 0}, non: {total: 0, deaths: 0, recovered: 0}};
    Object.keys(clt).forEach(state => {
      // is legitimate state
      const data = clt[state], cobj = state.length == 2 ? cmp.states : cmp.non;
      cmp.total += data.total;
      cobj.total += data.total;
      cobj.deaths += data.deaths;
      cobj.recovered += data.recovered;
    });

    return {collected: clt, compiled: cmp};
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

  compileGeo(data){
    const byCountry = {};
    data.features.forEach(({attributes: cData}) => {
      const country = cData.Country_Region.split(' ').join('_');
      if (!byCountry[country]) byCountry[country] = [];
      const obj = {
        name: cData.Province_State,
        lat: cData.Lat,
        long: cData.Long_,
        confirmed: cData.Confirmed,
        deaths: cData.Deaths,
        recovered: cData.Recovered,
        updated: cData.Last_Update,
      };
      byCountry[country].push(obj);
    });
    return {byCountry};
  }

  getDiff(newTotal, oldTotal, fixed=2){
    const diff = newTotal - oldTotal;
    const perc = new BN(diff).dividedBy(oldTotal).multipliedBy(100).toFixed(fixed);
    // keep perc as string for dynamodb (can't process float)
    return [diff, perc];
  }
};
