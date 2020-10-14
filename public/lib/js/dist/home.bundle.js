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

/***/ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/arrayWithHoles.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/nonIterableRest.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableRest;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/slicedToArray.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles */ "./node_modules/@babel/runtime/helpers/arrayWithHoles.js");

var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit */ "./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js");

var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray */ "./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js");

var nonIterableRest = __webpack_require__(/*! ./nonIterableRest */ "./node_modules/@babel/runtime/helpers/nonIterableRest.js");

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray */ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;

/***/ }),

/***/ "./public/lib/js/custom/home.js":
/*!**************************************!*\
  !*** ./public/lib/js/custom/home.js ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./public/lib/js/utils/index.js");
/* harmony import */ var _json_countries_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../json/countries.json */ "./public/lib/json/countries.json");
var _json_countries_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../json/countries.json */ "./public/lib/json/countries.json", 1);



var apiBase = "http://localhost:8012/" + 'api/',
    apiBaseNews = "http://localhost:8013/" + 'api/',
    apiBaseGlobal = "http://localhost:8015/" + 'api/',
    apiBaseUSA = "http://localhost:8014/" + 'api/',
    apiBaseLocal = "http://localhost:8016/" + 'api/';


var countriesJSON_ = Object.keys(_json_countries_json__WEBPACK_IMPORTED_MODULE_2__);
var cdFetch = {
  global: {},
  usa: {}
}; // core data fetch

