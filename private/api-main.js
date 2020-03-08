'use strict';

const
  express = require('express'),
  http = require('http'),
  helmet = require('helmet'),
  app = express(),
  server = http.createServer(app),
  ModAPIMain = require('./modules/APIMain'),
  CustomError = require('./modules/CustomError'),
  Geo = require('./modules/Geo');

const isDev = process.env.NODE_ENV !== 'production';
const APIM = new ModAPIMain({isDev});

let cacheCoreData = undefined;
APIM.core.getAll().then(data => cacheCoreData = data).catch(err => console.log(err));

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

  if (!allowed.includes(type)) return next(new CustomError('404'));

  const getFn = type === 'all' ? APIM.core.getAll : APIM.core.get;
  getFn(type)
    .then(data => {
      if (type === 'all') cacheCoreData = data;
      res.status(200).json(data);
    })
    .catch(err => reject(err));
});

app.get('/api/my/:type', (req, res, next) => {
  const {type} = req.params, allowed = ['geocoding', 'distance'];
});

app.get('*', (req, res, next) => {
  if (!res.headersSent) res.status(404).json(APIM.err404(req));
});

// error handler // comes last
app.use((err, req, res, next) => {
  if (err.type === '404') res.status(404).json(APIM.err404(req));
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
