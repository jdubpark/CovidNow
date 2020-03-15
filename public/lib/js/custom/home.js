'use strict';

const apiBase = process.env.API_URL+'api/';
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

  const ajax = $.ajax({
    method: 'GET',
    url: apiBase+'core/all',
    dataType: 'json',
  });
  ajax.done(data => {
    console.log(data);
    cdFetch = data;
    const {usa, stats, countries} = data;
    // stats
    $('#stats-last-update span').text(formatDate(new Date(stats.ts)));
    $('#stats-total-total').text(stats.data.total);
    $('#stats-deaths-total').text(stats.data.deaths);
    $('#stats-recov-total').text(stats.data.recovered);
    // usa
    $('#stats-total-usa').text(usa.data.compiled.all.total);
    $('#stats-deaths-usa').text(usa.data.compiled.all.deaths);
    $('#stats-recov-usa').text(usa.data.compiled.all.recovered);
    // china, other
    if (countries.data._others.total >= countries.data.China.total){
      countries.data._others.total = Math.max(0, countries.data._others.total-countries.data.China.total);
      countries.data._others.deaths = Math.max(0, countries.data._others.deaths-countries.data.China.deaths);
      countries.data._others.recovered = Math.max(0, countries.data._others.recovered-countries.data.China.recovered);
    }
    $('#stats-total-china').text(countries.data.China.total);
    $('#stats-deaths-china').text(countries.data.China.deaths);
    $('#stats-recov-china').text(countries.data.China.recovered);
    $('#stats-total-other').text(countries.data._others.total);
    $('#stats-deaths-other').text(countries.data._others.deaths);
    $('#stats-recov-other').text(countries.data._others.recovered);

    // countries
    const ctData = countries.data, $table = $('#hero-countries-table-body');
    // sort desc (highest to lowest)
    let countryNames_ = Object.keys(ctData);
    // remove '_others'
    countryNames_.splice(countryNames_.indexOf('_others'), 1);
    // sort country names by value (desc total)
    countryNames_.sort((a, b) => ctData[a].total < ctData[b].total ? 1 : ctData[a].total > ctData[b].total ? -1 : 0);

    // prepare country data
    const
      blobCut = Math.ceil((countryNames_.length) / 2), // accounts for _others
      nBlobs = [countryNames_.slice(0, blobCut), countryNames_.slice(blobCut, -1)],
      // alternate blob content
      alternatedCNames_ = nBlobs.reduce((t, u, v, w) => u.reduce((x, y, z) => (x[z * w.length + v] = y, x), t), []);

    $('#hero-countries-loading').addClass('loaded');
    $table.html('');
    // loop alternated country names (only for desktop > 1024px)
    if (window.innerWidth && window.innerWidth > 1024) countryNames_ = alternatedCNames_;
    countryNames_.forEach(countryName_ => {
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
  ajax.fail((a, b, c) => console.error(a, b, c));
})(jQuery);
