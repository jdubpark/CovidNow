const Standard = require('../modules/Standard');
module.exports = class Alameda extends Standard{
  static fetch(){
    var page = require('webpage').create();
    page.open('http://www.acphd.org/2019-ncov.aspx', function(status) {
      console.log("Status: " + status);
      if(status === "success") {
        page.render('example.png');
      }
      phantom.exit();
    });

    return this.axios.get('http://www.acphd.org/2019-ncov.aspx')
      .then(res => {
        console.log(res.data);
        const $ = this.cheerio.load(res.data);
        const obj = this.defaultStructure;

        // const $cases = $($('.nav_hidari table p')[1]);
        // const split = $cases.text().split('\n').filter(e => !e == '');
        //
        // const cases = split[0];

        // console.log($('table'))

        // obj.total = Number(cases.match(/\d+/)[0]);

        return obj;
      })
      .catch(err => Promise.reject(err));
  }
};
