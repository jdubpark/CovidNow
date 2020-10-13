const
  axios = require('axios');

axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/', {
  // seriesid: ['CES0500000002'],
  seriesid: ['CES0000000001'],
  startyear: '2010',
  endyear: '2020',
  registrationkey: '5f93c17688a3497cbf65a6c4143e8cf0',
  catalog: true,
  // aspects: true, // does not work for some series
  calculations: true,
  annualaverage: true,
}).then(res => {
  // console.log(res);
  console.log(res.data);
  if (res.data.Results){
    res.data.Results.series.forEach(series => {
      console.log(series.catalog);
      series.data.slice(0, 24).forEach(data => {
        console.log('--------------');
        console.log(data.year+data.period+': ', data.value);
        console.log(data.calculations);
      });
    });
  }
}).catch(err => {
  console.log(err);
});
