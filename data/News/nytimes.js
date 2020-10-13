const axios = require('axios');
const
  docUrl = 'https://developer.nytimes.com/docs/',
  apiKey = 'I5y8HtW63yWA0ffNCCmc927JFZeTvzWl',
  url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?'+
    `q=covid&api-key=${apiKey}`;

axios(url)
  .then(res => {
    console.log(res);
    if (res.data.response){
      const {docs, meta} = res.data.response;
      console.log(meta);
      console.log(docs);
    }
  })
  .catch(err => console.log(err));
