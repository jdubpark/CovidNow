const FORMAT = {
  // only report when format changes
  // page with tables
  start: 20200219,
  pages: {
    20200219: {China: [4], World: [5]},
    20200220: {China: [3], World: [4]},
    20200223: {China: [2], World: [3]},
    20200224: {China: [3], World: [4]},
    20200225: {China: [2], World: [3]},
    20200227: {China: [3], World: [4, 5]},
    20200303: {China: [2], World: [3, 4]},
    20200305: {China: [4], World: [5, 6, 7]},
    20200306: {China: [3], World: [4, 5, 6]},
    20200307: {China: [2], World: [3, 4, 5]},
    20200309: {China: [3], World: [4, 5, 6]},
    20200310: {China: [4], World: [5, 6, 7]},
    20200311: {China: [3], World: [4, 5, 6]},
    20200314: {China: [2], World: [3, 4, 5, 6]},
  },
  // column heads
  heads: {
    // d_ = daily
    // t_ = total
    // n_ = new
    20200219: {
      China: ['country', null, 'd_cases', 'd_suspected', 'd_deaths', 't_cases', 't_deaths'],
      World: ['country', ['t_cases', 'n_cases'], null, null, null, null, ['t_deaths', 'n_deaths']],
    },
    20200227: {
      China: ['country', null, 'd_cases', 'd_suspected', 'd_deaths', 't_cases', 't_deaths'],
      World: ['country', ['t_cases', 'n_cases'], ['t_deaths', 'n_deaths'], null, null],
    },
    20200302: {
      China: ['country', null, 'd_cases', 'd_suspected', 'd_deaths', 't_cases', 't_deaths'],
      World: ['country', 't_cases', 'n_cases', 't_deaths', 'n_deaths', null, null],
    },
  },
};

module.exports = class WHOFormat{
  static get(_time){
    const timeFormat = {};
    let time = _time;
    if (typeof time !== 'number') time = Number(time);

    //
    // select meta by getting the highest lower time
    //

    ['pages', 'heads'].forEach(fKey => {
      if (FORMAT[fKey][time]) timeFormat[fKey] = FORMAT[fKey][time];
      else {
        let highestLow = FORMAT.start, keys = Object.keys(FORMAT[fKey]);
        for (let i = 0; i < keys.length; i++){
          const keyTime = Number(keys[i]);
          if (keyTime > time) break; // stop, don't look into the future!
          if (keyTime > highestLow) highestLow = keyTime;
        }
        timeFormat[fKey] = FORMAT[fKey][highestLow];
      }
    });

    // console.log(_time, timeFormat);

    return timeFormat;
  }
};
