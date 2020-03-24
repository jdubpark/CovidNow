'use strict';

const apiBase = process.env.API_URL+'api/';
const apiBase2 = process.env.API_URL_2+'api/';
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const countriesJSON = require('../../json/countries.json');
const countriesJSON_ = Object.keys(countriesJSON);

let cdFetch = undefined; // core data fetch

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
  const {geocoding: {lat, long}, distances: dists} = data;
  if (!lat && !long) $('#you-search-invalid').addClass('show');
  else $('#you-search-invalid').removeClass('show');
  $('#you-search-lat val').text(lat);
  $('#you-search-long val').text(long);
  // $('#you-search-name val').text(name);

  // OFF: distance model for now
  // Object.keys(dists).forEach(dist => {
  //   const locs = dists[dist], total = locs.length;
  //   // console.log('#geoloc-d'+dist);
  //   $('#geoloc-d'+dist+' .cases val').text(total);
  // });

  // ON: county model
  const {geocoding: {county, state}} = data, stData = cdFetch.states.data;
  $('#geoloc-county-name').text(county+' County, '+state);
  $('#geoloc-state-name span').text(state);
  let cTotal = 0, sTotal = 0;
  if (stData[state] && stData[state][county]) cTotal = stData[state][county].total;
  if (stData[state] && stData[state]._statewide) sTotal = stData[state]._statewide.total;
  $('#geoloc-county .cases val').text(cTotal);
  $('#geoloc-state .cases val').text(sTotal);
}

function formatDate(dObj){
  let hrs = dObj.getHours(), mins = dObj.getMinutes(), ampm = hrs >= 12 ? 'pm' : 'am';
  hrs = hrs % 12;
  hrs = hrs ? hrs : 12; // the hour '0' should be '12'
  mins = mins < 10 ? '0'+mins : mins;
  const strTime = `${hrs}:${mins} ${ampm}`;
  return `${months[dObj.getMonth()]} ${dObj.getDate()}, ${strTime}`;
}

function percent(nume, deno, fixed=2){
  let perc;
  if (typeof num !== 'number' || typeof deno !== 'number') perc = Number(nume)/Number(deno)*100;
  else perc = nume/deno*100;

  return isFinite(perc) ? perc.toFixed(fixed) : undefined;
}

