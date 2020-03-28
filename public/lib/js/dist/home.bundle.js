/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/lib/js/custom/home.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/lib/js/custom/home.js":
/*!**************************************!*\
  !*** ./public/lib/js/custom/home.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _utils = __webpack_require__(/*! ../utils */ "./public/lib/js/utils/index.js");

var utils = _interopRequireWildcard(_utils);

var _countries = __webpack_require__(/*! ../../json/countries.json */ "./public/lib/json/countries.json");

var _countries2 = _interopRequireDefault(_countries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var apiBase = "http://localhost:8012/" + 'api/',
    apiBaseNews = "http://localhost:8013/" + 'api/',
    apiBaseGlobal = "http://localhost:8015/" + 'api/',
    apiBaseUSA = "http://localhost:8014/" + 'api/',
    apiBaseLocal = "http://localhost:8016/" + 'api/';

var countriesJSON_ = Object.keys(_countries2.default);

var cdFetch = {
  global: {},
  usa: {}
}; // core data fetch

function geolocSuccess(pos) {
  var lat = pos.coords.latitude,
      long = pos.coords.longitude;
  $('#you-search-lat val').html(lat);
  $('#you-search-long val').html(long);
  console.log(pos.coords);
  var ajax1 = $.ajax({
    method: 'GET',
    url: apiBase + 'my/geoDistances',
    data: { lat: lat, long: long },
    dataType: 'json'
  });
  ajax1.done(function (data) {
    console.log('auto geoloc', data);
    loadGeodata(data);
  });
}

function geolocError() {
  $('#you-search-lat val').html('locating failed...');
  $('#you-search-long val').html('locating failed...');
}

function loadGeodata(data) {
  var lat = data.lat,
      long = data.lng,
      info = data.info,
      cases = data.cases;

  if (!lat && !long) $('#you-search-invalid').addClass('show');else $('#you-search-invalid').removeClass('show');
  $('#you-search-lat val').text(lat);
  $('#you-search-long val').text(long);
  // $('#you-search-name val').text(info.locality+', '+info.state);

  var county = info.county,
      state = info.state;
  // console.log(cases);
  // fix names

  $('#geoloc-county-name').text(county);
  $('#geoloc-state-name span').text(state);
  // county
  $('#geoloc-county .confirmed .num').text(cases.county.confirmed);
  $('#geoloc-county .deaths .num').text(cases.county.deaths);
  // state
  $('#geoloc-state .confirmed .num').text(cases.state.confirmed);
  $('#geoloc-state .deaths .num').text(cases.state.deaths);
}

var addrSearching = false;
function addrSearch() {
  if (addrSearching) return false;
  addrSearching = true;
  var val = $('#you-search-bar').val();
  $('#you-search-btn').addClass('disabled');
  $('#you-search-invalid').removeClass('show');
  $('#you-search-lat val').html('locating...');
  $('#you-search-long val').html('locating...');

  var ajax1 = $.ajax({
    method: 'GET',
    url: apiBaseLocal + 'v1/local/finder',
    data: { address: val },
    dataType: 'json'
  });
  ajax1.done(function (data) {
    // console.log(data);
    addrSearching = false;
    $('#you-search-btn').removeClass('disabled');
    loadGeodata(data);
  });
  ajax1.fail(function (a, b, c) {
    return console.error(a, b, c);
  });
}

(function ($) {

  /*
      Address cases look up
      #1: press 'enter' key in the search bar
      #2: press the 'search' button
  */
  $('#you-search-bar').keydown(function (e) {
    if (e.keyCode == 13) addrSearch();
  });

  $('#you-search-btn').on('click', addrSearch);

  // off for now, support only address
  $('#you-search-lat val').html('search...');
  $('#you-search-long val').html('search...');
  // if (!navigator.geolocation){
  //   console.log('Geolocation is not supported by your browser');
  //   $('#you-search-lat val').html('not supported');
  //   $('#you-search-long val').html('not supported');
  // } else {
  //   $('#you-search-lat val').html('locating...');
  //   $('#you-search-long val').html('locating...');
  //   navigator.geolocation.getCurrentPosition(geolocSuccess, geolocError);
  // }

  var ajax1 = $.ajax({
    method: 'GET',
    url: apiBaseGlobal + 'v1/global/stats',
    dataType: 'json'
  });

  var ajax2 = $.ajax({
    method: 'GET',
    url: apiBaseGlobal + 'v1/global/countries',
    dataType: 'json'
  });

  var ajax3 = $.ajax({
    method: 'GET',
    url: apiBaseNews + 'v1/news/usa',
    dataType: 'json'
  });

  var ajax4 = $.ajax({
    method: 'GET',
    url: apiBaseUSA + 'v1/usa/cases',
    dataType: 'json'
  });

  ajax1.fail(function (a, b, c) {
    return console.error(a, b, c);
  });
  ajax2.fail(function (a, b, c) {
    return console.error(a, b, c);
  });
  ajax3.fail(function (a, b, c) {
    return console.error(a, b, c);
  });
  ajax4.fail(function (a, b, c) {
    return console.error(a, b, c);
  });

  /*
      Global stats
  */
  ajax1.done(function (res) {
    var _res$data = res.data,
        total = _res$data.total,
        deaths = _res$data.deaths,
        recovered = _res$data.recovered,
        ts = res.ts;

    cdFetch.global.stats = res.data;

    /*
        Update global stats
    */
    $('#stats-last-update span').text(utils.formatDate(ts));
    $('#stats-confirmed-total').text(utils.commas(total));
    $('#stats-deaths-total').text(utils.commas(deaths));
    $('#stats-recov-total').text(utils.commas(recovered));

    /*
        Calulate rate
    */
    var rate = {
      fatality: utils.percent(deaths, total),
      recovery: utils.percent(recovered, total)
    };
    $('#stats-fatality-rate span').text(rate.fatality);
    $('#stats-recovery-rate span').text(rate.recovery);
  });

  /*
      Global countries
  */
  ajax2.done(function (res) {
    var data = res.data,
        ts = res.ts;

    cdFetch.global.countries = data;

    /*
        Global country count
    */
    var countryCount = Object.keys(data).length - 1; // -1 is Diamond Princess
    $('#stats-confirmed-countries span').text(countryCount);

    /*
        Sort countries by confirmed, deaths, and recovered
        (put total at last to save that sorted arr)
    */
    var sortKeys = ['deaths', 'recovered', 'total'],
        countryKeys = Object.keys(data);

    sortKeys.forEach(function (key) {
      var _key = key;
      if (_key === 'total') _key = 'confirmed'; // total -> confirmed

      // sort based on key value (deaths/recovered/confirmed)
      countryKeys.sort(function (a, b) {
        return data[a].nationwide[_key] < data[b].nationwide[_key] ? 1 : data[a].nationwide[_key] > data[b].nationwide[_key] ? -1 : 0;
      });

      /*
          Top 10 table for (death/recovered/confirmed)
      */
      var top10 = countryKeys.slice(0, 10),
          $top = $('#stats-top-countries-' + key);
      $top.html('');
      top10.forEach(function (ctName) {
        var ctNwDa = data[ctName].nationwide; // country nationwide data
        var val = ctNwDa[_key];

        // initialize with space (vs. global[key] & country.total)
        var perc = { global: '&nbsp;', country: '&nbsp;' };

        // compare each country to global[key] & country.total data
        // local comparison is only for deaths/recovered
        if (['deaths', 'recovered'].includes(key)) {
          perc.global = utils.percent(val, cdFetch.global.stats[key]) + '%';
          perc.country = utils.percent(val, ctNwDa.confirmed) + '%';
        } else {
          // for asthetics purposes, make country's confirmed % of global
          // float right (perc.country does that)
          perc.country = utils.percent(val, cdFetch.global.stats[key]) + '%';
        }

        // prepare & append template
        var template = '<li>' + ('<div class="hero-fc-top-name">' + ctName + '</div>') + ('<div class="hero-fc-top-num num">' + utils.commas(val) + '</div>') + '<div class="hero-fc-top-rates">' + ('<span class="glob">' + perc.global + '</span>') + ('<span class="perc">' + perc.country + '</span>') + '</div>' + '</li>';
        $top.append(template);
      });
    });

    /*
        All countries table
        (sorted by total # desc)
    */
    var $countries = $('#hero-countries-table-body');
    $('#hero-countries-loading').addClass('loaded');

    // blobCut = Math.ceil((ctSort.total.length) / 2), // accounts for _others
    // nBlobs = [ctSort.total.slice(0, blobCut), ctSort.total.slice(blobCut, -1)],
    // alternate blob content
    // alternatedCNames_ = nBlobs.reduce((t, u, v, w) => u.reduce((x, y, z) => (x[z * w.length + v] = y, x), t), []);

    $countries.html('');
    countryKeys.forEach(function (ctName) {
      // if (data[ctName]) console.log(data[ctName].nationwide);
      // else console.log(ctName);
      var _data$ctName$nationwi = data[ctName].nationwide,
          confirmed = _data$ctName$nationwi.confirmed,
          deaths = _data$ctName$nationwi.deaths,
          recovered = _data$ctName$nationwi.recovered;

      // prepare & append template

      var template = '<div class="hero-country">' + ('<div class="hero-country-name">' + ctName + '</div>') + ('<div class="hero-country-val total">' + confirmed + '</div>') + ('<div class="hero-country-val deaths">' + deaths + '</div>') + ('<div class="hero-country-val recov">' + recovered + '</div>') + '<div class="hero-country-dummy"></div>' + // dummy
      '</div>';
      $countries.append(template);
    });
  });

  /*
      News
  */
  ajax3.done(function (data) {
    $('#hero-news-list').html('');
    data.__sorted.forEach(function (ts) {
      var news = data[ts];
      var template = '<li>' + ('<div class="pubdate">' + utils.formatDate(news.pubDate) + '</div>') + ('<div class="headline">' + news.html + '</div>') + '</li>';
      $('#hero-news-list').append(template);
    });
  });

  /*
      USA cases
  */
  ajax4.done(function (data) {
    var rdts = data.raw.data;
    rdts = Object.values(rdts).reverse().slice(0, 50);
    $('#hero-cases-list').html('');
    rdts.forEach(function (rdt) {
      var _rdt = _slicedToArray(rdt, 8),
          no = _rdt[0],
          date = _rdt[1],
          county = _rdt[2],
          state = _rdt[3],
          lng = _rdt[4],
          lat = _rdt[5],
          headline = _rdt[6],
          source = _rdt[7];

      var location = county + ', ' + state;
      var srcName = source.replace(/^www./, '');
      var template = '<li>' + ('<div class="pubdate">' + utils.formatDate(date, false) + '</div>') + ('<div class="headline">' + headline + '</div>') + ('<div class="location">' + location + '</div>') + ('<div class="source"> &mdash; <a href="' + ('https://' + source || false) + '" target="_blank" rel="noopener">' + srcName + '</a></div>') + '</li>';
      $('#hero-cases-list').append(template);
    });
  });
})(jQuery);

/***/ }),

