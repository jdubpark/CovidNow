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
  console.log(sd.data.cases);
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
  return '<div class="state-case">' + ('<div class="state-case-item loc">' + data.location + '</div>') + ('<div class="state-case-item stat total"><span>' + data.confirmed + '</span> Cases</div>') + ('<div class="state-case-item stat deaths"><span>' + data.deaths + '</span> Deaths</div>') + ('<div class="state-case-item stat recov"><span>' + data.recovered + '</span> Recovered</div>') + "</div>";
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
    console.log(data);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2xpYi9qcy9jdXN0b20vc3RhdGVzLmpzIl0sIm5hbWVzIjpbInN0YXRlTmFtZXMiLCJyZXF1aXJlIiwicmVzaXplTWFwIiwic3ZnV2lkdGgiLCIkIiwid2lkdGgiLCJtYXBIZWlnaHQiLCJhdHRyIiwiY2RGZXRjaCIsInVuZGVmaW5lZCIsImdldFN0YXRlRGF0YSIsImFiYnIiLCJjb2xsIiwidXNhIiwiZGF0YSIsImNvbGxlY3RlZCIsInRvdGFsIiwiZGVhdGhzIiwicmVjb3ZlcmVkIiwibmFtZSIsImxvYWRTdGF0ZURhdGEiLCJzdGF0ZURhdGEiLCJzZCIsImlkTWFwIiwiaWRTdGF0IiwidGV4dCIsImNvbnNvbGUiLCJsb2ciLCJjYXNlcyIsImh0bWwiLCJmb3JFYWNoIiwiYXBwZW5kIiwic3RhdGVDYXNlVGVtcGxhdGUiLCJzQ2FzZSIsImxvY2F0aW9uIiwiY29uZmlybWVkIiwidXNtYXAiLCJzdGF0ZVN0eWxlcyIsImZpbGwiLCJzdHJva2UiLCJzdGF0ZUhvdmVyU3R5bGVzIiwic3RhdGVIb3ZlckFuaW1hdGlvbiIsImxhYmVsQmFja2luZ0hvdmVyU3R5bGVzIiwiY2xpY2siLCJldmVudCIsIndpbmRvdyIsIm9uIiwiYWpheCIsIm1ldGhvZCIsInVybCIsImRhdGFUeXBlIiwiZG9uZSIsImZhaWwiLCJhIiwiYiIsImMiLCJlcnJvciIsImpRdWVyeSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFD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QWtCQyxRQUFRLE1BQTFCLEVBRkc7QUFHaEJDLHNCQUFrQixFQUFDRixNQUFNLFNBQVAsRUFIRjtBQUloQkcseUJBQXFCLEdBSkw7QUFLaEJDLDZCQUF5QixFQUFDSixNQUFNLFNBQVAsRUFMVDtBQU1oQjtBQUNBSyxXQUFPLGVBQVNDLEtBQVQsRUFBZ0I5QixJQUFoQixFQUFxQjtBQUFBLFVBQ2JILElBRGEsR0FDTEcsSUFESyxDQUNuQkssSUFEbUI7O0FBRTFCLFVBQU1FLFlBQVlYLGFBQWFDLElBQWIsQ0FBbEI7QUFDQWUsY0FBUUMsR0FBUixDQUFZTixTQUFaO0FBQ0FELG9CQUFjQyxTQUFkO0FBQ0Q7QUFaZSxHQUFsQjs7QUFlQWpCLElBQUV5QyxNQUFGLEVBQVVDLEVBQVYsQ0FBYSxRQUFiLEVBQXVCLFlBQVU7QUFDL0I1QztBQUNELEdBRkQ7O0FBSUEsTUFBTTZDLE9BQU8zQyxFQUFFMkMsSUFBRixDQUFPO0FBQ2xCQyxZQUFRLEtBRFU7QUFFbEJDLFNBQUssb0NBRmE7QUFHbEJDLGNBQVU7QUFIUSxHQUFQLENBQWI7QUFLQUgsT0FBS0ksSUFBTCxDQUFVLGdCQUFRO0FBQ2hCekIsWUFBUUMsR0FBUixDQUFZYixJQUFaO0FBQ0FOLGNBQVVNLElBQVY7QUFDRCxHQUhEO0FBSUFpQyxPQUFLSyxJQUFMLENBQVUsVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKLEVBQU9DLENBQVA7QUFBQSxXQUFhN0IsUUFBUThCLEtBQVIsQ0FBY0gsQ0FBZCxFQUFpQkMsQ0FBakIsRUFBb0JDLENBQXBCLENBQWI7QUFBQSxHQUFWO0FBQ0QsQ0E5QkQsRUE4QkdFLE1BOUJILEUiLCJmaWxlIjoic3RhdGVzLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vcHVibGljL2xpYi9qcy9jdXN0b20vc3RhdGVzLmpzXCIpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBzdGF0ZU5hbWVzID0gcmVxdWlyZSgnLi4vLi4vanNvbi9zdGF0ZXMuanNvbicpO1xuXG5mdW5jdGlvbiByZXNpemVNYXAoKXtcbiAgY29uc3Qgc3ZnV2lkdGggPSAkKCcjdXNtYXAnKS53aWR0aCgpLCBtYXBIZWlnaHQgPSBzdmdXaWR0aCAqIDIvMzsgLy8gcmF0aW8gdzpoIDM6MlxuICAkKCcjdXNtYXAgc3ZnJykuYXR0cignd2lkdGgnLCBzdmdXaWR0aCkuYXR0cignaGVpZ2h0JywgbWFwSGVpZ2h0KTtcbn07XG5cbmxldCBjZEZldGNoID0gdW5kZWZpbmVkOyAvLyBjb3JlIGRhdGEgZmV0Y2hcbmZ1bmN0aW9uIGdldFN0YXRlRGF0YShhYmJyKXtcbiAgaWYgKCFjZEZldGNoIHx8ICFzdGF0ZU5hbWVzW2FiYnJdKSByZXR1cm4gdW5kZWZpbmVkO1xuICBsZXQgY29sbCA9IGNkRmV0Y2gudXNhLmRhdGEuY29sbGVjdGVkW2FiYnJdO1xuICBpZiAoIWNvbGwpeyAvLyBubyByZXBvcnRzISBnb29kXG4gICAgY29sbCA9IHt0b3RhbDogMCwgZGVhdGhzOiAwLCByZWNvdmVyZWQ6IDB9O1xuICB9XG4gIHJldHVybiB7YWJiciwgbmFtZTogc3RhdGVOYW1lc1thYmJyXSwgZGF0YTogY29sbH07XG59XG5cbmZ1bmN0aW9uIGxvYWRTdGF0ZURhdGEoc3RhdGVEYXRhKXtcbiAgY29uc3Qgc2QgPSBzdGF0ZURhdGEsIGlkTWFwID0gJyN1c21hcC1zdGF0ZScsIGlkU3RhdCA9IGlkTWFwKyctc3RhdCc7XG4gIC8vIHN0YXRzXG4gICQoaWRNYXArJy1uYW1lJykudGV4dChzZC5uYW1lKTtcbiAgJChpZFN0YXQrJy10b3RhbCcpLnRleHQoc2QuZGF0YS50b3RhbCk7XG4gICQoaWRTdGF0KyctZGVhdGhzJykudGV4dChzZC5kYXRhLmRlYXRocyk7XG4gICQoaWRTdGF0KyctcmVjb3YnKS50ZXh0KHNkLmRhdGEucmVjb3ZlcmVkKTtcbiAgLy8gY2FzZXNcbiAgY29uc29sZS5sb2coc2QuZGF0YS5jYXNlcyk7XG4gICQoaWRNYXArJy1jYXNlcycpLmh0bWwoJycpO1xuICBzZC5kYXRhLmNhc2VzLmZvckVhY2goc0Nhc2UgPT4gJChpZE1hcCsnLWNhc2VzJykuYXBwZW5kKHN0YXRlQ2FzZVRlbXBsYXRlKHNDYXNlKSkpO1xuICAvLyBjb25zdCB1ZCA9IGNkRmV0Y2gudXNhLmRhdGEuY29tcGlsZWQ7XG4gIC8vICQoaWRTdGF0KyctdG90YWwnKS50ZXh0KHVkLnRvdGFsKTtcbiAgLy8gJChpZFN0YXQrJy1zbycpLnRleHQodWQuc3RhdGVzLnRvdGFsKTtcbiAgLy8gJChpZFN0YXQrJy1ucycpLnRleHQodWQubm9uLnRvdGFsKTtcbn1cblxuZnVuY3Rpb24gc3RhdGVDYXNlVGVtcGxhdGUoZGF0YSl7XG4gIC8vIHtsb2NhdGlvbjogUywgcmVjb3ZlcmVkOiBOLCBjb25maXJtZWQ6IE4sIGRlYXRoczogTn1cbiAgcmV0dXJuICc8ZGl2IGNsYXNzPVwic3RhdGUtY2FzZVwiPicrXG4gIGA8ZGl2IGNsYXNzPVwic3RhdGUtY2FzZS1pdGVtIGxvY1wiPiR7ZGF0YS5sb2NhdGlvbn08L2Rpdj5gK1xuICBgPGRpdiBjbGFzcz1cInN0YXRlLWNhc2UtaXRlbSBzdGF0IHRvdGFsXCI+PHNwYW4+JHtkYXRhLmNvbmZpcm1lZH08L3NwYW4+IENhc2VzPC9kaXY+YCtcbiAgYDxkaXYgY2xhc3M9XCJzdGF0ZS1jYXNlLWl0ZW0gc3RhdCBkZWF0aHNcIj48c3Bhbj4ke2RhdGEuZGVhdGhzfTwvc3Bhbj4gRGVhdGhzPC9kaXY+YCtcbiAgYDxkaXYgY2xhc3M9XCJzdGF0ZS1jYXNlLWl0ZW0gc3RhdCByZWNvdlwiPjxzcGFuPiR7ZGF0YS5yZWNvdmVyZWR9PC9zcGFuPiBSZWNvdmVyZWQ8L2Rpdj5gK1xuICBcIjwvZGl2PlwiO1xufVxuXG4oZnVuY3Rpb24oJCl7XG4gICQoJyN1c21hcCcpLnVzbWFwKHtcbiAgICAvLyBodHRwczovL25ld3NpZ25hdHVyZS5naXRodWIuaW8vdXMtbWFwLyN1c2FnZS1zdHlsZS1vcHRpb25zXG4gICAgc3RhdGVTdHlsZXM6IHtmaWxsOiAnI2YxZjJmMycsIHN0cm9rZTogJyM5OTknfSxcbiAgICBzdGF0ZUhvdmVyU3R5bGVzOiB7ZmlsbDogJyNkYjQwMzEnfSxcbiAgICBzdGF0ZUhvdmVyQW5pbWF0aW9uOiAxMDAsXG4gICAgbGFiZWxCYWNraW5nSG92ZXJTdHlsZXM6IHtmaWxsOiAnI2RiNDAzMSd9LFxuICAgIC8vIFRoZSBjbGljayBhY3Rpb25cbiAgICBjbGljazogZnVuY3Rpb24oZXZlbnQsIGRhdGEpe1xuICAgICAgY29uc3Qge25hbWU6IGFiYnJ9ID0gZGF0YTtcbiAgICAgIGNvbnN0IHN0YXRlRGF0YSA9IGdldFN0YXRlRGF0YShhYmJyKTtcbiAgICAgIGNvbnNvbGUubG9nKHN0YXRlRGF0YSk7XG4gICAgICBsb2FkU3RhdGVEYXRhKHN0YXRlRGF0YSk7XG4gICAgfSxcbiAgfSk7XG5cbiAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCBmdW5jdGlvbigpe1xuICAgIHJlc2l6ZU1hcCgpO1xuICB9KTtcblxuICBjb25zdCBhamF4ID0gJC5hamF4KHtcbiAgICBtZXRob2Q6ICdHRVQnLFxuICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODAxMi9hcGkvY29yZS9hbGwnLFxuICAgIGRhdGFUeXBlOiAnanNvbicsXG4gIH0pO1xuICBhamF4LmRvbmUoZGF0YSA9PiB7XG4gICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgY2RGZXRjaCA9IGRhdGE7XG4gIH0pO1xuICBhamF4LmZhaWwoKGEsIGIsIGMpID0+IGNvbnNvbGUuZXJyb3IoYSwgYiwgYykpO1xufSkoalF1ZXJ5KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=