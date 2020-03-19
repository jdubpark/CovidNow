module.exports = {
  source: 'http://opendatadpc.maps.arcgis.com/apps/opsdashboard/index.html#/b0c68bce2cce478eaac82fe38d4138b1',
  dates: 'https://services6.arcgis.com/L1SotImj1AAZY1eK/arcgis/rest/services/COVID19_andamento/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&resultOffset=0&resultRecordCount=2000&cacheHint=true',
  regions: 'https://services6.arcgis.com/L1SotImj1AAZY1eK/arcgis/rest/services/COVID19__Regioni/FeatureServer/0/query?f=json&where=totale_casi%20%3E%200&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22dimessi_guariti%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&cacheHint=true',
  providences: 'https://services6.arcgis.com/L1SotImj1AAZY1eK/arcgis/rest/services/Butta/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=totale_casi%20desc&resultOffset=0&resultRecordCount=200&cacheHint=true',
  // total = positive + deaths + recovered
  total: 'https://services6.arcgis.com/L1SotImj1AAZY1eK/arcgis/rest/services/COVID19__Regioni/FeatureServer/0/query?f=json&where=totale_casi%20%3E%200&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22totale_casi%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&cacheHint=true',
  positive: 'https://services6.arcgis.com/L1SotImj1AAZY1eK/arcgis/rest/services/COVID19__Regioni/FeatureServer/0/query?f=json&where=totale_casi%20%3E%200&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22totale_attualmente_positivi%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&cacheHint=true',
  deaths: 'https://services6.arcgis.com/L1SotImj1AAZY1eK/arcgis/rest/services/COVID19__Regioni/FeatureServer/0/query?f=json&where=totale_casi%20%3E%200&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22deceduti%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&cacheHint=true',
  recovered: 'https://services6.arcgis.com/L1SotImj1AAZY1eK/arcgis/rest/services/COVID19__Regioni/FeatureServer/0/query?f=json&where=totale_casi%20%3E%200&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22dimessi_guariti%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&cacheHint=true',
};
