// modules are cached on first require, so won't affect performance when
// requiring them multiple time
const {request} = require('gaxios');
const papa = require('papaparse');

module.exports = class DataFetcher{
  constructor(urls){
    this.urls = urls;
    // for res stream to parse csv
    this.parseStream = papa.parse(papa.NODE_STREAM_INPUT, {});
    // this.parseStream.on('end', () => console.log('csv papa end'));
    this.fetchProms = {};
  }

  setFetch(){
    // console.log(this.urls);
    Object.keys(this.urls).forEach(fullKey => {
      const [src, url] = this.urls[fullKey];
      this.fetchProms[fullKey] = this._fetchConfig(src, url);
    });
    return this.fetchProms;
  }

  _fetchConfig(src, url){
    const reqOptions = {
      url: url, // +'?_='+(new Date).getTime() // ending is cache buster
      method: 'get',
    };
    let parser = (...args) => args;

    // special: NYT github -> csv
    if (src == 'NYTgit'){
      // csv fetch
      reqOptions.responseType = 'stream'; // for res pipe
      parser = res => {
        const data = [];
        // set data to this local scope every time
        this.parseStream.on('data', row => data.push(row));

        // returns parsed but raw csv data
        return new Promise((resolve, reject) => {
          res.data.pipe(this.parseStream)
            .on('error', err => {
              console.log('-------------------------');
              console.log(err);
              reject(err);
            })
            .on('end', () => resolve(data));
        });
      };
    } else if (src == 'JHU'){
      // normal fetch: JHU, just clean data
      parser = res => res.data.features.map(features => features.attributes);
    }

    return {src, reqOptions, parser};
  }

  setCleaner(cleaner){
    Object.keys(this.fetchProms).forEach(fkey => {
      const meta = this.fetchProms[fkey], splt = fkey.split('/');
      let category = '';

      if (meta.src == 'JHU'){
        if (['total', 'deaths', 'recovered'].indexOf(splt[-1]) > -1) category = 'stats';
        else category = 'countries';
        meta.cleaner = cleaner.JHU.attach(category);
      } else if (meta.src == 'NYTgit'){
        category = splt[-1];
        if (['states', 'counties'].indexOf(category) < 0) category = 'overview';
        meta.cleaner = cleaner.NYT.attach(category);
      }
      // refresh
      this.fetchProms[fkey] = meta;
    });
  }

  setStorer(storer){

  }

  doFetch(){
    return Promise.all(
      Object.keys(this.fetchProms).map(fkey => {
        const meta = this.fetchProms[fkey];
        return request(meta.reqOptions)
          .then(res => meta.parser(res))
          .then(res => meta.cleaner(res))
          // .then(res => meta.saver(res))
          .then(res => ({key: fkey, val: res}))
          .catch(err => ({key: fkey, val: err}));
      })
    ).then(items => {
      let result = {};
      items.forEach(item => result[item.key] = item.val);
      return result;
    });
  }
};
