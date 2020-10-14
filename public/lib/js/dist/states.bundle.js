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
}

;
var cdFetch = undefined; // core data fetch

function getStateData(abbr) {
  if (!cdFetch || !cdFetch[abbr]) return undefined;
  var data = cdFetch[abbr]; // no reports, just in case

  if (!data) data = {
    confirmed: 0,
    deaths: 0,
    recovered: 0
  };
  return {
    abbr: abbr,
    state: statesJSON[abbr] || '',
    data: data
  };
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
      srt = Object.keys(counties); // sort by desc confirmed #

  srt.sort(function (a, b) {
    return counties[a].confirmed < counties[b].confirmed ? 1 : counties[a].confirmed > counties[b].confirmed ? -1 : 0;
  }); // remove key statewide (already used)

  srt.splice(srt.indexOf('statewide'), 1); // start looping counties

  $(idMap + '-counties').html('');
  srt.forEach(function (county) {
    var cdt = counties[county];
    $(idMap + '-counties').append(countyTemplate(county, cdt));
  }); // const ud = cdFetch.usa.data.compiled;
  // $(idStat+'-total').text(ud.total);
  // $(idStat+'-so').text(ud.states.total);
  // $(idStat+'-ns').text(ud.non.total);
}

function countyTemplate(county, data) {
  // {location: S, recovered: N, confirmed: N, deaths: N}
  return '<div class="state-county">' + "<div class=\"state-county-item loc\">".concat(county, "</div>") + "<div class=\"state-county-item stat confirmed\">".concat(data.confirmed, "</div>") + "<div class=\"state-county-item stat deaths\">".concat(data.deaths, "</div>") + "<div class=\"state-county-item stat recovered\">".concat(data.recovered || '?', "</div>") + '</div>';
}

