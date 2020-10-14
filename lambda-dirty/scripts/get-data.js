const request = require('request');
// https://github.com/Keyang/csvbench :: papaparse is the fastest
const papa = require('papaparse');

function objectPromise(obj){
  // https://stackoverflow.com/questions/44050414/promise-all-for-objects-in-javascript
  // just use return for prettier syntax
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

module.exports = class GetData{
  constructor(opt){
    // this.s3Client = opt.s3Client;
    this.docClient = opt.docClient;
    this.ddb = opt.ddb;
    // interval in between each request to ddb (for batchwrite)
    this.ddbPutIntv = {
      states: 650, // provisioned
      counties: 100, // on-demand
    };
  }

  execute(type='overview'){
    const fetches = this.fetchSetup(type), proms = {};

    Object.keys(fetches).forEach(key => {
      const fetchFn = fetches[key];
      console.log('----------------------------------');
      console.log('fetching at', Date.now(), key);
      proms[key] = fetchFn()
        .then(res => {
          const {src, category, data} = res;
          console.log('----------------------------------');
          console.log('fetched at', Date.now(), src, category, key);
          // console.log(data);
          return this.store({src, key, category, data});
        });
    });

    return objectPromise(proms);
  }

  fetchSetup(type){
    const fetches = {};

    // ext = extensive // ove = overview
    // spec = specific // glob = global
    if (type == 'global_overview'){
      // https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data
      fetches['ove/glob/total'] = this.fetchJHU('stats', 'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1/query?f=json&where=Confirmed > 0&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=[{"statisticType":"sum","onStatisticField":"Confirmed","outStatisticFieldName":"value"}]&cacheHint=true');
      fetches['ove/glob/deaths'] = this.fetchJHU('stats', 'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1/query?f=json&where=Confirmed > 0&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=[{"statisticType":"sum","onStatisticField":"Deaths","outStatisticFieldName":"value"}]&cacheHint=true');
      fetches['ove/glob/recovered'] = this.fetchJHU('stats', 'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1/query?f=json&where=Confirmed > 0&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=[{"statisticType":"sum","onStatisticField":"Recovered","outStatisticFieldName":"value"}]&cacheHint=true');
    } else if (type == 'global_extensive'){
      fetches['ove/glob/countries'] = this.fetchJHU('countries', 'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/2/query?f=json&where=1=1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Confirmed desc&resultOffset=0&resultRecordCount=250&resultType=standard&cacheHint=true');
    } else if (type == 'USA_overview'){
      fetches['ove/spec/USA/latest'] = this.fetchNYTgit('overview', 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/live/us.csv');
    } else if (type == 'USA_extensive'){
      fetches['ext/spec/USA/latest/states'] = this.fetchNYTgit('states', 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/live/us-states.csv');
      fetches['ext/spec/USA/latest/counties'] = this.fetchNYTgit('counties', 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/live/us-counties.csv');
    }

    // RUN ONLY ONCE! all historical and static data
    // RUN ON PRODUCTION TO SAVE THE DATA and continue updating with live data
    if (type == 'init'){
      // fetches['ove/spec/USA/historical'] = this.fetchNYTgit('overview', 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/us.csv');
      // fetches['ext/spec/USA/historical/counties'] = this.fetchNYTgit('counties', 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv');
      // fetches['ext/spec/USA/historical/states'] = this.fetchNYTgit('states', 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv');
      // fetches['ext/spec/USA/maskUsage/counties'] = this.fetchNYTgit('maskUsage', 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/mask-use/mask-use-by-county.csv');
      // fetch['ext/spec/USA/colleges/all'] = this.fetchNYTgit('colleges', 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/colleges/colleges.csv');
    }

    return fetches;
  }

  fetchJHU(category, url){
    return () => {
      return new Promise((resolve, reject) => {
        request(url, (err, res, body) => {
          if (err) reject(err);
          else resolve(JSON.parse(body));
        });
      })
        .then(body => body.features.map(features => features.attributes))
        .then(data => this.cleanJHU(category, data))
        .then(data => ({src: 'JHU', category, data}));
    };
  }

  fetchNYTgit(category, url){
    const data = [];
    const parseStream = papa.parse(papa.NODE_STREAM_INPUT, {delimiter: ','});
    parseStream.on('data', row => data.push(row));
    parseStream.on('end', () => console.log('csv parse end at', Date.now(), url));

    return () => {
      return new Promise((resolve, reject) => {
        resolve(request(url));
      })
        .then(res => {
          return new Promise((resolve, reject) => {
            res.pipe(parseStream)
              .on('error', err => {
                console.log('error at', category, url);
                reject(err);
              })
              .on('end', () => resolve(data));
          });
        })
        .then(data => this.cleanNYTgit(category, data))
        .then(data => ({src: 'NYTgit', category, data}));
    };
  }

  store(packed){
    const {src, key, category, data} = packed;
    console.log('saving data at', Date.now(), src, category, key);

    if (src == 'JHU'){
      if (['ove/glob/total', 'ove/glob/recovered', 'ove/glob/deaths'].indexOf(key) > -1){
        return this.storeGlobalLatest(packed);
      } else if (key == 'ove/glob/countries'){
        return this.storeGlobalCountriesLatest(packed);
      }
    } else if (src == 'NYTgit'){
      if (['ove/spec/USA/latest', 'ove/spec/USA/historical'].indexOf(key) > -1){
        return this.storeUSAOverview(packed);
      } else if (['ext/spec/USA/latest/states', 'ext/spec/USA/historical/states'].indexOf(key) > -1){
        return this.storeUSAStates(packed);
      } else if (['ext/spec/USA/latest/counties', 'ext/spec/USA/historical/counties'].indexOf(key) > -1){
        return this.storeUSACounties(packed);
      } else if (key == 'ext/spec/USA/maskUsage/counties'){
        return this.storeUSAMaskUsage(packed);
      }
    }
  }

  storeOne(packed){
    const {src, key, category, data} = packed;
    return new Promise((resolve, reject) => {
      this.docClient.update(params, (err, res) => {
        if (err){
          // console.error(key, JSON.stringify(err, null, 2));
          console.log(Date.now(), ` :: UpdateItem error [${key}]`);
          reject(err);
        } else {
          console.log(Date.now(), ` :: UpdateItem succeeded [${key}]`);
          resolve(true);
        }
      });
    });
  }

  storeGlobalLatest(packed){
    const {src, key, category, data} = packed, splt = key.split('/');
    const params = {
      TableName: 'Global',
      Key: {'dtype': splt[splt.length-1], 'date': (new Date()).toISOString().split('T')[0]},
      UpdateExpression: 'SET val = :val, ts = :ts',
      // ExpressionAttributeNames: {'#value': 'value'}, // for using key 'value' #value
      ExpressionAttributeValues: {
        ':val': data,
        ':ts': Date.now(),
      },
    };

    return new Promise((resolve, reject) => {
      this.docClient.update(params, (err, res) => {
        if (err){
          // console.error(key, JSON.stringify(err, null, 2));
          console.log(Date.now(), ` :: UpdateItem error [${key}]`);
          reject(err);
        } else {
          console.log(Date.now(), ` :: UpdateItem succeeded [${key}]`);
          resolve(true);
        }
      });
    });
  }

  storeGlobalCountriesLatest(packed){
    const
      {src, key, category, data} = packed,
      params = [], batchNum = 25, tymd = (new Date()).toISOString().split('T')[0];

    Object.keys(data).forEach((country, i) => {
      const
        item = {'country': {'S': country}, 'date': {'S': tymd}},
        cdata = data[country],
        batchLoc = Math.floor(i/25);

      if (!params[batchLoc]) params[batchLoc] = {RequestItems: {Global_Countries: []}};

      Object.keys(cdata).forEach(cKey => {
        if (!cdata[cKey] && cdata[cKey] != 0) return;
        item[cKey] = {'N': cdata[cKey].toString()};
      });
      params[batchLoc].RequestItems.Global_Countries.push({
        PutRequest: {Item: item},
      });
    });

    const plen = params.length;
    return Promise.all(
      params.map((bParams, i) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.ddb.batchWriteItem(bParams, (err, data) => {
              if (err) reject(err);
              else {
                if (!((i+1)%10)) console.log('saved Global Countries Latest at', Date.now(), `[${i+1}/${plen}]`);
                if (i+1 == plen) console.log('[end] saved Global Countries Latest at', Date.now(), `[${i+1}/${plen}]`);
                resolve(data);
              }
            });
          }, i*this.ddbPutIntv.states);
        });
      })
    );
  }

  storeUSAOverview(packed){
    const
      {src, key, category, data} = packed,
      params = [], batchNum = 25,
      cols = data._COLS;

    delete data._COLS;

    Object.keys(data).forEach((date, i) => {
      const item = {'date': {'S': date}}, batchLoc = Math.floor(i/25);

      if (!params[batchLoc]) params[batchLoc] = {RequestItems: {USA_Overview: []}};

      data[date].forEach((num, k) => item[cols[k]] = {'N': num});
      params[batchLoc].RequestItems.USA_Overview.push({
        PutRequest: {Item: item},
      });
    });

    return Promise.all(
      params.map(bParams => {
        return new Promise((resolve, reject) => {
          this.ddb.batchWriteItem(bParams, (err, data) => {
            if (err) reject(err);
            else resolve(data);
          });
        });
      })
    );
  }

  storeUSAStates(packed){
    const
      {src, key, category, data} = packed,
      params = [], batchNum = 25, cols = data._COLS;
    delete data._COLS;

    let batchRun = 0, batchLoc = 0;
    Object.keys(data).forEach(state => {
      if (state == '') return; // skip weird state = '' data
      delete data[state]._FIPS;

      Object.keys(data[state]).forEach(date => {
        // define the 'item' variable here to localize the scope to each forEach loop
        // if we define the 'item' outside, its scope will also be out this forEach loop
        // and thus item will be always point to the last saved value
        const item = {'state': {'S': state}, 'date': {'S': date}}, sarr = data[state][date];
        // if (date.slice(0, 2) !== '20') return; // skip weird date
        batchLoc = Math.floor(batchRun/25);
        if (!params[batchLoc]) params[batchLoc] = {RequestItems: {USA_States: []}};

        sarr.forEach((num, k) => {
          if (num == '') return;
          item[cols[k]] = {'N': num};
        });
        params[batchLoc].RequestItems.USA_States.push({PutRequest: {Item: item}});

        // put at the end, 25th element (item #26) will be put to new batch
        batchRun += 1;
      });
    });

    const plen = params.length;
    return Promise.all(
      params.map((bParams, i) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.ddb.batchWriteItem(bParams, (err, data) => {
              if (err) reject(err);
              else {
                if (!((i+1)%10)) console.log('saved USA States at', Date.now(), `[${i+1}/${plen}]`);
                if (i+1 == plen) console.log('[end] saved USA States at', Date.now(), `[${i+1}/${plen}]`);
                resolve(data);
              }
            });
          }, i*this.ddbPutIntv.states);
        });
      })
    );
  }

  storeUSACounties(packed){
    const
      {src, key, category, data} = packed,
      params = [], batchNum = 25,
      cols = data._COLS;

    delete data._COLS;

    let batchRun = 0, batchLoc = 0;

    Object.keys(data).forEach(state => {
      Object.keys(data[state]).forEach(county => {
        const cFips = data[state][county]._FIPS;
        delete data[state][county]._FIPS;

        if (cFips == '') return; // skip weird fips = '' data

        Object.keys(data[state][county]).forEach(date => {
          batchLoc = Math.floor(batchRun/25);
          if (!params[batchLoc]) params[batchLoc] = {RequestItems: {USA_Counties: []}};

          const
            sarr = data[state][county][date],
            // declare item here to use local scope value
            item = {
              'state': {'S': state}, 'fips_date': {'S': cFips+'#'+date},
              // include FIPS and DATE for GSI query
              'fips': {'S': cFips}, 'date': {'S': date},
              'county': {'S': county},
            };
          // console.log(item)
          sarr.forEach((num, k) => {
            if (num == '') return;
            item[cols[k]] = {'N': num};
          });
          params[batchLoc].RequestItems.USA_Counties.push({
            PutRequest: {Item: item},
          });

          // put at the end, 25th element (item #26) will be put to new batch
          batchRun += 1;
        });
      });
    });

    const plen = params.length;
    return Promise.all(
      params.map((bParams, i) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.ddb.batchWriteItem(bParams, (err, data) => {
              if (err) reject(err);
              else {
                if (!((i+1)%10)) console.log('saved USA Counties at', Date.now(), `[${i+1}/${plen}]`);
                if (i+1 == plen) console.log('[end] saved USA Counties at', Date.now(), `[${i+1}/${plen}]`);
                resolve(data);
              }
            });
          }, i*this.ddbPutIntv.counties);
        });
      })
    );
  }

  storeUSAMaskUsage(packed){
    const
      {src, key, category, data} = packed,
      params = [], batchNum = 25,
      cols = data._COLS;

    delete data._COLS;

    Object.keys(data).forEach((cFips, i) => {
      if (cFips.length != 5) return; // county fips must be of length 5
      const item = {'fips': {'S': cFips}}, batchLoc = Math.floor(i/25);

      if (!params[batchLoc]) params[batchLoc] = {RequestItems: {USA_MaskUsage: []}};

      data[cFips].forEach((num, k) => item[cols[k]] = {'N': num});
      params[batchLoc].RequestItems.USA_MaskUsage.push({
        PutRequest: {Item: item},
      });
    });

    return Promise.all(
      params.map(bParams => {
        return new Promise((resolve, reject) => {
          this.ddb.batchWriteItem(bParams, (err, data) => {
            if (err) reject(err);
            else resolve(data);
          });
        });
      })
    );
  }

  cleanNYTgit(category, data){
    // just parsing and reorganizing csv
    // first line is meta // rest is data
    const meta = data[0], rows = data.slice(1), idx = {};
    let parsed = {};
    meta.forEach(key => idx[key.toLowerCase()] = meta.indexOf(key));

    // TODO: some sort of fallback for else
    if (category == 'states') parsed = this.cleanNYTStates(rows, idx);
    else if (category == 'counties') parsed = this.cleanNYTCounties(rows, idx);
    else if (category == 'overview') parsed = this.cleanNYTOverview(rows, idx);
    else if (category == 'maskUsage') parsed = this.cleanNYTMaskUage(rows, idx);

    const {out, cutoff, cutlen} = parsed;
    out._COLS = cutlen ? meta.slice(cutoff, cutlen) : meta.slice(cutoff);
    return out;
  }

  cleanNYTStates(data, idx){
    const out = {};
    data.forEach(row => {
      const state = row[idx.state], date = row[idx.date];
      if (date.slice(0, 2) !== '20') return; // skip weird date
      if (!out[state]) out[state] = {_FIPS: row[idx.fips]};
      out[state][date] = row.slice(idx.fips+1); // all columns after fips (3rd)
    });
    return {out, cutoff: idx.fips+1};
  }

  cleanNYTCounties(data, idx){
    const out = {};
    data.forEach(row => {
      const
        state = row[idx.state], date = row[idx.date],
        county = row[idx.county];

      if (!out[state]) out[state] = {};
      if (!out[state][county]) out[state][county] = {_FIPS: row[idx.fips]};
      if (!date) out[state][county] = row.slice(idx.fips+1); // all columns after fips (4th)
      else { // date exists
        if (date.slice(0, 2) !== '20') return; // skip weird date
        out[state][county][date] = row.slice(idx.fips+1);
      }
    });
    return {out, cutoff: idx.fips+1};
  }

  cleanNYTOverview(data, idx){
    const out = {};
    data.forEach(row => {
      const date = row[idx.date];
      if (date.slice(0, 2) !== '20') return; // year should start with 20 (skip weird ones)
      out[date] = row.slice(idx.date+1, idx.date+1+2); // get 'case' and 'deaths'
    });
    return {out, cutoff: idx.date+1, cutlen: idx.date+1+2};
  }

  cleanNYTMaskUage(data, idx){
    const out = {};
    data.forEach(row => {
      out[row[idx.countyfp]] = row.slice(idx.countyfp+1);
    });
    return {out, cutoff: idx.countyfp+1};
  }

  cleanJHU(category, data){
    if (category == 'stats') return this.cleanJHUStats(data);
    else if (category == 'countries') return this.cleanJHUCountries(data);
    else return null;
  }

  cleanJHUStats(data){
    return data[0] && data[0].value ? data[0].value : null;
  }

  cleanJHUCountries(dataArr){
    let cln = {};

    dataArr.forEach(data => {
      /*
          Initiate country obj with nationwide data
      */
      cln[data.Country_Region] = {
        confirmed: data.Confirmed, // total cases
        active: data.Active, deaths: data.Deaths, recovered: data.Recovered,
        incident_rate: data.Incident_Rate,
        mortality_rate: data.Mortality_Rate,
        update: data.Last_Update,
        hospitalized: data.People_Hospitalized,
        tested: data.People_Tested,
      };
    });

    return cln;
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

  /*
  *
  * Old code, left it for reference
  *
  */
  /*
  store(data2upd){
    const proms = {};

    Object.keys(data2upd).forEach(key => {
      let data = data2upd[key], prom;
      //
      //    save big json to S3
      //    and small json to DynamoDB
      //
      if (key === 'usa-cases'){
        prom = new Promise((resolve, reject) => {
          const bucketDir = 'covidnow/data/usa';

          let s3PutReq = {}, s3Proms = {};
          if (key === 'usa-cases'){
            //
            //    USA cases (from UofV)
            //    Temporarily paused
            //
            s3PutReq = {
              cases: this.s3Client.createPutJsonRequest(
                bucketDir, 'cases.json', JSON.stringify(data.cases),
              ),
              cases300: this.s3Client.createPutJsonRequest(
                bucketDir, 'cases300.json', JSON.stringify(data.cases300),
              ),
            };

            s3Proms = {
              cases: this.s3Client.put(s3PutReq.cases),
              cases300: this.s3Client.put(s3PutReq.cases300),
            };
          }
          // else if (key === 'usa-historical-counties'){
          //   //
          //   //    USA historical cases
          //   //    From github.com/nytimes/covid-19-data
          //   //
          //   s3PutReq = {
          //     counties: this.s3Client.createPutJsonRequest(
          //       bucketDir,
          //       'historical-counties.txt',
          //       pako.deflate(JSON.stringify(data.counties), {to: 'string'}),
          //     ),
          //   };
          //
          //   s3Proms = {
          //     counties: this.s3Client.put(s3PutReq.counties),
          //   };
          // }

          objectPromise(s3Proms)
            .then(s3Res => {
              console.log(s3Res);
              console.log(Date.now(), ` :: S3 PutItem succeeded [${key}]`);
              resolve(true);
            })
            .catch(err => reject(err));
        });
      } else {
        if (key === 'usa-historical-counties'){
          //
          //    Big data, compress for storing in DDB
          //
          data = pako.deflate(JSON.stringify(data.counties), {to: 'string'});
        } else if (key === 'usa-historical-states'){
          data = data.states;
        }

        const params = {
          TableName: 'Data',
          Key: {
            'key': key,
          },
          UpdateExpression: 'SET #dt = :dt, ts = :ts',
          ExpressionAttributeNames: {
            '#dt': 'data',
          },
          ExpressionAttributeValues: {
            ':dt': data,
            ':ts': Date.now(),
          },
        };

        prom = new Promise((resolve, reject) => {
          this.docClient.update(params, (err, res) => {
            if (err){
              // console.error(key, JSON.stringify(err, null, 2));
              console.log(Date.now(), ` :: UpdateItem error [${key}]`);
              reject(err);
            } else {
              console.log(Date.now(), ` :: UpdateItem succeeded [${key}]`);
              resolve(true);
            }
          });
        });
      }

      proms[key] = prom;
    });

    return objectPromise(proms);
  }
  */
};
