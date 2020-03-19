const Standard = require('../modules/Standard');
module.exports = class SantaClara extends Standard{
  static fetch(){
    return this.axios.get('https://www.sccgov.org/sites/phd/DiseaseInformation/novel-coronavirus/Pages/home.aspx')
      .then(res => {
        const $ = this.cheerio.load(res.data);
        const obj = this.defaultStructure;

        // https://stackoverflow.com/questions/50138357/accessing-script-content-with-cheerio
        const script = $('.s4-wpTopTable script:not([src])')[0];
        const scrContent = script.children[0].data;

        const data = JSON.parse(scrContent.match(/\[\{.*?\}\]/)[0])[0];

        Object.keys(data).forEach(key => {
          const val = Number(data[key]);
          if (['Title', 'ID', 'Modified', 'Created'].includes(key)) return;
          if (key === 'Total_Confirmed_Cases') obj['total'] = val;
          else if (key === 'Deaths') obj['deaths'] = val;
          else if (key === 'Hospitalized') obj['hospitalized'] = val;
          else obj['causes'][key] = val;
        });

        return obj;
      })
      .catch(err => Promise.reject(err));
  }
};
