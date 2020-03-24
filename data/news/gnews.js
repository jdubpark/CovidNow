const
  axios = require('axios'),
  xml2js = require('xml2js');

const utils = require('../utils');

module.exports = class GNews{
  constructor(){
    this.urls = {
      'US': 'https://news.google.com/rss/search?q=coronavirus&hl=en-US&gl=US&ceid=US%3Aen',
      'IT': 'https://news.google.com/rss/search?q=coronavirus&hl=it&gl=IT&ceid=IT:it',
      // US Spanish
      'ES_US': 'https://news.google.com/rss/search?q=coronavirus&hl=es-419&gl=US&ceid=US:es-419',
    };
    this.parser = new xml2js.Parser;
  }

  fetch(){
    const proms = [];
    Object.keys(this.urls).forEach(lang => {
      const url = this.urls[lang];
      proms[lang] = axios(url).then(async res => {
        const {data: xml} = res;
        if (xml.trim() === '') return xml;

        return await this.parser.parseStringPromise(xml)
          .then(res => res)
          .catch(err => Promise.reject(err));
      }).catch(err => Promise.reject(err));
      // console.log(url);
    });

    return utils.objectPromise(proms);
  }

  clean(res){
    const cluster = {};

    utils.mapKey(res, (data, lang) => {
      const
        {rss: xml} = data,
        items = xml.channel[0].item,
        cleaned = {};

      items.forEach(news => {
        // console.log(news);
        // for some reason, everything is in array of length 1 (key: [data])
        const timestamp = new Date(news.pubDate[0]).getTime();
        cleaned[timestamp] = {
          title: news.title[0],
          link: news.link[0],
          pubDate: news.pubDate[0],
          html: news.description[0], // they say it's description but I say its html
          source: news.source[0]._, // source: [_: source name]
        };
      });

      cluster[lang] = cleaned;
      // sort timestamp (for filtering newest -> oldest ==> desc ts)
      cluster[lang].__sorted = Object.keys(cleaned).sort((a, b) => {
        const _a = Number(a), _b = Number(b);
        return _a < _b ? 1 : _a > _b ? -1 : 0;
      });
    });

    return cluster;
  }
};
