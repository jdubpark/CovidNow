'use strict';

const apiBaseUSA = process.env.API_URL_USA+'api/';
const
  utils = require('../utils'),
  statesJSON = require('../../json/states.json');

function resizeMap(){
  const svgWidth = $('#usmap').width(), mapHeight = svgWidth * 2/3; // ratio w:h 3:2
  // console.log(svgWidth, mapHeight);
  $('#usmap svg').attr('width', svgWidth).attr('height', mapHeight);
};

let cdFetch = undefined; // core data fetch
function getStateData(abbr){
  if (!cdFetch || !cdFetch[abbr]) return undefined;
  let data = cdFetch[abbr];

  // no reports, just in case
  if (!data) data = {confirmed: 0, deaths: 0, recovered: 0};

  return {abbr, state: statesJSON[abbr] || '', data};
}

function loadStateData(stateData){
  if (!cdFetch) return;

  const idMap = '#usmap-state', idStat = idMap+'-stat';
  const {abbr, state, data} = stateData;

  /*
      Add state data
  */
  $(idMap+'-name').text(state);
  $(idStat+'-confirmed').text(data.statewide.confirmed);
  $(idStat+'-deaths').text(data.statewide.deaths);
  $(idStat+'-recovered').text(data.statewide.recovered);

  /*
      Add state county data
      Sorted by desc confirmed #
  */
  const counties = cdFetch[abbr], srt = Object.keys(counties);
  // sort by desc confirmed #
  srt.sort((a, b) => counties[a].confirmed < counties[b].confirmed ? 1 : counties[a].confirmed > counties[b].confirmed ? -1 : 0);
  // remove key statewide (already used)
  srt.splice(srt.indexOf('statewide'), 1);

  // start looping counties
  $(idMap+'-counties').html('');
  srt.forEach(county => {
    const cdt = counties[county];
    $(idMap+'-counties').append(countyTemplate(county, cdt))
  });

  // const ud = cdFetch.usa.data.compiled;
  // $(idStat+'-total').text(ud.total);
  // $(idStat+'-so').text(ud.states.total);
  // $(idStat+'-ns').text(ud.non.total);
}

function countyTemplate(county, data){
  // {location: S, recovered: N, confirmed: N, deaths: N}
  return '<div class="state-county">'+
  `<div class="state-county-item loc">${county}</div>`+
  `<div class="state-county-item stat confirmed">${data.confirmed}</div>`+
  `<div class="state-county-item stat deaths">${data.deaths}</div>`+
  `<div class="state-county-item stat recovered">${data.recovered || '?'}</div>`+
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
      const sdt = getStateData(abbr);
      // console.log(sdt);
      loadStateData(sdt);
    },
  });

  $(window).on('resize', function(){
    resizeMap();
  });

  const ajax = $.ajax({
    method: 'GET',
    url: apiBaseUSA+'v1/usa/counties',
    dataType: 'json',
  });
  ajax.done(data => {
    console.log(data);
    cdFetch = data;
  });
  ajax.fail((a, b, c) => console.error(a, b, c));
})(jQuery);
