// const
//   AWS = require('aws-sdk'),
//   CronJob = require('cron').CronJob;
// const config = require(__dirname+'/../config/aws-config.js');
// AWS.config.update(process.env.NODE_ENV === 'production' ? config.aws_remote_config : config.aws_local_config);
// const docClient = new AWS.DynamoDB.DocumentClient();

// const USA$Historical = require('./USA/historical');
//
// USA$Historical.fetch(
//   {counties: USA$Historical.url.counties}
// )
//   .then(res => {
//     // console.log(res.counties.nonstate.Guam);
//     console.log(res)
//   })
//   .catch(err => {
//     console.log(err);
//   });

const axios = require('axios');
const
  docUrl = 'https://developer.yahoo.com/boss/search/boss_api_guide/news.html',
  keywords = 'covid',
  url = `https://yboss.yahooapis.com/ysearch/news?q=${keywords}`;

axios(url)
  .then(res => {
    console.log(res);
  })
  .catch(err => console.log(err));
