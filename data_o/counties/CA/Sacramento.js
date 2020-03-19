const Standard = require('../modules/Standard');
module.exports = class Sacramento extends Standard{
  static fetch(){
    return this.axios.get('https://www.saccounty.net/COVID-19/Pages/default.aspx')
      .then(res => {
        const $ = this.cheerio.load(res.data);
        const obj = this.defaultStructure;

        const $table = $($('table')[0]);
        $table.find('tbody td').each((i, td) => {
          const text = $(td).text().trim(), num = Number(text.match(/\d+/)[0]);
          if (i === 0) obj.total = num;
          else if (i === 1) obj.deaths = num;
        });

        return obj;
      })
      .catch(err => Promise.reject(err));
  }
};
