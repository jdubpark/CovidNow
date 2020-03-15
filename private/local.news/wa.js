// mynorthwest

// https://mynorthwest.com/feed/
const Parser = require('rss-parser');
const parser = new Parser();

(async() => {
  const feed = await parser.parseURL('https://mynorthwest.com/feed/');
  console.log(feed.title);

  feed.items.forEach(item => {
    console.log(item.title + ':' + item.link)
  });
})();
