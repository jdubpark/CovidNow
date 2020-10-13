module.exports = class SchemaCleaner{
  static main(yamlDoc, easyClean=true){
    const cleaned = {};
    Object.keys(yamlDoc).forEach(tkey => {
      const urlsGL = yamlDoc[tkey].global, urlsCS = yamlDoc[tkey].country_specific;
      cleaned[tkey] = {};

      if (urlsGL != undefined){
        Object.keys(urlsGL).forEach(key => {
          cleaned[tkey]['global/'+key] = urlsGL[key];
        });
      }

      if (urlsCS != undefined){
        Object.keys(urlsCS).forEach(countryName => {
          const urls = urlsCS[countryName];

          Object.keys(urls).forEach(key => {
            if ((!!urls[key]) && (urls[key].constructor === Object)){
              // is object
              // go one level deeper
              Object.keys(urls[key]).forEach(key2 => {
                cleaned[tkey]['country_specific/'+countryName+'/'+key+'/'+key2] = urls[key][key2];
              });
            } else {
              // is array
              cleaned[tkey]['country_specific/'+countryName+'/'+key] = urls[key];
            }
          });
        });
      }
    });

    return cleaned;
  }
};
