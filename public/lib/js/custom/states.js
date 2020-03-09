'use strict';

const stateNames = require('../../json/states.json');

function resizeMap(){
  const svgWidth = $('#usmap').width(), mapHeight = svgWidth * 2/3; // ratio w:h 3:2
  // console.log(svgWidth, mapHeight);
  $('#usmap svg').attr('width', svgWidth).attr('height', mapHeight);
};

let cdFetch = undefined; // core data fetch
function getStateData(abbr){
  if (!cdFetch || !stateNames[abbr]) return undefined;
  let coll = cdFetch.usa.data.collected[abbr];
  if (!coll){ // no reports! good
    coll = {total: 0, deaths: 0, recovered: 0};
  }
  return {abbr, name: stateNames[abbr], data: coll};
}

function loadStateData(stateData){
  const sd = stateData, idMap = '#usmap-state', idStat = idMap+'-stat';
  // stats
  $(idMap+'-name').text(sd.name);
  $(idStat+'-total').text(sd.data.total);
  $(idStat+'-deaths').text(sd.data.deaths);
  $(idStat+'-recov').text(sd.data.recovered);
  // cases
  // console.log(sd.data.cases);
  $(idMap+'-cases').html('');
  sd.data.cases.forEach(sCase => $(idMap+'-cases').append(stateCaseTemplate(sCase)));
  // const ud = cdFetch.usa.data.compiled;
  // $(idStat+'-total').text(ud.total);
  // $(idStat+'-so').text(ud.states.total);
  // $(idStat+'-ns').text(ud.non.total);
}

function stateCaseTemplate(data){
  // {location: S, recovered: N, confirmed: N, deaths: N}
  return '<div class="state-case">'+
  `<div class="state-case-item loc">${data.location}</div>`+
  `<div class="state-case-item stat total">${data.confirmed}</div>`+
  `<div class="state-case-item stat deaths">${data.deaths}</div>`+
  `<div class="state-case-item stat recov">${data.recovered}</div>`+
  '</div>';
}

(function($){
  $('#usmap').usmap({
    // https://newsignature.github.io/us-map/#usage-style-options
    stateStyles: {fill: '#f1f2f3', stroke: '#999'},
    stateHoverStyles: {fill: '#db4031'},
    stateHoverAnimation: 100,
    labelBackingHoverStyles: {fill: '#db4031'},
    // The click action
    click: function(event, data){
      const {name: abbr} = data;
      const stateData = getStateData(abbr);
      console.log(stateData);
      loadStateData(stateData);
    },
  });

  $(window).on('resize', function(){
    resizeMap();
  });

  const ajax = $.ajax({
    method: 'GET',
    url: 'http://localhost:8012/api/core/all',
    dataType: 'json',
  });
  ajax.done(data => {
    // console.log(data);
    cdFetch = data;
  });
  ajax.fail((a, b, c) => console.error(a, b, c));
})(jQuery);
