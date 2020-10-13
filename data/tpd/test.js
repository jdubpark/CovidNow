const
  yaml = require('js-yaml'),
  path = require('path'),
  fs = require('fs');

const
  nytimes = require('./src/nytimes'),
  Worker = require('./worker'),
  wk = {}; // workers

const
  tpdConfPath = path.join(__dirname, './conf/tpd.yaml'),
  tpdConf = yaml.safeLoad(fs.readFileSync(tpdConfPath, 'utf-8'));

wk.nytimes = new Worker(nytimes);

wk.nytimes.setConfig({
  urls: tpdConf.tpd.nytimes.urls,
});

// console.log(wk.nytimes.getConfig);
wk.nytimes.fetch({
  live: ['counties'],
  // live: ['overview', 'states', 'counties'],
  // historical: ['overview', 'states'],
  // maskUsage: ['counties'],
}).then(res => {
  // console.log(res);
  Object.keys(res).forEach(pKey => {
    Object.keys(res[pKey]).forEach(cKey => {
      console.log(pKey, cKey);
      const data = res[pKey][cKey], parsed = wk.nytimes.src.processData(data, cKey);
      // console.log(res[pKey][cKey]);
      console.log(parsed);
    });
  });
}).catch(err => {
  console.log(err);
});