function geolocSuccess(pos) {
  var lat = pos.coords.latitude,
      _long = pos.coords.longitude;
  $('#you-search-lat val').html(lat);
  $('#you-search-long val').html(_long);
  console.log(pos.coords);
  var ajax1 = $.ajax({
    method: 'GET',
    url: apiBase + 'my/geoDistances',
    data: {
      lat: lat,
      "long": _long
    },
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
      _long2 = data.lng,
      info = data.info,
      cases = data.cases;
  if (!lat && !_long2) $('#you-search-invalid').addClass('show');else $('#you-search-invalid').removeClass('show');
  $('#you-search-lat val').text(lat);
  $('#you-search-long val').text(_long2); // $('#you-search-name val').text(info.locality+', '+info.state);

  var county = info.county,
      state = info.state; // console.log(cases);
  // fix names

  $('#geoloc-county-name').text(county);
  $('#geoloc-state-name span').text(state); // county

  $('#geoloc-county .confirmed .num').text(cases.county.confirmed);
  $('#geoloc-county .deaths .num').text(cases.county.deaths); // state

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
    data: {
      address: val
    },
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
  $('#you-search-btn').on('click', addrSearch); // off for now, support only address

  $('#you-search-lat val').html('search...');
  $('#you-search-long val').html('search...'); // if (!navigator.geolocation){
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
    var total = res.total,
        deaths = res.deaths,
        recovered = res.recovered;
    cdFetch.global.stats = res;
    /*
        Update global stats
    */
    // use ts from total

    $('#stats-last-update span').text(_utils__WEBPACK_IMPORTED_MODULE_1__["formatDate"](total.ts));
    $('#stats-confirmed-total').text(_utils__WEBPACK_IMPORTED_MODULE_1__["commas"](total.val));
    $('#stats-deaths-total').text(_utils__WEBPACK_IMPORTED_MODULE_1__["commas"](deaths.val));
    $('#stats-recov-total').text(_utils__WEBPACK_IMPORTED_MODULE_1__["commas"](recovered.val));
    /*
        Calulate rate
    */

    var rate = {
      fatality: _utils__WEBPACK_IMPORTED_MODULE_1__["percent"](deaths, total.val),
      recovery: _utils__WEBPACK_IMPORTED_MODULE_1__["percent"](recovered, total.val)
    };
    $('#stats-fatality-rate span').text(rate.fatality);
    $('#stats-recovery-rate span').text(rate.recovery);
  });
  /*
      Global countries
  */

  ajax2.done(function (res) {
    var data = res.countries;
    cdFetch.global.countries = res.countries;
    /*
        Global country count
    */

    var countryCount = Object.keys(data).length - 1; // -1 is Diamond Princess

    $('#stats-confirmed-countries span').text(countryCount);
    /*
        Sort countries by confirmed, deaths, and recovered
        (put total at last to save that sorted arr)
    */

    var sortKeys = ['deaths', 'recovered', 'total'];
    sortKeys.forEach(function (key) {
      var _key = key;
      if (_key === 'total') _key = 'confirmed'; // total -> confirmed
      // sort based on key value (deaths/recovered/confirmed)

      data.sort(function (a, b) {
        return a[_key] < b[_key] ? 1 : a[_key] > b[_key] ? -1 : 0;
      });
      /*
          Top 10 table for (death/recovered/confirmed)
      */

      var top10 = data.slice(0, 10),
          $top = $("#stats-top-countries-".concat(key));
      $top.html('');
      top10.forEach(function (ctData) {
        var ctName = ctData.country,
            val = ctData[_key]; // initialize with space (vs. global[key] & country.total)

        var perc = {
          global: '&nbsp;',
          country: '&nbsp;'
        }; // compare each country to global[key] & country.total data
        // local comparison is only for deaths/recovered

        if (['deaths', 'recovered'].includes(key)) {
          perc.global = _utils__WEBPACK_IMPORTED_MODULE_1__["percent"](val, cdFetch.global.stats[key].val) + '%';
          perc.country = _utils__WEBPACK_IMPORTED_MODULE_1__["percent"](val, ctData.confirmed) + '%';
        } else {
          // for asthetics purposes, make country's confirmed % of global
          // float right (perc.country does that)
          perc.country = _utils__WEBPACK_IMPORTED_MODULE_1__["percent"](val, cdFetch.global.stats[key].val) + '%';
        } // prepare & append template


        var template = '<li>' + "<div class=\"hero-fc-top-name\">".concat(ctName, "</div>") + "<div class=\"hero-fc-top-num num\">".concat(_utils__WEBPACK_IMPORTED_MODULE_1__["commas"](val), "</div>") + '<div class="hero-fc-top-rates">' + "<span class=\"glob\">".concat(perc.global, "</span>") + "<span class=\"perc\">".concat(perc.country, "</span>") + '</div>' + '</li>';
        $top.append(template);
      });
    });
    /*
        All countries table
        (sorted by total # desc)
    */

    var $countries = $('#hero-countries-table-body');
    $('#hero-countries-loading').addClass('loaded'); // blobCut = Math.ceil((ctSort.total.length) / 2), // accounts for _others
    // nBlobs = [ctSort.total.slice(0, blobCut), ctSort.total.slice(blobCut, -1)],
    // alternate blob content
    // alternatedCNames_ = nBlobs.reduce((t, u, v, w) => u.reduce((x, y, z) => (x[z * w.length + v] = y, x), t), []);

    $countries.html('');
    data.forEach(function (ctData) {
      // if (data[ctName]) console.log(data[ctName].nationwide);
      // else console.log(ctName);
      var ctName = ctData.country,
          confirmed = ctData.confirmed,
          deaths = ctData.deaths,
          recovered = ctData.recovered; // prepare & append template

      var template = '<div class="hero-country">' + "<div class=\"hero-country-name\">".concat(ctName, "</div>") + "<div class=\"hero-country-val total\">".concat(confirmed, "</div>") + "<div class=\"hero-country-val deaths\">".concat(deaths, "</div>") + "<div class=\"hero-country-val recov\">".concat(recovered, "</div>") + '<div class="hero-country-dummy"></div>' + // dummy
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
      var template = '<li>' + "<div class=\"pubdate\">".concat(_utils__WEBPACK_IMPORTED_MODULE_1__["formatDate"](news.pubDate), "</div>") + "<div class=\"headline\">".concat(news.html, "</div>") + '</li>';
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
      var _rdt = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(rdt, 8),
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
      var template = '<li>' + "<div class=\"pubdate\">".concat(_utils__WEBPACK_IMPORTED_MODULE_1__["formatDate"](date, false), "</div>") + "<div class=\"headline\">".concat(headline, "</div>") + "<div class=\"location\">".concat(location, "</div>") + "<div class=\"source\"> &mdash; <a href=\"".concat('https://' + source || false, "\" target=\"_blank\" rel=\"noopener\">").concat(srcName, "</a></div>") + '</li>';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXJyYXlMaWtlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hcnJheVdpdGhIb2xlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9ub25JdGVyYWJsZVJlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvc2xpY2VkVG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvbGliL2pzL2N1c3RvbS9ob21lLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9saWIvanMvdXRpbHMvaW5kZXguanMiXSwibmFtZXMiOlsiYXBpQmFzZSIsInByb2Nlc3MiLCJhcGlCYXNlTmV3cyIsImFwaUJhc2VHbG9iYWwiLCJhcGlCYXNlVVNBIiwiYXBpQmFzZUxvY2FsIiwiY291bnRyaWVzSlNPTl8iLCJPYmplY3QiLCJrZXlzIiwiY291bnRyaWVzSlNPTiIsImNkRmV0Y2giLCJnbG9iYWwiLCJ1c2EiLCJnZW9sb2NTdWNjZXNzIiwicG9zIiwibGF0IiwiY29vcmRzIiwibGF0aXR1ZGUiLCJsb25nIiwibG9uZ2l0dWRlIiwiJCIsImh0bWwiLCJjb25zb2xlIiwibG9nIiwiYWpheDEiLCJhamF4IiwibWV0aG9kIiwidXJsIiwiZGF0YSIsImRhdGFUeXBlIiwiZG9uZSIsImxvYWRHZW9kYXRhIiwiZ2VvbG9jRXJyb3IiLCJsbmciLCJpbmZvIiwiY2FzZXMiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwidGV4dCIsImNvdW50eSIsInN0YXRlIiwiY29uZmlybWVkIiwiZGVhdGhzIiwiYWRkclNlYXJjaGluZyIsImFkZHJTZWFyY2giLCJ2YWwiLCJhZGRyZXNzIiwiZmFpbCIsImEiLCJiIiwiYyIsImVycm9yIiwia2V5ZG93biIsImUiLCJrZXlDb2RlIiwib24iLCJhamF4MiIsImFqYXgzIiwiYWpheDQiLCJyZXMiLCJ0b3RhbCIsInJlY292ZXJlZCIsInN0YXRzIiwidXRpbHMiLCJ0cyIsInJhdGUiLCJmYXRhbGl0eSIsInJlY292ZXJ5IiwiY291bnRyaWVzIiwiY291bnRyeUNvdW50IiwibGVuZ3RoIiwic29ydEtleXMiLCJmb3JFYWNoIiwia2V5IiwiX2tleSIsInNvcnQiLCJ0b3AxMCIsInNsaWNlIiwiJHRvcCIsImN0RGF0YSIsImN0TmFtZSIsImNvdW50cnkiLCJwZXJjIiwiaW5jbHVkZXMiLCJ0ZW1wbGF0ZSIsImFwcGVuZCIsIiRjb3VudHJpZXMiLCJfX3NvcnRlZCIsIm5ld3MiLCJwdWJEYXRlIiwicmR0cyIsInJhdyIsInZhbHVlcyIsInJldmVyc2UiLCJyZHQiLCJubyIsImRhdGUiLCJoZWFkbGluZSIsInNvdXJjZSIsImxvY2F0aW9uIiwic3JjTmFtZSIsInJlcGxhY2UiLCJqUXVlcnkiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FB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QUV6RDtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0EscUJBQXFCLElBQUksR0FBRyxLQUFLLEdBQUcsS0FBSztBQUN6QyxZQUFZLDhDQUFNLGNBQWMsR0FBRyxLQUFLLElBQUksUUFBUTtBQUNwRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUCx3Q0FBd0MsRUFBRTtBQUMxQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSIsImZpbGUiOiJob21lLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vcHVibGljL2xpYi9qcy9jdXN0b20vaG9tZS5qc1wiKTtcbiIsImZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7XG4gIGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoO1xuXG4gIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykge1xuICAgIGFycjJbaV0gPSBhcnJbaV07XG4gIH1cblxuICByZXR1cm4gYXJyMjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlMaWtlVG9BcnJheTsiLCJmdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2FycmF5V2l0aEhvbGVzOyIsImZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHtcbiAgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwidW5kZWZpbmVkXCIgfHwgIShTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpKSByZXR1cm47XG4gIHZhciBfYXJyID0gW107XG4gIHZhciBfbiA9IHRydWU7XG4gIHZhciBfZCA9IGZhbHNlO1xuICB2YXIgX2UgPSB1bmRlZmluZWQ7XG5cbiAgdHJ5IHtcbiAgICBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7XG4gICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBfZCA9IHRydWU7XG4gICAgX2UgPSBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gX2Fycjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaXRlcmFibGVUb0FycmF5TGltaXQ7IiwiZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfbm9uSXRlcmFibGVSZXN0OyIsInZhciBhcnJheVdpdGhIb2xlcyA9IHJlcXVpcmUoXCIuL2FycmF5V2l0aEhvbGVzXCIpO1xuXG52YXIgaXRlcmFibGVUb0FycmF5TGltaXQgPSByZXF1aXJlKFwiLi9pdGVyYWJsZVRvQXJyYXlMaW1pdFwiKTtcblxudmFyIHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5ID0gcmVxdWlyZShcIi4vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXlcIik7XG5cbnZhciBub25JdGVyYWJsZVJlc3QgPSByZXF1aXJlKFwiLi9ub25JdGVyYWJsZVJlc3RcIik7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkge1xuICByZXR1cm4gYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgbm9uSXRlcmFibGVSZXN0KCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3NsaWNlZFRvQXJyYXk7IiwidmFyIGFycmF5TGlrZVRvQXJyYXkgPSByZXF1aXJlKFwiLi9hcnJheUxpa2VUb0FycmF5XCIpO1xuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7XG4gIGlmICghbykgcmV0dXJuO1xuICBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG4gIHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcbiAgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTtcbiAgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obik7XG4gIGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheTsiLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0XG4gIGFwaUJhc2UgPSBwcm9jZXNzLmVudi5BUElfVVJMKydhcGkvJyxcbiAgYXBpQmFzZU5ld3MgPSBwcm9jZXNzLmVudi5BUElfVVJMX05FV1MrJ2FwaS8nLFxuICBhcGlCYXNlR2xvYmFsID0gcHJvY2Vzcy5lbnYuQVBJX1VSTF9HTE9CQUwrJ2FwaS8nLFxuICBhcGlCYXNlVVNBID0gcHJvY2Vzcy5lbnYuQVBJX1VSTF9VU0ErJ2FwaS8nLFxuICBhcGlCYXNlTG9jYWwgPSBwcm9jZXNzLmVudi5BUElfVVJMX0xPQ0FMKydhcGkvJztcblxuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IGNvdW50cmllc0pTT04gZnJvbSAnLi4vLi4vanNvbi9jb3VudHJpZXMuanNvbic7XG5cbmNvbnN0IGNvdW50cmllc0pTT05fID0gT2JqZWN0LmtleXMoY291bnRyaWVzSlNPTik7XG5cbmNvbnN0IGNkRmV0Y2ggPSB7XG4gIGdsb2JhbDoge30sXG4gIHVzYToge30sXG59OyAvLyBjb3JlIGRhdGEgZmV0Y2hcblxuZnVuY3Rpb24gZ2VvbG9jU3VjY2Vzcyhwb3Mpe1xuICBjb25zdCBsYXQgPSBwb3MuY29vcmRzLmxhdGl0dWRlLCBsb25nID0gcG9zLmNvb3Jkcy5sb25naXR1ZGU7XG4gICQoJyN5b3Utc2VhcmNoLWxhdCB2YWwnKS5odG1sKGxhdCk7XG4gICQoJyN5b3Utc2VhcmNoLWxvbmcgdmFsJykuaHRtbChsb25nKTtcbiAgY29uc29sZS5sb2cocG9zLmNvb3Jkcyk7XG4gIGNvbnN0IGFqYXgxID0gJC5hamF4KHtcbiAgICBtZXRob2Q6ICdHRVQnLFxuICAgIHVybDogYXBpQmFzZSsnbXkvZ2VvRGlzdGFuY2VzJyxcbiAgICBkYXRhOiB7bGF0LCBsb25nfSxcbiAgICBkYXRhVHlwZTogJ2pzb24nLFxuICB9KTtcbiAgYWpheDEuZG9uZShkYXRhID0+IHtcbiAgICBjb25zb2xlLmxvZygnYXV0byBnZW9sb2MnLCBkYXRhKTtcbiAgICBsb2FkR2VvZGF0YShkYXRhKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdlb2xvY0Vycm9yKCl7XG4gICQoJyN5b3Utc2VhcmNoLWxhdCB2YWwnKS5odG1sKCdsb2NhdGluZyBmYWlsZWQuLi4nKTtcbiAgJCgnI3lvdS1zZWFyY2gtbG9uZyB2YWwnKS5odG1sKCdsb2NhdGluZyBmYWlsZWQuLi4nKTtcbn1cblxuZnVuY3Rpb24gbG9hZEdlb2RhdGEoZGF0YSl7XG4gIGNvbnN0IHtsYXQsIGxuZzogbG9uZywgaW5mbywgY2FzZXN9ID0gZGF0YTtcbiAgaWYgKCFsYXQgJiYgIWxvbmcpICQoJyN5b3Utc2VhcmNoLWludmFsaWQnKS5hZGRDbGFzcygnc2hvdycpO1xuICBlbHNlICQoJyN5b3Utc2VhcmNoLWludmFsaWQnKS5yZW1vdmVDbGFzcygnc2hvdycpO1xuICAkKCcjeW91LXNlYXJjaC1sYXQgdmFsJykudGV4dChsYXQpO1xuICAkKCcjeW91LXNlYXJjaC1sb25nIHZhbCcpLnRleHQobG9uZyk7XG4gIC8vICQoJyN5b3Utc2VhcmNoLW5hbWUgdmFsJykudGV4dChpbmZvLmxvY2FsaXR5KycsICcraW5mby5zdGF0ZSk7XG5cbiAgY29uc3Qge2NvdW50eSwgc3RhdGV9ID0gaW5mbztcbiAgLy8gY29uc29sZS5sb2coY2FzZXMpO1xuICAvLyBmaXggbmFtZXNcbiAgJCgnI2dlb2xvYy1jb3VudHktbmFtZScpLnRleHQoY291bnR5KTtcbiAgJCgnI2dlb2xvYy1zdGF0ZS1uYW1lIHNwYW4nKS50ZXh0KHN0YXRlKTtcbiAgLy8gY291bnR5XG4gICQoJyNnZW9sb2MtY291bnR5IC5jb25maXJtZWQgLm51bScpLnRleHQoY2FzZXMuY291bnR5LmNvbmZpcm1lZCk7XG4gICQoJyNnZW9sb2MtY291bnR5IC5kZWF0aHMgLm51bScpLnRleHQoY2FzZXMuY291bnR5LmRlYXRocyk7XG4gIC8vIHN0YXRlXG4gICQoJyNnZW9sb2Mtc3RhdGUgLmNvbmZpcm1lZCAubnVtJykudGV4dChjYXNlcy5zdGF0ZS5jb25maXJtZWQpO1xuICAkKCcjZ2VvbG9jLXN0YXRlIC5kZWF0aHMgLm51bScpLnRleHQoY2FzZXMuc3RhdGUuZGVhdGhzKTtcbn1cblxubGV0IGFkZHJTZWFyY2hpbmcgPSBmYWxzZTtcbmZ1bmN0aW9uIGFkZHJTZWFyY2goKXtcbiAgaWYgKGFkZHJTZWFyY2hpbmcpIHJldHVybiBmYWxzZTtcbiAgYWRkclNlYXJjaGluZyA9IHRydWU7XG4gIGNvbnN0IHZhbCA9ICQoJyN5b3Utc2VhcmNoLWJhcicpLnZhbCgpO1xuICAkKCcjeW91LXNlYXJjaC1idG4nKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcbiAgJCgnI3lvdS1zZWFyY2gtaW52YWxpZCcpLnJlbW92ZUNsYXNzKCdzaG93Jyk7XG4gICQoJyN5b3Utc2VhcmNoLWxhdCB2YWwnKS5odG1sKCdsb2NhdGluZy4uLicpO1xuICAkKCcjeW91LXNlYXJjaC1sb25nIHZhbCcpLmh0bWwoJ2xvY2F0aW5nLi4uJyk7XG5cbiAgY29uc3QgYWpheDEgPSAkLmFqYXgoe1xuICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgdXJsOiBhcGlCYXNlTG9jYWwrJ3YxL2xvY2FsL2ZpbmRlcicsXG4gICAgZGF0YToge2FkZHJlc3M6IHZhbH0sXG4gICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgfSk7XG4gIGFqYXgxLmRvbmUoZGF0YSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coZGF0YSk7XG4gICAgYWRkclNlYXJjaGluZyA9IGZhbHNlO1xuICAgICQoJyN5b3Utc2VhcmNoLWJ0bicpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xuICAgIGxvYWRHZW9kYXRhKGRhdGEpO1xuICB9KTtcbiAgYWpheDEuZmFpbCgoYSwgYiwgYykgPT4gY29uc29sZS5lcnJvcihhLCBiLCBjKSk7XG59XG5cbihmdW5jdGlvbigkKXtcblxuXG4gIC8qXG4gICAgICBBZGRyZXNzIGNhc2VzIGxvb2sgdXBcbiAgICAgICMxOiBwcmVzcyAnZW50ZXInIGtleSBpbiB0aGUgc2VhcmNoIGJhclxuICAgICAgIzI6IHByZXNzIHRoZSAnc2VhcmNoJyBidXR0b25cbiAgKi9cbiAgJCgnI3lvdS1zZWFyY2gtYmFyJykua2V5ZG93bihlID0+IHtcbiAgICBpZiAoZS5rZXlDb2RlID09IDEzKSBhZGRyU2VhcmNoKCk7XG4gIH0pO1xuXG4gICQoJyN5b3Utc2VhcmNoLWJ0bicpLm9uKCdjbGljaycsIGFkZHJTZWFyY2gpO1xuXG4gIC8vIG9mZiBmb3Igbm93LCBzdXBwb3J0IG9ubHkgYWRkcmVzc1xuICAkKCcjeW91LXNlYXJjaC1sYXQgdmFsJykuaHRtbCgnc2VhcmNoLi4uJyk7XG4gICQoJyN5b3Utc2VhcmNoLWxvbmcgdmFsJykuaHRtbCgnc2VhcmNoLi4uJyk7XG4gIC8vIGlmICghbmF2aWdhdG9yLmdlb2xvY2F0aW9uKXtcbiAgLy8gICBjb25zb2xlLmxvZygnR2VvbG9jYXRpb24gaXMgbm90IHN1cHBvcnRlZCBieSB5b3VyIGJyb3dzZXInKTtcbiAgLy8gICAkKCcjeW91LXNlYXJjaC1sYXQgdmFsJykuaHRtbCgnbm90IHN1cHBvcnRlZCcpO1xuICAvLyAgICQoJyN5b3Utc2VhcmNoLWxvbmcgdmFsJykuaHRtbCgnbm90IHN1cHBvcnRlZCcpO1xuICAvLyB9IGVsc2Uge1xuICAvLyAgICQoJyN5b3Utc2VhcmNoLWxhdCB2YWwnKS5odG1sKCdsb2NhdGluZy4uLicpO1xuICAvLyAgICQoJyN5b3Utc2VhcmNoLWxvbmcgdmFsJykuaHRtbCgnbG9jYXRpbmcuLi4nKTtcbiAgLy8gICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKGdlb2xvY1N1Y2Nlc3MsIGdlb2xvY0Vycm9yKTtcbiAgLy8gfVxuXG4gIGNvbnN0IGFqYXgxID0gJC5hamF4KHtcbiAgICBtZXRob2Q6ICdHRVQnLFxuICAgIHVybDogYXBpQmFzZUdsb2JhbCsndjEvZ2xvYmFsL3N0YXRzJyxcbiAgICBkYXRhVHlwZTogJ2pzb24nLFxuICB9KTtcblxuICBjb25zdCBhamF4MiA9ICQuYWpheCh7XG4gICAgbWV0aG9kOiAnR0VUJyxcbiAgICB1cmw6IGFwaUJhc2VHbG9iYWwrJ3YxL2dsb2JhbC9jb3VudHJpZXMnLFxuICAgIGRhdGFUeXBlOiAnanNvbicsXG4gIH0pO1xuXG4gIGNvbnN0IGFqYXgzID0gJC5hamF4KHtcbiAgICBtZXRob2Q6ICdHRVQnLFxuICAgIHVybDogYXBpQmFzZU5ld3MrJ3YxL25ld3MvdXNhJyxcbiAgICBkYXRhVHlwZTogJ2pzb24nLFxuICB9KTtcblxuICBjb25zdCBhamF4NCA9ICQuYWpheCh7XG4gICAgbWV0aG9kOiAnR0VUJyxcbiAgICB1cmw6IGFwaUJhc2VVU0ErJ3YxL3VzYS9jYXNlcycsXG4gICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgfSk7XG5cbiAgYWpheDEuZmFpbCgoYSwgYiwgYykgPT4gY29uc29sZS5lcnJvcihhLCBiLCBjKSk7XG4gIGFqYXgyLmZhaWwoKGEsIGIsIGMpID0+IGNvbnNvbGUuZXJyb3IoYSwgYiwgYykpO1xuICBhamF4My5mYWlsKChhLCBiLCBjKSA9PiBjb25zb2xlLmVycm9yKGEsIGIsIGMpKTtcbiAgYWpheDQuZmFpbCgoYSwgYiwgYykgPT4gY29uc29sZS5lcnJvcihhLCBiLCBjKSk7XG5cbiAgLypcbiAgICAgIEdsb2JhbCBzdGF0c1xuICAqL1xuICBhamF4MS5kb25lKHJlcyA9PiB7XG4gICAgY29uc3Qge3RvdGFsLCBkZWF0aHMsIHJlY292ZXJlZH0gPSByZXM7XG4gICAgY2RGZXRjaC5nbG9iYWwuc3RhdHMgPSByZXM7XG5cbiAgICAvKlxuICAgICAgICBVcGRhdGUgZ2xvYmFsIHN0YXRzXG4gICAgKi9cbiAgICAvLyB1c2UgdHMgZnJvbSB0b3RhbFxuICAgICQoJyNzdGF0cy1sYXN0LXVwZGF0ZSBzcGFuJykudGV4dCh1dGlscy5mb3JtYXREYXRlKHRvdGFsLnRzKSk7XG4gICAgJCgnI3N0YXRzLWNvbmZpcm1lZC10b3RhbCcpLnRleHQodXRpbHMuY29tbWFzKHRvdGFsLnZhbCkpO1xuICAgICQoJyNzdGF0cy1kZWF0aHMtdG90YWwnKS50ZXh0KHV0aWxzLmNvbW1hcyhkZWF0aHMudmFsKSk7XG4gICAgJCgnI3N0YXRzLXJlY292LXRvdGFsJykudGV4dCh1dGlscy5jb21tYXMocmVjb3ZlcmVkLnZhbCkpO1xuXG4gICAgLypcbiAgICAgICAgQ2FsdWxhdGUgcmF0ZVxuICAgICovXG4gICAgY29uc3QgcmF0ZSA9IHtcbiAgICAgIGZhdGFsaXR5OiB1dGlscy5wZXJjZW50KGRlYXRocywgdG90YWwudmFsKSxcbiAgICAgIHJlY292ZXJ5OiB1dGlscy5wZXJjZW50KHJlY292ZXJlZCwgdG90YWwudmFsKSxcbiAgICB9O1xuICAgICQoJyNzdGF0cy1mYXRhbGl0eS1yYXRlIHNwYW4nKS50ZXh0KHJhdGUuZmF0YWxpdHkpO1xuICAgICQoJyNzdGF0cy1yZWNvdmVyeS1yYXRlIHNwYW4nKS50ZXh0KHJhdGUucmVjb3ZlcnkpO1xuICB9KTtcblxuXG4gIC8qXG4gICAgICBHbG9iYWwgY291bnRyaWVzXG4gICovXG4gIGFqYXgyLmRvbmUocmVzID0+IHtcbiAgICBjb25zdCBkYXRhID0gcmVzLmNvdW50cmllcztcbiAgICBjZEZldGNoLmdsb2JhbC5jb3VudHJpZXMgPSByZXMuY291bnRyaWVzO1xuXG4gICAgLypcbiAgICAgICAgR2xvYmFsIGNvdW50cnkgY291bnRcbiAgICAqL1xuICAgIGNvbnN0IGNvdW50cnlDb3VudCA9IE9iamVjdC5rZXlzKGRhdGEpLmxlbmd0aCAtIDE7IC8vIC0xIGlzIERpYW1vbmQgUHJpbmNlc3NcbiAgICAkKCcjc3RhdHMtY29uZmlybWVkLWNvdW50cmllcyBzcGFuJykudGV4dChjb3VudHJ5Q291bnQpO1xuXG4gICAgLypcbiAgICAgICAgU29ydCBjb3VudHJpZXMgYnkgY29uZmlybWVkLCBkZWF0aHMsIGFuZCByZWNvdmVyZWRcbiAgICAgICAgKHB1dCB0b3RhbCBhdCBsYXN0IHRvIHNhdmUgdGhhdCBzb3J0ZWQgYXJyKVxuICAgICovXG4gICAgY29uc3Qgc29ydEtleXMgPSBbJ2RlYXRocycsICdyZWNvdmVyZWQnLCAndG90YWwnXTtcblxuICAgIHNvcnRLZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGxldCBfa2V5ID0ga2V5O1xuICAgICAgaWYgKF9rZXkgPT09ICd0b3RhbCcpIF9rZXkgPSAnY29uZmlybWVkJzsgLy8gdG90YWwgLT4gY29uZmlybWVkXG5cbiAgICAgIC8vIHNvcnQgYmFzZWQgb24ga2V5IHZhbHVlIChkZWF0aHMvcmVjb3ZlcmVkL2NvbmZpcm1lZClcbiAgICAgIGRhdGEuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICByZXR1cm4gYVtfa2V5XSA8IGJbX2tleV0gPyAxIDogYVtfa2V5XSA+IGJbX2tleV0gPyAtMSA6IDA7XG4gICAgICB9KTtcblxuICAgICAgLypcbiAgICAgICAgICBUb3AgMTAgdGFibGUgZm9yIChkZWF0aC9yZWNvdmVyZWQvY29uZmlybWVkKVxuICAgICAgKi9cbiAgICAgIGNvbnN0IHRvcDEwID0gZGF0YS5zbGljZSgwLCAxMCksICR0b3AgPSAkKGAjc3RhdHMtdG9wLWNvdW50cmllcy0ke2tleX1gKTtcbiAgICAgICR0b3AuaHRtbCgnJyk7XG4gICAgICB0b3AxMC5mb3JFYWNoKGN0RGF0YSA9PiB7XG4gICAgICAgIGNvbnN0IHtjb3VudHJ5OiBjdE5hbWV9ID0gY3REYXRhLCB2YWwgPSBjdERhdGFbX2tleV07XG5cbiAgICAgICAgLy8gaW5pdGlhbGl6ZSB3aXRoIHNwYWNlICh2cy4gZ2xvYmFsW2tleV0gJiBjb3VudHJ5LnRvdGFsKVxuICAgICAgICBjb25zdCBwZXJjID0ge2dsb2JhbDogJyZuYnNwOycsIGNvdW50cnk6ICcmbmJzcDsnfTtcblxuICAgICAgICAvLyBjb21wYXJlIGVhY2ggY291bnRyeSB0byBnbG9iYWxba2V5XSAmIGNvdW50cnkudG90YWwgZGF0YVxuICAgICAgICAvLyBsb2NhbCBjb21wYXJpc29uIGlzIG9ubHkgZm9yIGRlYXRocy9yZWNvdmVyZWRcbiAgICAgICAgaWYgKFsnZGVhdGhzJywgJ3JlY292ZXJlZCddLmluY2x1ZGVzKGtleSkpe1xuICAgICAgICAgIHBlcmMuZ2xvYmFsID0gdXRpbHMucGVyY2VudCh2YWwsIGNkRmV0Y2guZ2xvYmFsLnN0YXRzW2tleV0udmFsKSsnJSc7XG4gICAgICAgICAgcGVyYy5jb3VudHJ5ID0gdXRpbHMucGVyY2VudCh2YWwsIGN0RGF0YS5jb25maXJtZWQpKyclJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBmb3IgYXN0aGV0aWNzIHB1cnBvc2VzLCBtYWtlIGNvdW50cnkncyBjb25maXJtZWQgJSBvZiBnbG9iYWxcbiAgICAgICAgICAvLyBmbG9hdCByaWdodCAocGVyYy5jb3VudHJ5IGRvZXMgdGhhdClcbiAgICAgICAgICBwZXJjLmNvdW50cnkgPSB1dGlscy5wZXJjZW50KHZhbCwgY2RGZXRjaC5nbG9iYWwuc3RhdHNba2V5XS52YWwpKyclJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHByZXBhcmUgJiBhcHBlbmQgdGVtcGxhdGVcbiAgICAgICAgY29uc3QgdGVtcGxhdGUgPSAnPGxpPicrXG4gICAgICAgICAgYDxkaXYgY2xhc3M9XCJoZXJvLWZjLXRvcC1uYW1lXCI+JHtjdE5hbWV9PC9kaXY+YCtcbiAgICAgICAgICBgPGRpdiBjbGFzcz1cImhlcm8tZmMtdG9wLW51bSBudW1cIj4ke3V0aWxzLmNvbW1hcyh2YWwpfTwvZGl2PmArXG4gICAgICAgICAgJzxkaXYgY2xhc3M9XCJoZXJvLWZjLXRvcC1yYXRlc1wiPicrXG4gICAgICAgICAgICBgPHNwYW4gY2xhc3M9XCJnbG9iXCI+JHtwZXJjLmdsb2JhbH08L3NwYW4+YCtcbiAgICAgICAgICAgIGA8c3BhbiBjbGFzcz1cInBlcmNcIj4ke3BlcmMuY291bnRyeX08L3NwYW4+YCtcbiAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgJzwvbGk+JztcbiAgICAgICAgJHRvcC5hcHBlbmQodGVtcGxhdGUpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvKlxuICAgICAgICBBbGwgY291bnRyaWVzIHRhYmxlXG4gICAgICAgIChzb3J0ZWQgYnkgdG90YWwgIyBkZXNjKVxuICAgICovXG4gICAgY29uc3QgJGNvdW50cmllcyA9ICQoJyNoZXJvLWNvdW50cmllcy10YWJsZS1ib2R5Jyk7XG4gICAgJCgnI2hlcm8tY291bnRyaWVzLWxvYWRpbmcnKS5hZGRDbGFzcygnbG9hZGVkJyk7XG5cbiAgICAvLyBibG9iQ3V0ID0gTWF0aC5jZWlsKChjdFNvcnQudG90YWwubGVuZ3RoKSAvIDIpLCAvLyBhY2NvdW50cyBmb3IgX290aGVyc1xuICAgIC8vIG5CbG9icyA9IFtjdFNvcnQudG90YWwuc2xpY2UoMCwgYmxvYkN1dCksIGN0U29ydC50b3RhbC5zbGljZShibG9iQ3V0LCAtMSldLFxuICAgIC8vIGFsdGVybmF0ZSBibG9iIGNvbnRlbnRcbiAgICAvLyBhbHRlcm5hdGVkQ05hbWVzXyA9IG5CbG9icy5yZWR1Y2UoKHQsIHUsIHYsIHcpID0+IHUucmVkdWNlKCh4LCB5LCB6KSA9PiAoeFt6ICogdy5sZW5ndGggKyB2XSA9IHksIHgpLCB0KSwgW10pO1xuXG4gICAgJGNvdW50cmllcy5odG1sKCcnKTtcbiAgICBkYXRhLmZvckVhY2goY3REYXRhID0+IHtcbiAgICAgIC8vIGlmIChkYXRhW2N0TmFtZV0pIGNvbnNvbGUubG9nKGRhdGFbY3ROYW1lXS5uYXRpb253aWRlKTtcbiAgICAgIC8vIGVsc2UgY29uc29sZS5sb2coY3ROYW1lKTtcbiAgICAgIGNvbnN0IHtjb3VudHJ5OiBjdE5hbWUsIGNvbmZpcm1lZCwgZGVhdGhzLCByZWNvdmVyZWR9ID0gY3REYXRhO1xuXG4gICAgICAvLyBwcmVwYXJlICYgYXBwZW5kIHRlbXBsYXRlXG4gICAgICBjb25zdCB0ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwiaGVyby1jb3VudHJ5XCI+JytcbiAgICAgICAgYDxkaXYgY2xhc3M9XCJoZXJvLWNvdW50cnktbmFtZVwiPiR7Y3ROYW1lfTwvZGl2PmArXG4gICAgICAgIGA8ZGl2IGNsYXNzPVwiaGVyby1jb3VudHJ5LXZhbCB0b3RhbFwiPiR7Y29uZmlybWVkfTwvZGl2PmArXG4gICAgICAgIGA8ZGl2IGNsYXNzPVwiaGVyby1jb3VudHJ5LXZhbCBkZWF0aHNcIj4ke2RlYXRoc308L2Rpdj5gK1xuICAgICAgICBgPGRpdiBjbGFzcz1cImhlcm8tY291bnRyeS12YWwgcmVjb3ZcIj4ke3JlY292ZXJlZH08L2Rpdj5gK1xuICAgICAgICAnPGRpdiBjbGFzcz1cImhlcm8tY291bnRyeS1kdW1teVwiPjwvZGl2PicrIC8vIGR1bW15XG4gICAgICAnPC9kaXY+JztcbiAgICAgICRjb3VudHJpZXMuYXBwZW5kKHRlbXBsYXRlKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgLypcbiAgICAgIE5ld3NcbiAgKi9cbiAgYWpheDMuZG9uZShkYXRhID0+IHtcbiAgICAkKCcjaGVyby1uZXdzLWxpc3QnKS5odG1sKCcnKTtcbiAgICBkYXRhLl9fc29ydGVkLmZvckVhY2godHMgPT4ge1xuICAgICAgY29uc3QgbmV3cyA9IGRhdGFbdHNdO1xuICAgICAgY29uc3QgdGVtcGxhdGUgPSAnPGxpPicrXG4gICAgICAgIGA8ZGl2IGNsYXNzPVwicHViZGF0ZVwiPiR7dXRpbHMuZm9ybWF0RGF0ZShuZXdzLnB1YkRhdGUpfTwvZGl2PmArXG4gICAgICAgIGA8ZGl2IGNsYXNzPVwiaGVhZGxpbmVcIj4ke25ld3MuaHRtbH08L2Rpdj5gK1xuICAgICAgJzwvbGk+JztcbiAgICAgICQoJyNoZXJvLW5ld3MtbGlzdCcpLmFwcGVuZCh0ZW1wbGF0ZSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8qXG4gICAgICBVU0EgY2FzZXNcbiAgKi9cbiAgYWpheDQuZG9uZShkYXRhID0+IHtcbiAgICBsZXQgcmR0cyA9IGRhdGEucmF3LmRhdGE7XG4gICAgcmR0cyA9IE9iamVjdC52YWx1ZXMocmR0cykucmV2ZXJzZSgpLnNsaWNlKDAsIDUwKTtcbiAgICAkKCcjaGVyby1jYXNlcy1saXN0JykuaHRtbCgnJyk7XG4gICAgcmR0cy5mb3JFYWNoKHJkdCA9PiB7XG4gICAgICBjb25zdCBbbm8sIGRhdGUsIGNvdW50eSwgc3RhdGUsIGxuZywgbGF0LCBoZWFkbGluZSwgc291cmNlXSA9IHJkdDtcbiAgICAgIGNvbnN0IGxvY2F0aW9uID0gY291bnR5KycsICcrc3RhdGU7XG4gICAgICBjb25zdCBzcmNOYW1lID0gc291cmNlLnJlcGxhY2UoL153d3cuLywgJycpO1xuICAgICAgY29uc3QgdGVtcGxhdGUgPSAnPGxpPicrXG4gICAgICAgIGA8ZGl2IGNsYXNzPVwicHViZGF0ZVwiPiR7dXRpbHMuZm9ybWF0RGF0ZShkYXRlLCBmYWxzZSl9PC9kaXY+YCtcbiAgICAgICAgYDxkaXYgY2xhc3M9XCJoZWFkbGluZVwiPiR7aGVhZGxpbmV9PC9kaXY+YCtcbiAgICAgICAgYDxkaXYgY2xhc3M9XCJsb2NhdGlvblwiPiR7bG9jYXRpb259PC9kaXY+YCtcbiAgICAgICAgYDxkaXYgY2xhc3M9XCJzb3VyY2VcIj4gJm1kYXNoOyA8YSBocmVmPVwiJHsnaHR0cHM6Ly8nK3NvdXJjZSB8fCAnLi8nfVwiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyXCI+JHtzcmNOYW1lfTwvYT48L2Rpdj5gK1xuICAgICAgJzwvbGk+JztcbiAgICAgICQoJyNoZXJvLWNhc2VzLWxpc3QnKS5hcHBlbmQodGVtcGxhdGUpO1xuICAgIH0pO1xuICB9KTtcbn0pKGpRdWVyeSk7XG4iLCJpbXBvcnQgbW9udGhzIGZyb20gJy4uLy4uL2pzb24vbW9udGhzLmpzb24nO1xuXG4vKlxuICAgIEZvcm1hdHMgZGF0ZSB0b1xuICAgICAgJ01vbnRoKHNob3J0KSBEYXRlLCBUaW1lJyBvciAnTW9udGgobG9uZykgRGF0ZSdcbiovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RGF0ZSh0aW1lLCBkaXNwbGF5VGltZT10cnVlKXtcbiAgY29uc3QgZE9iaiA9IG5ldyBEYXRlKHRpbWUpLCBtb250aCA9IGRPYmouZ2V0TW9udGgoKSwgZGF0ZSA9IGRPYmouZ2V0RGF0ZSgpO1xuXG4gIC8vIG5vIHRpbWVcbiAgaWYgKCFkaXNwbGF5VGltZSkgcmV0dXJuIGAke21vbnRocy5sb25nW21vbnRoXX0gJHtkYXRlfWA7XG5cbiAgbGV0IGhycyA9IGRPYmouZ2V0SG91cnMoKSwgbWlucyA9IGRPYmouZ2V0TWludXRlcygpLCBhbXBtID0gaHJzID49IDEyID8gJ3BtJyA6ICdhbSc7XG4gIGhycyA9IGhycyAlIDEyO1xuICBocnMgPSBocnMgPyBocnMgOiAxMjsgLy8gdGhlIGhvdXIgJzAnIHNob3VsZCBiZSAnMTInXG4gIG1pbnMgPSBtaW5zIDwgMTAgPyAnMCcrbWlucyA6IG1pbnM7XG4gIGNvbnN0IHN0clRpbWUgPSBgJHtocnN9OiR7bWluc30gJHthbXBtfWA7XG4gIHJldHVybiBgJHttb250aHMuc2hvcnRbbW9udGhdfSAke2RhdGV9LCAke3N0clRpbWV9YDtcbn07XG5cbi8qXG4gICAgSW5zZXJ0cyBjb21tYXMgaW50byBudW1iZXJzXG4gICAgaW5wdXQ6IDEyMzQ1NiAobnVtKVxuICAgIG91dHB1dDogMTIzLDQ1NiAoc3RyKVxuKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21tYXMobil7XG4gIHJldHVybiBuLnRvU3RyaW5nKCkucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgJywnKTtcbn1cblxuLypcbiAgICBFdmFsdWF0ZSBwZXJjZW50YWdlIGZyb20gdHdvIG51bWJlcnNcbiAgICBpbnB1dDogbnVtZXJhdG9yLCBkZW5vbWluYXRvclxuICAgIG91dHB1dDogbnVtZXJhdG9yL2Rlbm9taW5hdG9yICVcbiovXG5leHBvcnQgZnVuY3Rpb24gcGVyY2VudChudW1lLCBkZW5vLCBmaXhlZD0yKXtcbiAgbGV0IHBlcmM7XG4gIGlmICh0eXBlb2YgbnVtICE9PSAnbnVtYmVyJyB8fCB0eXBlb2YgZGVubyAhPT0gJ251bWJlcicpIHBlcmMgPSBOdW1iZXIobnVtZSkvTnVtYmVyKGRlbm8pKjEwMDtcbiAgZWxzZSBwZXJjID0gbnVtZS9kZW5vKjEwMDtcblxuICByZXR1cm4gaXNGaW5pdGUocGVyYykgPyBwZXJjLnRvRml4ZWQoZml4ZWQpIDogdW5kZWZpbmVkO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==