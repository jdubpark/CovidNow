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
  var coll = cdFetch.usa.data.collected[abbr];
  if (!coll) {
    // no reports! good
    coll = { total: 0, deaths: 0, recovered: 0 };
  }
  return { abbr: abbr, name: stateNames[abbr], data: coll };
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
    url: 'http://localhost:8012/api/core/all',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2xpYi9qcy9jdXN0b20vc3RhdGVzLmpzIl0sIm5hbWVzIjpbInN0YXRlTmFtZXMiLCJyZXF1aXJlIiwicmVzaXplTWFwIiwic3ZnV2lkdGgiLCIkIiwid2lkdGgiLCJtYXBIZWlnaHQiLCJhdHRyIiwiY2RGZXRjaCIsInVuZGVmaW5lZCIsImdldFN0YXRlRGF0YSIsImFiYnIiLCJjb2xsIiwidXNhIiwiZGF0YSIsImNvbGxlY3RlZCIsInRvdGFsIiwiZGVhdGhzIiwicmVjb3ZlcmVkIiwibmFtZSIsImxvYWRTdGF0ZURhdGEiLCJzdGF0ZURhdGEiLCJzZCIsImlkTWFwIiwiaWRTdGF0IiwidGV4dCIsImh0bWwiLCJjYXNlcyIsImZvckVhY2giLCJhcHBlbmQiLCJzdGF0ZUNhc2VUZW1wbGF0ZSIsInNDYXNlIiwibG9jYXRpb24iLCJjb25maXJtZWQiLCJ1c21hcCIsInN0YXRlU3R5bGVzIiwiZmlsbCIsInN0cm9rZSIsInN0YXRlSG92ZXJTdHlsZXMiLCJzdGF0ZUhvdmVyQW5pbWF0aW9uIiwibGFiZWxCYWNraW5nSG92ZXJTdHlsZXMiLCJjbGljayIsImV2ZW50IiwiY29uc29sZSIsImxvZyIsIndpbmRvdyIsIm9uIiwiYWpheCIsIm1ldGhvZCIsInVybCIsImRhdGFUeXBlIiwiZG9uZSIsImZhaWwiLCJhIiwiYiIsImMiLCJlcnJvciIsImpRdWVyeSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFD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Q0YsTUFBTSxTQUFQLEVBSEY7QUFJaEJHLHlCQUFxQixHQUpMO0FBS2hCQyw2QkFBeUIsRUFBQ0osTUFBTSxTQUFQLEVBTFQ7QUFNaEI7QUFDQUssV0FBTyxlQUFTQyxLQUFULEVBQWdCNUIsSUFBaEIsRUFBcUI7QUFBQSxVQUNiSCxJQURhLEdBQ0xHLElBREssQ0FDbkJLLElBRG1COztBQUUxQixVQUFNRSxZQUFZWCxhQUFhQyxJQUFiLENBQWxCO0FBQ0FnQyxjQUFRQyxHQUFSLENBQVl2QixTQUFaO0FBQ0FELG9CQUFjQyxTQUFkO0FBQ0Q7QUFaZSxHQUFsQjs7QUFlQWpCLElBQUV5QyxNQUFGLEVBQVVDLEVBQVYsQ0FBYSxRQUFiLEVBQXVCLFlBQVU7QUFDL0I1QztBQUNELEdBRkQ7O0FBSUEsTUFBTTZDLE9BQU8zQyxFQUFFMkMsSUFBRixDQUFPO0FBQ2xCQyxZQUFRLEtBRFU7QUFFbEJDLFNBQUssb0NBRmE7QUFHbEJDLGNBQVU7QUFIUSxHQUFQLENBQWI7QUFLQUgsT0FBS0ksSUFBTCxDQUFVLGdCQUFRO0FBQ2hCO0FBQ0EzQyxjQUFVTSxJQUFWO0FBQ0QsR0FIRDtBQUlBaUMsT0FBS0ssSUFBTCxDQUFVLFVBQUNDLENBQUQsRUFBSUMsQ0FBSixFQUFPQyxDQUFQO0FBQUEsV0FBYVosUUFBUWEsS0FBUixDQUFjSCxDQUFkLEVBQWlCQyxDQUFqQixFQUFvQkMsQ0FBcEIsQ0FBYjtBQUFBLEdBQVY7QUFDRCxDQTlCRCxFQThCR0UsTUE5QkgsRSIsImZpbGUiOiJzdGF0ZXMuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9wdWJsaWMvbGliL2pzL2N1c3RvbS9zdGF0ZXMuanNcIik7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHN0YXRlTmFtZXMgPSByZXF1aXJlKCcuLi8uLi9qc29uL3N0YXRlcy5qc29uJyk7XG5cbmZ1bmN0aW9uIHJlc2l6ZU1hcCgpe1xuICBjb25zdCBzdmdXaWR0aCA9ICQoJyN1c21hcCcpLndpZHRoKCksIG1hcEhlaWdodCA9IHN2Z1dpZHRoICogMi8zOyAvLyByYXRpbyB3OmggMzoyXG4gIC8vIGNvbnNvbGUubG9nKHN2Z1dpZHRoLCBtYXBIZWlnaHQpO1xuICAkKCcjdXNtYXAgc3ZnJykuYXR0cignd2lkdGgnLCBzdmdXaWR0aCkuYXR0cignaGVpZ2h0JywgbWFwSGVpZ2h0KTtcbn07XG5cbmxldCBjZEZldGNoID0gdW5kZWZpbmVkOyAvLyBjb3JlIGRhdGEgZmV0Y2hcbmZ1bmN0aW9uIGdldFN0YXRlRGF0YShhYmJyKXtcbiAgaWYgKCFjZEZldGNoIHx8ICFzdGF0ZU5hbWVzW2FiYnJdKSByZXR1cm4gdW5kZWZpbmVkO1xuICBsZXQgY29sbCA9IGNkRmV0Y2gudXNhLmRhdGEuY29sbGVjdGVkW2FiYnJdO1xuICBpZiAoIWNvbGwpeyAvLyBubyByZXBvcnRzISBnb29kXG4gICAgY29sbCA9IHt0b3RhbDogMCwgZGVhdGhzOiAwLCByZWNvdmVyZWQ6IDB9O1xuICB9XG4gIHJldHVybiB7YWJiciwgbmFtZTogc3RhdGVOYW1lc1thYmJyXSwgZGF0YTogY29sbH07XG59XG5cbmZ1bmN0aW9uIGxvYWRTdGF0ZURhdGEoc3RhdGVEYXRhKXtcbiAgY29uc3Qgc2QgPSBzdGF0ZURhdGEsIGlkTWFwID0gJyN1c21hcC1zdGF0ZScsIGlkU3RhdCA9IGlkTWFwKyctc3RhdCc7XG4gIC8vIHN0YXRzXG4gICQoaWRNYXArJy1uYW1lJykudGV4dChzZC5uYW1lKTtcbiAgJChpZFN0YXQrJy10b3RhbCcpLnRleHQoc2QuZGF0YS50b3RhbCk7XG4gICQoaWRTdGF0KyctZGVhdGhzJykudGV4dChzZC5kYXRhLmRlYXRocyk7XG4gICQoaWRTdGF0KyctcmVjb3YnKS50ZXh0KHNkLmRhdGEucmVjb3ZlcmVkKTtcbiAgLy8gY2FzZXNcbiAgLy8gY29uc29sZS5sb2coc2QuZGF0YS5jYXNlcyk7XG4gICQoaWRNYXArJy1jYXNlcycpLmh0bWwoJycpO1xuICBzZC5kYXRhLmNhc2VzLmZvckVhY2goc0Nhc2UgPT4gJChpZE1hcCsnLWNhc2VzJykuYXBwZW5kKHN0YXRlQ2FzZVRlbXBsYXRlKHNDYXNlKSkpO1xuICAvLyBjb25zdCB1ZCA9IGNkRmV0Y2gudXNhLmRhdGEuY29tcGlsZWQ7XG4gIC8vICQoaWRTdGF0KyctdG90YWwnKS50ZXh0KHVkLnRvdGFsKTtcbiAgLy8gJChpZFN0YXQrJy1zbycpLnRleHQodWQuc3RhdGVzLnRvdGFsKTtcbiAgLy8gJChpZFN0YXQrJy1ucycpLnRleHQodWQubm9uLnRvdGFsKTtcbn1cblxuZnVuY3Rpb24gc3RhdGVDYXNlVGVtcGxhdGUoZGF0YSl7XG4gIC8vIHtsb2NhdGlvbjogUywgcmVjb3ZlcmVkOiBOLCBjb25maXJtZWQ6IE4sIGRlYXRoczogTn1cbiAgcmV0dXJuICc8ZGl2IGNsYXNzPVwic3RhdGUtY2FzZVwiPicrXG4gIGA8ZGl2IGNsYXNzPVwic3RhdGUtY2FzZS1pdGVtIGxvY1wiPiR7ZGF0YS5sb2NhdGlvbn08L2Rpdj5gK1xuICBgPGRpdiBjbGFzcz1cInN0YXRlLWNhc2UtaXRlbSBzdGF0IHRvdGFsXCI+JHtkYXRhLmNvbmZpcm1lZH08L2Rpdj5gK1xuICBgPGRpdiBjbGFzcz1cInN0YXRlLWNhc2UtaXRlbSBzdGF0IGRlYXRoc1wiPiR7ZGF0YS5kZWF0aHN9PC9kaXY+YCtcbiAgYDxkaXYgY2xhc3M9XCJzdGF0ZS1jYXNlLWl0ZW0gc3RhdCByZWNvdlwiPiR7ZGF0YS5yZWNvdmVyZWR9PC9kaXY+YCtcbiAgJzwvZGl2Pic7XG59XG5cbihmdW5jdGlvbigkKXtcbiAgJCgnI3VzbWFwJykudXNtYXAoe1xuICAgIC8vIGh0dHBzOi8vbmV3c2lnbmF0dXJlLmdpdGh1Yi5pby91cy1tYXAvI3VzYWdlLXN0eWxlLW9wdGlvbnNcbiAgICBzdGF0ZVN0eWxlczoge2ZpbGw6ICcjZjFmMmYzJywgc3Ryb2tlOiAnIzk5OSd9LFxuICAgIHN0YXRlSG92ZXJTdHlsZXM6IHtmaWxsOiAnI2RiNDAzMSd9LFxuICAgIHN0YXRlSG92ZXJBbmltYXRpb246IDEwMCxcbiAgICBsYWJlbEJhY2tpbmdIb3ZlclN0eWxlczoge2ZpbGw6ICcjZGI0MDMxJ30sXG4gICAgLy8gVGhlIGNsaWNrIGFjdGlvblxuICAgIGNsaWNrOiBmdW5jdGlvbihldmVudCwgZGF0YSl7XG4gICAgICBjb25zdCB7bmFtZTogYWJicn0gPSBkYXRhO1xuICAgICAgY29uc3Qgc3RhdGVEYXRhID0gZ2V0U3RhdGVEYXRhKGFiYnIpO1xuICAgICAgY29uc29sZS5sb2coc3RhdGVEYXRhKTtcbiAgICAgIGxvYWRTdGF0ZURhdGEoc3RhdGVEYXRhKTtcbiAgICB9LFxuICB9KTtcblxuICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uKCl7XG4gICAgcmVzaXplTWFwKCk7XG4gIH0pO1xuXG4gIGNvbnN0IGFqYXggPSAkLmFqYXgoe1xuICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MDEyL2FwaS9jb3JlL2FsbCcsXG4gICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgfSk7XG4gIGFqYXguZG9uZShkYXRhID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICBjZEZldGNoID0gZGF0YTtcbiAgfSk7XG4gIGFqYXguZmFpbCgoYSwgYiwgYykgPT4gY29uc29sZS5lcnJvcihhLCBiLCBjKSk7XG59KShqUXVlcnkpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==