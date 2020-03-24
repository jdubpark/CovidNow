const
  Fetch$JHU = new (require('./JHU/fetch')),
  utils = require('./utils');


Fetch$JHU.fetch()
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
