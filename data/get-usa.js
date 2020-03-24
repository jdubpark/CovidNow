const
  General$USA = new (require('./USA/general')),
  Get$UW = new (require('./USA/UW')),
  utils = require('./utils');


// General$USA.fetch()
//   .then(res => {
//     console.log(res);
//     Object.keys(res).forEach(state => {
//       const data = res[state];
//       // console.log(state, data)
//     })
//   })
//   .catch(err => {
//     console.log(err);
//   });

Get$UW.fetch()
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });

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
