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


var apiBase = "http://localhost:8012/" + 'api/';
var stateNames = __webpack_require__(/*! ../../json/states.json */ "./public/lib/json/states.json");

function resizeMap() {
  var svgWidth = $('#usmap').width(),
      mapHeight = svgWidth * 2 / 3; // ratio w:h 3:2
  // console.log(svgWidth, mapHeight);
  $('#usmap svg').attr('width', svgWidth).attr('height', mapHeight);
};

var cdFetch = undefined; // core data fetch
function getStateData(abbr) {
  if (!cdFetch || !stateNames[abbr]) return undefined;
  var name = stateNames[abbr];
  var coll = cdFetch.usa.data.collected[name];
  if (!coll) {
    // no reports! good
    coll = { total: 0, deaths: 0, recovered: 0 };
  }
  return { abbr: abbr, name: name, data: coll };
}

function loadStateData(stateData, abbr) {
  var sd = stateData,
      idMap = '#usmap-state',
      idStat = idMap + '-stat';
  // stats
  $(idMap + '-name').text(sd.name);
  $(idStat + '-total').text(sd.data.total);
  $(idStat + '-deaths').text(sd.data.deaths);
  $(idStat + '-recov').text(sd.data.recovered);
  // counties
  $(idMap + '-counties').html('');
  if (!cdFetch.states || !cdFetch.states.data || !cdFetch.states.data[abbr]) return;
  var countyData = cdFetch.states.data[abbr],
      countyNames = Object.keys(countyData);
  countyNames.sort(function (a, b) {
    return countyData[a].total < countyData[b].total ? 1 : countyData[a].total > countyData[b].total ? -1 : 0;
  });
  countyNames.splice(countyNames.indexOf('_statewide'), 1);

  if (countyData._statewide.total > sd.data.total) $(idStat + '-total').text(countyData._statewide.total);
  if (countyData._statewide.deaths > sd.data.deaths) $(idStat + '-deaths').text(countyData._statewide.deaths);

  countyNames.forEach(function (county) {
    return $(idMap + '-counties').append(stateCaseTemplate(county, countyData[county]));
  });
  // const ud = cdFetch.usa.data.compiled;
  // $(idStat+'-total').text(ud.total);
  // $(idStat+'-so').text(ud.states.total);
  // $(idStat+'-ns').text(ud.non.total);
}

