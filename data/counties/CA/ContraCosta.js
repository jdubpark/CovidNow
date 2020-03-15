const Standard = require('../modules/Standard');
module.exports = class ContraCosta extends Standard{
  static fetch(){
    return this.axios.get('https://www.coronavirus.cchealth.org/')
      .then(res => {
        const $ = this.cheerio.load(res.data);
        const obj = this.defaultStructure;

        // get direct divs (or else it'll also get child's divs)
        const $divs = $('#mua1ninlineContent-gridContainer > div');
        const $cases = $($divs[3]);
        const $deaths = $($divs[4]);

        obj.total = Number($($cases.find('.txtNew')[1]).text().trim());
        obj.deaths = Number($($deaths.find('.txtNew')[0]).text().trim());

        return obj;
      })
      .catch(err => Promise.reject(err));
  }
};
