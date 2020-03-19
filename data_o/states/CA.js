const Standard = require('../states-modules/Standard');
const stateData = require('../states-counties/CA');
const County = require('../counties/CA');
module.exports = class CA extends Standard{
  constructor(){
    super(stateData);
    this.url = stateData.state;
    this.state = 'CA';
  }

  request(){
    const proms = [];

    const _county = 'Alameda';
    const fetch = County[_county].fetch();
    fetch.then(res => console.log(res)).catch(err => console.log(err));
    // this.getCounties().forEach(county => {
    //   const _county = county.replace(/\s/g, '');
    //   if (County[_county]) proms.push(County[_county].fetch());
    // });

    return Promise.all(proms);
  }

  async preprocess(data, resolve, reject){
    const collected = {};

    resolve(collected);
  }

  midprocess(data, resolve, reject){
    const collected = {};
    resolve(collected);
  }
};
