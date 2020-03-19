const
  AWS = require('aws-sdk'),
  CronJob = require('cron').CronJob;

const
  GNews = new (require('./news/gnews')),
  utils = require('./utils');

const config = require(__dirname+'/../config/aws-config.js');

AWS.config.update(process.env.NODE_ENV === 'production' ? config.aws_remote_config : config.aws_local_config);

const docClient = new AWS.DynamoDB.DocumentClient();

// get every 15 minutes
const getJob = new CronJob('0 */15 * * * *', getNews, null, true, 'America/Los_Angeles');
getNews(); // init call
getJob.start();

function getNews(){
  GNews.fetch().then(res => {
    const news = GNews.clean(res);
    updateDDB(news);
  }).catch(err => console.log(err));
}

function updateDDB(data2upd){
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