/***/ "./public/lib/js/utils/index.js":
/*!**************************************!*\
  !*** ./public/lib/js/utils/index.js ***!
  \**************************************/
/*! exports provided: formatDate, commas, percent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDate", function() { return formatDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commas", function() { return commas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "percent", function() { return percent; });
/* harmony import */ var _json_months_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../json/months.json */ "./public/lib/json/months.json");
var _json_months_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../json/months.json */ "./public/lib/json/months.json", 1);


/*
    Formats date to
      'Month(short) Date, Time' or 'Month(long) Date'
*/
function formatDate(time, displayTime=true){
  const dObj = new Date(time), month = dObj.getMonth(), date = dObj.getDate();

  // no time
  if (!displayTime) return `${_json_months_json__WEBPACK_IMPORTED_MODULE_0__.long[month]} ${date}`;

  let hrs = dObj.getHours(), mins = dObj.getMinutes(), ampm = hrs >= 12 ? 'pm' : 'am';
  hrs = hrs % 12;
  hrs = hrs ? hrs : 12; // the hour '0' should be '12'
  mins = mins < 10 ? '0'+mins : mins;
  const strTime = `${hrs}:${mins} ${ampm}`;
  return `${_json_months_json__WEBPACK_IMPORTED_MODULE_0__.short[month]} ${date}, ${strTime}`;
};

