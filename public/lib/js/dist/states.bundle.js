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
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/lib/js/custom/states.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/lib/js/custom/states.js":
/*!****************************************!*\
  !*** ./public/lib/js/custom/states.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var apiBaseUSA = "http://localhost:8014/" + 'api/';
var utils = __webpack_require__(/*! ../utils */ "./public/lib/js/utils/index.js"),
    statesJSON = __webpack_require__(/*! ../../json/states.json */ "./public/lib/json/states.json");

function resizeMap() {
  var svgWidth = $('#usmap').width(),
      mapHeight = svgWidth * 2 / 3; // ratio w:h 3:2
  // console.log(svgWidth, mapHeight);
  $('#usmap svg').attr('width', svgWidth).attr('height', mapHeight);
};

var cdFetch = undefined; // core data fetch
function getStateData(abbr) {
  if (!cdFetch || !cdFetch[abbr]) return undefined;
  var data = cdFetch[abbr];

  // no reports, just in case
  if (!data) data = { confirmed: 0, deaths: 0, recovered: 0 };

  return { abbr: abbr, state: statesJSON[abbr] || '', data: data };
}

function loadStateData(stateData) {
  if (!cdFetch) return;

  var idMap = '#usmap-state',
      idStat = idMap + '-stat';
  var abbr = stateData.abbr,
      state = stateData.state,
      data = stateData.data;

  /*
      Add state data
  */

  $(idMap + '-name').text(state);
  $(idStat + '-confirmed').text(data.statewide.confirmed);
  $(idStat + '-deaths').text(data.statewide.deaths);
  $(idStat + '-recovered').text(data.statewide.recovered);

  /*
      Add state county data
      Sorted by desc confirmed #
  */
  var counties = cdFetch[abbr],
      srt = Object.keys(counties);
  // sort by desc confirmed #
  srt.sort(function (a, b) {
    return counties[a].confirmed < counties[b].confirmed ? 1 : counties[a].confirmed > counties[b].confirmed ? -1 : 0;
  });
  // remove key statewide (already used)
  srt.splice(srt.indexOf('statewide'), 1);

  // start looping counties
  $(idMap + '-counties').html('');
  srt.forEach(function (county) {
    var cdt = counties[county];
    $(idMap + '-counties').append(countyTemplate(county, cdt));
  });

  // const ud = cdFetch.usa.data.compiled;
  // $(idStat+'-total').text(ud.total);
  // $(idStat+'-so').text(ud.states.total);
  // $(idStat+'-ns').text(ud.non.total);
}

function countyTemplate(county, data) {
  // {location: S, recovered: N, confirmed: N, deaths: N}
  return '<div class="state-county">' + ('<div class="state-county-item loc">' + county + '</div>') + ('<div class="state-county-item stat confirmed">' + data.confirmed + '</div>') + ('<div class="state-county-item stat deaths">' + data.deaths + '</div>') + ('<div class="state-county-item stat recovered">' + (data.recovered || '?') + '</div>') + '</div>';
}

