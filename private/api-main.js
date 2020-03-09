'use strict';

const
  express = require('express'),
  http = require('http'),
  helmet = require('helmet'),
  app = express(),
  server = http.createServer(app),
  CronJob = require('cron').CronJob,
  ModAPIMain = require('./modules/APIMain'),
  ModGeo = require('./modules/Geo'),
  CustomError = require('./modules/CustomError');

const isDev = process.env.NODE_ENV !== 'production';
const
  APIM = new ModAPIMain({isDev}),
  Geo = new ModGeo();

let cacheCoreData = undefined;


// sec, min, etc..
const cacheCDJob = new CronJob('0 */2 * * * *', fnCacheCoreData, null, true, 'America/Los_Angeles');
fnCacheCoreData(); // init fn call
cacheCDJob.start();
function fnCacheCoreData(){
  APIM.core.getAll().then(data => {
    cacheCoreData = data;
    console.log(Date.now(), ' :: Core Data Cached');
  }).catch(err => console.log(err));
}

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', isDev ? '*' : 'https://covidnow.com');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  // res.header('Content-Type', 'application/json');
  next();
});

app.get('/api/core/:type', (req, res, next) => {
  const {type} = req.params, allowed = ['all', 'usa', 'countries', 'cases', 'stats'];

  if (!allowed.includes(type)) return next(new CustomError('404', req.path));

  const getFn = type === 'all' ? APIM.core.getAll
    : (type => () => APIM.core.get(type))(type); // return function with arg attached
    // https://stackoverflow.com/questions/13851088/how-to-bind-function-arguments-without-binding-this
  getFn()
    .then(data => {
      if (type === 'all') cacheCoreData = data;
      res.status(200).json(data);
    })
    .catch(err => reject(err));
});

app.get('/api/my/:type', (req, res, next) => {
  const {type} = req.params, allowed = ['geocoding', 'distances', 'geoDistances', 'reverse'];

  if (!allowed.includes(type)) return next(new CustomError('404', req.path));

  const qs = req.query; // querystring
  let args = {}, allGood = true, runFn, promisedFn;

  // get args (IMPORTANT!: put them in order => spread by index)
  if (type === 'geocoding'){
    // (address)
    args = {address: qs.address};
    runFn = Geo.core.geocoding;
  } else if (type === 'distances'){
    // (homeLoc, locs, unit)
    args = {homeLoc: [qs.lat, qs.long], locs: cacheCoreData.usa.data.geo.list, unit: qs.unit || 'mi'};
    runFn = Geo.core.distances;
  } else if (type === 'geoDistances'){
    if (qs.lat && qs.long) args = {homeLoc: {lat: qs.lat, long: qs.long}, locs: [], unit: qs.unit || 'mi'};
    else args = {address: qs.address, locs: [], unit: qs.unit || 'mi'};
    args.locs = cacheCoreData.usa.data.geo.list;
    runFn = Geo.core.geoDistances;
  } else if (type === 'reverse'){
    args = {lat: qs.lat, long: qs.long};
    runFn = Geo.core.reverse;
  }

  // make sure args exist (not invalid)
  Object.keys(args).forEach(name => {
    if (typeof args[name] === undefined || args[name] == '') return allGood = false;
  });
  if (!allGood) return next(new CustomError('422', 'Missing Argument'));

  // attach fn with args // go around .bind()
  // spread obj values as args // https://stackoverflow.com/a/48008728
  // dont reuse runFn or it will result in callstack err
  // promisfy b/c some fns don't return promise (just calculations)
  promisedFn = (args => () => {
    return new Promise((resolve, reject) => {
      const functionRan = runFn(...Object.values(args));
      resolve(functionRan);
    });
  })(args);

  promisedFn()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => next(err));
});

app.get('*', (req, res, next) => {
  if (!res.headersSent) res.status(404).json(APIM.err404(req));
});

// error handler // comes last
app.use((err, req, res, next) => {
  if (err.type === '404') res.status(404).json(APIM.err404(req));
  else if (err.type === '422') res.status(422).json(APIM.err422(req));
  else {
    console.log(Date.now(), err);
    res.status(500).json({code: 500, error: 'internal-error'});
  }
});

server.listen(8012, () => {
  const
    host = server.address().address,
    port = server.address().port;
  console.log('[CovidNow MainAPI] listening at http://%s:%s', host, port);
});

// DDB.search('usa')
//   .then(res => {
//     // console.log(res);
//     const
//       {Items} = res,
//       refs = Items[0].data.geo.ref,
//       geoList = Items[0].data.geo.list;
//     // console.log(Items[0].data.geo);
//
//     const dummyLoc = [42.2973, -71.0745]; // [lat, long]
//     const distances = Geo.distances(dummyLoc, geoList);
//     const sorted = distances['0-10'].sort((a, b) => a.dist - b.dist);
//     const cLoc1n = sorted[0].loc[0]+'_'+sorted[0].loc[1];
//     console.log(distances);
//     console.log(sorted[0]);
//     console.log(refs[cLoc1n]);
//   })
//   .catch(err => console.log(err));