/*
    Inserts commas into numbers
    input: 123456 (num)
    output: 123,456 (str)
*/
function commas(n){
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/*
    Evaluate percentage from two numbers
    input: numerator, denominator
    output: numerator/denominator %
*/
function percent(nume, deno, fixed=2){
  let perc;
  if (typeof num !== 'number' || typeof deno !== 'number') perc = Number(nume)/Number(deno)*100;
  else perc = nume/deno*100;

  return isFinite(perc) ? perc.toFixed(fixed) : undefined;
}


/***/ }),

/***/ "./public/lib/json/countries.json":
/*!****************************************!*\
  !*** ./public/lib/json/countries.json ***!
  \****************************************/
/*! exports provided: Iran (Islamic Republic of), occupied Palestinian territory, Democratic Republic of the Congo, Republic of Korea, Korea, South, Democratic Republic of Korea, Republic of Moldova, Russian Federation, United Arab Emirates, United Kingdom, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"Iran (Islamic Republic of)\":\"Iran\",\"occupied Palestinian territory\":\"Palestine\",\"Democratic Republic of the Congo\":\"DR Congo\",\"Republic of Korea\":\"South Korea\",\"Korea, South\":\"South Korea\",\"Democratic Republic of Korea\":\"North Korea\",\"Republic of Moldova\":\"Moldova\",\"Russian Federation\":\"Russia\",\"United Arab Emirates\":\"UAE\",\"United Kingdom\":\"UK\"}");

/***/ }),

/***/ "./public/lib/json/months.json":
/*!*************************************!*\
  !*** ./public/lib/json/months.json ***!
  \*************************************/
