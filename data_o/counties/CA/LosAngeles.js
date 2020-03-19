const Standard = require('../modules/Standard');
module.exports = class LosAngeles extends Standard{
  static fetch(){
    return this.axios.get('http://www.publichealth.lacounty.gov/media/Coronavirus/')
      .then(res => {
        const $ = this.cheerio.load(res.data);
        const obj = this.defaultStructure;

        $('.col-md-3 .counter').each((i, elem) => {
          const num = Number($(elem).text().trim());
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
