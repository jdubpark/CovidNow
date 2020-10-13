const axios = require('axios');
const
  apiKey = 'pZrS7ivNWusNAJL-gtCweL6lCSEfQDDI8gL35hOntnnueaXw',
  lang = 'en',
  keywords = 'covid';
// const url = 'https://api.currentsapi.services/v1/latest-news?' +
//     'language=en&' +
//     'apiKey=';
// const url = 'https://api.currentsapi.services/v1/available/languages';
const url = 'https://api.currentsapi.services/v1/search?' +
  `language=${lang}&apiKey=${apiKey}&type=1&keywords=${keywords}`;
axios(url)
  .then(res => {
    console.log(res);
    if (res.data.news){
      res.data.news.forEach(news => console.log(news));
    }
  })
  .catch(err => {
    console.log(err);
  });
