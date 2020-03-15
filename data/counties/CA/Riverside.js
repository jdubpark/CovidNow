const Standard = require('../modules/Standard');
module.exports = class Riverside extends Standard{
  static fetch(){
    return this.axios.get('https://www.rivcoph.org/coronavirus')
      .then(res => {
        const $ = this.cheerio.load(res.data);
        const obj = this.defaultStructure;

        const $content = $('#dnn_RightPane .dc_content p');
        console.log($content.text().split('\n'));

        return obj;
      })
      .catch(err => Promise.reject(err));
  }
};
