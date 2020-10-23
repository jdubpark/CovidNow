'use strict';

const {request} = require('gaxios');
const utils = require('../utils');
const statesJSON = require('../../json/states.json');

const cdFetch = {states: undefined, counties: undefined}; // core data fetch
let loadStateTimer = undefined;

function resizeMap(){
  const svgWidth = $('#usmap').width(), mapHeight = svgWidth * 2/3; // ratio w:h 3:2
  // console.log(svgWidth, mapHeight);
  $('#usmap svg').attr('width', svgWidth).attr('height', mapHeight);
};

function getStateCountiesData(state, abbr){
  return request({
    method: 'GET',
    url: process.env.API_URL_USA+'/v1/usa/counties',
    dataType: 'json',
    params: {
      'state': state,
      'ndays': 1,
    },
  })
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

function loadStateData({stateName, abbr}){
  // data is not loaded yet
  if (!cdFetch.states || !cdFetch.counties){
    loadStateTimer = setTimeout(() => {
      loadStateTimer = undefined;
      loadStateData({stateName, abbr});
    }, 1000);
    return false;
  }

  // data is loaded, clear timeout incase user clicked multiple times
  // console.log(cdFetch.counties[abbr]);
  if (loadStateTimer){
    clearTimeout(loadStateTimer);
    loadStateTimer = undefined;
  }

  const idMap = '#usmap-state', idStat = idMap+'-stat';
  const
    sData = cdFetch.states[stateName],
    cData = cdFetch.counties[abbr];

  /*
      Add state data
  */
  $(idMap+'-name').text(stateName);
  $(idStat+'-confirmed').text(utils.commas(sData.cases[0]));
  $(idStat+'-deaths').text(utils.commas(sData.deaths[0]));
  // confirmed
  // if (sData.cases[1] != '?') $(idStat+'-ccases').text(sData.cases[1]);
  // if (sData.deaths[1]) $(idStat+'-cdeaths').text(sData.deaths[1]);
  // probably
  // if (sData.cases[2]) $(idStat+'-pcases').text(sData.cases[2]);
  // if (sData.deaths[2]) $(idStat+'-pdeaths').text(sData.deaths[2]);

  /*
      Add state county data
  */
  // start looping counties
  $(idMap+'-counties').html('');
  cData.data.forEach(eachCountyData => {
    $(idMap+'-counties').append(countyTemplate(eachCountyData, cData.date.end))
  });

  // const ud = cdFetch.usa.data.compiled;
  // $(idStat+'-total').text(ud.total);
  // $(idStat+'-so').text(ud.states.total);
  // $(idStat+'-ns').text(ud.non.total);
}

function countyTemplate(county, date){
  // {location: S, recovered: N, confirmed: N, deaths: N}
  return '<div class="state-county">'+
  `<div class="state-county-item loc">${county._META.county}</div>`+
  // `<div class="state-county-item fips">${county.fips}</div>`+
  `<div class="state-county-item stat confirmed">${utils.commas(county[date][0])}</div>`+
  `<div class="state-county-item stat deaths">${utils.commas(county[date][1])}</div>`+
  // `<div class="state-county-item stat recovered">${county.recovered || '?'}</div>`+
  '</div>';
}

request({
  method: 'GET',
  url: process.env.API_URL_USA+'/v1/usa/states',
  dataType: 'json',
}).then(res => {
  cdFetch.states = res.data.data; // res: {data: {date, data}}
}).catch(err => console.error(err));

(function($){
  $('#usmap').usmap({
    // https://newsignature.github.io/us-map/#usage-style-options
    stateStyles: {fill: '#f1f2f3', stroke: '#999'},
    stateHoverStyles: {fill: '#db4031'},
    stateHoverAnimation: 100,
    labelBackingHoverStyles: {fill: '#db4031'},
    // The click action
    click: async function(event, data){
      const {name: abbr} = data;

      const stateName = statesJSON[abbr];
      if (!stateName){
        console.error('State is undefined');
        return;
      }

      if (!cdFetch.counties) cdFetch.counties = {};
      if (!cdFetch.counties[abbr]){
        try {
          cdFetch.counties[abbr] = await getStateCountiesData(stateName, abbr);
          // sort by desc confirmed #
          const {date: {end: endDate}} = cdFetch.counties[abbr];
          console.log(cdFetch.counties[abbr], endDate)
          cdFetch.counties[abbr].data.sort((a, b) => b[endDate][0] - a[endDate][0]);
        } catch (err){
          console.error(err);
        }
      }

      loadStateData({stateName, abbr});
    },
  });

  $(window).on('resize', () => resizeMap());
})(jQuery);
