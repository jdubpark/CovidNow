'use strict';

const
  gaxios = require('gaxios'),
  utils = require('../utils'),
  statesJSON = require('../../json/states.json');

gaxios.instance.defaults = {
  baseURL: process.env.API_URL_USA+'api',
};
const {request} = gaxios;

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
    url: '/v1/usa/counties',
    dataType: 'json',
    params: {
      'state': state,
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
  cData.forEach(eachCountyData => $(idMap+'-counties').append(countyTemplate(eachCountyData)));

  // const ud = cdFetch.usa.data.compiled;
  // $(idStat+'-total').text(ud.total);
  // $(idStat+'-so').text(ud.states.total);
  // $(idStat+'-ns').text(ud.non.total);
}

function countyTemplate(county){
  // {location: S, recovered: N, confirmed: N, deaths: N}
  return '<div class="state-county">'+
  `<div class="state-county-item loc">${county.county}</div>`+
  // `<div class="state-county-item fips">${county.fips}</div>`+
  `<div class="state-county-item stat confirmed">${utils.commas(county.cases)}</div>`+
  `<div class="state-county-item stat deaths">${utils.commas(county.deaths)}</div>`+
  // `<div class="state-county-item stat recovered">${county.recovered || '?'}</div>`+
  '</div>';
}

request({
  method: 'GET',
  url: '/v1/usa/states',
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
          const cData = (await getStateCountiesData(stateName, abbr)).data;
          cdFetch.counties[abbr] = cData;
          // sort by desc confirmed #
          Object.keys(cData).forEach(state => {

          });
          // O(cdFetch.counties[abbr])
          // .sort((a, b) => b.cases - a.cases);
        } catch (err){
          console.error(err);
        }
      }

      loadStateData({stateName, abbr});
    },
  });

  $(window).on('resize', () => resizeMap());

  // const ajax1 = $.ajax({
  //   method: 'GET',
  //   url: apiBaseUSA+'v1/usa/counties',
  //   dataType: 'json',
  // });
  // ajax1.done(data => {
  //   console.log(data);
  //   cdFetch = data;
  // });
  // ajax1.fail((a, b, c) => console.error(a, b, c));
  //
})(jQuery);