/*! exports provided: short, long, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"short\":[\"Jan\",\"Feb\",\"Mar\",\"Apr\",\"May\",\"Jun\",\"Jul\",\"Aug\",\"Sep\",\"Oct\",\"Nov\",\"Dec\"],\"long\":[\"January\",\"February\",\"March\",\"April\",\"May\",\"June\",\"July\",\"August\",\"September\",\"October\",\"November\",\"December\"]}");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2xpYi9qcy9jdXN0b20vaG9tZS5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvbGliL2pzL3V0aWxzL2luZGV4LmpzIl0sIm5hbWVzIjpbInV0aWxzIiwiYXBpQmFzZSIsInByb2Nlc3MiLCJhcGlCYXNlTmV3cyIsImFwaUJhc2VHbG9iYWwiLCJhcGlCYXNlVVNBIiwiYXBpQmFzZUxvY2FsIiwiY291bnRyaWVzSlNPTl8iLCJPYmplY3QiLCJrZXlzIiwiY291bnRyaWVzSlNPTiIsImNkRmV0Y2giLCJnbG9iYWwiLCJ1c2EiLCJnZW9sb2NTdWNjZXNzIiwicG9zIiwibGF0IiwiY29vcmRzIiwibGF0aXR1ZGUiLCJsb25nIiwibG9uZ2l0dWRlIiwiJCIsImh0bWwiLCJjb25zb2xlIiwibG9nIiwiYWpheDEiLCJhamF4IiwibWV0aG9kIiwidXJsIiwiZGF0YSIsImRhdGFUeXBlIiwiZG9uZSIsImxvYWRHZW9kYXRhIiwiZ2VvbG9jRXJyb3IiLCJsbmciLCJpbmZvIiwiY2FzZXMiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwidGV4dCIsImNvdW50eSIsInN0YXRlIiwiY29uZmlybWVkIiwiZGVhdGhzIiwiYWRkclNlYXJjaGluZyIsImFkZHJTZWFyY2giLCJ2YWwiLCJhZGRyZXNzIiwiZmFpbCIsImEiLCJiIiwiYyIsImVycm9yIiwia2V5ZG93biIsImUiLCJrZXlDb2RlIiwib24iLCJhamF4MiIsImFqYXgzIiwiYWpheDQiLCJyZXMiLCJ0b3RhbCIsInJlY292ZXJlZCIsInRzIiwic3RhdHMiLCJmb3JtYXREYXRlIiwiY29tbWFzIiwicmF0ZSIsImZhdGFsaXR5IiwicGVyY2VudCIsInJlY292ZXJ5IiwiY291bnRyaWVzIiwiY291bnRyeUNvdW50IiwibGVuZ3RoIiwic29ydEtleXMiLCJjb3VudHJ5S2V5cyIsImZvckVhY2giLCJfa2V5Iiwia2V5Iiwic29ydCIsIm5hdGlvbndpZGUiLCJ0b3AxMCIsInNsaWNlIiwiJHRvcCIsImN0TndEYSIsImN0TmFtZSIsInBlcmMiLCJjb3VudHJ5IiwiaW5jbHVkZXMiLCJ0ZW1wbGF0ZSIsImFwcGVuZCIsIiRjb3VudHJpZXMiLCJfX3NvcnRlZCIsIm5ld3MiLCJwdWJEYXRlIiwicmR0cyIsInJhdyIsInZhbHVlcyIsInJldmVyc2UiLCJyZHQiLCJubyIsImRhdGUiLCJoZWFkbGluZSIsInNvdXJjZSIsImxvY2F0aW9uIiwic3JjTmFtZSIsInJlcGxhY2UiLCJqUXVlcnkiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRmE7Ozs7QUFTYjs7SUFBWUEsSzs7QUFDWjs7Ozs7Ozs7QUFSQSxJQUNFQyxVQUFVQyx3QkFBQSxHQUFvQixNQURoQztBQUFBLElBRUVDLGNBQWNELHdCQUFBLEdBQXlCLE1BRnpDO0FBQUEsSUFHRUUsZ0JBQWdCRix3QkFBQSxHQUEyQixNQUg3QztBQUFB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Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9wdWJsaWMvbGliL2pzL2N1c3RvbS9ob21lLmpzXCIpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdFxuICBhcGlCYXNlID0gcHJvY2Vzcy5lbnYuQVBJX1VSTCsnYXBpLycsXG4gIGFwaUJhc2VOZXdzID0gcHJvY2Vzcy5lbnYuQVBJX1VSTF9ORVdTKydhcGkvJyxcbiAgYXBpQmFzZUdsb2JhbCA9IHByb2Nlc3MuZW52LkFQSV9VUkxfR0xPQkFMKydhcGkvJyxcbiAgYXBpQmFzZVVTQSA9IHByb2Nlc3MuZW52LkFQSV9VUkxfVVNBKydhcGkvJyxcbiAgYXBpQmFzZUxvY2FsID0gcHJvY2Vzcy5lbnYuQVBJX1VSTF9MT0NBTCsnYXBpLyc7XG5cbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCBjb3VudHJpZXNKU09OIGZyb20gJy4uLy4uL2pzb24vY291bnRyaWVzLmpzb24nO1xuXG5jb25zdCBjb3VudHJpZXNKU09OXyA9IE9iamVjdC5rZXlzKGNvdW50cmllc0pTT04pO1xuXG5jb25zdCBjZEZldGNoID0ge1xuICBnbG9iYWw6IHt9LFxuICB1c2E6IHt9LFxufTsgLy8gY29yZSBkYXRhIGZldGNoXG5cbmZ1bmN0aW9uIGdlb2xvY1N1Y2Nlc3MocG9zKXtcbiAgY29uc3QgbGF0ID0gcG9zLmNvb3Jkcy5sYXRpdHVkZSwgbG9uZyA9IHBvcy5jb29yZHMubG9uZ2l0dWRlO1xuICAkKCcjeW91LXNlYXJjaC1sYXQgdmFsJykuaHRtbChsYXQpO1xuICAkKCcjeW91LXNlYXJjaC1sb25nIHZhbCcpLmh0bWwobG9uZyk7XG4gIGNvbnNvbGUubG9nKHBvcy5jb29yZHMpO1xuICBjb25zdCBhamF4MSA9ICQuYWpheCh7XG4gICAgbWV0aG9kOiAnR0VUJyxcbiAgICB1cmw6IGFwaUJhc2UrJ215L2dlb0Rpc3RhbmNlcycsXG4gICAgZGF0YToge2xhdCwgbG9uZ30sXG4gICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgfSk7XG4gIGFqYXgxLmRvbmUoZGF0YSA9PiB7XG4gICAgY29uc29sZS5sb2coJ2F1dG8gZ2VvbG9jJywgZGF0YSk7XG4gICAgbG9hZEdlb2RhdGEoZGF0YSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnZW9sb2NFcnJvcigpe1xuICAkKCcjeW91LXNlYXJjaC1sYXQgdmFsJykuaHRtbCgnbG9jYXRpbmcgZmFpbGVkLi4uJyk7XG4gICQoJyN5b3Utc2VhcmNoLWxvbmcgdmFsJykuaHRtbCgnbG9jYXRpbmcgZmFpbGVkLi4uJyk7XG59XG5cbmZ1bmN0aW9uIGxvYWRHZW9kYXRhKGRhdGEpe1xuICBjb25zdCB7bGF0LCBsbmc6IGxvbmcsIGluZm8sIGNhc2VzfSA9IGRhdGE7XG4gIGlmICghbGF0ICYmICFsb25nKSAkKCcjeW91LXNlYXJjaC1pbnZhbGlkJykuYWRkQ2xhc3MoJ3Nob3cnKTtcbiAgZWxzZSAkKCcjeW91LXNlYXJjaC1pbnZhbGlkJykucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcbiAgJCgnI3lvdS1zZWFyY2gtbGF0IHZhbCcpLnRleHQobGF0KTtcbiAgJCgnI3lvdS1zZWFyY2gtbG9uZyB2YWwnKS50ZXh0KGxvbmcpO1xuICAvLyAkKCcjeW91LXNlYXJjaC1uYW1lIHZhbCcpLnRleHQoaW5mby5sb2NhbGl0eSsnLCAnK2luZm8uc3RhdGUpO1xuXG4gIGNvbnN0IHtjb3VudHksIHN0YXRlfSA9IGluZm87XG4gIC8vIGNvbnNvbGUubG9nKGNhc2VzKTtcbiAgLy8gZml4IG5hbWVzXG4gICQoJyNnZW9sb2MtY291bnR5LW5hbWUnKS50ZXh0KGNvdW50eSk7XG4gICQoJyNnZW9sb2Mtc3RhdGUtbmFtZSBzcGFuJykudGV4dChzdGF0ZSk7XG4gIC8vIGNvdW50eVxuICAkKCcjZ2VvbG9jLWNvdW50eSAuY29uZmlybWVkIC5udW0nKS50ZXh0KGNhc2VzLmNvdW50eS5jb25maXJtZWQpO1xuICAkKCcjZ2VvbG9jLWNvdW50eSAuZGVhdGhzIC5udW0nKS50ZXh0KGNhc2VzLmNvdW50eS5kZWF0aHMpO1xuICAvLyBzdGF0ZVxuICAkKCcjZ2VvbG9jLXN0YXRlIC5jb25maXJtZWQgLm51bScpLnRleHQoY2FzZXMuc3RhdGUuY29uZmlybWVkKTtcbiAgJCgnI2dlb2xvYy1zdGF0ZSAuZGVhdGhzIC5udW0nKS50ZXh0KGNhc2VzLnN0YXRlLmRlYXRocyk7XG59XG5cbmxldCBhZGRyU2VhcmNoaW5nID0gZmFsc2U7XG5mdW5jdGlvbiBhZGRyU2VhcmNoKCl7XG4gIGlmIChhZGRyU2VhcmNoaW5nKSByZXR1cm4gZmFsc2U7XG4gIGFkZHJTZWFyY2hpbmcgPSB0cnVlO1xuICBjb25zdCB2YWwgPSAkKCcjeW91LXNlYXJjaC1iYXInKS52YWwoKTtcbiAgJCgnI3lvdS1zZWFyY2gtYnRuJykuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICQoJyN5b3Utc2VhcmNoLWludmFsaWQnKS5yZW1vdmVDbGFzcygnc2hvdycpO1xuICAkKCcjeW91LXNlYXJjaC1sYXQgdmFsJykuaHRtbCgnbG9jYXRpbmcuLi4nKTtcbiAgJCgnI3lvdS1zZWFyY2gtbG9uZyB2YWwnKS5odG1sKCdsb2NhdGluZy4uLicpO1xuXG4gIGNvbnN0IGFqYXgxID0gJC5hamF4KHtcbiAgICBtZXRob2Q6ICdHRVQnLFxuICAgIHVybDogYXBpQmFzZUxvY2FsKyd2MS9sb2NhbC9maW5kZXInLFxuICAgIGRhdGE6IHthZGRyZXNzOiB2YWx9LFxuICAgIGRhdGFUeXBlOiAnanNvbicsXG4gIH0pO1xuICBhamF4MS5kb25lKGRhdGEgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIGFkZHJTZWFyY2hpbmcgPSBmYWxzZTtcbiAgICAkKCcjeW91LXNlYXJjaC1idG4nKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcbiAgICBsb2FkR2VvZGF0YShkYXRhKTtcbiAgfSk7XG4gIGFqYXgxLmZhaWwoKGEsIGIsIGMpID0+IGNvbnNvbGUuZXJyb3IoYSwgYiwgYykpO1xufVxuXG4oZnVuY3Rpb24oJCl7XG5cblxuICAvKlxuICAgICAgQWRkcmVzcyBjYXNlcyBsb29rIHVwXG4gICAgICAjMTogcHJlc3MgJ2VudGVyJyBrZXkgaW4gdGhlIHNlYXJjaCBiYXJcbiAgICAgICMyOiBwcmVzcyB0aGUgJ3NlYXJjaCcgYnV0dG9uXG4gICovXG4gICQoJyN5b3Utc2VhcmNoLWJhcicpLmtleWRvd24oZSA9PiB7XG4gICAgaWYgKGUua2V5Q29kZSA9PSAxMykgYWRkclNlYXJjaCgpO1xuICB9KTtcblxuICAkKCcjeW91LXNlYXJjaC1idG4nKS5vbignY2xpY2snLCBhZGRyU2VhcmNoKTtcblxuICAvLyBvZmYgZm9yIG5vdywgc3VwcG9ydCBvbmx5IGFkZHJlc3NcbiAgJCgnI3lvdS1zZWFyY2gtbGF0IHZhbCcpLmh0bWwoJ3NlYXJjaC4uLicpO1xuICAkKCcjeW91LXNlYXJjaC1sb25nIHZhbCcpLmh0bWwoJ3NlYXJjaC4uLicpO1xuICAvLyBpZiAoIW5hdmlnYXRvci5nZW9sb2NhdGlvbil7XG4gIC8vICAgY29uc29sZS5sb2coJ0dlb2xvY2F0aW9uIGlzIG5vdCBzdXBwb3J0ZWQgYnkgeW91ciBicm93c2VyJyk7XG4gIC8vICAgJCgnI3lvdS1zZWFyY2gtbGF0IHZhbCcpLmh0bWwoJ25vdCBzdXBwb3J0ZWQnKTtcbiAgLy8gICAkKCcjeW91LXNlYXJjaC1sb25nIHZhbCcpLmh0bWwoJ25vdCBzdXBwb3J0ZWQnKTtcbiAgLy8gfSBlbHNlIHtcbiAgLy8gICAkKCcjeW91LXNlYXJjaC1sYXQgdmFsJykuaHRtbCgnbG9jYXRpbmcuLi4nKTtcbiAgLy8gICAkKCcjeW91LXNlYXJjaC1sb25nIHZhbCcpLmh0bWwoJ2xvY2F0aW5nLi4uJyk7XG4gIC8vICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihnZW9sb2NTdWNjZXNzLCBnZW9sb2NFcnJvcik7XG4gIC8vIH1cblxuICBjb25zdCBhamF4MSA9ICQuYWpheCh7XG4gICAgbWV0aG9kOiAnR0VUJyxcbiAgICB1cmw6IGFwaUJhc2VHbG9iYWwrJ3YxL2dsb2JhbC9zdGF0cycsXG4gICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgfSk7XG5cbiAgY29uc3QgYWpheDIgPSAkLmFqYXgoe1xuICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgdXJsOiBhcGlCYXNlR2xvYmFsKyd2MS9nbG9iYWwvY291bnRyaWVzJyxcbiAgICBkYXRhVHlwZTogJ2pzb24nLFxuICB9KTtcblxuICBjb25zdCBhamF4MyA9ICQuYWpheCh7XG4gICAgbWV0aG9kOiAnR0VUJyxcbiAgICB1cmw6IGFwaUJhc2VOZXdzKyd2MS9uZXdzL3VzYScsXG4gICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgfSk7XG5cbiAgY29uc3QgYWpheDQgPSAkLmFqYXgoe1xuICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgdXJsOiBhcGlCYXNlVVNBKyd2MS91c2EvY2FzZXMnLFxuICAgIGRhdGFUeXBlOiAnanNvbicsXG4gIH0pO1xuXG4gIGFqYXgxLmZhaWwoKGEsIGIsIGMpID0+IGNvbnNvbGUuZXJyb3IoYSwgYiwgYykpO1xuICBhamF4Mi5mYWlsKChhLCBiLCBjKSA9PiBjb25zb2xlLmVycm9yKGEsIGIsIGMpKTtcbiAgYWpheDMuZmFpbCgoYSwgYiwgYykgPT4gY29uc29sZS5lcnJvcihhLCBiLCBjKSk7XG4gIGFqYXg0LmZhaWwoKGEsIGIsIGMpID0+IGNvbnNvbGUuZXJyb3IoYSwgYiwgYykpO1xuXG4gIC8qXG4gICAgICBHbG9iYWwgc3RhdHNcbiAgKi9cbiAgYWpheDEuZG9uZShyZXMgPT4ge1xuICAgIGNvbnN0IHtkYXRhOiB7dG90YWwsIGRlYXRocywgcmVjb3ZlcmVkfSwgdHN9ID0gcmVzO1xuICAgIGNkRmV0Y2guZ2xvYmFsLnN0YXRzID0gcmVzLmRhdGE7XG5cbiAgICAvKlxuICAgICAgICBVcGRhdGUgZ2xvYmFsIHN0YXRzXG4gICAgKi9cbiAgICAkKCcjc3RhdHMtbGFzdC11cGRhdGUgc3BhbicpLnRleHQodXRpbHMuZm9ybWF0RGF0ZSh0cykpO1xuICAgICQoJyNzdGF0cy1jb25maXJtZWQtdG90YWwnKS50ZXh0KHV0aWxzLmNvbW1hcyh0b3RhbCkpO1xuICAgICQoJyNzdGF0cy1kZWF0aHMtdG90YWwnKS50ZXh0KHV0aWxzLmNvbW1hcyhkZWF0aHMpKTtcbiAgICAkKCcjc3RhdHMtcmVjb3YtdG90YWwnKS50ZXh0KHV0aWxzLmNvbW1hcyhyZWNvdmVyZWQpKTtcblxuICAgIC8qXG4gICAgICAgIENhbHVsYXRlIHJhdGVcbiAgICAqL1xuICAgIGNvbnN0IHJhdGUgPSB7XG4gICAgICBmYXRhbGl0eTogdXRpbHMucGVyY2VudChkZWF0aHMsIHRvdGFsKSxcbiAgICAgIHJlY292ZXJ5OiB1dGlscy5wZXJjZW50KHJlY292ZXJlZCwgdG90YWwpLFxuICAgIH07XG4gICAgJCgnI3N0YXRzLWZhdGFsaXR5LXJhdGUgc3BhbicpLnRleHQocmF0ZS5mYXRhbGl0eSk7XG4gICAgJCgnI3N0YXRzLXJlY292ZXJ5LXJhdGUgc3BhbicpLnRleHQocmF0ZS5yZWNvdmVyeSk7XG4gIH0pO1xuXG5cbiAgLypcbiAgICAgIEdsb2JhbCBjb3VudHJpZXNcbiAgKi9cbiAgYWpheDIuZG9uZShyZXMgPT4ge1xuICAgIGNvbnN0IHtkYXRhLCB0c30gPSByZXM7XG4gICAgY2RGZXRjaC5nbG9iYWwuY291bnRyaWVzID0gZGF0YTtcblxuICAgIC8qXG4gICAgICAgIEdsb2JhbCBjb3VudHJ5IGNvdW50XG4gICAgKi9cbiAgICBjb25zdCBjb3VudHJ5Q291bnQgPSBPYmplY3Qua2V5cyhkYXRhKS5sZW5ndGggLSAxOyAvLyAtMSBpcyBEaWFtb25kIFByaW5jZXNzXG4gICAgJCgnI3N0YXRzLWNvbmZpcm1lZC1jb3VudHJpZXMgc3BhbicpLnRleHQoY291bnRyeUNvdW50KTtcblxuICAgIC8qXG4gICAgICAgIFNvcnQgY291bnRyaWVzIGJ5IGNvbmZpcm1lZCwgZGVhdGhzLCBhbmQgcmVjb3ZlcmVkXG4gICAgICAgIChwdXQgdG90YWwgYXQgbGFzdCB0byBzYXZlIHRoYXQgc29ydGVkIGFycilcbiAgICAqL1xuICAgIGNvbnN0XG4gICAgICBzb3J0S2V5cyA9IFsnZGVhdGhzJywgJ3JlY292ZXJlZCcsICd0b3RhbCddLFxuICAgICAgY291bnRyeUtleXMgPSBPYmplY3Qua2V5cyhkYXRhKTtcblxuICAgIHNvcnRLZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGxldCBfa2V5ID0ga2V5O1xuICAgICAgaWYgKF9rZXkgPT09ICd0b3RhbCcpIF9rZXkgPSAnY29uZmlybWVkJzsgLy8gdG90YWwgLT4gY29uZmlybWVkXG5cbiAgICAgIC8vIHNvcnQgYmFzZWQgb24ga2V5IHZhbHVlIChkZWF0aHMvcmVjb3ZlcmVkL2NvbmZpcm1lZClcbiAgICAgIGNvdW50cnlLZXlzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgcmV0dXJuIGRhdGFbYV0ubmF0aW9ud2lkZVtfa2V5XSA8IGRhdGFbYl0ubmF0aW9ud2lkZVtfa2V5XSA/IDFcbiAgICAgICAgICA6IGRhdGFbYV0ubmF0aW9ud2lkZVtfa2V5XSA+IGRhdGFbYl0ubmF0aW9ud2lkZVtfa2V5XSA/IC0xIDogMDtcbiAgICAgIH0pO1xuXG4gICAgICAvKlxuICAgICAgICAgIFRvcCAxMCB0YWJsZSBmb3IgKGRlYXRoL3JlY292ZXJlZC9jb25maXJtZWQpXG4gICAgICAqL1xuICAgICAgY29uc3QgdG9wMTAgPSBjb3VudHJ5S2V5cy5zbGljZSgwLCAxMCksICR0b3AgPSAkKGAjc3RhdHMtdG9wLWNvdW50cmllcy0ke2tleX1gKTtcbiAgICAgICR0b3AuaHRtbCgnJyk7XG4gICAgICB0b3AxMC5mb3JFYWNoKGN0TmFtZSA9PiB7XG4gICAgICAgIGNvbnN0IGN0TndEYSA9IGRhdGFbY3ROYW1lXS5uYXRpb253aWRlOyAvLyBjb3VudHJ5IG5hdGlvbndpZGUgZGF0YVxuICAgICAgICBjb25zdCB2YWwgPSBjdE53RGFbX2tleV07XG5cbiAgICAgICAgLy8gaW5pdGlhbGl6ZSB3aXRoIHNwYWNlICh2cy4gZ2xvYmFsW2tleV0gJiBjb3VudHJ5LnRvdGFsKVxuICAgICAgICBjb25zdCBwZXJjID0ge2dsb2JhbDogJyZuYnNwOycsIGNvdW50cnk6ICcmbmJzcDsnfTtcblxuICAgICAgICAvLyBjb21wYXJlIGVhY2ggY291bnRyeSB0byBnbG9iYWxba2V5XSAmIGNvdW50cnkudG90YWwgZGF0YVxuICAgICAgICAvLyBsb2NhbCBjb21wYXJpc29uIGlzIG9ubHkgZm9yIGRlYXRocy9yZWNvdmVyZWRcbiAgICAgICAgaWYgKFsnZGVhdGhzJywgJ3JlY292ZXJlZCddLmluY2x1ZGVzKGtleSkpe1xuICAgICAgICAgIHBlcmMuZ2xvYmFsID0gdXRpbHMucGVyY2VudCh2YWwsIGNkRmV0Y2guZ2xvYmFsLnN0YXRzW2tleV0pKyclJztcbiAgICAgICAgICBwZXJjLmNvdW50cnkgPSB1dGlscy5wZXJjZW50KHZhbCwgY3ROd0RhLmNvbmZpcm1lZCkrJyUnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGZvciBhc3RoZXRpY3MgcHVycG9zZXMsIG1ha2UgY291bnRyeSdzIGNvbmZpcm1lZCAlIG9mIGdsb2JhbFxuICAgICAgICAgIC8vIGZsb2F0IHJpZ2h0IChwZXJjLmNvdW50cnkgZG9lcyB0aGF0KVxuICAgICAgICAgIHBlcmMuY291bnRyeSA9IHV0aWxzLnBlcmNlbnQodmFsLCBjZEZldGNoLmdsb2JhbC5zdGF0c1trZXldKSsnJSc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwcmVwYXJlICYgYXBwZW5kIHRlbXBsYXRlXG4gICAgICAgIGNvbnN0IHRlbXBsYXRlID0gJzxsaT4nK1xuICAgICAgICAgIGA8ZGl2IGNsYXNzPVwiaGVyby1mYy10b3AtbmFtZVwiPiR7Y3ROYW1lfTwvZGl2PmArXG4gICAgICAgICAgYDxkaXYgY2xhc3M9XCJoZXJvLWZjLXRvcC1udW0gbnVtXCI+JHt1dGlscy5jb21tYXModmFsKX08L2Rpdj5gK1xuICAgICAgICAgICc8ZGl2IGNsYXNzPVwiaGVyby1mYy10b3AtcmF0ZXNcIj4nK1xuICAgICAgICAgICAgYDxzcGFuIGNsYXNzPVwiZ2xvYlwiPiR7cGVyYy5nbG9iYWx9PC9zcGFuPmArXG4gICAgICAgICAgICBgPHNwYW4gY2xhc3M9XCJwZXJjXCI+JHtwZXJjLmNvdW50cnl9PC9zcGFuPmArXG4gICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICc8L2xpPic7XG4gICAgICAgICR0b3AuYXBwZW5kKHRlbXBsYXRlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLypcbiAgICAgICAgQWxsIGNvdW50cmllcyB0YWJsZVxuICAgICAgICAoc29ydGVkIGJ5IHRvdGFsICMgZGVzYylcbiAgICAqL1xuICAgIGNvbnN0ICRjb3VudHJpZXMgPSAkKCcjaGVyby1jb3VudHJpZXMtdGFibGUtYm9keScpO1xuICAgICQoJyNoZXJvLWNvdW50cmllcy1sb2FkaW5nJykuYWRkQ2xhc3MoJ2xvYWRlZCcpO1xuXG4gICAgLy8gYmxvYkN1dCA9IE1hdGguY2VpbCgoY3RTb3J0LnRvdGFsLmxlbmd0aCkgLyAyKSwgLy8gYWNjb3VudHMgZm9yIF9vdGhlcnNcbiAgICAvLyBuQmxvYnMgPSBbY3RTb3J0LnRvdGFsLnNsaWNlKDAsIGJsb2JDdXQpLCBjdFNvcnQudG90YWwuc2xpY2UoYmxvYkN1dCwgLTEpXSxcbiAgICAvLyBhbHRlcm5hdGUgYmxvYiBjb250ZW50XG4gICAgLy8gYWx0ZXJuYXRlZENOYW1lc18gPSBuQmxvYnMucmVkdWNlKCh0LCB1LCB2LCB3KSA9PiB1LnJlZHVjZSgoeCwgeSwgeikgPT4gKHhbeiAqIHcubGVuZ3RoICsgdl0gPSB5LCB4KSwgdCksIFtdKTtcblxuICAgICRjb3VudHJpZXMuaHRtbCgnJyk7XG4gICAgY291bnRyeUtleXMuZm9yRWFjaChjdE5hbWUgPT4ge1xuICAgICAgLy8gaWYgKGRhdGFbY3ROYW1lXSkgY29uc29sZS5sb2coZGF0YVtjdE5hbWVdLm5hdGlvbndpZGUpO1xuICAgICAgLy8gZWxzZSBjb25zb2xlLmxvZyhjdE5hbWUpO1xuICAgICAgY29uc3Qge2NvbmZpcm1lZCwgZGVhdGhzLCByZWNvdmVyZWR9ID0gZGF0YVtjdE5hbWVdLm5hdGlvbndpZGU7XG5cbiAgICAgIC8vIHByZXBhcmUgJiBhcHBlbmQgdGVtcGxhdGVcbiAgICAgIGNvbnN0IHRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJoZXJvLWNvdW50cnlcIj4nK1xuICAgICAgICBgPGRpdiBjbGFzcz1cImhlcm8tY291bnRyeS1uYW1lXCI+JHtjdE5hbWV9PC9kaXY+YCtcbiAgICAgICAgYDxkaXYgY2xhc3M9XCJoZXJvLWNvdW50cnktdmFsIHRvdGFsXCI+JHtjb25maXJtZWR9PC9kaXY+YCtcbiAgICAgICAgYDxkaXYgY2xhc3M9XCJoZXJvLWNvdW50cnktdmFsIGRlYXRoc1wiPiR7ZGVhdGhzfTwvZGl2PmArXG4gICAgICAgIGA8ZGl2IGNsYXNzPVwiaGVyby1jb3VudHJ5LXZhbCByZWNvdlwiPiR7cmVjb3ZlcmVkfTwvZGl2PmArXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiaGVyby1jb3VudHJ5LWR1bW15XCI+PC9kaXY+JysgLy8gZHVtbXlcbiAgICAgICc8L2Rpdj4nO1xuICAgICAgJGNvdW50cmllcy5hcHBlbmQodGVtcGxhdGUpO1xuICAgIH0pO1xuICB9KTtcblxuICAvKlxuICAgICAgTmV3c1xuICAqL1xuICBhamF4My5kb25lKGRhdGEgPT4ge1xuICAgICQoJyNoZXJvLW5ld3MtbGlzdCcpLmh0bWwoJycpO1xuICAgIGRhdGEuX19zb3J0ZWQuZm9yRWFjaCh0cyA9PiB7XG4gICAgICBjb25zdCBuZXdzID0gZGF0YVt0c107XG4gICAgICBjb25zdCB0ZW1wbGF0ZSA9ICc8bGk+JytcbiAgICAgICAgYDxkaXYgY2xhc3M9XCJwdWJkYXRlXCI+JHt1dGlscy5mb3JtYXREYXRlKG5ld3MucHViRGF0ZSl9PC9kaXY+YCtcbiAgICAgICAgYDxkaXYgY2xhc3M9XCJoZWFkbGluZVwiPiR7bmV3cy5odG1sfTwvZGl2PmArXG4gICAgICAnPC9saT4nO1xuICAgICAgJCgnI2hlcm8tbmV3cy1saXN0JykuYXBwZW5kKHRlbXBsYXRlKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgLypcbiAgICAgIFVTQSBjYXNlc1xuICAqL1xuICBhamF4NC5kb25lKGRhdGEgPT4ge1xuICAgIGxldCByZHRzID0gZGF0YS5yYXcuZGF0YTtcbiAgICByZHRzID0gT2JqZWN0LnZhbHVlcyhyZHRzKS5yZXZlcnNlKCkuc2xpY2UoMCwgNTApO1xuICAgICQoJyNoZXJvLWNhc2VzLWxpc3QnKS5odG1sKCcnKTtcbiAgICByZHRzLmZvckVhY2gocmR0ID0+IHtcbiAgICAgIGNvbnN0IFtubywgZGF0ZSwgY291bnR5LCBzdGF0ZSwgbG5nLCBsYXQsIGhlYWRsaW5lLCBzb3VyY2VdID0gcmR0O1xuICAgICAgY29uc3QgbG9jYXRpb24gPSBjb3VudHkrJywgJytzdGF0ZTtcbiAgICAgIGNvbnN0IHNyY05hbWUgPSBzb3VyY2UucmVwbGFjZSgvXnd3dy4vLCAnJyk7XG4gICAgICBjb25zdCB0ZW1wbGF0ZSA9ICc8bGk+JytcbiAgICAgICAgYDxkaXYgY2xhc3M9XCJwdWJkYXRlXCI+JHt1dGlscy5mb3JtYXREYXRlKGRhdGUsIGZhbHNlKX08L2Rpdj5gK1xuICAgICAgICBgPGRpdiBjbGFzcz1cImhlYWRsaW5lXCI+JHtoZWFkbGluZX08L2Rpdj5gK1xuICAgICAgICBgPGRpdiBjbGFzcz1cImxvY2F0aW9uXCI+JHtsb2NhdGlvbn08L2Rpdj5gK1xuICAgICAgICBgPGRpdiBjbGFzcz1cInNvdXJjZVwiPiAmbWRhc2g7IDxhIGhyZWY9XCIkeydodHRwczovLycrc291cmNlIHx8ICcuLyd9XCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXJcIj4ke3NyY05hbWV9PC9hPjwvZGl2PmArXG4gICAgICAnPC9saT4nO1xuICAgICAgJCgnI2hlcm8tY2FzZXMtbGlzdCcpLmFwcGVuZCh0ZW1wbGF0ZSk7XG4gICAgfSk7XG4gIH0pO1xufSkoalF1ZXJ5KTtcbiIsImltcG9ydCBtb250aHMgZnJvbSAnLi4vLi4vanNvbi9tb250aHMuanNvbic7XG5cbi8qXG4gICAgRm9ybWF0cyBkYXRlIHRvXG4gICAgICAnTW9udGgoc2hvcnQpIERhdGUsIFRpbWUnIG9yICdNb250aChsb25nKSBEYXRlJ1xuKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXREYXRlKHRpbWUsIGRpc3BsYXlUaW1lPXRydWUpe1xuICBjb25zdCBkT2JqID0gbmV3IERhdGUodGltZSksIG1vbnRoID0gZE9iai5nZXRNb250aCgpLCBkYXRlID0gZE9iai5nZXREYXRlKCk7XG5cbiAgLy8gbm8gdGltZVxuICBpZiAoIWRpc3BsYXlUaW1lKSByZXR1cm4gYCR7bW9udGhzLmxvbmdbbW9udGhdfSAke2RhdGV9YDtcblxuICBsZXQgaHJzID0gZE9iai5nZXRIb3VycygpLCBtaW5zID0gZE9iai5nZXRNaW51dGVzKCksIGFtcG0gPSBocnMgPj0gMTIgPyAncG0nIDogJ2FtJztcbiAgaHJzID0gaHJzICUgMTI7XG4gIGhycyA9IGhycyA/IGhycyA6IDEyOyAvLyB0aGUgaG91ciAnMCcgc2hvdWxkIGJlICcxMidcbiAgbWlucyA9IG1pbnMgPCAxMCA/ICcwJyttaW5zIDogbWlucztcbiAgY29uc3Qgc3RyVGltZSA9IGAke2hyc306JHttaW5zfSAke2FtcG19YDtcbiAgcmV0dXJuIGAke21vbnRocy5zaG9ydFttb250aF19ICR7ZGF0ZX0sICR7c3RyVGltZX1gO1xufTtcblxuLypcbiAgICBJbnNlcnRzIGNvbW1hcyBpbnRvIG51bWJlcnNcbiAgICBpbnB1dDogMTIzNDU2IChudW0pXG4gICAgb3V0cHV0OiAxMjMsNDU2IChzdHIpXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbW1hcyhuKXtcbiAgcmV0dXJuIG4udG9TdHJpbmcoKS5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCAnLCcpO1xufVxuXG4vKlxuICAgIEV2YWx1YXRlIHBlcmNlbnRhZ2UgZnJvbSB0d28gbnVtYmVyc1xuICAgIGlucHV0OiBudW1lcmF0b3IsIGRlbm9taW5hdG9yXG4gICAgb3V0cHV0OiBudW1lcmF0b3IvZGVub21pbmF0b3IgJVxuKi9cbmV4cG9ydCBmdW5jdGlvbiBwZXJjZW50KG51bWUsIGRlbm8sIGZpeGVkPTIpe1xuICBsZXQgcGVyYztcbiAgaWYgKHR5cGVvZiBudW0gIT09ICdudW1iZXInIHx8IHR5cGVvZiBkZW5vICE9PSAnbnVtYmVyJykgcGVyYyA9IE51bWJlcihudW1lKS9OdW1iZXIoZGVubykqMTAwO1xuICBlbHNlIHBlcmMgPSBudW1lL2Rlbm8qMTAwO1xuXG4gIHJldHVybiBpc0Zpbml0ZShwZXJjKSA/IHBlcmMudG9GaXhlZChmaXhlZCkgOiB1bmRlZmluZWQ7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9