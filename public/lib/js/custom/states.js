'use strict';

(function($){
  let cdFetch = undefined; // core data fetch
  $('#map').usmap({
    // https://newsignature.github.io/us-map/#usage-style-options
    stateStyles: {fill: '#f1f2f3', stroke: '#999'},
    stateHoverStyles: {fill: '#db4031'},
    stateHoverAnimation: 100,
    labelBackingHoverStyles: {fill: '#db4031'},
    // The click action
    click: function(event, data){
      const {name} = data;
      let fillText = `You clicked: ${name}`;
      if (cdFetch){
        let coll = cdFetch.usa.data.collected[name];
        if (coll) fillText += ` (${coll.total} Total, ${coll.deaths} Deaths, ${coll.recovered} Recovered)`;
        else fillText += ' (No Cases Reported)';
      }
      $('#clicked-state')
        .text(fillText);
    },
  });

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
