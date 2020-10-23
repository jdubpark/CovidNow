'use strict';

const {request} = require('gaxios');
const utils = require('../utils');
const graphConf = require('./graphConf');
// import countriesJSON from '../../json/countries.json';

// const countriesJSON_ = Object.keys(countriesJSON);

const cdFetch = {
  global: {},
  usa: {},
}; // core data fetch

// function geolocSuccess(pos){
//   const lat = pos.coords.latitude, long = pos.coords.longitude;
//   $('#you-search-lat val').html(lat);
//   $('#you-search-long val').html(long);
//   console.log(pos.coords);
//   const ajax1 = $.ajax({
//     method: 'GET',
//     url: apiBase+'my/geoDistances',
//     data: {lat, long},
//     dataType: 'json',
//   });
//   ajax1.done(data => {
//     console.log('auto geoloc', data);
//     loadGeodata(data);
//   });
// }
//
// function geolocError(){
//   $('#you-search-lat val').html('locating failed...');
//   $('#you-search-long val').html('locating failed...');
// }

function loadLocalData({data, geoData}){
  console.log(data, geoData);

  //
  // Returned Address info
  //
  const retAddr = geoData.info.address || 'Error!';
  $('#locality-search-return-addr').text(retAddr);

  if (geoData.info.fips == null){
    $('#locality-search-fips-error').text('Try to narrow down the address, or type in the zipcode!');
  }

  //
  // County & State data
  //
  ['county', 'state'].forEach(key => {
    const dlen = data[key].length;
    $(`#locality-${key}-cases-today`).text(data[key][dlen-1].cases);
    $(`#locality-${key}-deaths-today`).text(data[key][dlen-1].deaths);
  });

  //
  // Set up county & state chart
  //
  const seriesArr = {county: [], state: []};
  const maxWidth = {county: 500, state: 400};
  const yAxisMax = {county: 0, state: 0};
  const yAxisMul = 1.2, yAxisAdd = 5000;

  //
  // Process county & state data
  //
  ['county', 'state'].forEach(key => {
    const kdata = data[key];
    if (!kdata.length){
      seriesArr[kdata] = [];
      return;
    }

    const casesArr = [], deathsArr = [];
    const lastData = data[key][data[key].length-1];
    let yMax = lastData.cases+lastData.deaths;
    yAxisMax[key] = Math.min(yMax*yAxisMul, yMax+yAxisAdd);

    data[key].forEach(cData => {
      // [y-axis data, x-axis data]
      // have to convert to timestamp to get labels & tooltips working
      const ts = (new Date(cData.date)).getTime();
      casesArr.push([ts, cData.cases]);
      deathsArr.push([ts, cData.deaths]);
    });

    seriesArr[key] = [{
      name: 'Cases',
      data: casesArr,
    }, {
      name: 'Deaths',
      data: deathsArr,
    }];
  });

  //
  // Plot county & state data
  //
  ['county', 'state'].forEach(key => {
    if (!seriesArr[key]){
      // error! too broad address
      return;
    }

    $(`#locality-${key}-graph`).highcharts(graphConf({
      title: key[0].toUpperCase()+key.slice(1)+' Trend',
      yAxisMax: yAxisMax[key],
      maxWidth: maxWidth[key],
      seriesArr: seriesArr[key],
    }));
  });

  // const {lat, lng: long, info, cases} = data;
  // if (!lat && !long) $('#you-search-invalid').addClass('show');
  // else $('#you-search-invalid').removeClass('show');
  // $('#you-search-lat val').text(lat);
  // $('#you-search-long val').text(long);
  // // $('#you-search-name val').text(info.locality+', '+info.state);
  //
  // const {county, state} = info;
  // // console.log(cases);
  // // fix names
  // $('#geoloc-county-name').text(county);
  // $('#geoloc-state-name span').text(state);
  // // county
  // $('#geoloc-county .confirmed .num').text(cases.county.confirmed);
  // $('#geoloc-county .deaths .num').text(cases.county.deaths);
  // // state
  // $('#geoloc-state .confirmed .num').text(cases.state.confirmed);
  // $('#geoloc-state .deaths .num').text(cases.state.deaths);
}

