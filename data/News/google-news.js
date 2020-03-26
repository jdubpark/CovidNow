const
  axios = require('axios'),
  xml2js = require('xml2js');

const utils = require('../utils');

const parser = new xml2js.Parser;

module.exports = class News$Google{
  static get url(){
    return {
      'US': 'https://news.google.com/rss/search?q=coronavirus&hl=en-US&gl=US&ceid=US%3Aen',
      'IT': 'https://news.google.com/rss/search?q=coronavirus&hl=it&gl=IT&ceid=IT:it',
      // US Spanish (Espanol US)
      'ES_US': 'https://news.google.com/rss/search?q=coronavirus&hl=es-419&gl=US&ceid=US:es-419',
    };
  };

  static get parser(){
    return parser;
  }

  static fetch(){
    const proms = [];

    utils.mapKey(this.url, (url, lang) => {
      const prom = axios(url)
        .then(async res => {
          console.log(Date.now(), ` :: Fetched news (lang: ${lang}) from Google`);
          const {data: xml} = res;
          const parsed = await this.parseXML(xml);
          const processed = this.process(parsed);
          return processed;
        })
        .catch(err => Promise.reject(err));

      proms[lang] = prom;
    });

    return utils.objectPromise(proms);
  }

  static parseXML(xml){
    if (xml.trim() === '') return xml;
    return this.parser.parseStringPromise(xml);
  }

  static process(data){
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

    // sort timestamp (for filtering newest -> oldest ==> desc ts)
    cleaned.__sorted = Object.keys(cleaned).sort((a, b) => {
      const _a = Number(a), _b = Number(b);
      return _a < _b ? 1 : _a > _b ? -1 : 0;
    });

    return cleaned;
  }
};
