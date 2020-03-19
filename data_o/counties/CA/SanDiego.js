const Standard = require('../modules/Standard');
module.exports = class SanDiego extends Standard{
  static fetch(){
    return this.axios.get('https://www.sandiegocounty.gov/content/sdc/hhsa/programs/phs/community_epidemiology/dc/2019-nCoV/status.html')
      .then(res => {
        const $ = this.cheerio.load(res.data);
        const obj = this.defaultStructure;

        const $table = $($('#content-main table')[0]);
        $table.find('tbody tr').each((i, tr) => {
          if (i < 2) return; // ignore irrelevant headers
          let num = 0;

          // td 0: name / 1: SD # / 2: Fed in SD # / 3: Non-SD in SD #
          $(tr).find('td').each((j, td) => {
            const text = $(td).text().trim();
            if (j > 0) num += Number(text);
          });

          if (i === 2 || i === 3) obj.total += num;
          else if (i === 4) obj.pending = num;
          else if (i === 5) obj.negative = num;
        });

        return obj;
      })
      .catch(err => Promise.reject(err));
  }
};