function stateCaseTemplate(name, data) {
  // {location: S, recovered: N, total: N, deaths: N}
  return '<div class="state-county">' + ('<div class="state-county-item loc">' + name + '</div>') + ('<div class="state-county-item stat total">' + data.total + '</div>') + ('<div class="state-county-item stat deaths">' + data.deaths + '</div>') + ('<div class="state-county-item stat recov">' + (data.recovered || '?') + '</div>') + '</div>';
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

      var stateData = getStateData(abbr);
      console.log(stateData);
      loadStateData(stateData, abbr);
    }
  });

  $(window).on('resize', function () {
    resizeMap();
  });

  var ajax = $.ajax({
    method: 'GET',
    url: apiBase + 'core/all',
    dataType: 'json'
  });
  ajax.done(function (data) {
    // console.log(data);
    cdFetch = data;
  });
  ajax.fail(function (a, b, c) {
    return console.error(a, b, c);
  });
})(jQuery);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2xpYi9qcy9jdXN0b20vc3RhdGVzLmpzIl0sIm5hbWVzIjpbImFwaUJhc2UiLCJwcm9jZXNzIiwic3RhdGVOYW1lcyIsInJlcXVpcmUiLCJyZXNpemVNYXAiLCJzdmdXaWR0aCIsIiQiLCJ3aWR0aCIsIm1hcEhlaWdodCIsImF0dHIiLCJjZEZldGNoIiwidW5kZWZpbmVkIiwiZ2V0U3RhdGVEYXRhIiwiYWJiciIsIm5hbWUiLCJjb2xsIiwidXNhIiwiZGF0YSIsImNvbGxlY3RlZCIsInRvdGFsIiwiZGVhdGhzIiwicmVjb3ZlcmVkIiwibG9hZFN0YXRlRGF0YSIsInN0YXRlRGF0YSIsInNkIiwiaWRNYXAiLCJpZFN0YXQiLCJ0ZXh0IiwiaHRtbCIsInN0YXRlcyIsImNvdW50eURhdGEiLCJjb3VudHlOYW1lcyIsIk9iamVjdCIsImtleXMiLCJzb3J0IiwiYSIsImIiLCJzcGxpY2UiLCJpbmRleE9mIiwiX3N0YXRld2lkZSIsImZvckVhY2giLCJhcHBlbmQiLCJzdGF0ZUNhc2VUZW1wbGF0ZSIsImNvdW50eSIsInVzbWFwIiwic3RhdGVTdHlsZXMiLCJmaWxsIiwic3Ryb2tlIiwic3RhdGVIb3ZlclN0eWxlcyIsInN0YXRlSG92ZXJBbmltYXRpb24iLCJsYWJlbEJhY2tpbmdIb3ZlclN0eWxlcyIsImNsaWNrIiwiZXZlbnQiLCJjb25zb2xlIiwibG9nIiwid2luZG93Iiwib24iLCJhamF4IiwibWV0aG9kIiwidXJsIiwiZGF0YVR5cGUiLCJkb25lIiwiZmFpbCIsImMiLCJlcnJvciIsImpRdWVyeSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FB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QUFhLEVBQUNDLE1BQU0sU0FBUCxFQUFrQkMsUUFBUSxNQUExQixFQUZHO0FBR2hCQyxzQkFBa0IsRUFBQ0YsTUFBTSxTQUFQLEVBSEY7QUFJaEJHLHlCQUFxQixHQUpMO0FBS2hCQyw2QkFBeUIsRUFBQ0osTUFBTSxTQUFQLEVBTFQ7QUFNaEI7QUFDQUssV0FBTyxlQUFTQyxLQUFULEVBQWdCbkMsSUFBaEIsRUFBcUI7QUFBQSxVQUNiSixJQURhLEdBQ0xJLElBREssQ0FDbkJILElBRG1COztBQUUxQixVQUFNUyxZQUFZWCxhQUFhQyxJQUFiLENBQWxCO0FBQ0F3QyxjQUFRQyxHQUFSLENBQVkvQixTQUFaO0FBQ0FELG9CQUFjQyxTQUFkLEVBQXlCVixJQUF6QjtBQUNEO0FBWmUsR0FBbEI7O0FBZUFQLElBQUVpRCxNQUFGLEVBQVVDLEVBQVYsQ0FBYSxRQUFiLEVBQXVCLFlBQVU7QUFDL0JwRDtBQUNELEdBRkQ7O0FBSUEsTUFBTXFELE9BQU9uRCxFQUFFbUQsSUFBRixDQUFPO0FBQ2xCQyxZQUFRLEtBRFU7QUFFbEJDLFNBQUszRCxVQUFRLFVBRks7QUFHbEI0RCxjQUFVO0FBSFEsR0FBUCxDQUFiO0FBS0FILE9BQUtJLElBQUwsQ0FBVSxnQkFBUTtBQUNoQjtBQUNBbkQsY0FBVU8sSUFBVjtBQUNELEdBSEQ7QUFJQXdDLE9BQUtLLElBQUwsQ0FBVSxVQUFDM0IsQ0FBRCxFQUFJQyxDQUFKLEVBQU8yQixDQUFQO0FBQUEsV0FBYVYsUUFBUVcsS0FBUixDQUFjN0IsQ0FBZCxFQUFpQkMsQ0FBakIsRUFBb0IyQixDQUFwQixDQUFiO0FBQUEsR0FBVjtBQUNELENBOUJELEVBOEJHRSxNQTlCSCxFIiwiZmlsZSI6InN0YXRlcy5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3B1YmxpYy9saWIvanMvY3VzdG9tL3N0YXRlcy5qc1wiKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgYXBpQmFzZSA9IHByb2Nlc3MuZW52LkFQSV9VUkwrJ2FwaS8nO1xuY29uc3Qgc3RhdGVOYW1lcyA9IHJlcXVpcmUoJy4uLy4uL2pzb24vc3RhdGVzLmpzb24nKTtcblxuZnVuY3Rpb24gcmVzaXplTWFwKCl7XG4gIGNvbnN0IHN2Z1dpZHRoID0gJCgnI3VzbWFwJykud2lkdGgoKSwgbWFwSGVpZ2h0ID0gc3ZnV2lkdGggKiAyLzM7IC8vIHJhdGlvIHc6aCAzOjJcbiAgLy8gY29uc29sZS5sb2coc3ZnV2lkdGgsIG1hcEhlaWdodCk7XG4gICQoJyN1c21hcCBzdmcnKS5hdHRyKCd3aWR0aCcsIHN2Z1dpZHRoKS5hdHRyKCdoZWlnaHQnLCBtYXBIZWlnaHQpO1xufTtcblxubGV0IGNkRmV0Y2ggPSB1bmRlZmluZWQ7IC8vIGNvcmUgZGF0YSBmZXRjaFxuZnVuY3Rpb24gZ2V0U3RhdGVEYXRhKGFiYnIpe1xuICBpZiAoIWNkRmV0Y2ggfHwgIXN0YXRlTmFtZXNbYWJicl0pIHJldHVybiB1bmRlZmluZWQ7XG4gIGNvbnN0IG5hbWUgPSBzdGF0ZU5hbWVzW2FiYnJdO1xuICBsZXQgY29sbCA9IGNkRmV0Y2gudXNhLmRhdGEuY29sbGVjdGVkW25hbWVdO1xuICBpZiAoIWNvbGwpeyAvLyBubyByZXBvcnRzISBnb29kXG4gICAgY29sbCA9IHt0b3RhbDogMCwgZGVhdGhzOiAwLCByZWNvdmVyZWQ6IDB9O1xuICB9XG4gIHJldHVybiB7YWJiciwgbmFtZTogbmFtZSwgZGF0YTogY29sbH07XG59XG5cbmZ1bmN0aW9uIGxvYWRTdGF0ZURhdGEoc3RhdGVEYXRhLCBhYmJyKXtcbiAgY29uc3Qgc2QgPSBzdGF0ZURhdGEsIGlkTWFwID0gJyN1c21hcC1zdGF0ZScsIGlkU3RhdCA9IGlkTWFwKyctc3RhdCc7XG4gIC8vIHN0YXRzXG4gICQoaWRNYXArJy1uYW1lJykudGV4dChzZC5uYW1lKTtcbiAgJChpZFN0YXQrJy10b3RhbCcpLnRleHQoc2QuZGF0YS50b3RhbCk7XG4gICQoaWRTdGF0KyctZGVhdGhzJykudGV4dChzZC5kYXRhLmRlYXRocyk7XG4gICQoaWRTdGF0KyctcmVjb3YnKS50ZXh0KHNkLmRhdGEucmVjb3ZlcmVkKTtcbiAgLy8gY291bnRpZXNcbiAgJChpZE1hcCsnLWNvdW50aWVzJykuaHRtbCgnJyk7XG4gIGlmICghY2RGZXRjaC5zdGF0ZXMgfHwgIWNkRmV0Y2guc3RhdGVzLmRhdGEgfHwgIWNkRmV0Y2guc3RhdGVzLmRhdGFbYWJicl0pIHJldHVybjtcbiAgY29uc3QgY291bnR5RGF0YSA9IGNkRmV0Y2guc3RhdGVzLmRhdGFbYWJicl0sIGNvdW50eU5hbWVzID0gT2JqZWN0LmtleXMoY291bnR5RGF0YSk7XG4gIGNvdW50eU5hbWVzLnNvcnQoKGEsIGIpID0+IGNvdW50eURhdGFbYV0udG90YWwgPCBjb3VudHlEYXRhW2JdLnRvdGFsID8gMSA6IGNvdW50eURhdGFbYV0udG90YWwgPiBjb3VudHlEYXRhW2JdLnRvdGFsID8gLTEgOiAwKTtcbiAgY291bnR5TmFtZXMuc3BsaWNlKGNvdW50eU5hbWVzLmluZGV4T2YoJ19zdGF0ZXdpZGUnKSwgMSk7XG5cbiAgaWYgKGNvdW50eURhdGEuX3N0YXRld2lkZS50b3RhbCA+IHNkLmRhdGEudG90YWwpICQoaWRTdGF0KyctdG90YWwnKS50ZXh0KGNvdW50eURhdGEuX3N0YXRld2lkZS50b3RhbCk7XG4gIGlmIChjb3VudHlEYXRhLl9zdGF0ZXdpZGUuZGVhdGhzID4gc2QuZGF0YS5kZWF0aHMpICQoaWRTdGF0KyctZGVhdGhzJykudGV4dChjb3VudHlEYXRhLl9zdGF0ZXdpZGUuZGVhdGhzKTtcblxuICBjb3VudHlOYW1lcy5mb3JFYWNoKGNvdW50eSA9PiAkKGlkTWFwKyctY291bnRpZXMnKS5hcHBlbmQoc3RhdGVDYXNlVGVtcGxhdGUoY291bnR5LCBjb3VudHlEYXRhW2NvdW50eV0pKSk7XG4gIC8vIGNvbnN0IHVkID0gY2RGZXRjaC51c2EuZGF0YS5jb21waWxlZDtcbiAgLy8gJChpZFN0YXQrJy10b3RhbCcpLnRleHQodWQudG90YWwpO1xuICAvLyAkKGlkU3RhdCsnLXNvJykudGV4dCh1ZC5zdGF0ZXMudG90YWwpO1xuICAvLyAkKGlkU3RhdCsnLW5zJykudGV4dCh1ZC5ub24udG90YWwpO1xufVxuXG5mdW5jdGlvbiBzdGF0ZUNhc2VUZW1wbGF0ZShuYW1lLCBkYXRhKXtcbiAgLy8ge2xvY2F0aW9uOiBTLCByZWNvdmVyZWQ6IE4sIHRvdGFsOiBOLCBkZWF0aHM6IE59XG4gIHJldHVybiAnPGRpdiBjbGFzcz1cInN0YXRlLWNvdW50eVwiPicrXG4gIGA8ZGl2IGNsYXNzPVwic3RhdGUtY291bnR5LWl0ZW0gbG9jXCI+JHtuYW1lfTwvZGl2PmArXG4gIGA8ZGl2IGNsYXNzPVwic3RhdGUtY291bnR5LWl0ZW0gc3RhdCB0b3RhbFwiPiR7ZGF0YS50b3RhbH08L2Rpdj5gK1xuICBgPGRpdiBjbGFzcz1cInN0YXRlLWNvdW50eS1pdGVtIHN0YXQgZGVhdGhzXCI+JHtkYXRhLmRlYXRoc308L2Rpdj5gK1xuICBgPGRpdiBjbGFzcz1cInN0YXRlLWNvdW50eS1pdGVtIHN0YXQgcmVjb3ZcIj4ke2RhdGEucmVjb3ZlcmVkIHx8ICc/J308L2Rpdj5gK1xuICAnPC9kaXY+Jztcbn1cblxuKGZ1bmN0aW9uKCQpe1xuICAkKCcjdXNtYXAnKS51c21hcCh7XG4gICAgLy8gaHR0cHM6Ly9uZXdzaWduYXR1cmUuZ2l0aHViLmlvL3VzLW1hcC8jdXNhZ2Utc3R5bGUtb3B0aW9uc1xuICAgIHN0YXRlU3R5bGVzOiB7ZmlsbDogJyNmMWYyZjMnLCBzdHJva2U6ICcjOTk5J30sXG4gICAgc3RhdGVIb3ZlclN0eWxlczoge2ZpbGw6ICcjZGI0MDMxJ30sXG4gICAgc3RhdGVIb3ZlckFuaW1hdGlvbjogMTAwLFxuICAgIGxhYmVsQmFja2luZ0hvdmVyU3R5bGVzOiB7ZmlsbDogJyNkYjQwMzEnfSxcbiAgICAvLyBUaGUgY2xpY2sgYWN0aW9uXG4gICAgY2xpY2s6IGZ1bmN0aW9uKGV2ZW50LCBkYXRhKXtcbiAgICAgIGNvbnN0IHtuYW1lOiBhYmJyfSA9IGRhdGE7XG4gICAgICBjb25zdCBzdGF0ZURhdGEgPSBnZXRTdGF0ZURhdGEoYWJicik7XG4gICAgICBjb25zb2xlLmxvZyhzdGF0ZURhdGEpO1xuICAgICAgbG9hZFN0YXRlRGF0YShzdGF0ZURhdGEsIGFiYnIpO1xuICAgIH0sXG4gIH0pO1xuXG4gICQod2luZG93KS5vbigncmVzaXplJywgZnVuY3Rpb24oKXtcbiAgICByZXNpemVNYXAoKTtcbiAgfSk7XG5cbiAgY29uc3QgYWpheCA9ICQuYWpheCh7XG4gICAgbWV0aG9kOiAnR0VUJyxcbiAgICB1cmw6IGFwaUJhc2UrJ2NvcmUvYWxsJyxcbiAgICBkYXRhVHlwZTogJ2pzb24nLFxuICB9KTtcbiAgYWpheC5kb25lKGRhdGEgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIGNkRmV0Y2ggPSBkYXRhO1xuICB9KTtcbiAgYWpheC5mYWlsKChhLCBiLCBjKSA9PiBjb25zb2xlLmVycm9yKGEsIGIsIGMpKTtcbn0pKGpRdWVyeSk7XG4iXSwic291cmNlUm9vdCI6IiJ9