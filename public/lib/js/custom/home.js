'use strict';

$('#map').usmap({
  // https://newsignature.github.io/us-map/#usage-style-options
  stateStyles: {fill: '#f1f2f3', stroke: '#999'},
  stateHoverStyles: {fill: '#db4031'},
  stateHoverAnimation: 100,
  labelBackingHoverStyles: {fill: '#db4031'},
  // The click action
  click: function(event, data){
    $('#clicked-state')
      .text('You clicked: '+data.name)
      .parent().effect('highlight', {color: '#C7F464'}, 2000);
  },
});
