const Standard = require('../states-modules/Standard');
const superagent = require('superagent');
const mammoth = require('mammoth');

module.exports = class MA extends Standard{
  constructor(){
    super();
    // link changes every day, get it via bs4 get link instead
    this.url = 'https://www.mass.gov/info-details/covid-19-cases-quarantine-and-monitoring';
    this.state = 'MA';
    this.dataCat = ['county', 'sex', 'exposure', 'hospitalization'];
  }

  request(){
    return new Promise(async(resolve, reject) => {
      const url = 'https://www.mass.gov/doc/covid-19-cases-in-massachusetts-as-of-march-14-2020-accessible/download'
      const response = await superagent.get(url)
        .parse(superagent.parse.image)
        .buffer();
      const buffer = response.body;

      const lines = (await mammoth.extractRawText({buffer})).value.split('\n');

      // const pdfUrl = await this.axios(this.url)
      //   .then(res => {
      //     const $ = this.cheerio.load(res.data);
      //     const links = $('a');
      //     let pdfHref = '';
      //     $(links).each((i, link) => {
      //       const href = $(link).attr('href');
      //       if (href && href.includes('/doc/covid-19-cases')){
      //         pdfHref = href;
      //         return false; // break
      //       }
      //     });
      //     if (!pdfHref.includes('https://www.mass.gov')) pdfHref = 'https://www.mass.gov'+pdfHref;
      //     return pdfHref;
      //   })
      //   .catch(err => reject(err));
      //
      // const lines = await PdfFromUrl.get(pdfUrl);
      resolve(lines);
    });
  }

  preprocess(data, resolve, reject){
    const collected = [];

    // const except = ['patient was hospitalized', 'patient was not hospitalized'];
    // const totalCat = [...this.dataCat, ...except];

    const filtered = data.filter(val => val.trim() !== '');

    for (let i = 0; i < filtered.length; i++){
      let line = filtered[i].trim(), lc = line.toLowerCase();

      // if line is category, then push (as one-item array)
      if (this.dataCat.includes(lc)) collected.push([lc]);

      // if num, then grab prev row and combine & push
      if (/^\d+$/.test(line)) collected.push([filtered[i-1], Number(line)]);
    }

    // data.forEach(([line]) => {
    //   // separate num from text
    //   const sep = line.match(/[a-zA-Z\s\W]+|[0-9]+/gi);
    //   //
    //   // account for 'deaths'/'recovered' column later (no such case yet in MA)
    //   //
    //   // FOR NOW: only 'name' and 'case #' OR category name
    //   if (sep.length > 2) return;
    //
    //   // get only needed category (only has name that is NOT number and not a category/exception)
    //   const name = sep[0].toLowerCase().trim();
    //   if (sep.length === 1 && !(/^\d+$/.test(name)) && !totalCat.includes(name)) return;
    //
    //   collected.push({name, val: sep[1]});
    // });

    resolve(collected);
  }

  midprocess(data, resolve, reject){
    const collected = this.defaultStructure();

    let type = 'stats';
    data.forEach(line => {
      let [name, val] = line;
      if (val === undefined){
        // change type and move on
        if (type === 'hospitalization') type = 'hospitalized';
        type = name;
        return;
      } else {
        // skip these
        if (name === 'Confirmed' || name === 'Presumptive') return;

        // lowercase certain types
        if (['stats', 'sex'].includes(type)) name = name.toLowerCase();

        // special for hospitalized
        if (name === 'Patient was hospitalized') name = 'yes';
        else if (name === 'Patient was not hospitalized') name = 'no';
        else if (name === 'Under Investigation') name = 'unknown';
      }

      if (!collected[type]) collected[type] = {};
      collected[type][name] = val;
    });
    // data.forEach((line, index) => {
    //   let {name, val} = line;
    //
    //   console.log(type, name, val);
    //   if (typeof val === 'undefined'){
    //     if (this.dataCat.includes(name)){
    //       if (name === 'hospitalization') type = 'hospitalized';
    //       else type = name;
    //       return;
    //     } else if (['patient was hospitalized', 'patient was not hospitalized'].includes(name)){
    //       name = name === 'patient was hospitalized' ? 'yes' : 'no';
    //       val = data[index+1].name; // get next val (row separates vals for some reason)
    //     } else {
    //       return;
    //     }
    //   } else {
    //     if (type === 'hospitalized' && name === 'under investigation'){
    //       name = 'unknown';
    //     }
    //   }
    //
    //   if (name === 'total confirmed and presumptive positive cases =') return;
    //   name = name.replace(/\s/g, '_').replace(/\*/g, '');
    //   val = Number(val);
    //
    //   if (!collected[type]) collected[type] = {};
    //   collected[type][name] = val;
    // });

    resolve(collected);
  }
};
