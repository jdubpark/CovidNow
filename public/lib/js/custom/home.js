'use strict';

const apiBase = process.env.API_URL+'api/';

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
      url: apiBase+'my/geocoding',
      data: {address: val},
      dataType: 'json',
    });
    const ajax2 = $.ajax({
      method: 'GET',
      url: apiBase+'my/geoDistances',
      data: {address: val},
      dataType: 'json',
    });
    ajax1.done(data => console.log(data));
    ajax1.fail((a, b, c) => console.err(a, b, c));
    ajax2.done(data => console.log(data));
    ajax2.fail((a, b, c) => console.err(a, b, c));

    youSearching = false;
    $t.removeClass('disabled');
  });

  // function error(){
  //   status.textContent = 'Unable to retrieve your location';
  // }
  //
  //
  //
  // if (!navigator.geolocation){
  //   status.textContent = 'Geolocation is not supported by your browser';
  // } else {
  //   status.textContent = 'Locating…';
  //   navigator.geolocation.getCurrentPosition(success, error);
  // }

  const ajax = $.ajax({
    method: 'GET',
    url: apiBase+'core/all',
    dataType: 'json',
  });
  ajax.done(data => {
    console.log(data);
    cdFetch = data;
  });
  ajax.fail((a, b, c) => console.error(a, b, c));
})(jQuery);
