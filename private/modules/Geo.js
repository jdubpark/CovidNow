module.exports = class Geo{
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
    const dists = {'0-10': [], '10-25': [], '25-50': [], '50-100': [], '100+': []};
    locs.forEach(loc => {
      const dist = this.distance(homeLoc, loc, unit);
      const group = dist <= 10 ? '0-10' : dist <= 25 ? '10-25' : dist <= 50 ? '25-50' : dist <= 100 ? '50-100' : '100+';
      dists[group].push({dist, loc});
    });
    return dists;
  }

  static closestLocation(targetLocation, locationData){
    return locationData.reduce((prev, curr) => {
      const
        prevDistance = this.locationDistance(targetLocation, prev),
        currDistance = this.locationDistance(targetLocation, curr);
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
