const Standard = require('../modules/Standard');
module.exports = class Riverside extends Standard{
  static fetch(){
    return this.axios.get('https://www.rivcoph.org/coronavirus')
      .then(res => {
        const $ = this.cheerio.load(res.data);
        const obj = this.defaultStructure;

        const $content = $('#dnn_RightPane .dc_content p');
        const split = $content.text().split('\n').filter(e => !e == '');

        const cases = split[0];

        obj.total = Number(cases.match(/\d+/)[0]);

        return obj;
      })
      .catch(err => Promise.reject(err));
  }
};
