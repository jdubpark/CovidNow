const rp = require('request-promise');

module.exports = class Geo{ // no static to keep sharing fn easy
  get core(){
    // use this getter to pass on Geo class scope
    // when using anonymous fn or currying (for binding args w/o calling fn)
    return {
      geocoding: this.geocoding.bind(this),
      distances: this.distances.bind(this),
      reverse: this.reverse.bind(this),
      // distance: this.distance.bind(this),
      geoDistances: this.geoDistances.bind(this),
    };
  }

  // geocoding + distances
  geoDistances(address, locs, unit){
    if (typeof address === 'array') console.log(address);
    else console.log(Date.now()+' :: '+address);
    // use provided lat, long
    if (typeof address === 'array'){
      return {
        geocoding: address,
        distances: this.distances([address.lat, address.long], locs, unit),
      }; // just calculations
    }
    // use provided address
    return this.geocoding(address).then(data => {
      console.log(data);
      if (data.lat === null || data.long === null){
        return {
          geocoding: {lat: 0, long: 0},
          distances: {'0-10': [], '10-25': [], '25-50': [], '50-100': [], '100-500': []},
        }; // just calculations
      }
      return {
        geocoding: data,
        distances: this.distances([data.lat, data.long], locs, unit),
      }; // just calculations
    }).catch(err => Promise.reject(err));
  }

  //
  //  Geocoding
  //
  geocoding(address){
    // https://nominatim.org/release-docs/develop/api/Search/
    // e.g. https://nominatim.openstreetmap.org/search/15%20Scottfield%20Rd?format=json&limit=1
    // console.log(address);
    const
      _address = encodeURIComponent(address),
      opts = {
        method: 'GET',
        // url: `https://nominatim.openstreetmap.org/search/${_address}?format=json&limit=1`,
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.CN_GMAPS_API_KEY}`
        // headers: {'User-Agent': 'Mozilla/5.0'}, // requires user-agent
      };

    // return new Promise((resolve, reject) => {
    //   resolve({lat: 10, long: 10});
    // });

    return rp(opts).then(res => {
      const parsed = JSON.parse(res);
      // console.log(parsed);
      // console.log(res);
      if (!parsed.results.length) return {lat: null, long: null, county: ''};
      const {lat, lng: long} = parsed.results[0].geometry.location;
      let locality = '', county = '', state = '';
      parsed.results[0].address_components.forEach(component => {
        const type = component.types[0];
        if (type == 'administrative_area_level_2') county = component.short_name.replace(/ County/i, '');
        else if (type == 'administrative_area_level_1') state = component.short_name;
        else if (type == 'locality') locality = component.short_name;
      });
      if (county == '') county == locality;
      return {lat, long, county, state};
      // else {
      //   const {lat, lon} = parsed[0];
      //   return {lat, long: lon};
      // }
    }).catch(err => Promise.reject(err));
  }

  reverse(lat, long){
    const
      opts = {
        method: 'GET',
        url: `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}&zoom=18&addressdetails=1`,
        headers: {'User-Agent': 'Mozilla/7.0'}, // requires user-agent
      };
    return rp(opts).then(res => {
      const {address} = JSON.parse(res);
      return {address};
    }).catch(err => Promise.reject(err));
  }

  //
  //  Distance
  //
  vectorDistance(dx, dy){
    return Math.sqrt(dx * dx + dy * dy);
  }

  locationDistance(location1, location2){
    const
      dx = location1[0] - location2[0], // latitude
      dy = location1[1] - location2[1]; // longitude
    return this.vectorDistance(dx, dy);
  };

  // just calculations, NO PROMISE!
  distances(homeLoc, locs, unit){
    const dists = {'0-10': [], '10-25': [], '25-50': [], '50-100': [], '100-500': []};
    locs.forEach(loc => {
      const dist = this.distance(homeLoc, loc, unit);
      const group = dist <= 10 ? '0-10' : dist <= 25 ? '10-25' : dist <= 50 ? '25-50' : dist <= 100 ? '50-100' : dist <= 500 ? '100-500' : null;
      if (!group) return; // ignore 500+
      dists[group].push({dist, loc});
    });
    return dists;
  }

  closestLocation(targetLocation, locationData){
    return locationData.reduce((prev, curr) => {
      const
        prevDistance = this.locationDistance(targetLocation, prev),
        currDistance = this.locationDistance(targetLocation, curr);
      return (prevDistance < currDistance) ? prev : curr;
    });
  }

  distance(loc1, loc2, unit){
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
