const Standard = require('../modules/Standard');
module.exports = class SanFrancisco extends Standard{
  static fetch(){
    return this.axios.get('https://www.sfdph.org/dph/alerts/coronavirus.asp')
      .then(res => {
        const $ = this.cheerio.load(res.data);
        const obj = this.defaultStructure;

        $('#section-1 .box2 p').each((i, elem) => {
          const num = Number($(elem).text().match(/\d+/)[0]);
          // case #
          if (i === 0) obj.total = num;
          // death #
          else if (i === 1) obj.deaths = num;
        });

        return obj;
      })
      .catch(err => Promise.reject(err));
  }
};
