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

function loadStateData(stateData) {
  var sd = stateData,
      idMap = '#usmap-state',
      idStat = idMap + '-stat';
  // stats
  $(idMap + '-name').text(sd.name);
  $(idStat + '-total').text(sd.data.total);
  $(idStat + '-deaths').text(sd.data.deaths);
  $(idStat + '-recov').text(sd.data.recovered);
  // cases
  // console.log(sd.data.cases);
  $(idMap + '-cases').html('');
  sd.data.cases.forEach(function (sCase) {
    return $(idMap + '-cases').append(stateCaseTemplate(sCase));
  });
  // const ud = cdFetch.usa.data.compiled;
  // $(idStat+'-total').text(ud.total);
  // $(idStat+'-so').text(ud.states.total);
  // $(idStat+'-ns').text(ud.non.total);
}

function stateCaseTemplate(data) {
  // {location: S, recovered: N, confirmed: N, deaths: N}
  return '<div class="state-case">' + ('<div class="state-case-item loc">' + data.location + '</div>') + ('<div class="state-case-item stat total">' + data.confirmed + '</div>') + ('<div class="state-case-item stat deaths">' + data.deaths + '</div>') + ('<div class="state-case-item stat recov">' + data.recovered + '</div>') + '</div>';
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
      loadStateData(stateData);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2xpYi9qcy9jdXN0b20vc3RhdGVzLmpzIl0sIm5hbWVzIjpbImFwaUJhc2UiLCJwcm9jZXNzIiwic3RhdGVOYW1lcyIsInJlcXVpcmUiLCJyZXNpemVNYXAiLCJzdmdXaWR0aCIsIiQiLCJ3aWR0aCIsIm1hcEhlaWdodCIsImF0dHIiLCJjZEZldGNoIiwidW5kZWZpbmVkIiwiZ2V0U3RhdGVEYXRhIiwiYWJiciIsIm5hbWUiLCJjb2xsIiwidXNhIiwiZGF0YSIsImNvbGxlY3RlZCIsInRvdGFsIiwiZGVhdGhzIiwicmVjb3ZlcmVkIiwibG9hZFN0YXRlRGF0YSIsInN0YXRlRGF0YSIsInNkIiwiaWRNYXAiLCJpZFN0YXQiLCJ0ZXh0IiwiaHRtbCIsImNhc2VzIiwiZm9yRWFjaCIsImFwcGVuZCIsInN0YXRlQ2FzZVRlbXBsYXRlIiwic0Nhc2UiLCJsb2NhdGlvbiIsImNvbmZpcm1lZCIsInVzbWFwIiwic3RhdGVTdHlsZXMiLCJmaWxsIiwic3Ryb2tlIiwic3RhdGVIb3ZlclN0eWxlcyIsInN0YXRlSG92ZXJBbmltYXRpb24iLCJsYWJlbEJhY2tpbmdIb3ZlclN0eWxlcyIsImNsaWNrIiwiZXZlbnQiLCJjb25zb2xlIiwibG9nIiwid2luZG93Iiwib24iLCJhamF4IiwibWV0aG9kIiwidXJsIiwiZGF0YVR5cGUiLCJkb25lIiwiZmFpbCIsImEiLCJiIiwiYyIsImVycm9yIiwialF1ZXJ5Il0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FB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O0FBQ2hCO0FBQ0FDLGlCQUFhLEVBQUNDLE1BQU0sU0FBUCxFQUFrQkMsUUFBUSxNQUExQixFQUZHO0FBR2hCQyxzQkFBa0IsRUFBQ0YsTUFBTSxTQUFQLEVBSEY7QUFJaEJHLHlCQUFxQixHQUpMO0FBS2hCQyw2QkFBeUIsRUFBQ0osTUFBTSxTQUFQLEVBTFQ7QUFNaEI7QUFDQUssV0FBTyxlQUFTQyxLQUFULEVBQWdCM0IsSUFBaEIsRUFBcUI7QUFBQSxVQUNiSixJQURhLEdBQ0xJLElBREssQ0FDbkJILElBRG1COztBQUUxQixVQUFNUyxZQUFZWCxhQUFhQyxJQUFiLENBQWxCO0FBQ0FnQyxjQUFRQyxHQUFSLENBQVl2QixTQUFaO0FBQ0FELG9CQUFjQyxTQUFkO0FBQ0Q7QUFaZSxHQUFsQjs7QUFlQWpCLElBQUV5QyxNQUFGLEVBQVVDLEVBQVYsQ0FBYSxRQUFiLEVBQXVCLFlBQVU7QUFDL0I1QztBQUNELEdBRkQ7O0FBSUEsTUFBTTZDLE9BQU8zQyxFQUFFMkMsSUFBRixDQUFPO0FBQ2xCQyxZQUFRLEtBRFU7QUFFbEJDLFNBQUtuRCxVQUFRLFVBRks7QUFHbEJvRCxjQUFVO0FBSFEsR0FBUCxDQUFiO0FBS0FILE9BQUtJLElBQUwsQ0FBVSxnQkFBUTtBQUNoQjtBQUNBM0MsY0FBVU8sSUFBVjtBQUNELEdBSEQ7QUFJQWdDLE9BQUtLLElBQUwsQ0FBVSxVQUFDQyxDQUFELEVBQUlDLENBQUosRUFBT0MsQ0FBUDtBQUFBLFdBQWFaLFFBQVFhLEtBQVIsQ0FBY0gsQ0FBZCxFQUFpQkMsQ0FBakIsRUFBb0JDLENBQXBCLENBQWI7QUFBQSxHQUFWO0FBQ0QsQ0E5QkQsRUE4QkdFLE1BOUJILEUiLCJmaWxlIjoic3RhdGVzLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vcHVibGljL2xpYi9qcy9jdXN0b20vc3RhdGVzLmpzXCIpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBhcGlCYXNlID0gcHJvY2Vzcy5lbnYuQVBJX1VSTCsnYXBpLyc7XG5jb25zdCBzdGF0ZU5hbWVzID0gcmVxdWlyZSgnLi4vLi4vanNvbi9zdGF0ZXMuanNvbicpO1xuXG5mdW5jdGlvbiByZXNpemVNYXAoKXtcbiAgY29uc3Qgc3ZnV2lkdGggPSAkKCcjdXNtYXAnKS53aWR0aCgpLCBtYXBIZWlnaHQgPSBzdmdXaWR0aCAqIDIvMzsgLy8gcmF0aW8gdzpoIDM6MlxuICAvLyBjb25zb2xlLmxvZyhzdmdXaWR0aCwgbWFwSGVpZ2h0KTtcbiAgJCgnI3VzbWFwIHN2ZycpLmF0dHIoJ3dpZHRoJywgc3ZnV2lkdGgpLmF0dHIoJ2hlaWdodCcsIG1hcEhlaWdodCk7XG59O1xuXG5sZXQgY2RGZXRjaCA9IHVuZGVmaW5lZDsgLy8gY29yZSBkYXRhIGZldGNoXG5mdW5jdGlvbiBnZXRTdGF0ZURhdGEoYWJicil7XG4gIGlmICghY2RGZXRjaCB8fCAhc3RhdGVOYW1lc1thYmJyXSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgY29uc3QgbmFtZSA9IHN0YXRlTmFtZXNbYWJicl07XG4gIGxldCBjb2xsID0gY2RGZXRjaC51c2EuZGF0YS5jb2xsZWN0ZWRbbmFtZV07XG4gIGlmICghY29sbCl7IC8vIG5vIHJlcG9ydHMhIGdvb2RcbiAgICBjb2xsID0ge3RvdGFsOiAwLCBkZWF0aHM6IDAsIHJlY292ZXJlZDogMH07XG4gIH1cbiAgcmV0dXJuIHthYmJyLCBuYW1lOiBuYW1lLCBkYXRhOiBjb2xsfTtcbn1cblxuZnVuY3Rpb24gbG9hZFN0YXRlRGF0YShzdGF0ZURhdGEpe1xuICBjb25zdCBzZCA9IHN0YXRlRGF0YSwgaWRNYXAgPSAnI3VzbWFwLXN0YXRlJywgaWRTdGF0ID0gaWRNYXArJy1zdGF0JztcbiAgLy8gc3RhdHNcbiAgJChpZE1hcCsnLW5hbWUnKS50ZXh0KHNkLm5hbWUpO1xuICAkKGlkU3RhdCsnLXRvdGFsJykudGV4dChzZC5kYXRhLnRvdGFsKTtcbiAgJChpZFN0YXQrJy1kZWF0aHMnKS50ZXh0KHNkLmRhdGEuZGVhdGhzKTtcbiAgJChpZFN0YXQrJy1yZWNvdicpLnRleHQoc2QuZGF0YS5yZWNvdmVyZWQpO1xuICAvLyBjYXNlc1xuICAvLyBjb25zb2xlLmxvZyhzZC5kYXRhLmNhc2VzKTtcbiAgJChpZE1hcCsnLWNhc2VzJykuaHRtbCgnJyk7XG4gIHNkLmRhdGEuY2FzZXMuZm9yRWFjaChzQ2FzZSA9PiAkKGlkTWFwKyctY2FzZXMnKS5hcHBlbmQoc3RhdGVDYXNlVGVtcGxhdGUoc0Nhc2UpKSk7XG4gIC8vIGNvbnN0IHVkID0gY2RGZXRjaC51c2EuZGF0YS5jb21waWxlZDtcbiAgLy8gJChpZFN0YXQrJy10b3RhbCcpLnRleHQodWQudG90YWwpO1xuICAvLyAkKGlkU3RhdCsnLXNvJykudGV4dCh1ZC5zdGF0ZXMudG90YWwpO1xuICAvLyAkKGlkU3RhdCsnLW5zJykudGV4dCh1ZC5ub24udG90YWwpO1xufVxuXG5mdW5jdGlvbiBzdGF0ZUNhc2VUZW1wbGF0ZShkYXRhKXtcbiAgLy8ge2xvY2F0aW9uOiBTLCByZWNvdmVyZWQ6IE4sIGNvbmZpcm1lZDogTiwgZGVhdGhzOiBOfVxuICByZXR1cm4gJzxkaXYgY2xhc3M9XCJzdGF0ZS1jYXNlXCI+JytcbiAgYDxkaXYgY2xhc3M9XCJzdGF0ZS1jYXNlLWl0ZW0gbG9jXCI+JHtkYXRhLmxvY2F0aW9ufTwvZGl2PmArXG4gIGA8ZGl2IGNsYXNzPVwic3RhdGUtY2FzZS1pdGVtIHN0YXQgdG90YWxcIj4ke2RhdGEuY29uZmlybWVkfTwvZGl2PmArXG4gIGA8ZGl2IGNsYXNzPVwic3RhdGUtY2FzZS1pdGVtIHN0YXQgZGVhdGhzXCI+JHtkYXRhLmRlYXRoc308L2Rpdj5gK1xuICBgPGRpdiBjbGFzcz1cInN0YXRlLWNhc2UtaXRlbSBzdGF0IHJlY292XCI+JHtkYXRhLnJlY292ZXJlZH08L2Rpdj5gK1xuICAnPC9kaXY+Jztcbn1cblxuKGZ1bmN0aW9uKCQpe1xuICAkKCcjdXNtYXAnKS51c21hcCh7XG4gICAgLy8gaHR0cHM6Ly9uZXdzaWduYXR1cmUuZ2l0aHViLmlvL3VzLW1hcC8jdXNhZ2Utc3R5bGUtb3B0aW9uc1xuICAgIHN0YXRlU3R5bGVzOiB7ZmlsbDogJyNmMWYyZjMnLCBzdHJva2U6ICcjOTk5J30sXG4gICAgc3RhdGVIb3ZlclN0eWxlczoge2ZpbGw6ICcjZGI0MDMxJ30sXG4gICAgc3RhdGVIb3ZlckFuaW1hdGlvbjogMTAwLFxuICAgIGxhYmVsQmFja2luZ0hvdmVyU3R5bGVzOiB7ZmlsbDogJyNkYjQwMzEnfSxcbiAgICAvLyBUaGUgY2xpY2sgYWN0aW9uXG4gICAgY2xpY2s6IGZ1bmN0aW9uKGV2ZW50LCBkYXRhKXtcbiAgICAgIGNvbnN0IHtuYW1lOiBhYmJyfSA9IGRhdGE7XG4gICAgICBjb25zdCBzdGF0ZURhdGEgPSBnZXRTdGF0ZURhdGEoYWJicik7XG4gICAgICBjb25zb2xlLmxvZyhzdGF0ZURhdGEpO1xuICAgICAgbG9hZFN0YXRlRGF0YShzdGF0ZURhdGEpO1xuICAgIH0sXG4gIH0pO1xuXG4gICQod2luZG93KS5vbigncmVzaXplJywgZnVuY3Rpb24oKXtcbiAgICByZXNpemVNYXAoKTtcbiAgfSk7XG5cbiAgY29uc3QgYWpheCA9ICQuYWpheCh7XG4gICAgbWV0aG9kOiAnR0VUJyxcbiAgICB1cmw6IGFwaUJhc2UrJ2NvcmUvYWxsJyxcbiAgICBkYXRhVHlwZTogJ2pzb24nLFxuICB9KTtcbiAgYWpheC5kb25lKGRhdGEgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIGNkRmV0Y2ggPSBkYXRhO1xuICB9KTtcbiAgYWpheC5mYWlsKChhLCBiLCBjKSA9PiBjb25zb2xlLmVycm9yKGEsIGIsIGMpKTtcbn0pKGpRdWVyeSk7XG4iXSwic291cmNlUm9vdCI6IiJ9