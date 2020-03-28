const
  axios = require('axios'),
  utils = require('../utils'),
  usaJSON = require('../json/usa.json');

module.exports = class USA$Counties{
  static get url(){
    return {
      source1: {
        query: 'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases_US/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=html',
        json: 'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases_US/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json',
        pbf: 'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases_US/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=pbf',
      },
      source2: {
        query: 'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases_US/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=html&token=',
        json: 'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases_US/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=none&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=',
        pbf: 'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases_US/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=none&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pbf&token=',
      },
    };
  }

  static fetch(){
    return axios(this.url.source2.json)
      .then(res => {
        const data = this.process(res);
        return data;
      })
      .catch(err => Promise.reject(err));
  }

  static process(res){
    const features = res.data.features;
    const prc = {};

    features.forEach(data => {
      const dt = this.extract(data);

      /*
          Initiate state obj
      */
      if (!prc[dt.abbr]){
        prc[dt.abbr] = {
          statewide: {
            confirmed: 0,
            deaths: 0,
            recovered: 0,
            affectedCounties: 0, // for actual list, just Object.keys()
          },
        };
      }

      /*
          State data
      */
      prc[dt.abbr].statewide.confirmed += dt.confirmed;
      prc[dt.abbr].statewide.deaths += dt.deaths;
      prc[dt.abbr].statewide.recovered += dt.recovered;
      prc[dt.abbr].statewide.affectedCounties += 1;

      /*
          County data
      */
      // only if county has confirmed cases
      if (dt.confirmed){
        prc[dt.abbr][dt.county] = {
          FIPS: dt.FIPS,
          update: dt.update,
          confirmed: dt.confirmed,
          deaths: dt.deaths,
          recovered: dt.recovered,
        };
      }
    });

    return prc;
  }

  static extract(dataObj){
    const {attributes: data, geometry} = dataObj;
    const stateName = data.Province_State;
    return {
      state: stateName,
      abbr: usaJSON[stateName] ? usaJSON[stateName] : stateName,
      county: data.Admin2 || 'unallocated',
      FIPS: data.FIPS, // zip
      update: data.Last_Update,
      confirmed: data.Confirmed, // for now, confirmed is active
      // active: data.Active, // confirmed - (deaths + recovered)
      deaths: data.Deaths,
      recovered: data.Recovered,
      // tested: data.People_Tested || null, // current data is all null
    };
  }

  static load(docClient){
    return new Promise((resolve, reject) => {
      const params = {
        TableName: 'Data',
        KeyConditionExpression: '#k = :k',
        ExpressionAttributeNames: {
          '#k': 'key',
        },
        ExpressionAttributeValues: {
          ':k': 'usa-counties',
        },
      };
      docClient.query(params, (err, data) => {
        if (err) reject(err);
        else {
          const {Items} = data;
          resolve(Items[0]);
        }
      });
    });
  }
};