(function ($) {
  $('#usmap').usmap({
    // https://newsignature.github.io/us-map/#usage-style-options
    stateStyles: { fill: '#f1f2f3', stroke: '#999' },
    stateHoverStyles: { fill: '#db4031' },
    stateHoverAnimation: 100,
    labelBackingHoverStyles: { fill: '#db4031' },
    // The click action
    click: function click(event, data) {
      var abbr = data.name;

      var sdt = getStateData(abbr);
      // console.log(sdt);
      loadStateData(sdt);
    }
  });

  $(window).on('resize', function () {
    resizeMap();
  });

  var ajax = $.ajax({
    method: 'GET',
    url: apiBaseUSA + 'v1/usa/counties',
    dataType: 'json'
  });
  ajax.done(function (data) {
    console.log(data);
    cdFetch = data;
  });
  ajax.fail(function (a, b, c) {
    return console.error(a, b, c);
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

/***/ "./public/lib/json/months.json":
/*!*************************************!*\
  !*** ./public/lib/json/months.json ***!
  \*************************************/
/*! exports provided: short, long, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"short\":[\"Jan\",\"Feb\",\"Mar\",\"Apr\",\"May\",\"Jun\",\"Jul\",\"Aug\",\"Sep\",\"Oct\",\"Nov\",\"Dec\"],\"long\":[\"January\",\"February\",\"March\",\"April\",\"May\",\"June\",\"July\",\"August\",\"September\",\"October\",\"November\",\"December\"]}");

/***/ }),

/***/ "./public/lib/json/states.json":
/*!*************************************!*\
  !*** ./public/lib/json/states.json ***!
  \*************************************/
/*! exports provided: AL, AK, AS, AZ, AR, CA, CO, CT, DE, DC, FM, FL, GA, GU, HI, ID, IL, IN, IA, KS, KY, LA, ME, MH, MD, MA, MI, MN, MS, MO, MT, NE, NV, NH, NJ, NM, NY, NC, ND, MP, OH, OK, OR, PW, PA, PR, RI, SC, SD, TN, TX, UT, VT, VI, VA, WA, WV, WI, WY, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"AL\":\"Alabama\",\"AK\":\"Alaska\",\"AS\":\"American Samoa\",\"AZ\":\"Arizona\",\"AR\":\"Arkansas\",\"CA\":\"California\",\"CO\":\"Colorado\",\"CT\":\"Connecticut\",\"DE\":\"Delaware\",\"DC\":\"District Of Columbia\",\"FM\":\"Federated States Of Micronesia\",\"FL\":\"Florida\",\"GA\":\"Georgia\",\"GU\":\"Guam\",\"HI\":\"Hawaii\",\"ID\":\"Idaho\",\"IL\":\"Illinois\",\"IN\":\"Indiana\",\"IA\":\"Iowa\",\"KS\":\"Kansas\",\"KY\":\"Kentucky\",\"LA\":\"Louisiana\",\"ME\":\"Maine\",\"MH\":\"Marshall Islands\",\"MD\":\"Maryland\",\"MA\":\"Massachusetts\",\"MI\":\"Michigan\",\"MN\":\"Minnesota\",\"MS\":\"Mississippi\",\"MO\":\"Missouri\",\"MT\":\"Montana\",\"NE\":\"Nebraska\",\"NV\":\"Nevada\",\"NH\":\"New Hampshire\",\"NJ\":\"New Jersey\",\"NM\":\"New Mexico\",\"NY\":\"New York\",\"NC\":\"North Carolina\",\"ND\":\"North Dakota\",\"MP\":\"Northern Mariana Islands\",\"OH\":\"Ohio\",\"OK\":\"Oklahoma\",\"OR\":\"Oregon\",\"PW\":\"Palau\",\"PA\":\"Pennsylvania\",\"PR\":\"Puerto Rico\",\"RI\":\"Rhode Island\",\"SC\":\"South Carolina\",\"SD\":\"South Dakota\",\"TN\":\"Tennessee\",\"TX\":\"Texas\",\"UT\":\"Utah\",\"VT\":\"Vermont\",\"VI\":\"Virgin Islands\",\"VA\":\"Virginia\",\"WA\":\"Washington\",\"WV\":\"West Virginia\",\"WI\":\"Wisconsin\",\"WY\":\"Wyoming\"}");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2xpYi9qcy9jdXN0b20vc3RhdGVzLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9saWIvanMvdXRpbHMvaW5kZXguanMiXSwibmFtZXMiOlsiYXBpQmFzZVVTQSIsInByb2Nlc3MiLCJ1dGlscyIsInJlcXVpcmUiLCJzdGF0ZXNKU09OIiwicmVzaXplTWFwIiwic3ZnV2lkdGgiLCIkIiwid2lkdGgiLCJtYXBIZWlnaHQiLCJhdHRyIiwiY2RGZXRjaCIsInVuZGVmaW5lZCIsImdldFN0YXRlRGF0YSIsImFiYnIiLCJkYXRhIiwiY29uZmlybWVkIiwiZGVhdGhzIiwicmVjb3ZlcmVkIiwic3RhdGUiLCJsb2FkU3RhdGVEYXRhIiwic3RhdGVEYXRhIiwiaWRNYXAiLCJpZFN0YXQiLCJ0ZXh0Iiwic3RhdGV3aWRlIiwiY291bnRpZXMiLCJzcnQiLCJPYmplY3QiLCJrZXlzIiwic29ydCIsImEiLCJiIiwic3BsaWNlIiwiaW5kZXhPZiIsImh0bWwiLCJmb3JFYWNoIiwiY2R0IiwiY291bnR5IiwiYXBwZW5kIiwiY291bnR5VGVtcGxhdGUiLCJ1c21hcCIsInN0YXRlU3R5bGVzIiwiZmlsbCIsInN0cm9rZSIsInN0YXRlSG92ZXJTdHlsZXMiLCJzdGF0ZUhvdmVyQW5pbWF0aW9uIiwibGFiZWxCYWNraW5nSG92ZXJTdHlsZXMiLCJjbGljayIsImV2ZW50IiwibmFtZSIsInNkdCIsIndpbmRvdyIsIm9uIiwiYWpheCIsIm1ldGhvZCIsInVybCIsImRhdGFUeXBlIiwiZG9uZSIsImNvbnNvbGUiLCJsb2ciLCJmYWlsIiwiYyIsImVycm9yIiwialF1ZXJ5Il0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7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QWxCOztBQWVBNUMsSUFBRTZDLE1BQUYsRUFBVUMsRUFBVixDQUFhLFFBQWIsRUFBdUIsWUFBVTtBQUMvQmhEO0FBQ0QsR0FGRDs7QUFJQSxNQUFNaUQsT0FBTy9DLEVBQUUrQyxJQUFGLENBQU87QUFDbEJDLFlBQVEsS0FEVTtBQUVsQkMsU0FBS3hELGFBQVcsaUJBRkU7QUFHbEJ5RCxjQUFVO0FBSFEsR0FBUCxDQUFiO0FBS0FILE9BQUtJLElBQUwsQ0FBVSxnQkFBUTtBQUNoQkMsWUFBUUMsR0FBUixDQUFZN0MsSUFBWjtBQUNBSixjQUFVSSxJQUFWO0FBQ0QsR0FIRDtBQUlBdUMsT0FBS08sSUFBTCxDQUFVLFVBQUM5QixDQUFELEVBQUlDLENBQUosRUFBTzhCLENBQVA7QUFBQSxXQUFhSCxRQUFRSSxLQUFSLENBQWNoQyxDQUFkLEVBQWlCQyxDQUFqQixFQUFvQjhCLENBQXBCLENBQWI7QUFBQSxHQUFWO0FBQ0QsQ0E5QkQsRUE4QkdFLE1BOUJILEU7Ozs7Ozs7Ozs7OztBQ3ZFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBNEM7O0FBRTVDO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDs7QUFFQTtBQUNBLDhCQUE4Qiw4Q0FBTSxhQUFhLEdBQUcsS0FBSzs7QUFFekQ7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBLHFCQUFxQixJQUFJLEdBQUcsS0FBSyxHQUFHLEtBQUs7QUFDekMsWUFBWSw4Q0FBTSxjQUFjLEdBQUcsS0FBSyxJQUFJLFFBQVE7QUFDcEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1Asd0NBQXdDLEVBQUU7QUFDMUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0EiLCJmaWxlIjoic3RhdGVzLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vcHVibGljL2xpYi9qcy9jdXN0b20vc3RhdGVzLmpzXCIpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBhcGlCYXNlVVNBID0gcHJvY2Vzcy5lbnYuQVBJX1VSTF9VU0ErJ2FwaS8nO1xuY29uc3RcbiAgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpLFxuICBzdGF0ZXNKU09OID0gcmVxdWlyZSgnLi4vLi4vanNvbi9zdGF0ZXMuanNvbicpO1xuXG5mdW5jdGlvbiByZXNpemVNYXAoKXtcbiAgY29uc3Qgc3ZnV2lkdGggPSAkKCcjdXNtYXAnKS53aWR0aCgpLCBtYXBIZWlnaHQgPSBzdmdXaWR0aCAqIDIvMzsgLy8gcmF0aW8gdzpoIDM6MlxuICAvLyBjb25zb2xlLmxvZyhzdmdXaWR0aCwgbWFwSGVpZ2h0KTtcbiAgJCgnI3VzbWFwIHN2ZycpLmF0dHIoJ3dpZHRoJywgc3ZnV2lkdGgpLmF0dHIoJ2hlaWdodCcsIG1hcEhlaWdodCk7XG59O1xuXG5sZXQgY2RGZXRjaCA9IHVuZGVmaW5lZDsgLy8gY29yZSBkYXRhIGZldGNoXG5mdW5jdGlvbiBnZXRTdGF0ZURhdGEoYWJicil7XG4gIGlmICghY2RGZXRjaCB8fCAhY2RGZXRjaFthYmJyXSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgbGV0IGRhdGEgPSBjZEZldGNoW2FiYnJdO1xuXG4gIC8vIG5vIHJlcG9ydHMsIGp1c3QgaW4gY2FzZVxuICBpZiAoIWRhdGEpIGRhdGEgPSB7Y29uZmlybWVkOiAwLCBkZWF0aHM6IDAsIHJlY292ZXJlZDogMH07XG5cbiAgcmV0dXJuIHthYmJyLCBzdGF0ZTogc3RhdGVzSlNPTlthYmJyXSB8fCAnJywgZGF0YX07XG59XG5cbmZ1bmN0aW9uIGxvYWRTdGF0ZURhdGEoc3RhdGVEYXRhKXtcbiAgaWYgKCFjZEZldGNoKSByZXR1cm47XG5cbiAgY29uc3QgaWRNYXAgPSAnI3VzbWFwLXN0YXRlJywgaWRTdGF0ID0gaWRNYXArJy1zdGF0JztcbiAgY29uc3Qge2FiYnIsIHN0YXRlLCBkYXRhfSA9IHN0YXRlRGF0YTtcblxuICAvKlxuICAgICAgQWRkIHN0YXRlIGRhdGFcbiAgKi9cbiAgJChpZE1hcCsnLW5hbWUnKS50ZXh0KHN0YXRlKTtcbiAgJChpZFN0YXQrJy1jb25maXJtZWQnKS50ZXh0KGRhdGEuc3RhdGV3aWRlLmNvbmZpcm1lZCk7XG4gICQoaWRTdGF0KyctZGVhdGhzJykudGV4dChkYXRhLnN0YXRld2lkZS5kZWF0aHMpO1xuICAkKGlkU3RhdCsnLXJlY292ZXJlZCcpLnRleHQoZGF0YS5zdGF0ZXdpZGUucmVjb3ZlcmVkKTtcblxuICAvKlxuICAgICAgQWRkIHN0YXRlIGNvdW50eSBkYXRhXG4gICAgICBTb3J0ZWQgYnkgZGVzYyBjb25maXJtZWQgI1xuICAqL1xuICBjb25zdCBjb3VudGllcyA9IGNkRmV0Y2hbYWJicl0sIHNydCA9IE9iamVjdC5rZXlzKGNvdW50aWVzKTtcbiAgLy8gc29ydCBieSBkZXNjIGNvbmZpcm1lZCAjXG4gIHNydC5zb3J0KChhLCBiKSA9PiBjb3VudGllc1thXS5jb25maXJtZWQgPCBjb3VudGllc1tiXS5jb25maXJtZWQgPyAxIDogY291bnRpZXNbYV0uY29uZmlybWVkID4gY291bnRpZXNbYl0uY29uZmlybWVkID8gLTEgOiAwKTtcbiAgLy8gcmVtb3ZlIGtleSBzdGF0ZXdpZGUgKGFscmVhZHkgdXNlZClcbiAgc3J0LnNwbGljZShzcnQuaW5kZXhPZignc3RhdGV3aWRlJyksIDEpO1xuXG4gIC8vIHN0YXJ0IGxvb3BpbmcgY291bnRpZXNcbiAgJChpZE1hcCsnLWNvdW50aWVzJykuaHRtbCgnJyk7XG4gIHNydC5mb3JFYWNoKGNvdW50eSA9PiB7XG4gICAgY29uc3QgY2R0ID0gY291bnRpZXNbY291bnR5XTtcbiAgICAkKGlkTWFwKyctY291bnRpZXMnKS5hcHBlbmQoY291bnR5VGVtcGxhdGUoY291bnR5LCBjZHQpKVxuICB9KTtcblxuICAvLyBjb25zdCB1ZCA9IGNkRmV0Y2gudXNhLmRhdGEuY29tcGlsZWQ7XG4gIC8vICQoaWRTdGF0KyctdG90YWwnKS50ZXh0KHVkLnRvdGFsKTtcbiAgLy8gJChpZFN0YXQrJy1zbycpLnRleHQodWQuc3RhdGVzLnRvdGFsKTtcbiAgLy8gJChpZFN0YXQrJy1ucycpLnRleHQodWQubm9uLnRvdGFsKTtcbn1cblxuZnVuY3Rpb24gY291bnR5VGVtcGxhdGUoY291bnR5LCBkYXRhKXtcbiAgLy8ge2xvY2F0aW9uOiBTLCByZWNvdmVyZWQ6IE4sIGNvbmZpcm1lZDogTiwgZGVhdGhzOiBOfVxuICByZXR1cm4gJzxkaXYgY2xhc3M9XCJzdGF0ZS1jb3VudHlcIj4nK1xuICBgPGRpdiBjbGFzcz1cInN0YXRlLWNvdW50eS1pdGVtIGxvY1wiPiR7Y291bnR5fTwvZGl2PmArXG4gIGA8ZGl2IGNsYXNzPVwic3RhdGUtY291bnR5LWl0ZW0gc3RhdCBjb25maXJtZWRcIj4ke2RhdGEuY29uZmlybWVkfTwvZGl2PmArXG4gIGA8ZGl2IGNsYXNzPVwic3RhdGUtY291bnR5LWl0ZW0gc3RhdCBkZWF0aHNcIj4ke2RhdGEuZGVhdGhzfTwvZGl2PmArXG4gIGA8ZGl2IGNsYXNzPVwic3RhdGUtY291bnR5LWl0ZW0gc3RhdCByZWNvdmVyZWRcIj4ke2RhdGEucmVjb3ZlcmVkIHx8ICc/J308L2Rpdj5gK1xuICAnPC9kaXY+Jztcbn1cblxuKGZ1bmN0aW9uKCQpe1xuICAkKCcjdXNtYXAnKS51c21hcCh7XG4gICAgLy8gaHR0cHM6Ly9uZXdzaWduYXR1cmUuZ2l0aHViLmlvL3VzLW1hcC8jdXNhZ2Utc3R5bGUtb3B0aW9uc1xuICAgIHN0YXRlU3R5bGVzOiB7ZmlsbDogJyNmMWYyZjMnLCBzdHJva2U6ICcjOTk5J30sXG4gICAgc3RhdGVIb3ZlclN0eWxlczoge2ZpbGw6ICcjZGI0MDMxJ30sXG4gICAgc3RhdGVIb3ZlckFuaW1hdGlvbjogMTAwLFxuICAgIGxhYmVsQmFja2luZ0hvdmVyU3R5bGVzOiB7ZmlsbDogJyNkYjQwMzEnfSxcbiAgICAvLyBUaGUgY2xpY2sgYWN0aW9uXG4gICAgY2xpY2s6IGZ1bmN0aW9uKGV2ZW50LCBkYXRhKXtcbiAgICAgIGNvbnN0IHtuYW1lOiBhYmJyfSA9IGRhdGE7XG4gICAgICBjb25zdCBzZHQgPSBnZXRTdGF0ZURhdGEoYWJicik7XG4gICAgICAvLyBjb25zb2xlLmxvZyhzZHQpO1xuICAgICAgbG9hZFN0YXRlRGF0YShzZHQpO1xuICAgIH0sXG4gIH0pO1xuXG4gICQod2luZG93KS5vbigncmVzaXplJywgZnVuY3Rpb24oKXtcbiAgICByZXNpemVNYXAoKTtcbiAgfSk7XG5cbiAgY29uc3QgYWpheCA9ICQuYWpheCh7XG4gICAgbWV0aG9kOiAnR0VUJyxcbiAgICB1cmw6IGFwaUJhc2VVU0ErJ3YxL3VzYS9jb3VudGllcycsXG4gICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgfSk7XG4gIGFqYXguZG9uZShkYXRhID0+IHtcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICBjZEZldGNoID0gZGF0YTtcbiAgfSk7XG4gIGFqYXguZmFpbCgoYSwgYiwgYykgPT4gY29uc29sZS5lcnJvcihhLCBiLCBjKSk7XG59KShqUXVlcnkpO1xuIiwiaW1wb3J0IG1vbnRocyBmcm9tICcuLi8uLi9qc29uL21vbnRocy5qc29uJztcblxuLypcbiAgICBGb3JtYXRzIGRhdGUgdG9cbiAgICAgICdNb250aChzaG9ydCkgRGF0ZSwgVGltZScgb3IgJ01vbnRoKGxvbmcpIERhdGUnXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdERhdGUodGltZSwgZGlzcGxheVRpbWU9dHJ1ZSl7XG4gIGNvbnN0IGRPYmogPSBuZXcgRGF0ZSh0aW1lKSwgbW9udGggPSBkT2JqLmdldE1vbnRoKCksIGRhdGUgPSBkT2JqLmdldERhdGUoKTtcblxuICAvLyBubyB0aW1lXG4gIGlmICghZGlzcGxheVRpbWUpIHJldHVybiBgJHttb250aHMubG9uZ1ttb250aF19ICR7ZGF0ZX1gO1xuXG4gIGxldCBocnMgPSBkT2JqLmdldEhvdXJzKCksIG1pbnMgPSBkT2JqLmdldE1pbnV0ZXMoKSwgYW1wbSA9IGhycyA+PSAxMiA/ICdwbScgOiAnYW0nO1xuICBocnMgPSBocnMgJSAxMjtcbiAgaHJzID0gaHJzID8gaHJzIDogMTI7IC8vIHRoZSBob3VyICcwJyBzaG91bGQgYmUgJzEyJ1xuICBtaW5zID0gbWlucyA8IDEwID8gJzAnK21pbnMgOiBtaW5zO1xuICBjb25zdCBzdHJUaW1lID0gYCR7aHJzfToke21pbnN9ICR7YW1wbX1gO1xuICByZXR1cm4gYCR7bW9udGhzLnNob3J0W21vbnRoXX0gJHtkYXRlfSwgJHtzdHJUaW1lfWA7XG59O1xuXG4vKlxuICAgIEluc2VydHMgY29tbWFzIGludG8gbnVtYmVyc1xuICAgIGlucHV0OiAxMjM0NTYgKG51bSlcbiAgICBvdXRwdXQ6IDEyMyw0NTYgKHN0cilcbiovXG5leHBvcnQgZnVuY3Rpb24gY29tbWFzKG4pe1xuICByZXR1cm4gbi50b1N0cmluZygpLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csICcsJyk7XG59XG5cbi8qXG4gICAgRXZhbHVhdGUgcGVyY2VudGFnZSBmcm9tIHR3byBudW1iZXJzXG4gICAgaW5wdXQ6IG51bWVyYXRvciwgZGVub21pbmF0b3JcbiAgICBvdXRwdXQ6IG51bWVyYXRvci9kZW5vbWluYXRvciAlXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIHBlcmNlbnQobnVtZSwgZGVubywgZml4ZWQ9Mil7XG4gIGxldCBwZXJjO1xuICBpZiAodHlwZW9mIG51bSAhPT0gJ251bWJlcicgfHwgdHlwZW9mIGRlbm8gIT09ICdudW1iZXInKSBwZXJjID0gTnVtYmVyKG51bWUpL051bWJlcihkZW5vKSoxMDA7XG4gIGVsc2UgcGVyYyA9IG51bWUvZGVubyoxMDA7XG5cbiAgcmV0dXJuIGlzRmluaXRlKHBlcmMpID8gcGVyYy50b0ZpeGVkKGZpeGVkKSA6IHVuZGVmaW5lZDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=