'use strict';

const
  apiBase = process.env.API_URL+'api/',
  apiBaseNews = process.env.API_URL_NEWS+'api/',
  apiBaseGlobal = process.env.API_URL_GLOBAL+'api/',
  apiBaseUSA = process.env.API_URL_USA+'api/',
  apiBaseLocal = process.env.API_URL_LOCAL+'api/';

import * as utils from '../utils';
import countriesJSON from '../../json/countries.json';

const countriesJSON_ = Object.keys(countriesJSON);

const cdFetch = {
  global: {},
  usa: {},
}; // core data fetch

function geolocSuccess(pos){
  const lat = pos.coords.latitude, long = pos.coords.longitude;
  $('#you-search-lat val').html(lat);
  $('#you-search-long val').html(long);
  console.log(pos.coords);
  const ajax1 = $.ajax({
    method: 'GET',
    url: apiBase+'my/geoDistances',
    data: {lat, long},
    dataType: 'json',
  });
  ajax1.done(data => {
    console.log('auto geoloc', data);
    loadGeodata(data);
  });
}

function geolocError(){
  $('#you-search-lat val').html('locating failed...');
  $('#you-search-long val').html('locating failed...');
}

function loadGeodata(data){
  const {lat, lng: long, info, cases} = data;
  if (!lat && !long) $('#you-search-invalid').addClass('show');
  else $('#you-search-invalid').removeClass('show');
  $('#you-search-lat val').text(lat);
  $('#you-search-long val').text(long);
  // $('#you-search-name val').text(info.locality+', '+info.state);

  const {county, state} = info;
  // console.log(cases);
  // fix names
  $('#geoloc-county-name').text(county);
  $('#geoloc-state-name span').text(state);
  // county
  $('#geoloc-county .confirmed .num').text(cases.county.confirmed);
  $('#geoloc-county .deaths .num').text(cases.county.deaths);
  // state
  $('#geoloc-state .confirmed .num').text(cases.state.confirmed);
  $('#geoloc-state .deaths .num').text(cases.state.deaths);
}

let addrSearching = false;
function addrSearch(){
  if (addrSearching) return false;
  addrSearching = true;
  const val = $('#you-search-bar').val();
  $('#you-search-btn').addClass('disabled');
  $('#you-search-invalid').removeClass('show');
  $('#you-search-lat val').html('locating...');
  $('#you-search-long val').html('locating...');

  const ajax1 = $.ajax({
    method: 'GET',
    url: apiBaseLocal+'v1/local/finder',
    data: {address: val},
    dataType: 'json',
  });
  ajax1.done(data => {
    // console.log(data);
    addrSearching = false;
    $('#you-search-btn').removeClass('disabled');
    loadGeodata(data);
  });
  ajax1.fail((a, b, c) => console.error(a, b, c));
}

