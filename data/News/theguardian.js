const axios = require('axios');
const
  query = 'covid OR coronavirus',
  apiKey = 'dcbd29b6-74c5-4a58-8f0f-514b7256353b',
  pageSize = 50, pageNum = 1,
  orderBy = 'relevance'; // default 'relevance' when using ?q=

axios(`https://content.guardianapis.com/search?q=${query}&api-key=${apiKey}&page-size=${pageSize}&page=${pageNum}&order-by=${orderBy}`)
  .then(res => {
    res.data.response.results.forEach(data => {
      console.log(data);
    });
  })
  .catch(err => {
    console.log(err);
  });

module.exports = class News$Guardian{
  static get url(){
    return {
      doc: 'https://open-platform.theguardian.com/documentation',
      search: 'https://content.guardianapis.com/search',
    };
  }

  // https://content.guardianapis.com/search?q='covid'&api-key=test
  // static fetch(urls){
  //   const proms = [];
  //
  //   utils.mapKey(urls, (url, lang) => {
  //     const prom = axios(url)
  //       .then(res => {
  //         console.log(res);
  //         return res
  //       })
  //       .catch(err => Promise.reject(err));
  //
  //     proms[lang] = prom;
  //   });
  //
  //   return utils.objectPromise(proms);
  // }
}
