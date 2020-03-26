const
  axios = require('axios'),
  utils = require('../utils'),
  usaJSON = require('../json/usa.json'),
  usaStates = Object.keys(require('../json/usa-states.json'));

module.exports = class USA$Counties{
  static get url(){
    return {
      source1: {
        query: 'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/Coronavirus_2019_nCoV_Cases/FeatureServer/1/query?outFields=*&where=1%3D1',
        json: 'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/Coronavirus_2019_nCoV_Cases/FeatureServer/1/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=',
        pbf: 'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/Coronavirus_2019_nCoV_Cases/FeatureServer/1/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pbf&token=',
      },
    };
  }

  static fetch(){
    return axios(this.url.source1.json)
      .then(res => {
        const data = this.process(res);
        return data;
      })
      .catch(err => Promise.reject(err));
  }

  static process(res){
    const features = res.data.features;
    const prc = {
      nationwide: {
        confirmed: 0,
        deaths: 0,
        recovered: 0,
      },
      nonstate: {},
    };

    features.forEach(data => {
      const dt = this.extract(data);

      /*
          Get only the US data since this query returns all countries
          (also includes states/providences for some countries)
      */
      if (dt.country !== 'US') return;
      const isState = usaStates.includes(dt.state);

      /*
          Collect nationwide data
          (only get the 50 US states)
      */
      if (isState){
        prc.nationwide.confirmed += dt.confirmed;
        prc.nationwide.deaths += dt.deaths;
        prc.nationwide.recovered += dt.recovered;
      }

      // special case, nationwide # of recovered
      if (dt.state === 'Recovered'){
        prc.nationwide.recovered = dt.recovered;
        return;
      }

      /*
          Transfer state obj
          (for D.C., territory, cruise ships, etc., add to non-state)
      */
      const obj = {
        name: dt.state,
        confirmed: dt.confirmed,
        deaths: dt.deaths,
        recovered: dt.recovered,
        update: dt.update,
      };

      if (isState) prc[dt.abbr] = obj;
      else prc.nonstate[dt.abbr] = obj;
    });

    return prc;
  }

  static extract(dataObj){
    const {attributes: data, geometry} = dataObj;
    const stateName = data.Province_State;
    return {
      state: stateName,
      // for non-us abbr will just return empty or providence name
      abbr: usaJSON[stateName] ? usaJSON[stateName] : stateName,
      country: data.Country_Region,
      update: data.Last_Update,
      confirmed: data.Confirmed, // for now, confirmed is active
      deaths: data.Deaths,
      recovered: data.Recovered,
    };
  }
};
