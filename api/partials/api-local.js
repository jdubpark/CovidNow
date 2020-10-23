'use strict';

const
  express = require('express'),
  http = require('http'),
  helmet = require('helmet'),
  axios = require('axios'),
  AWS = require('aws-sdk'),
  shortid = require('shortid');

const
  // Local$Geo = require('../../functions/data/Local/geo'),
  CustomError = require('../modules/CustomError'),
  config = require(__dirname+'/../../config/aws-config.js'),
  ports = require(__dirname+'/../../config/ports.js'),
  utils = require(__dirname+'/utils'),
  usaStates = utils.objectFlip(require(__dirname+'/../../data/json/usa-states.json')),
  zip2fips = require(__dirname+'/../../data/json/zip2fips.json');

if (typeof process.env.NODE_ENV == undefined){
  require('dotenv').config({path: '../../.env'});
}

const isDev = process.env.NODE_ENV == 'dev';
const isDevCors = isDev || process.env.NODE_CORS == 'dev';

const app = express(), server = http.createServer(app);

console.log(`[CovidNow API Local] Configuring AWS to ${isDev ? 'DEVELOPMENT' : 'PRODUCTION'}`);
AWS.config.update(isDev ? config.aws_local_config : config.aws_remote_config);

const docClient = new AWS.DynamoDB.DocumentClient({
  convertEmptyValues: true, // ignore empty string error
});

/*
* Geocoding, outputs address data given address
*/
function geocoding(address){
  const
    addr = encodeURIComponent(address),
    url = 'https://maps.googleapis.com/maps/api/geocode/json?address=__ADDR__&key=__KEY__'
      .replace('__ADDR__', addr)
      .replace('__KEY__', process.env.CN_GMAPS_API_KEY),
    geoData = {lat: null, lng: null, info: null};

  if (!address){
    return new Promise((resolve, reject) => {
      resolve(geoData);
    });
  }

  return axios(url)
    .then(res => {
      const {results} = res.data; // axios: res.data
      if (!results.length) return geoData;
      // first result
      const {lat, lng} = results[0].geometry.location;
      const info = {
        address: results[0].formatted_address,
        locality: '', county: '', state: '', country: '', zip: '', fips: ''};

      results[0].address_components.forEach(component => {
        const type = component.types[0], name = component.short_name;
        switch (type){
        case 'locality': info.locality = name; break;
        case 'administrative_area_level_2': info.county = name; break;
        case 'administrative_area_level_1':
          info.state = usaStates[name] || name;
          info.stateAbbr = name;
          break;
        case 'country': info.country = name; break;
        case 'postal_code':
          info.zip = name;
          info.fips = zip2fips[name];
          break;
        default: break;
        }
      });

      return {lat, lng, info};
    })
    .catch(err => Promise.reject(err));
}


app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', isDevCors ? '*' : 'https://covidnow.com');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  // res.header('Content-Type', 'application/json');
  next();
});

app.get('/api/v1/local/area', async(req, res, next) => {
  // const {type} = req.params, allowed = ['area'];
  //
  // if (!allowed.includes(type)) return next(new CustomError('404', req.path));
  const {address} = req.query;
  let {ndays} = req.query;
  if (!address) return next(new CustomError('422', 'Missing Argument'));

  const geoData = await geocoding(address);
  if (!geoData.info) return res.status(200).json({error: 'invalid-address', geoData});
  // console.log(geoData);

  if (!geoData.info.fips) return res.status(200).json({error: 'too-broad-address', geoData});

  // default ndays to 7
  if (!ndays) ndays = 7;

  const
    // ndays-1 since key query is >= (which includes the first date)
    // easier to deal with than >
    dobj = new Date(), pdobj = utils.nDaysAgo(dobj, ndays-1),
    tymd = utils.yyyymmdd(dobj), yymd = utils.yyyymmdd(pdobj);

  const
    stParams = { // state param
      TableName: 'USA_States',
      KeyConditionExpression: '#st = :state and #dt >= :date',
      ProjectionExpression: '#dt, cases, deaths',
      ExpressionAttributeNames: {'#st': 'state', '#dt': 'date'},
      ExpressionAttributeValues: {
        ':state': geoData.info.state,
        ':date': yymd,
      },
    },
    ctParams = { // county params
      TableName: 'USA_Counties',
      KeyConditionExpression: '#st = :state and fips_date BETWEEN :fd_start AND :fd_end',
      // FilterExpression: '#dt > :date',
      ProjectionExpression: '#dt, cases, deaths',
      ExpressionAttributeNames: {'#st': 'state', '#dt': 'date'},
      ExpressionAttributeValues: {
        ':state': geoData.info.state,
        ':fd_start': geoData.info.fips+'#'+yymd,
        ':fd_end': geoData.info.fips+'#'+tymd,
      },
    },
    muParams = { // mask usage params
      TableName: 'USA_MaskUsage',
      KeyConditionExpression: 'fips = :fips',
      ProjectionExpression: 'ALWAYS, FREQUENTLY, SOMETIMES, RARELY, NEVER',
      ExpressionAttributeValues: {':fips': geoData.info.fips},
    };

  const proms = [stParams, ctParams, muParams].map(params => utils.queryExecute({params, docClient}));
  await Promise.all(proms)
    .then(res => {
      return {'state': res[0], 'county': res[1], 'countyMaskUsage': res[2][0]};
    })
    .then(data => {
      // console.log(data);
      res.status(200).json({data, geoData});
    })
    .catch(err => next(err));


  // docClient.put({
  //   TableName: 'DC_Local_Usage',
  //   Item: {
  //     'id': shortid.generate(),
  //     'time': (new Date()).toISOString().split('.')[0],
  //     'data': geoData,
  //   },
  // }, (err, data) => {
  //   if (err) console.error('Unable to add item. Error JSON:', err);
  // });
});

app.get('*', (req, res, next) => {
  if (!res.headersSent) res.status(404).json(CustomError.err404(req));
});

// error handler // comes last
app.use((err, req, res, next) => {
  if (err.type === '404') res.status(404).json(CustomError.err404(req));
  else if (err.type === '422') res.status(422).json(CustomError.err422(req));
  else {
    console.log(Date.now(), err);
    res.status(500).json({code: 500, error: 'internal-error'});
  }
});

server.listen(ports.API_Local, () => {
  const
    host = server.address().address,
    port = server.address().port;
  console.log('[CovidNow API Local] listening at http://%s:%s', host, port);
});
