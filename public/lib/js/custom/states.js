'use strict';

const apiBase = process.env.API_URL+'api/';
const stateNames = require('../../json/states.json');

function resizeMap(){
  const svgWidth = $('#usmap').width(), mapHeight = svgWidth * 2/3; // ratio w:h 3:2
  // console.log(svgWidth, mapHeight);
  $('#usmap svg').attr('width', svgWidth).attr('height', mapHeight);
};

let cdFetch = undefined; // core data fetch
function getStateData(abbr){
  if (!cdFetch || !stateNames[abbr]) return undefined;
  const name = stateNames[abbr];
  let coll = cdFetch.usa.data.collected[name];
  if (!coll){ // no reports! good
    coll = {total: 0, deaths: 0, recovered: 0};
  }
  return {abbr, name: name, data: coll};
}

function loadStateData(stateData, abbr){
  const sd = stateData, idMap = '#usmap-state', idStat = idMap+'-stat';
  // stats
  $(idMap+'-name').text(sd.name);
  $(idStat+'-total').text(sd.data.total);
  $(idStat+'-deaths').text(sd.data.deaths);
  $(idStat+'-recov').text(sd.data.recovered);
  // counties
  $(idMap+'-counties').html('');
  if (!cdFetch.states || !cdFetch.states.data || !cdFetch.states.data[abbr]) return;
  const countyData = cdFetch.states.data[abbr], countyNames = Object.keys(countyData);
  countyNames.sort((a, b) => countyData[a].total < countyData[b].total ? 1 : countyData[a].total > countyData[b].total ? -1 : 0);
  countyNames.splice(countyNames.indexOf('_statewide'), 1);

  if (countyData._statewide.total > sd.data.total) $(idStat+'-total').text(countyData._statewide.total);
  if (countyData._statewide.deaths > sd.data.deaths) $(idStat+'-deaths').text(countyData._statewide.deaths);

  countyNames.forEach(county => $(idMap+'-counties').append(stateCaseTemplate(county, countyData[county])));
  // const ud = cdFetch.usa.data.compiled;
  // $(idStat+'-total').text(ud.total);
  // $(idStat+'-so').text(ud.states.total);
  // $(idStat+'-ns').text(ud.non.total);
}

function stateCaseTemplate(name, data){
  // {location: S, recovered: N, total: N, deaths: N}
  return '<div class="state-county">'+
  `<div class="state-county-item loc">${name}</div>`+
  `<div class="state-county-item stat total">${data.total}</div>`+
  `<div class="state-county-item stat deaths">${data.deaths}</div>`+
  `<div class="state-county-item stat recov">${data.recovered || '?'}</div>`+
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
      loadStateData(stateData, abbr);
    },
  });

  $(window).on('resize', function(){
    resizeMap();
  });

  const ajax = $.ajax({
    method: 'GET',
    url: apiBase+'core/all',
    dataType: 'json',
  });
  ajax.done(data => {
    // console.log(data);
    cdFetch = data;
  });
  ajax.fail((a, b, c) => console.error(a, b, c));
})(jQuery);
