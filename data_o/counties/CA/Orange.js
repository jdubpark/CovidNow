const Standard = require('../modules/Standard');
module.exports = class Orange extends Standard{
  static fetch(){
    return this.axios.get('http://www.ochealthinfo.com/phs/about/epidasmt/epi/dip/prevention/novel_coronavirus')
      .then(res => {
        const $ = this.cheerio.load(res.data);
        const obj = this.defaultStructure;

        const $table = $($('#col2 table')[3]);
        $table.find('tr').each((i, tr) => {
          if (i < 3) return; // skip all irrelevant headers
          let type, name, val;

          // td 0: name, td 1: total val
          $(tr).find('td').each((j, td) => {
            const text = $(td).text().trim();
            if (j === 0) name = text;
            else if (j === 1) val = Number(text);
          });

          if (name === 'Cases') type = 'total';
          else if (name === 'Total Deaths') type = 'deaths';
          else type = 'causes';

          // skip no-val data
          if (typeof val === 'undefined') return;
          if (type !== 'causes') obj[type] = val;
          else obj[type][name.replace(/\*/g, '')] = val;
        });

        return obj;
      })
      .catch(err => Promise.reject(err));
  }
};
