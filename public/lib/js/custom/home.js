'use strict';

const apiBase = process.env.API_URL+'api/';
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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
  $('#you-search-lat val').text(lat);
  $('#you-search-long val').text(long);
  // $('#you-search-name val').text(name);

  Object.keys(dists).forEach(dist => {
    const locs = dists[dist], total = locs.length;
    // console.log('#geoloc-d'+dist);
    $('#geoloc-d'+dist+' .cases val').text(total);
  });
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
  let cdFetch = undefined; // core data fetch

  let youSearching = false;
  $('#you-search-btn').on('click', function(){
    if (youSearching) return false;
    youSearching = true;
    const $t = $(this), val = $('#you-search-bar').val();
    $t.addClass('disabled');

    const ajax1 = $.ajax({
      method: 'GET',
      url: apiBase+'my/geoDistances',
      data: {address: val},
      dataType: 'json',
    });
    ajax1.done(data => {
      console.log(data);
      loadGeodata(data);
    });
    ajax1.fail((a, b, c) => console.err(a, b, c));

    youSearching = false;
    $t.removeClass('disabled');
  });

  if (!navigator.geolocation){
    console.log('Geolocation is not supported by your browser');
    $('#you-search-lat val').html('not supported');
    $('#you-search-long val').html('not supported');
  } else {
    $('#you-search-lat val').html('locating...');
    $('#you-search-long val').html('locating...');
    navigator.geolocation.getCurrentPosition(geolocSuccess, geolocError);
  }

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
    $('#stats-total-china').text(countries.data.Mainland_China.total);
    $('#stats-deaths-china').text(countries.data.Mainland_China.deaths);
    $('#stats-recov-china').text(countries.data.Mainland_China.recovered);
    $('#stats-total-other').text(countries.data._others.total);
    $('#stats-deaths-other').text(countries.data._others.deaths);
    $('#stats-recov-other').text(countries.data._others.recovered);
  });
  ajax.fail((a, b, c) => console.error(a, b, c));
})(jQuery);
