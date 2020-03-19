const
  axios = require('axios'),
  cheerio = require('cheerio'),
  Bluebird = require('bluebird'),
  AWS = require('aws-sdk');

AWS.config.update({
  region: 'local',
  endpoint: 'http://localhost:8000',
});

const
  PdfFromUrl = require('../modules/PdfFromUrl'),
  WHOFormat = require('./WHO-format'),
  ModDDB = require('../modules/DynamoDB'),
  countryNames = require('./countryNames.json');

const DDB = new ModDDB({tableName: 'WorldData'}, AWS);

module.exports = class WHO{
  constructor(){
    this.url = 'https://www.who.int/emergencies/diseases/novel-coronavirus-2019/situation-reports';
    this.excl = [
      'European Region', 'Territories', 'Eastern Mediterranean Region', 'Region of the Americas', 'African Region',
      'South', // ['South', '-', 'East Asia Region']
      '**', 'Subtotal for all', 'regions', 'Subtotal for all regions',
    ];
  }

  get(){
    return new Promise(async(resolve, reject) => {
      try {
        const res = await this.fetch();
        const data = await this.process(res);
        const sorted = await this.sort(data);
        resolve(sorted);
      } catch (err){
        reject(err);
      }
    });
  }

  async fetch(){
    return axios(this.url)
      .then(res => res)
      .catch(err => Promise.reject(err));
  }

  // https://stackoverflow.com/questions/44050414/promise-all-for-objects-in-javascript
  objectPromise(obj){
    return Promise.all(
      Object
        .keys(obj)
        .map(key => Promise.resolve(obj[key]).then(val => ({key: key, val: val})))
    ).then(items => {
      let result = {};
      items.forEach(item => result[item.key] = item.val);
      return result;
    });
  }

  async process(res){
    const $ = cheerio.load(res.data);

    const proms = {};
    const as = $('.sf_colsIn.col-md-9 .row p a');

    as.each((i, elem) => {
      const $a = $(elem), href = $a.attr('href');
      if (!href.includes('/docs/default-source/coronaviruse/situation-reports/')) return;
      const name = href.split('/').slice(-1)[0], time = name.split('-')[0], _time = Number(time);

      // ignore reports before 2020/02/19 (when table format changes)
      if (_time < 20200219) return;

      // FOR TEST ONLY!
      // const testDate = 20200223;
      // if (_time !== testDate) return;

      const promise = new Promise(async(resolve, reject) => {
        const doesExist = await this.dataExists(time);

        // ignore already fetched data
        if (doesExist){
          console.log(Date.now(), ` :: Data for "${time}" exists`);
          return resolve(null);
        }

        // const year = time.substr(0, 4), month = time.substr(4, 2), date = time.substr(-2);
        // const pretty = year+'-'+month+'-'+date, dObj = new Date(pretty), ts = dObj.getTime();

        // remove parameters for tabula-py
        const pdfUrl = 'https://www.who.int/'+href.split('?')[0];

        const pdfData = PdfFromUrl.get(pdfUrl)
          .then(data => {
            console.log(Date.now(), ` :: Fetched data for "${time}"`);

            const format = WHOFormat.get(_time);
            const pages = {China: [], World: []};
            data.forEach((page, index) => {
              const pgNum = index+1;
              if (format.pages.China.includes(pgNum)) pages.China.push(page);
              else if (format.pages.World.includes(pgNum)) pages.World.push(page);
            });

            let firstPageStart = 0;
            for (let i = 0; i < pages.World[0].length; i++){
              const row = pages.World[0][i];
              if (row[0] === 'Western Pacific Region'){
                firstPageStart = i+1;
                break;
              }
            }

            // slice first page
            // there might be only one page, so slice before calculating last page stop
            pages.World[0] = pages.World[0].slice(firstPageStart);

            const trigLimit = 4; // four triggers before stop (just to be safe)
            let len = pages.World.length, lastPageStop = 0, trig = 0;
            let lastPage = pages.World[len-1];

            // get last Page
            for (let i = 0; i < lastPage.length; i++){
              const row = pages.World[len-1][i];
              if (row.length !== format.heads.World.length){
                // check trigger
                if (trig < trigLimit) trig += 1;
                else {
                  lastPageStop = i-trigLimit+1;
                  break;
                }
              } else trig = 0;
            }

            // slice last page
            pages.World[len-1] = pages.World[len-1].slice(0, lastPageStop+1); // +1 since var is index

            const worldData = [];
            pages.World.forEach(page => page.forEach(row => worldData.push(row)));
            return worldData;
          })
          .catch(err => Promise.reject(err));

        resolve(pdfData);
      });

      proms[time] = promise;
    });

    return this.objectPromise(proms)
      .then(res => {
        console.log(res);
        // take out null promises (already exists)
        Object.keys(res).forEach(time => {
          if (!res[time]) delete res[time];
        });

        // console.log(res);
        if (!Object.keys(res).length){
          console.log(Date.now(), ' :: No data fetched - all exists');
          return {};
        }

        console.log(Date.now(), ' :: Fetched all needed data');
        return res;
      })
      .catch(err => Promise.reject(err));
  }

  dataExists(time){
    // check if data for a pdf date already exists
    return DDB.search(time)
      .then(res => res.Count)
      .catch(err => Promise.reject(err));
  }

  async sort(data){
    const times = Object.keys(data), all = {};

    // console.log(times);
    times.forEach(time => {
      const timeData = data[time];
      const format = WHOFormat.get(time);
      const obj = {};
      console.log(Date.now(), ` :: Sorting data for "${time}"`);
      // removen country name
      const formatWorld = format.heads.World, flen = format.heads.World.length;

      let skipNextRow = false;
      for (let i = 0; i < timeData.length; i++){
        console.log(timeData[i]);
        if (skipNextRow){
          skipNextRow = false;
          continue;
        }
        const row = timeData[i];
        if (this.excl.includes(row[0].trim())) continue;
        // remove ',' if placed between string (catching unexpected syntax)
        let joined = row.join(',').replace(/([a-z\s])\,([a-z\s])/gi, '$1$2');
        // replace (,\d with (\d -- happens for some dates
        joined = joined.replace(/\(\,(\d)/, '($1');
        // same, for \d,)
        joined = joined.replace(/(\d)\,\)/, '$1)');
        // same, for ,(\d
        joined = joined.replace(/\,\((\d)/, '($1');
        // combine back
        let spRow = joined.split(',');

        // console.log(spRow);

        // arrays with only one elem, either:
        // #1: some weird words we don't need
        // #2: error of reading pdf syntax, e.g. two/three-lined country name
        if (spRow.length === 1){
          // if next row exists (most likely #2), combine to next row
          // (next row MUST BE normal row)
          if (timeData[i+1] && timeData[i+1].length === flen){
            timeData[i+1][0] = spRow[0]+timeData[i+1][0];
          } else {
            // check next next row
            // sometimes names are stretched two rows
            // and next row (actual data) is missing the name (hence, len+1)
            if (timeData[i+2] && timeData[i+2].length+1 === flen){
              const nexName = timeData[i+1][0];
              // add to front
              timeData[i+2].unshift(spRow[0]+nexName);
              // IMPORTANT: skip next row
              skipNextRow = true;
            }
          }
          continue; // and skip (if nothing applies, just ignore)
        } else if (spRow.length === 2){
          // or if it made into 2 elements somehow
          if (timeData[i+1] && timeData[i+1].length === flen){
            timeData[i+1][0] = spRow[0]+spRow[1]+timeData[i+1][0];
            continue;
          } else continue;
        }

        // remove country name parenthesis (inside)
        spRow[0] = spRow[0].replace(/\([\w\W]+\)/, '');

        // save country name
        let country = spRow[0], _country = country.toLowerCase();
        // check for special country names
        if (countryNames[_country]) country = countryNames[_country];

        console.log(country, spRow);

        obj[country] = {};
        for (let j = 0; j < formatWorld.length; j++){
          const fname = formatWorld[j];
          // skip null (irrelevant) OR country name (already have it)
          if (!fname || fname === 'country') continue;

          console.log(j, fname, spRow[j]);
          if (typeof fname === 'object'){
            const vals = [
              spRow[j].replace(/\([\w\W]+\)/, '').trim(), // not (inside)
              spRow[j].match(/\((\d+)\)/)[1], // (inside)
            ];
            vals.forEach((val, k) => {
              const {type, subtype} = this.getType(fname[k]);
              if (!obj[country][type]) obj[country][type] = {};
              obj[country][type][subtype] = Number(vals[k]);
            });
          } else {
            const {type, subtype} = this.getType(fname);
            if (!obj[country][type]) obj[country][type] = {};
            obj[country][type][subtype] = Number(spRow[j]);
          }
        }
      }
      // console.log(obj);
      // Object.keys(obj).forEach(key => {
      //   console.log(key, obj[key]);
      // });
      all[time] = obj;
      console.log(Date.now(), ` :: Sorted data for "${time}"`);
    });

    return new Promise((resolve, reject) => {
      resolve(all);
    }).catch(err => Promise.reject(err));
  }

  getType(fname){
    const type = fname.slice(2);
    let subtype = '';

    if (fname.slice(0, 2) === 'n_') subtype = 'new';
    else if (fname.slice(0, 2) === 't_') subtype = 'total';
    else if (fname.slice(0, 2) === 'd_') subtype = 'daily';
    return {type, subtype};
  }
};