function commas(n){
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

(function($){
  let youSearching = false;
  $('#you-search-btn').on('click', function(){
    if (youSearching) return false;
    youSearching = true;
    const $t = $(this), val = $('#you-search-bar').val();
    $t.addClass('disabled');
    $('#you-search-invalid').removeClass('show');
    $('#you-search-lat val').html('locating...');
    $('#you-search-long val').html('locating...');

    const ajax1 = $.ajax({
      method: 'GET',
      url: apiBase+'my/geoDistances',
      data: {address: val},
      dataType: 'json',
    });
    ajax1.done(data => {
      console.log(data);
      youSearching = false;
      $t.removeClass('disabled');
      loadGeodata(data);
    });
    ajax1.fail((a, b, c) => console.error(a, b, c));
  });

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
    url: apiBase+'core/all',
    dataType: 'json',
  });
  ajax1.done(data => {
    console.log(data);
    cdFetch = data;
    const {usa, stats, countries} = data;
    const totalConfirmed = stats.data.total;
    const totalDeaths = stats.data.deaths;
    const totalRecovered = stats.data.recovered;
    // stats
    $('#stats-last-update span').text(formatDate(new Date(stats.ts)));
    $('#stats-confirmed-total').text(commas(stats.data.total));
    $('#stats-deaths-total').text(commas(stats.data.deaths));
    $('#stats-recov-total').text(commas(stats.data.recovered));

    const countryCount = Object.keys(countries.data).length - 1; // -1 is _others
    const fatalityRate = percent(totalDeaths, totalConfirmed);
    const recoveryRate = percent(totalRecovered, totalConfirmed);

    $('#stats-confirmed-countries span').text(countryCount);
    $('#stats-fatality-rate span').text(fatalityRate);
    $('#stats-recovery-rate span').text(recoveryRate);

    const ctData = countries.data;
    // sort by values (desc)
    const ctSort = {
      total: Object.keys(ctData).sort((a, b) => ctData[a].total < ctData[b].total ? 1 : ctData[a].total > ctData[b].total ? -1 : 0),
      deaths: Object.keys(ctData).sort((a, b) => ctData[a].deaths < ctData[b].deaths ? 1 : ctData[a].deaths > ctData[b].deaths ? -1 : 0),
      recovered: Object.keys(ctData).sort((a, b) => ctData[a].recovered < ctData[b].recovered ? 1 : ctData[a].recovered > ctData[b].recovered ? -1 : 0),
    };

    Object.keys(ctSort).forEach(key => {
      // remove key '_others'
      ctSort[key].splice(ctSort[key].indexOf('_others'), 1);

      // get top 10 and loop & append
      $(`#stats-top-countries-${key}`).html('');
      ctSort[key].slice(0, 10).forEach(ctName_ => {
        const ctDat = ctData[ctName_];
        let ctName = ctName_.split('_').join(' '), rateGlobal = '&nbsp;', ratePerc = '&nbsp;';
        if (countriesJSON_.includes(ctName)) ctName = countriesJSON[ctName];
        if (key === 'deaths' || key === 'recovered'){
          // compared to total [key] (global)
          rateGlobal = percent(ctDat[key], stats.data[key])+'%';
          // compared to the country's total confirmed
          ratePerc = percent(ctDat[key], ctDat.total)+'%';
        }
        const template = '<li>'+
          `<div class="hero-fc-top-name">${ctName}</div>`+
          `<div class="hero-fc-top-num num">${commas(ctDat[key])}</div>`+
          '<div class="hero-fc-top-rates">'+
            `<span class="glob">${rateGlobal}</span>`+
            `<span class="perc">${ratePerc}</span>`+
          '</div>'+
        '</li>';
        $(`#stats-top-countries-${key}`).append(template);
      });
    });

    // usa
    // $('#stats-total-usa').text(usa.data.compiled.all.total);
    // $('#stats-deaths-usa').text(usa.data.compiled.all.deaths);
    // $('#stats-recov-usa').text(usa.data.compiled.all.recovered);
    // // china, other
    // if (countries.data._others.total >= countries.data.China.total){
    //   countries.data._others.total = Math.max(0, countries.data._others.total-countries.data.China.total);
    //   countries.data._others.deaths = Math.max(0, countries.data._others.deaths-countries.data.China.deaths);
    //   countries.data._others.recovered = Math.max(0, countries.data._others.recovered-countries.data.China.recovered);
    // }
    // $('#stats-total-china').text(countries.data.China.total);
    // $('#stats-deaths-china').text(countries.data.China.deaths);
    // $('#stats-recov-china').text(countries.data.China.recovered);
    // $('#stats-total-other').text(countries.data._others.total);
    // $('#stats-deaths-other').text(countries.data._others.deaths);
    // $('#stats-recov-other').text(countries.data._others.recovered);

    // countries table
    const $table = $('#hero-countries-table-body');

    // prepare country data
    const
      blobCut = Math.ceil((ctSort.total.length) / 2), // accounts for _others
      nBlobs = [ctSort.total.slice(0, blobCut), ctSort.total.slice(blobCut, -1)],
      // alternate blob content
      alternatedCNames_ = nBlobs.reduce((t, u, v, w) => u.reduce((x, y, z) => (x[z * w.length + v] = y, x), t), []);

    $('#hero-countries-loading').addClass('loaded');
    $table.html('');
    // loop alternated country names (only for desktop > 1024px)
    if (window.innerWidth && window.innerWidth > 1024) ctSort.total = alternatedCNames_;
    ctSort.total.forEach(countryName_ => {
      let countryName = countryName_.split('_').join(' ');
      if (countriesJSON_.includes(countryName)) countryName = countriesJSON[countryName];
      // console.log(countryName);
      const template = '<div class="hero-country">'+
        `<div class="hero-country-name">${countryName}</div>`+
        `<div class="hero-country-val total">${ctData[countryName_].total}</div>`+
        `<div class="hero-country-val deaths">${ctData[countryName_].deaths}</div>`+
        `<div class="hero-country-val recov">${ctData[countryName_].recovered}</div>`+
        '<div class="hero-country-dummy"></div>'+ // dummy
      '</div>';
      $table.append(template);
    });
  });
  ajax1.fail((a, b, c) => console.error(a, b, c));

  //
  // News
  //
  const ajax2 = $.ajax({
    method: 'GET',
    url: apiBase2+'news/usa',
    dataType: 'json',
  });

  ajax2.done(res => {
    const {data, ts: lastUpdateTs} = res;

    $('#hero-news-list').html('');
    data.__sorted.forEach(ts => {
      const news = data[ts];
      const template = '<li>'+
        `<div class="pubdate">${formatDate(new Date(news.pubDate))}</div>`+
        `<div class="headline">${news.html}</div>`+
      '</li>';
      $('#hero-news-list').append(template);
    });
  });
  ajax2.fail((a, b, c) => console.error(a, b, c));
})(jQuery);