(function($){


  /*
      Address cases look up
      #1: press 'enter' key in the search bar
      #2: press the 'search' button
  */
  $('#you-search-bar').keydown(e => {
    if (e.keyCode == 13) addrSearch();
  });

  $('#you-search-btn').on('click', addrSearch);

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

  const ajax1 = $.ajax({
    method: 'GET',
    url: apiBaseGlobal+'v1/global/stats',
    dataType: 'json',
  });

  const ajax2 = $.ajax({
    method: 'GET',
    url: apiBaseGlobal+'v1/global/countries',
    dataType: 'json',
  });

  const ajax3 = $.ajax({
    method: 'GET',
    url: apiBaseNews+'v1/news/usa',
    dataType: 'json',
  });

  const ajax4 = $.ajax({
    method: 'GET',
    url: apiBaseUSA+'v1/usa/cases',
    dataType: 'json',
  });

  ajax1.fail((a, b, c) => console.error(a, b, c));
  ajax2.fail((a, b, c) => console.error(a, b, c));
  ajax3.fail((a, b, c) => console.error(a, b, c));
  ajax4.fail((a, b, c) => console.error(a, b, c));

  /*
      Global stats
  */
  ajax1.done(res => {
    const {data: {total, deaths, recovered}, ts} = res;
    cdFetch.global.stats = res.data;

    /*
        Update global stats
    */
    $('#stats-last-update span').text(utils.formatDate(ts));
    $('#stats-confirmed-total').text(utils.commas(total));
    $('#stats-deaths-total').text(utils.commas(deaths));
    $('#stats-recov-total').text(utils.commas(recovered));

    /*
        Calulate rate
    */
    const rate = {
      fatality: utils.percent(deaths, total),
      recovery: utils.percent(recovered, total),
    };
    $('#stats-fatality-rate span').text(rate.fatality);
    $('#stats-recovery-rate span').text(rate.recovery);
  });


  /*
      Global countries
  */
  ajax2.done(res => {
    const {data, ts} = res;
    cdFetch.global.countries = data;

    /*
        Global country count
    */
    const countryCount = Object.keys(data).length - 1; // -1 is Diamond Princess
    $('#stats-confirmed-countries span').text(countryCount);

    /*
        Sort countries by confirmed, deaths, and recovered
        (put total at last to save that sorted arr)
    */
    const
      sortKeys = ['deaths', 'recovered', 'total'],
      countryKeys = Object.keys(data);

    sortKeys.forEach(key => {
      let _key = key;
      if (_key === 'total') _key = 'confirmed'; // total -> confirmed

      // sort based on key value (deaths/recovered/confirmed)
      countryKeys.sort((a, b) => {
        return data[a].nationwide[_key] < data[b].nationwide[_key] ? 1
          : data[a].nationwide[_key] > data[b].nationwide[_key] ? -1 : 0;
      });

      /*
          Top 10 table for (death/recovered/confirmed)
      */
      const top10 = countryKeys.slice(0, 10), $top = $(`#stats-top-countries-${key}`);
      $top.html('');
      top10.forEach(ctName => {
        const ctNwDa = data[ctName].nationwide; // country nationwide data
        const val = ctNwDa[_key];

        // initialize with space (vs. global[key] & country.total)
        const perc = {global: '&nbsp;', country: '&nbsp;'};

        // compare each country to global[key] & country.total data
        // local comparison is only for deaths/recovered
        if (['deaths', 'recovered'].includes(key)){
          perc.global = utils.percent(val, cdFetch.global.stats[key])+'%';
          perc.country = utils.percent(val, ctNwDa.confirmed)+'%';
        } else {
          // for asthetics purposes, make country's confirmed % of global
          // float right (perc.country does that)
          perc.country = utils.percent(val, cdFetch.global.stats[key])+'%';
        }

        // prepare & append template
        const template = '<li>'+
          `<div class="hero-fc-top-name">${ctName}</div>`+
          `<div class="hero-fc-top-num num">${utils.commas(val)}</div>`+
          '<div class="hero-fc-top-rates">'+
            `<span class="glob">${perc.global}</span>`+
            `<span class="perc">${perc.country}</span>`+
          '</div>'+
        '</li>';
        $top.append(template);
      });
    });

    /*
        All countries table
        (sorted by total # desc)
    */
    const $countries = $('#hero-countries-table-body');
    $('#hero-countries-loading').addClass('loaded');

    // blobCut = Math.ceil((ctSort.total.length) / 2), // accounts for _others
    // nBlobs = [ctSort.total.slice(0, blobCut), ctSort.total.slice(blobCut, -1)],
    // alternate blob content
    // alternatedCNames_ = nBlobs.reduce((t, u, v, w) => u.reduce((x, y, z) => (x[z * w.length + v] = y, x), t), []);

    $countries.html('');
    countryKeys.forEach(ctName => {
      // if (data[ctName]) console.log(data[ctName].nationwide);
      // else console.log(ctName);
      const {confirmed, deaths, recovered} = data[ctName].nationwide;

      // prepare & append template
      const template = '<div class="hero-country">'+
        `<div class="hero-country-name">${ctName}</div>`+
        `<div class="hero-country-val total">${confirmed}</div>`+
        `<div class="hero-country-val deaths">${deaths}</div>`+
        `<div class="hero-country-val recov">${recovered}</div>`+
        '<div class="hero-country-dummy"></div>'+ // dummy
      '</div>';
      $countries.append(template);
    });
  });

  /*
      News
  */
  ajax3.done(data => {
    $('#hero-news-list').html('');
    data.__sorted.forEach(ts => {
      const news = data[ts];
      const template = '<li>'+
        `<div class="pubdate">${utils.formatDate(news.pubDate)}</div>`+
        `<div class="headline">${news.html}</div>`+
      '</li>';
      $('#hero-news-list').append(template);
    });
  });

  /*
      USA cases
  */
  ajax4.done(data => {
    let rdts = data.raw.data;
    rdts = Object.values(rdts).reverse().slice(0, 50);
    $('#hero-cases-list').html('');
    rdts.forEach(rdt => {
      const [no, date, county, state, lng, lat, headline, source] = rdt;
      const location = county+', '+state;
      const srcName = source.replace(/^www./, '');
      const template = '<li>'+
        `<div class="pubdate">${utils.formatDate(date, false)}</div>`+
        `<div class="headline">${headline}</div>`+
        `<div class="location">${location}</div>`+
        `<div class="source"> &mdash; <a href="${'https://'+source || './'}" target="_blank" rel="noopener">${srcName}</a></div>`+
      '</li>';
      $('#hero-cases-list').append(template);
    });
  });
})(jQuery);