const minAddrCharLen = 5;
let isAddrSearchEnabled = false, addrSearching = false;
function addrSearch(){
  if (!isAddrSearchEnabled || addrSearching) return false;
  addrSearching = true;
  const val = $('#locality-search-input').val();
  $('#locality-search-return-addr').text('');
  $('#locality-search-fips-error').text('');

  if (val.length < minAddrCharLen){
    console.log('Input longer address!');
    isAddrSearchEnabled = false;
    return false;
  } else {
    isAddrSearchEnabled = true;
  }

  $('#locality-search-btn').addClass('disabled');
  $('#locality-search-tab').addClass('loading');
  // $('#you-search-invalid').removeClass('show');
  // $('#you-search-lat val').html('locating...');
  // $('#you-search-long val').html('locating...');

  return request({
    method: 'GET',
    url: process.env.API_URL_LOCAL+'/v1/local/area',
    dataType: 'json',
    params: {address: val, ndays: 30},
  })
    .then(res => {
      const {data, geoData} = res.data;
      resetAddrSearch();
      loadLocalData({data, geoData});
      console.log(data);
      console.log(geoData);
      return true;
    })
    .catch(err => {
      resetAddrSearch(true);
      console.error(err);
    });
}

function resetAddrSearch(isError=false){
  addrSearching = false;
  $('#locality-search-btn').removeClass('disabled');
  $('#locality-search-tab').removeClass('loading');
  // if (isError)
}


