const
  axios = require('axios'),
  utils = require('../utils'),
  googleMapsAPIKey = process.env.CN_GMAPS_API_KEY;

module.exports = class Local$Geo{
  static get url(){
    return {
      geocoding: 'https://maps.googleapis.com/maps/api/geocode/json?address=__ADDR__&key=__KEY__',
      reverse: 'https://nominatim.openstreetmap.org/reverse?format=json&lat=__LAT__&lon=__LNG__&zoom=18&addressdetails=1',
    };
  }

  /*
      Returns local/city/county/state cases
        based on provided address
      input: address, locations (of cases)
      output: info obj

      Involves: geocoding
      Method:
        Get FIPS based on address and compare it to reported FIPS
      Improve:
        Zoom in to city?
        Only supports the US for now => support other countries
            Coming soon: Italy, Canada, France, Spain, India
      Note:
        If there is sufficient amount of data (need solid sources),
        consider calculating distances from given address
        to the nearest case report or even just the local/city report
  */
  static finder({address, locations, unit}){
    // if (typeof addr === 'object' && addr.)
    console.log(Date.now(), ' :: Local Finder - '+address);

    // initiate data obj
    let data = {
      // same as obj from geocoding
      lat: 0, lng: 0, info: {},
      // cases based on address components (neighborhood/city/county/state/country)
      cases: {
        // city: {}, // off for now because of insufficient city data
        county: {confirmed: 0, deaths: 0, recovered: 0},
        state: {confirmed: 0, deaths: 0, recovered: 0},
        // country: {confirmed: 0, deaths: 0, recovered: 0},
      },
    };

    return this.geocoding({address})
      .then(gcd => {
        // add geocoding result
        data = utils.deepExtend(data, gcd);

        // invalid lat or long, probably invalid address
        if (!gcd.lat || !gcd.lng) return data;

        const {state, country} = gcd.info;
        let {county} = gcd.info;

        // only supports the US for now
        if (country !== 'US') return data;

        const locs = locations; // neater

        /*
            Get county data (without suffix 'County')
            assume locations is Data 'usa-counties'

            Consider:
            Use FIPS instead of county name
              to ensure better consistency & accuracy
        */
        county = county.replace(/\sCounty$/i, '');
        // exception
        if (county === 'New York') county = 'New York City';
        // find county data
        if (locs[state] && locs[state][county]){
          data.cases.county = this.extract(locs[state][county]);
        }

        /*
            Get state data (using state abbr.)
            assume locations is Data 'usa-counties'
        */
        if (locs[state] && locs[state].statewide){
          const statewide = locs[state].statewide;
          data.cases.state = this.extract(statewide);

          // additionals not handled by this.extract()
          data.cases.state.affectedCounties = statewide.affectedCounties;
        }

        /*
            Get country data (hopefully it works lol)
        */
        // Don't need this right now since only the US
        // data is considered for now

        return data;
      }).catch(err => {
        console.log(Date.now(), 'LocalGeo.local', err);
        Promise.reject(err);
      });
  }

  /*
      Helper for this.finder()
      Basically formats the state/county data (usa-states/usa-counties)
        into a universal structure
  */
  static extract(data){
    return {
      update: data.update || 'varies', // 'varies' for statewide
      confirmed: data.confirmed,
      deaths: data.deaths,
      recovered: data.recovered,
    };
  }

  /*
      Geocoding, using Google Maps API
      input: address
      ouput: {lat, lng, info}
        (info includes FIPS, city, county, state, etc. => see below)

      Caveat: Freemium, upto $200 free monthly
      Consider free service: Nominatim
        https://nominatim.org/release-docs/develop/api/Search/
        https://nominatim.openstreetmap.org/search/15%20Scottfield%20Rd?format=json&limit=1
        // Nominatim requires user-agent, headers: {'User-Agent': 'Mozilla/5.0'}
  */
  static geocoding({address}){
    // console.log(address)
    const addr = encodeURIComponent(address);
    const url = this.url.geocoding
      .replace('__ADDR__', addr)
      .replace('__KEY__', googleMapsAPIKey);

    if (!address){
      return new Promise((resolve, reject) => {
        resolve({lat: 0, lng: 0, county: ''});
      });
    }

    return axios(url)
      .then(res => {
        const json = res.data;

        // no result, probably invalid address
        if (!json.results.length) return {lat: 0, lng: 0, county: ''};

        // get lat & long
        const {lat, lng} = json.results[0].geometry.location;

        // get name info
        const info = {locality: '', county: '', state: '', country: '', FIPS: ''};
        json.results[0].address_components.forEach(component => {
          const type = component.types[0], name = component.short_name;
          switch (type){
          case 'locality': info.locality = name; break;
          case 'administrative_area_level_2': info.county = name; break;
          case 'administrative_area_level_1': info.state = name; break;
          case 'country': info.country = name; break;
          case 'postal_code': info.FIPS = name; break;
          default: break;
          }
        });

        return {lat, lng, info};
      })
      .catch(err => Promise.reject(err));
  }

  /*
      Reverse geocoding using Nominatim (requires setting user-agent in headers)
      input: lat, lng
      output: address

      Caveat: ONLY works for some of the US address
      Better Solution (freemium): Google Maps API reverse geocoding
  */
  static reverse({lat, lng}){
    const url = this.url.reverse.replace('__LAT__', lat).replace('__LNG__', lng);
    const conf = {
      headers: {'User-Agent': 'Mozilla/7.0'}, // Nominatim requires user-agent
    };

    return axios(url, conf)
      .then(res => res.data.address)
      .catch(err => Promise.reject(err));
  }

  /*
      Distance
      (just math, not considering actual geographical problems, e.g. roads)
  */
  static vectorDistance(dx, dy){
    return Math.sqrt(dx * dx + dy * dy);
  }

  static locationDistance(location1, location2){
    const
      dx = location1[0] - location2[0], // latitude
      dy = location1[1] - location2[1]; // longitude
    return this.vectorDistance(dx, dy);
  };

  static distances(homeLoc, locs, unit){
    const dists = {'0-10': [], '10-25': [], '25-50': [], '50-100': [], '100-500': []};
    locs.forEach(loc => {
      const dist = this.distance(homeLoc, loc, unit);
      const group = dist <= 10 ? '0-10' : dist <= 25 ? '10-25' : dist <= 50 ? '25-50' : dist <= 100 ? '50-100' : dist <= 500 ? '100-500' : null;
      if (!group) return; // ignore 500+
      dists[group].push({dist, loc});
    });
    return dists;
  }

  static closestLocation(myLoc, locations){
    return locations.reduce((prev, curr) => {
      const
        prevDistance = this.locationDistance(myLoc, prev),
        currDistance = this.locationDistance(myLoc, curr);
      return (prevDistance < currDistance) ? prev : curr;
    });
  }

  static distance(loc1, loc2, unit){
    // loc1, loc2: [lat, long]
    // SOURCE: https://www.geodatasource.com/developers/javascript
    const [lat1, lon1] = loc1, [lat2, lon2] = loc2;
    if ((lat1 == lat2) && (lon1 == lon2)) return 0;
    const
      radlat1 = Math.PI * lat1/180, radlat2 = Math.PI * lat2/180,
      theta = lon1-lon2, radtheta = Math.PI * theta/180;

    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) dist = 1;
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;

    // default unit = 'mi'
    if (unit == 'km') dist = dist * 1.609344; // kilometer
    else if (unit == 'nm') dist = dist * 0.8684; // nautical miles
    return dist;
  }
};