(function ($) {
  $('#usmap').usmap({
    // https://newsignature.github.io/us-map/#usage-style-options
    stateStyles: {
      fill: '#f1f2f3',
      stroke: '#999'
    },
    stateHoverStyles: {
      fill: '#db4031'
    },
    stateHoverAnimation: 100,
    labelBackingHoverStyles: {
      fill: '#db4031'
    },
    // The click action
    click: function click(event, data) {
      var abbr = data.name;
      var sdt = getStateData(abbr); // console.log(sdt);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2xpYi9qcy9jdXN0b20vc3RhdGVzLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9saWIvanMvdXRpbHMvaW5kZXguanMiXSwibmFtZXMiOlsiYXBpQmFzZVVTQSIsInByb2Nlc3MiLCJ1dGlscyIsInJlcXVpcmUiLCJzdGF0ZXNKU09OIiwicmVzaXplTWFwIiwic3ZnV2lkdGgiLCIkIiwid2lkdGgiLCJtYXBIZWlnaHQiLCJhdHRyIiwiY2RGZXRjaCIsInVuZGVmaW5lZCIsImdldFN0YXRlRGF0YSIsImFiYnIiLCJkYXRhIiwiY29uZmlybWVkIiwiZGVhdGhzIiwicmVjb3ZlcmVkIiwic3RhdGUiLCJsb2FkU3RhdGVEYXRhIiwic3RhdGVEYXRhIiwiaWRNYXAiLCJpZFN0YXQiLCJ0ZXh0Iiwic3RhdGV3aWRlIiwiY291bnRpZXMiLCJzcnQiLCJPYmplY3QiLCJrZXlzIiwic29ydCIsImEiLCJiIiwic3BsaWNlIiwiaW5kZXhPZiIsImh0bWwiLCJmb3JFYWNoIiwiY291bnR5IiwiY2R0IiwiYXBwZW5kIiwiY291bnR5VGVtcGxhdGUiLCJ1c21hcCIsInN0YXRlU3R5bGVzIiwiZmlsbCIsInN0cm9rZSIsInN0YXRlSG92ZXJTdHlsZXMiLCJzdGF0ZUhvdmVyQW5pbWF0aW9uIiwibGFiZWxCYWNraW5nSG92ZXJTdHlsZXMiLCJjbGljayIsImV2ZW50IiwibmFtZSIsInNkdCIsIndpbmRvdyIsIm9uIiwiYWpheCIsIm1ldGhvZCIsInVybCIsImRhdGFUeXBlIiwiZG9uZSIsImNvbnNvbGUiLCJsb2ciLCJmYWlsIiwiYyIsImVycm9yIiwialF1ZXJ5Il0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7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LFdBQWFILE9BQU8sQ0FBQ0ksS0FBUixDQUFjaEMsQ0FBZCxFQUFpQkMsQ0FBakIsRUFBb0I4QixDQUFwQixDQUFiO0FBQUEsR0FBVjtBQUNELENBOUJELEVBOEJHRSxNQTlCSCxFOzs7Ozs7Ozs7Ozs7QUN2RUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQTRDOztBQUU1QztBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7O0FBRUE7QUFDQSw4QkFBOEIsOENBQU0sYUFBYSxHQUFHLEtBQUs7O0FBRXpEO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQSxxQkFBcUIsSUFBSSxHQUFHLEtBQUssR0FBRyxLQUFLO0FBQ3pDLFlBQVksOENBQU0sY0FBYyxHQUFHLEtBQUssSUFBSSxRQUFRO0FBQ3BEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQLHdDQUF3QyxFQUFFO0FBQzFDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBIiwiZmlsZSI6InN0YXRlcy5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3B1YmxpYy9saWIvanMvY3VzdG9tL3N0YXRlcy5qc1wiKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgYXBpQmFzZVVTQSA9IHByb2Nlc3MuZW52LkFQSV9VUkxfVVNBKydhcGkvJztcbmNvbnN0XG4gIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKSxcbiAgc3RhdGVzSlNPTiA9IHJlcXVpcmUoJy4uLy4uL2pzb24vc3RhdGVzLmpzb24nKTtcblxuZnVuY3Rpb24gcmVzaXplTWFwKCl7XG4gIGNvbnN0IHN2Z1dpZHRoID0gJCgnI3VzbWFwJykud2lkdGgoKSwgbWFwSGVpZ2h0ID0gc3ZnV2lkdGggKiAyLzM7IC8vIHJhdGlvIHc6aCAzOjJcbiAgLy8gY29uc29sZS5sb2coc3ZnV2lkdGgsIG1hcEhlaWdodCk7XG4gICQoJyN1c21hcCBzdmcnKS5hdHRyKCd3aWR0aCcsIHN2Z1dpZHRoKS5hdHRyKCdoZWlnaHQnLCBtYXBIZWlnaHQpO1xufTtcblxubGV0IGNkRmV0Y2ggPSB1bmRlZmluZWQ7IC8vIGNvcmUgZGF0YSBmZXRjaFxuZnVuY3Rpb24gZ2V0U3RhdGVEYXRhKGFiYnIpe1xuICBpZiAoIWNkRmV0Y2ggfHwgIWNkRmV0Y2hbYWJicl0pIHJldHVybiB1bmRlZmluZWQ7XG4gIGxldCBkYXRhID0gY2RGZXRjaFthYmJyXTtcblxuICAvLyBubyByZXBvcnRzLCBqdXN0IGluIGNhc2VcbiAgaWYgKCFkYXRhKSBkYXRhID0ge2NvbmZpcm1lZDogMCwgZGVhdGhzOiAwLCByZWNvdmVyZWQ6IDB9O1xuXG4gIHJldHVybiB7YWJiciwgc3RhdGU6IHN0YXRlc0pTT05bYWJicl0gfHwgJycsIGRhdGF9O1xufVxuXG5mdW5jdGlvbiBsb2FkU3RhdGVEYXRhKHN0YXRlRGF0YSl7XG4gIGlmICghY2RGZXRjaCkgcmV0dXJuO1xuXG4gIGNvbnN0IGlkTWFwID0gJyN1c21hcC1zdGF0ZScsIGlkU3RhdCA9IGlkTWFwKyctc3RhdCc7XG4gIGNvbnN0IHthYmJyLCBzdGF0ZSwgZGF0YX0gPSBzdGF0ZURhdGE7XG5cbiAgLypcbiAgICAgIEFkZCBzdGF0ZSBkYXRhXG4gICovXG4gICQoaWRNYXArJy1uYW1lJykudGV4dChzdGF0ZSk7XG4gICQoaWRTdGF0KyctY29uZmlybWVkJykudGV4dChkYXRhLnN0YXRld2lkZS5jb25maXJtZWQpO1xuICAkKGlkU3RhdCsnLWRlYXRocycpLnRleHQoZGF0YS5zdGF0ZXdpZGUuZGVhdGhzKTtcbiAgJChpZFN0YXQrJy1yZWNvdmVyZWQnKS50ZXh0KGRhdGEuc3RhdGV3aWRlLnJlY292ZXJlZCk7XG5cbiAgLypcbiAgICAgIEFkZCBzdGF0ZSBjb3VudHkgZGF0YVxuICAgICAgU29ydGVkIGJ5IGRlc2MgY29uZmlybWVkICNcbiAgKi9cbiAgY29uc3QgY291bnRpZXMgPSBjZEZldGNoW2FiYnJdLCBzcnQgPSBPYmplY3Qua2V5cyhjb3VudGllcyk7XG4gIC8vIHNvcnQgYnkgZGVzYyBjb25maXJtZWQgI1xuICBzcnQuc29ydCgoYSwgYikgPT4gY291bnRpZXNbYV0uY29uZmlybWVkIDwgY291bnRpZXNbYl0uY29uZmlybWVkID8gMSA6IGNvdW50aWVzW2FdLmNvbmZpcm1lZCA+IGNvdW50aWVzW2JdLmNvbmZpcm1lZCA/IC0xIDogMCk7XG4gIC8vIHJlbW92ZSBrZXkgc3RhdGV3aWRlIChhbHJlYWR5IHVzZWQpXG4gIHNydC5zcGxpY2Uoc3J0LmluZGV4T2YoJ3N0YXRld2lkZScpLCAxKTtcblxuICAvLyBzdGFydCBsb29waW5nIGNvdW50aWVzXG4gICQoaWRNYXArJy1jb3VudGllcycpLmh0bWwoJycpO1xuICBzcnQuZm9yRWFjaChjb3VudHkgPT4ge1xuICAgIGNvbnN0IGNkdCA9IGNvdW50aWVzW2NvdW50eV07XG4gICAgJChpZE1hcCsnLWNvdW50aWVzJykuYXBwZW5kKGNvdW50eVRlbXBsYXRlKGNvdW50eSwgY2R0KSlcbiAgfSk7XG5cbiAgLy8gY29uc3QgdWQgPSBjZEZldGNoLnVzYS5kYXRhLmNvbXBpbGVkO1xuICAvLyAkKGlkU3RhdCsnLXRvdGFsJykudGV4dCh1ZC50b3RhbCk7XG4gIC8vICQoaWRTdGF0Kyctc28nKS50ZXh0KHVkLnN0YXRlcy50b3RhbCk7XG4gIC8vICQoaWRTdGF0KyctbnMnKS50ZXh0KHVkLm5vbi50b3RhbCk7XG59XG5cbmZ1bmN0aW9uIGNvdW50eVRlbXBsYXRlKGNvdW50eSwgZGF0YSl7XG4gIC8vIHtsb2NhdGlvbjogUywgcmVjb3ZlcmVkOiBOLCBjb25maXJtZWQ6IE4sIGRlYXRoczogTn1cbiAgcmV0dXJuICc8ZGl2IGNsYXNzPVwic3RhdGUtY291bnR5XCI+JytcbiAgYDxkaXYgY2xhc3M9XCJzdGF0ZS1jb3VudHktaXRlbSBsb2NcIj4ke2NvdW50eX08L2Rpdj5gK1xuICBgPGRpdiBjbGFzcz1cInN0YXRlLWNvdW50eS1pdGVtIHN0YXQgY29uZmlybWVkXCI+JHtkYXRhLmNvbmZpcm1lZH08L2Rpdj5gK1xuICBgPGRpdiBjbGFzcz1cInN0YXRlLWNvdW50eS1pdGVtIHN0YXQgZGVhdGhzXCI+JHtkYXRhLmRlYXRoc308L2Rpdj5gK1xuICBgPGRpdiBjbGFzcz1cInN0YXRlLWNvdW50eS1pdGVtIHN0YXQgcmVjb3ZlcmVkXCI+JHtkYXRhLnJlY292ZXJlZCB8fCAnPyd9PC9kaXY+YCtcbiAgJzwvZGl2Pic7XG59XG5cbihmdW5jdGlvbigkKXtcbiAgJCgnI3VzbWFwJykudXNtYXAoe1xuICAgIC8vIGh0dHBzOi8vbmV3c2lnbmF0dXJlLmdpdGh1Yi5pby91cy1tYXAvI3VzYWdlLXN0eWxlLW9wdGlvbnNcbiAgICBzdGF0ZVN0eWxlczoge2ZpbGw6ICcjZjFmMmYzJywgc3Ryb2tlOiAnIzk5OSd9LFxuICAgIHN0YXRlSG92ZXJTdHlsZXM6IHtmaWxsOiAnI2RiNDAzMSd9LFxuICAgIHN0YXRlSG92ZXJBbmltYXRpb246IDEwMCxcbiAgICBsYWJlbEJhY2tpbmdIb3ZlclN0eWxlczoge2ZpbGw6ICcjZGI0MDMxJ30sXG4gICAgLy8gVGhlIGNsaWNrIGFjdGlvblxuICAgIGNsaWNrOiBmdW5jdGlvbihldmVudCwgZGF0YSl7XG4gICAgICBjb25zdCB7bmFtZTogYWJicn0gPSBkYXRhO1xuICAgICAgY29uc3Qgc2R0ID0gZ2V0U3RhdGVEYXRhKGFiYnIpO1xuICAgICAgLy8gY29uc29sZS5sb2coc2R0KTtcbiAgICAgIGxvYWRTdGF0ZURhdGEoc2R0KTtcbiAgICB9LFxuICB9KTtcblxuICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uKCl7XG4gICAgcmVzaXplTWFwKCk7XG4gIH0pO1xuXG4gIGNvbnN0IGFqYXggPSAkLmFqYXgoe1xuICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgdXJsOiBhcGlCYXNlVVNBKyd2MS91c2EvY291bnRpZXMnLFxuICAgIGRhdGFUeXBlOiAnanNvbicsXG4gIH0pO1xuICBhamF4LmRvbmUoZGF0YSA9PiB7XG4gICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgY2RGZXRjaCA9IGRhdGE7XG4gIH0pO1xuICBhamF4LmZhaWwoKGEsIGIsIGMpID0+IGNvbnNvbGUuZXJyb3IoYSwgYiwgYykpO1xufSkoalF1ZXJ5KTtcbiIsImltcG9ydCBtb250aHMgZnJvbSAnLi4vLi4vanNvbi9tb250aHMuanNvbic7XG5cbi8qXG4gICAgRm9ybWF0cyBkYXRlIHRvXG4gICAgICAnTW9udGgoc2hvcnQpIERhdGUsIFRpbWUnIG9yICdNb250aChsb25nKSBEYXRlJ1xuKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXREYXRlKHRpbWUsIGRpc3BsYXlUaW1lPXRydWUpe1xuICBjb25zdCBkT2JqID0gbmV3IERhdGUodGltZSksIG1vbnRoID0gZE9iai5nZXRNb250aCgpLCBkYXRlID0gZE9iai5nZXREYXRlKCk7XG5cbiAgLy8gbm8gdGltZVxuICBpZiAoIWRpc3BsYXlUaW1lKSByZXR1cm4gYCR7bW9udGhzLmxvbmdbbW9udGhdfSAke2RhdGV9YDtcblxuICBsZXQgaHJzID0gZE9iai5nZXRIb3VycygpLCBtaW5zID0gZE9iai5nZXRNaW51dGVzKCksIGFtcG0gPSBocnMgPj0gMTIgPyAncG0nIDogJ2FtJztcbiAgaHJzID0gaHJzICUgMTI7XG4gIGhycyA9IGhycyA/IGhycyA6IDEyOyAvLyB0aGUgaG91ciAnMCcgc2hvdWxkIGJlICcxMidcbiAgbWlucyA9IG1pbnMgPCAxMCA/ICcwJyttaW5zIDogbWlucztcbiAgY29uc3Qgc3RyVGltZSA9IGAke2hyc306JHttaW5zfSAke2FtcG19YDtcbiAgcmV0dXJuIGAke21vbnRocy5zaG9ydFttb250aF19ICR7ZGF0ZX0sICR7c3RyVGltZX1gO1xufTtcblxuLypcbiAgICBJbnNlcnRzIGNvbW1hcyBpbnRvIG51bWJlcnNcbiAgICBpbnB1dDogMTIzNDU2IChudW0pXG4gICAgb3V0cHV0OiAxMjMsNDU2IChzdHIpXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbW1hcyhuKXtcbiAgcmV0dXJuIG4udG9TdHJpbmcoKS5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCAnLCcpO1xufVxuXG4vKlxuICAgIEV2YWx1YXRlIHBlcmNlbnRhZ2UgZnJvbSB0d28gbnVtYmVyc1xuICAgIGlucHV0OiBudW1lcmF0b3IsIGRlbm9taW5hdG9yXG4gICAgb3V0cHV0OiBudW1lcmF0b3IvZGVub21pbmF0b3IgJVxuKi9cbmV4cG9ydCBmdW5jdGlvbiBwZXJjZW50KG51bWUsIGRlbm8sIGZpeGVkPTIpe1xuICBsZXQgcGVyYztcbiAgaWYgKHR5cGVvZiBudW0gIT09ICdudW1iZXInIHx8IHR5cGVvZiBkZW5vICE9PSAnbnVtYmVyJykgcGVyYyA9IE51bWJlcihudW1lKS9OdW1iZXIoZGVubykqMTAwO1xuICBlbHNlIHBlcmMgPSBudW1lL2Rlbm8qMTAwO1xuXG4gIHJldHVybiBpc0Zpbml0ZShwZXJjKSA/IHBlcmMudG9GaXhlZChmaXhlZCkgOiB1bmRlZmluZWQ7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9