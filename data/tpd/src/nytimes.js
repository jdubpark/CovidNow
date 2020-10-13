const TPDWrapper = require('./wrapper');

module.exports = class NYTimes extends TPDWrapper{
  static get urls(){
    return {
      // live stats
      live: {
        overview: 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/live/us.csv',
        states: 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/live/us-states.csv',
        counties: 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/live/us-counties.csv',
      },
      // historical stats, up to the prev day
      historical: {
        overview: 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/us.csv',
        states: 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv',
        // large csv file
        counties: 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv',
      },
      // mask usage
      maskUsage: {
        counties: 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/mask-use/mask-use-by-county.csv',
      },
      excessDeath: {
        global: 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/excess-deaths/deaths.csv',
      },
    };
  }

  static processData(data, category='general'){
    // just parsing and reorganizing csv
    // first line is meta // rest is data
    const meta = data[0], rows = data.slice(1), idx = {};
    let parsed = {};
    meta.forEach(key => idx[key.toLowerCase()] = meta.indexOf(key));

    // TODO: some sort of fallback for else
    if (category == 'states') parsed = this._parseCSVstates(rows, idx);
    else if (category == 'counties') parsed = this._parseCSVcounties(rows, idx);
    else if (category == 'overview') parsed = this._parseCSVoverview(rows, idx);

    const {out, cutoff} = parsed;
    out._COLS = meta.slice(cutoff);
    return out;
  }

  static _parseCSVstates(data, idx){
    const out = {};
    data.forEach(row => {
      const state = row[idx.state]+'__'+row[idx.fips], date = row[idx.date];
      if (date.slice(0, 2) !== '20') return; // skip weird date
      if (!out[state]) out[state] = {};
      out[state][date] = row.slice(idx.fips+1); // all columns after fips (3rd)
    });
    return {out, cutoff: idx.fips+1};
  }

  static _parseCSVcounties(data, idx){
    const out = {};
    let cutoff = 0;
    if (idx.date != null) cutoff = idx.fips+1; // all columns after fips (4th)
    else if (idx.countyfp != null) cutoff = idx.countyfp+1; // all columns after countyfips (1st)

    data.forEach(row => {
      const
        state = row[idx.state], date = row[idx.date],
        county = row[idx.county];

      // exceptions:
      // maskUsage provides only county FP, no state/county/date data
      if (state){
        if (!out[state]) out[state] = {};
        if (!out[state][county]) out[state][county] = {_FIPS: row[idx.fips]};
        if (!date) out[state][county] = row.slice(cutoff); // in case date doesn't exist
        else { // date exists
          if (date.slice(0, 2) !== '20') return; // skip weird date
          out[state][county][date] = row.slice(cutoff);
        }
      } else if (idx.countyfp != null){
        // for maskUsage: counties
        const ctfp = row[idx.countyfp];
        out[ctfp] = row.slice(cutoff);
      }
    });
    return {out, cutoff};
  }

  static _parseCSVoverview(data, idx){
    const out = {};
    data.forEach(row => {
      const date = row[idx.date];
      if (date.slice(0, 2) !== '20') return; // skip weird date
      out[date] = row.slice(idx.date+1); // all columns after fips (4th)
    });
    return {out, cutoff: idx.date+1};
  }
};
