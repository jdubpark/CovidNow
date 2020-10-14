module.exports = {
  yyyymmdd: dobj => dobj.toISOString().split('T')[0],
  // - n days
  nDaysAgo: ((d, n) => new Date(d.setDate(d.getDate()-n))),
  // - yesterday
  oneDayAgo: (d => new Date(d.setDate(d.getDate()-1))),
};
