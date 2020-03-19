const Standard = require('../states-modules/Standard');
module.exports = class NY extends Standard{
  constructor(){
    super();
    this.url = 'http://www.floridahealth.gov/diseases-and-conditions/COVID-19/';
    this.state = 'NY';
  }

  preprocess(data, resolve, reject){
    const $ = this.cheerio.load(data), collected = {rows: [], cases: []};

    const $caseTable = $($('table')[0]);
    $caseTable.find('tr').each((i, tr) => {
      const tds = [];
      if (i < 2) return; // skip table head (0, 1)

      $(tr).find('td').each((j, td) => {
        const text = $(td).text().trim();
        if (j === 0) return; // skip patient #
        tds.push(text);
      });

      if (!tds.length) return;
      collected.cases.push(tds);
    });

    const items = $('#main_column .wysiwyg_content').find('h3,div');
    items.each((i, elem) => {
      const text = $(elem).text().trim();
      // ignore empty text OR text with the word 'download'
      if (text === '' || text.includes('download')) return;
      collected.rows.push(text);
    });

    // console.log(collected);
    resolve(collected);
  }

  midprocess(data, resolve, reject){
    const collected = this.defaultStructure();

    // used when looping data.cases
    collected.exposure = {travel: 0, nonTravel: 0, unknown: 0};

    let type = 'stats', subtype = 'total';
    data.rows.forEach(row => {
      row = row.toLowerCase();
      const val = row.match(/[a-zA-Z\s\W]+|[0-9]+/gi)[0];
      if (row.includes('isolated outside of florida')) return;
      else if (row === 'deaths') subtype = 'deaths';
      else if (row === 'number of negative test results'){
        type = 'tests';
        subtype = 'negative';
      } else if (row === 'number of pending test results'){
        type = 'tests';
        subtype = 'pending';
      } else if (row.includes('currently being monitored')){
        type = 'monitor';
        subtype = 'current';
      } else if (row.includes('people monitored to date')){
        type = 'monitor';
        subtype = 'total';
      }
      // console.log(type, subtype, row, !val || !(/^\d+$/.test(val)) ? '' : Number(val));

      if (!val || !(/^\d+$/.test(val))) return; // skip ones without val OR not num
      if (!collected[type][subtype]) collected[type][subtype] = 0;
      collected[type][subtype] += Number(val);
    });

    collected.tests.total = collected.tests.negative + collected.tests.pending;

    data.cases.forEach(case_ => {
      let [county, age, sex, travelRelated] = case_;
      county = county.replace(/\s/g, '');
      sex = sex.toLowerCase();
      travelRelated = travelRelated.toLowerCase();

      if (!collected.county[county]) collected.county[county] = 0;
      collected.county[county] += 1;

      if (!collected.age[age]) collected.age[age] = 0;
      collected.age[age] += 1;

      if (!this.sexTypes.includes(sex)) sex = 'unknown';
      collected.sex[sex] += 1;

      if (travelRelated === 'yes') collected.exposure.travel += 1;
      else if (travelRelated === 'no') collected.exposure.nonTravel += 1;
      else collected.exposure.unknown += 1;
    });

    resolve(collected);
  }
};
