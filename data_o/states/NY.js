const Standard = require('../states-modules/Standard');
module.exports = class NY extends Standard{
  constructor(){
    super();
    this.url = 'https://www.health.ny.gov/diseases/communicable/coronavirus/';
    this.state = 'NY';
    this.excl = ['New York State (Outside of NYC)', 'Total Positive Cases (Statewide)'];
  }

  preprocess(data, resolve, reject){
    const $ = this.cheerio.load(data), collected = [];

    const $caseTable = $($('#case_count_table')[0]);
    $caseTable.find('tr').each((i, tr) => {
      const tds = [];

      $(tr).find('td').each((j, td) => {
        const text = $(td).text().trim();
        if (text === '') return;
        tds.push(text);
      });

      if (!tds.length) return;
      collected.push(tds);
    });

    resolve(collected);
  }

  midprocess(data, resolve, reject){
    const collected = this.defaultStructure();

    data.forEach(arr => {
      let name = arr[0].trim(), num = arr[1];

      if (!(/^\d+$/.test(num))) return; // ignore non-digit num
      num = Number(num);

      if (this.excl.includes(name)) return; // skip unwanted names & values

      // just focus on counties
      name = name.replace(/\:|\sCounty/g, '').replace(/\s/g, '_');
      collected.county[name] = num;
      collected.stats.total += num;
    });

    resolve(collected);
  }
};