(function($){
  /*
  *
  * Dummy
  *
  */
  const dummyData = {
    county: [
      {date: '2020-10-15', cases: 426, deaths: 71},
      {date: '2020-10-16', cases: 432, deaths: 71},
      {date: '2020-10-17', cases: 432, deaths: 71},
      {date: '2020-10-18', cases: 437, deaths: 72},
      {date: '2020-10-19', cases: 437, deaths: 72},
      {date: '2020-10-20', cases: 438, deaths: 72},
      {date: '2020-10-21', cases: 441, deaths: 72},
    ],
    state: [
      {date: '2020-10-15', cases: 141579, deaths: 9672},
      {date: '2020-10-16', cases: 142346, deaths: 9702},
      {date: '2020-10-17', cases: 142346, deaths: 9702},
      {date: '2020-10-18', cases: 143660, deaths: 9737},
      {date: '2020-10-19', cases: 143660, deaths: 9737},
      {date: '2020-10-20', cases: 144488, deaths: 9753},
      {date: '2020-10-21', cases: 145464, deaths: 9758},
    ],
    countyMaskUsage: {
      ALWAYS: 0.762,
      FREQUENTLY: 0.156,
      NEVER: 0.043,
      RARELY: 0.011,
      SOMETIMES: 0.028,
    },
  };
  const dummyGeodata = {
    lat: 42.5442599,
    lng: -72.6050836,
    info: {
      address: '7 Boyden Ln, Deerfield, MA 01342, USA',
      country: 'US',
      county: 'Franklin County',
      fips: '25011',
      locality: 'Deerfield',
      state: 'Massachusetts',
      stateAbbr: 'MA',
      zip: '01342',
    },
  };
  loadLocalData({data: dummyData, geoData: dummyGeodata});


  /*
      Address cases look up
      #1: press 'enter' key in the search bar
      #2: press the 'search' button
      min char is 5 (minAddrCharLen)
  */
  const $locSearchBtn = $('#locality-search-btn');

  $('#locality-search-input').keydown(function(e){
    if (e.keyCode == 13) addrSearch();
    if ($(this).val().length < minAddrCharLen){
      if (!$locSearchBtn.hasClass('disabled')) $locSearchBtn.addClass('disabled');
      isAddrSearchEnabled = false;
    } else {
      if ($locSearchBtn.hasClass('disabled')) $locSearchBtn.removeClass('disabled');
      isAddrSearchEnabled = true;
    }
  });

  $locSearchBtn.on('click', addrSearch);

  // off for now, support only address
  $('#you-search-lat val').html('search...');
  $('#you-search-long val').html('search...');
  // if (!navigator.geolocation){
  //   console.log('Geolocation is not supported by your browser');
  //   $('#you-search-lat val').html('not supported');
  //   $('#you-search-long val').html('not supported');
  // } else {
  //   $('#you-search-lat val').html('locating...');
  //   $('#you-search-long val').html('locating...');
  //   navigator.geolocation.getCurrentPosition(geolocSuccess, geolocError);
  // }

  request({
    method: 'GET',
    url: process.env.API_URL_GLOBAL+'/v1/global/stats',
    dataType: 'json',
  })
    .then(({data}) => globalStats(data))
    .catch(err => console.error(err));

  request({
    method: 'GET',
    url: process.env.API_URL_GLOBAL+'/v1/global/countries',
    dataType: 'json',
  })
    .then(({data}) => globalCountries(data))
    .catch(err => console.error(err));

  request({
    method: 'GET',
    url: process.env.API_URL_NEWS+'/v1/news/usa',
    dataType: 'json',
  })
    .then(({data}) => renderNews(data))
    .catch(err => console.error(err));

  function globalStats(res){
    console.log(res)
    const {total, deaths, recovered} = res;
    cdFetch.global.stats = res;

    /*
        Update global stats
    */
    // use ts from total
    $('#stats-last-update span').text(utils.formatDate(total.ts));
    $('#stats-confirmed-total').text(utils.commas(total.val));
    $('#stats-deaths-total').text(utils.commas(deaths.val));
    $('#stats-recov-total').text(utils.commas(recovered.val));

    /*
        Calulate rate
    */
    const rate = {
      fatality: utils.percent(deaths.val, total.val),
      recovery: utils.percent(recovered.val, total.val),
    };
    $('#stats-fatality-rate span').text(rate.fatality);
    $('#stats-recovery-rate span').text(rate.recovery);
  }

  function globalCountries(res){
    const data = res.countries;
    cdFetch.global.countries = res.countries;

    /*
        Global country count
    */
    // const countryCount = Object.keys(data).length; // 189
    // $('#stats-confirmed-countries span').text(countryCount);

    /*
        Sort countries by confirmed, deaths, and recovered
        (put total at last to save that sorted arr)
    */
    const sortKeys = ['deaths', 'recovered', 'total'];

    sortKeys.forEach(key => {
      let _key = key;
      if (_key === 'total') _key = 'confirmed'; // total -> confirmed

      // sort based on key value (deaths/recovered/confirmed)
      data.sort((a, b) => {
        return a[_key] < b[_key] ? 1 : a[_key] > b[_key] ? -1 : 0;
      });

      /*
          Top 10 table for (death/recovered/confirmed)
      */
      const top10 = data.slice(0, 10), $top = $(`#stats-top-countries-${key}`);
      $top.html('');
      top10.forEach(ctData => {
        const {country: ctName} = ctData, val = ctData[_key];

        // initialize with space (vs. global[key] & country.total)
        const perc = {global: '&nbsp;', national: '&nbsp;'};

        // compare each country to global[key] & country.total data
        // local comparison is only for deaths/recovered
        if (['deaths', 'recovered'].includes(key)){
          perc.global = utils.percent(val, cdFetch.global.stats[key].val)+'%';
          perc.national = utils.percent(val, ctData.confirmed)+'%';
        } else {
          // for asthetics purposes, make country's confirmed % of global
          // float right (perc.country does that)
          perc.national = utils.percent(val, cdFetch.global.stats[key].val)+'%';
        }

        // prepare & append template
        const template = '<li class="global-top-ct">'+
          '<div class="columns is-multiline is-mobile">'+
            `<div class="column global-top-ct-name">${ctName}</div>`+
            `<div class="column is-narrow global-top-ct-num num">${utils.commas(val)}</div>`+
          '</div>'+
          '<div class="columns is-multiline is-mobile">'+
            `<div class="column global-top-ct-perc-glb">${perc.global}</div>`+
            `<div class="column is-narrow global-top-ct-perc-nat">${perc.national}</div>`+
          '</div>'+
        '</li>';
        $top.append(template);
      });
    });

    /*
        All countries table
        (sorted by total # desc)
    */
    // const $countries = $('#hero-countries-table-body');
    // $('#hero-countries-loading').addClass('loaded');
    //
    // // blobCut = Math.ceil((ctSort.total.length) / 2), // accounts for _others
    // // nBlobs = [ctSort.total.slice(0, blobCut), ctSort.total.slice(blobCut, -1)],
    // // alternate blob content
    // // alternatedCNames_ = nBlobs.reduce((t, u, v, w) => u.reduce((x, y, z) => (x[z * w.length + v] = y, x), t), []);
    //
    // $countries.html('');
    // data.forEach(ctData => {
    //   // if (data[ctName]) console.log(data[ctName].nationwide);
    //   // else console.log(ctName);
    //   const {country: ctName, confirmed, deaths, recovered} = ctData;
    //
    //   // prepare & append template
    //   const template = '<div class="hero-country">'+
    //     `<div class="hero-country-name">${ctName}</div>`+
    //     `<div class="hero-country-val total">${confirmed}</div>`+
    //     `<div class="hero-country-val deaths">${deaths}</div>`+
    //     `<div class="hero-country-val recov">${recovered}</div>`+
    //     '<div class="hero-country-dummy"></div>'+ // dummy
    //   '</div>';
    //   $countries.append(template);
    // });
  }

  /*
      News
  */
  function renderNews(data){
    if (!data.hasOwnProperty('__sorted')) return;
    $('#global-news-list').html('');
    data.__sorted.forEach(ts => {
      const news = data[ts];
      const template = '<li>'+
        `<div class="pubdate">${utils.formatDate(news.pubDate)}</div>`+
        `<div class="headline">${news.html}</div>`+
      '</li>';
      $('#global-news-list').append(template);
    });
  };
})(jQuery);
