const Standard = require('../modules/Standard');
module.exports = class SanMateo extends Standard{
  static fetch(){
    return this.axios.get('https://www.smchealth.org/coronavirus')
      .then(res => {
        const $ = this.cheerio.load(res.data);
        const obj = this.defaultStructure;

        $('#node-4119-teaser tbody tr').each((i, tr) => {
          const tds = $(tr).find('td');
          const name = $(tds[0]).text().trim(), num = Number($(tds[2]).text().trim());
          // third row is Positive + Deaths ?? ignore for now,
          // since we count Positive and Deaths separately
          if (name === 'Positive') obj.total = num;
          else if (name === 'Deaths') obj.deaths = num;
        });

        return obj;
      })
      .catch(err => Promise.reject(err));
  }
};
