// const
//   AWS = require('aws-sdk'),
//   CronJob = require('cron').CronJob;

const
  GNews = new (require('./news/gnews')),
  utils = require('./utils');

// const config = require(__dirname+'/../config/aws-config.js');

// AWS.config.update(process.env.NODE_ENV === 'production' ? config.aws_remote_config : config.aws_local_config);

// const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = function getNews(docClient){
  console.log(Date.now(), 'Getting news articles');
  GNews.fetch().then(res => {
    console.log(Date.now(), 'Got all news articles');
    const news = GNews.clean(res);
    updateDDB(news, docClient);
  }).catch(err => console.log(err));
};

function updateDDB(data2upd, docClient){
  utils.mapKey(data2upd, (data, lang) => {
    const params = {
      TableName: 'News',
      Key: {
        'lang': lang,
      },
      UpdateExpression: 'SET #dt = :dt, ts = :ts',
      ExpressionAttributeNames: {
        '#dt': 'data',
      },
      ExpressionAttributeValues: {
        ':dt': data,
        ':ts': Date.now(),
      },
    };

    docClient.update(params, (err, res) => {
      if (err) console.error(JSON.stringify(err, null, 2));
      else console.log(Date.now(), ` :: UpdateItem succeeded [${lang}]`);
    });
  });
}
