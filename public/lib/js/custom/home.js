'use strict';

(function($){
  let cdFetch = undefined; // core data fetch



  const ajax = $.ajax({
    method: 'GET',
    url: 'http://localhost:8012/api/core/all',
    dataType: 'json',
  });
  ajax.done(data => {
    console.log(data);
    cdFetch = data;
  });
  ajax.fail((a, b, c) => console.error(a, b, c));
})(jQuery);
