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


var apiBase = "http://localhost:8012/" + 'api/';
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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
  var _data$geocoding = data.geocoding,
      lat = _data$geocoding.lat,
      long = _data$geocoding.long,
      dists = data.distances;

  $('#you-search-lat val').text(lat);
  $('#you-search-long val').text(long);
  // $('#you-search-name val').text(name);

  Object.keys(dists).forEach(function (dist) {
    var locs = dists[dist],
        total = locs.length;
    // console.log('#geoloc-d'+dist);
    $('#geoloc-d' + dist + ' .cases val').text(total);
  });
}

function formatDate(dObj) {
  var hrs = dObj.getHours(),
      mins = dObj.getMinutes(),
      ampm = hrs >= 12 ? 'pm' : 'am';
  hrs = hrs % 12;
  hrs = hrs ? hrs : 12; // the hour '0' should be '12'
  mins = mins < 10 ? '0' + mins : mins;
  var strTime = hrs + ':' + mins + ' ' + ampm;
  return months[dObj.getMonth()] + ' ' + dObj.getDate() + ', ' + strTime;
}

(function ($) {
  var cdFetch = undefined; // core data fetch

  var youSearching = false;
  $('#you-search-btn').on('click', function () {
    if (youSearching) return false;
    youSearching = true;
    var $t = $(this),
        val = $('#you-search-bar').val();
    $t.addClass('disabled');

    var ajax1 = $.ajax({
      method: 'GET',
      url: apiBase + 'my/geoDistances',
      data: { address: val },
      dataType: 'json'
    });
    ajax1.done(function (data) {
      console.log(data);
      loadGeodata(data);
    });
    ajax1.fail(function (a, b, c) {
      return console.err(a, b, c);
    });

    youSearching = false;
    $t.removeClass('disabled');
  });

  if (!navigator.geolocation) {
    console.log('Geolocation is not supported by your browser');
    $('#you-search-lat val').html('not supported');
    $('#you-search-long val').html('not supported');
  } else {
    $('#you-search-lat val').html('locating...');
    $('#you-search-long val').html('locating...');
    navigator.geolocation.getCurrentPosition(geolocSuccess, geolocError);
  }

  var ajax = $.ajax({
    method: 'GET',
    url: apiBase + 'core/all',
    dataType: 'json'
  });
  ajax.done(function (data) {
    console.log(data);
    cdFetch = data;
    var usa = data.usa,
        stats = data.stats,
        countries = data.countries;
    // stats

    $('#stats-last-update span').text(formatDate(new Date(stats.ts)));
    $('#stats-total-total').text(stats.data.total);
    $('#stats-deaths-total').text(stats.data.deaths);
    $('#stats-recov-total').text(stats.data.recovered);
    // usa
    $('#stats-total-usa').text(usa.data.compiled.all.total);
    $('#stats-deaths-usa').text(usa.data.compiled.all.deaths);
    $('#stats-recov-usa').text(usa.data.compiled.all.recovered);
    // china, other
    $('#stats-total-china').text(countries.data.Mainland_China.total);
    $('#stats-deaths-china').text(countries.data.Mainland_China.deaths);
    $('#stats-recov-china').text(countries.data.Mainland_China.recovered);
    $('#stats-total-other').text(countries.data._others.total);
    $('#stats-deaths-other').text(countries.data._others.deaths);
    $('#stats-recov-other').text(countries.data._others.recovered);
  });
  ajax.fail(function (a, b, c) {
    return console.error(a, b, c);
  });
})(jQuery);

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2xpYi9qcy9jdXN0b20vaG9tZS5qcyJdLCJuYW1lcyI6WyJhcGlCYXNlIiwicHJvY2VzcyIsIm1vbnRocyIsImdlb2xvY1N1Y2Nlc3MiLCJwb3MiLCJsYXQiLCJjb29yZHMiLCJsYXRpdHVkZSIsImxvbmciLCJsb25naXR1ZGUiLCIkIiwiaHRtbCIsImNvbnNvbGUiLCJsb2ciLCJhamF4MSIsImFqYXgiLCJtZXRob2QiLCJ1cmwiLCJkYXRhIiwiZGF0YVR5cGUiLCJkb25lIiwibG9hZEdlb2RhdGEiLCJnZW9sb2NFcnJvciIsImdlb2NvZGluZyIsImRpc3RzIiwiZGlzdGFuY2VzIiwidGV4dCIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwibG9jcyIsImRpc3QiLCJ0b3RhbCIsImxlbmd0aCIsImZvcm1hdERhdGUiLCJkT2JqIiwiaHJzIiwiZ2V0SG91cnMiLCJtaW5zIiwiZ2V0TWludXRlcyIsImFtcG0iLCJzdHJUaW1lIiwiZ2V0TW9udGgiLCJnZXREYXRlIiwiY2RGZXRjaCIsInVuZGVmaW5lZCIsInlvdVNlYXJjaGluZyIsIm9uIiwiJHQiLCJ2YWwiLCJhZGRDbGFzcyIsImFkZHJlc3MiLCJmYWlsIiwiYSIsImIiLCJjIiwiZXJyIiwicmVtb3ZlQ2xhc3MiLCJuYXZpZ2F0b3IiLCJnZW9sb2NhdGlvbiIsImdldEN1cnJlbnRQb3NpdGlvbiIsInVzYSIsInN0YXRzIiwiY291bnRyaWVzIiwiRGF0ZSIsInRzIiwiZGVhdGhzIiwicmVjb3ZlcmVkIiwiY29tcGlsZWQiLCJhbGwiLCJNYWlubGFuZF9DaGluYSIsIl9vdGhlcnMiLCJlcnJvciIsImpRdWVyeSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7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QWEzQyxRQUFRNEQsS0FBUixDQUFjbkIsQ0FBZCxFQUFpQkMsQ0FBakIsRUFBb0JDLENBQXBCLENBQWI7QUFBQSxHQUFWO0FBQ0QsQ0EvREQsRUErREdrQixNQS9ESCxFIiwiZmlsZSI6ImhvbWUuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9wdWJsaWMvbGliL2pzL2N1c3RvbS9ob21lLmpzXCIpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBhcGlCYXNlID0gcHJvY2Vzcy5lbnYuQVBJX1VSTCsnYXBpLyc7XG5jb25zdCBtb250aHMgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJywgJ09jdCcsICdOb3YnLCAnRGVjJ107XG5cbmZ1bmN0aW9uIGdlb2xvY1N1Y2Nlc3MocG9zKXtcbiAgY29uc3QgbGF0ID0gcG9zLmNvb3Jkcy5sYXRpdHVkZSwgbG9uZyA9IHBvcy5jb29yZHMubG9uZ2l0dWRlO1xuICAkKCcjeW91LXNlYXJjaC1sYXQgdmFsJykuaHRtbChsYXQpO1xuICAkKCcjeW91LXNlYXJjaC1sb25nIHZhbCcpLmh0bWwobG9uZyk7XG4gIGNvbnNvbGUubG9nKHBvcy5jb29yZHMpO1xuICBjb25zdCBhamF4MSA9ICQuYWpheCh7XG4gICAgbWV0aG9kOiAnR0VUJyxcbiAgICB1cmw6IGFwaUJhc2UrJ215L2dlb0Rpc3RhbmNlcycsXG4gICAgZGF0YToge2xhdCwgbG9uZ30sXG4gICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgfSk7XG4gIGFqYXgxLmRvbmUoZGF0YSA9PiB7XG4gICAgY29uc29sZS5sb2coJ2F1dG8gZ2VvbG9jJywgZGF0YSk7XG4gICAgbG9hZEdlb2RhdGEoZGF0YSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnZW9sb2NFcnJvcigpe1xuICAkKCcjeW91LXNlYXJjaC1sYXQgdmFsJykuaHRtbCgnbG9jYXRpbmcgZmFpbGVkLi4uJyk7XG4gICQoJyN5b3Utc2VhcmNoLWxvbmcgdmFsJykuaHRtbCgnbG9jYXRpbmcgZmFpbGVkLi4uJyk7XG59XG5cbmZ1bmN0aW9uIGxvYWRHZW9kYXRhKGRhdGEpe1xuICBjb25zdCB7Z2VvY29kaW5nOiB7bGF0LCBsb25nfSwgZGlzdGFuY2VzOiBkaXN0c30gPSBkYXRhO1xuICAkKCcjeW91LXNlYXJjaC1sYXQgdmFsJykudGV4dChsYXQpO1xuICAkKCcjeW91LXNlYXJjaC1sb25nIHZhbCcpLnRleHQobG9uZyk7XG4gIC8vICQoJyN5b3Utc2VhcmNoLW5hbWUgdmFsJykudGV4dChuYW1lKTtcblxuICBPYmplY3Qua2V5cyhkaXN0cykuZm9yRWFjaChkaXN0ID0+IHtcbiAgICBjb25zdCBsb2NzID0gZGlzdHNbZGlzdF0sIHRvdGFsID0gbG9jcy5sZW5ndGg7XG4gICAgLy8gY29uc29sZS5sb2coJyNnZW9sb2MtZCcrZGlzdCk7XG4gICAgJCgnI2dlb2xvYy1kJytkaXN0KycgLmNhc2VzIHZhbCcpLnRleHQodG90YWwpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0RGF0ZShkT2JqKXtcbiAgbGV0IGhycyA9IGRPYmouZ2V0SG91cnMoKSwgbWlucyA9IGRPYmouZ2V0TWludXRlcygpLCBhbXBtID0gaHJzID49IDEyID8gJ3BtJyA6ICdhbSc7XG4gIGhycyA9IGhycyAlIDEyO1xuICBocnMgPSBocnMgPyBocnMgOiAxMjsgLy8gdGhlIGhvdXIgJzAnIHNob3VsZCBiZSAnMTInXG4gIG1pbnMgPSBtaW5zIDwgMTAgPyAnMCcrbWlucyA6IG1pbnM7XG4gIGNvbnN0IHN0clRpbWUgPSBgJHtocnN9OiR7bWluc30gJHthbXBtfWA7XG4gIHJldHVybiBgJHttb250aHNbZE9iai5nZXRNb250aCgpXX0gJHtkT2JqLmdldERhdGUoKX0sICR7c3RyVGltZX1gO1xufVxuXG4oZnVuY3Rpb24oJCl7XG4gIGxldCBjZEZldGNoID0gdW5kZWZpbmVkOyAvLyBjb3JlIGRhdGEgZmV0Y2hcblxuICBsZXQgeW91U2VhcmNoaW5nID0gZmFsc2U7XG4gICQoJyN5b3Utc2VhcmNoLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgaWYgKHlvdVNlYXJjaGluZykgcmV0dXJuIGZhbHNlO1xuICAgIHlvdVNlYXJjaGluZyA9IHRydWU7XG4gICAgY29uc3QgJHQgPSAkKHRoaXMpLCB2YWwgPSAkKCcjeW91LXNlYXJjaC1iYXInKS52YWwoKTtcbiAgICAkdC5hZGRDbGFzcygnZGlzYWJsZWQnKTtcblxuICAgIGNvbnN0IGFqYXgxID0gJC5hamF4KHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICB1cmw6IGFwaUJhc2UrJ215L2dlb0Rpc3RhbmNlcycsXG4gICAgICBkYXRhOiB7YWRkcmVzczogdmFsfSxcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgfSk7XG4gICAgYWpheDEuZG9uZShkYXRhID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgbG9hZEdlb2RhdGEoZGF0YSk7XG4gICAgfSk7XG4gICAgYWpheDEuZmFpbCgoYSwgYiwgYykgPT4gY29uc29sZS5lcnIoYSwgYiwgYykpO1xuXG4gICAgeW91U2VhcmNoaW5nID0gZmFsc2U7XG4gICAgJHQucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gIH0pO1xuXG4gIGlmICghbmF2aWdhdG9yLmdlb2xvY2F0aW9uKXtcbiAgICBjb25zb2xlLmxvZygnR2VvbG9jYXRpb24gaXMgbm90IHN1cHBvcnRlZCBieSB5b3VyIGJyb3dzZXInKTtcbiAgICAkKCcjeW91LXNlYXJjaC1sYXQgdmFsJykuaHRtbCgnbm90IHN1cHBvcnRlZCcpO1xuICAgICQoJyN5b3Utc2VhcmNoLWxvbmcgdmFsJykuaHRtbCgnbm90IHN1cHBvcnRlZCcpO1xuICB9IGVsc2Uge1xuICAgICQoJyN5b3Utc2VhcmNoLWxhdCB2YWwnKS5odG1sKCdsb2NhdGluZy4uLicpO1xuICAgICQoJyN5b3Utc2VhcmNoLWxvbmcgdmFsJykuaHRtbCgnbG9jYXRpbmcuLi4nKTtcbiAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKGdlb2xvY1N1Y2Nlc3MsIGdlb2xvY0Vycm9yKTtcbiAgfVxuXG4gIGNvbnN0IGFqYXggPSAkLmFqYXgoe1xuICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgdXJsOiBhcGlCYXNlKydjb3JlL2FsbCcsXG4gICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgfSk7XG4gIGFqYXguZG9uZShkYXRhID0+IHtcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICBjZEZldGNoID0gZGF0YTtcbiAgICBjb25zdCB7dXNhLCBzdGF0cywgY291bnRyaWVzfSA9IGRhdGE7XG4gICAgLy8gc3RhdHNcbiAgICAkKCcjc3RhdHMtbGFzdC11cGRhdGUgc3BhbicpLnRleHQoZm9ybWF0RGF0ZShuZXcgRGF0ZShzdGF0cy50cykpKTtcbiAgICAkKCcjc3RhdHMtdG90YWwtdG90YWwnKS50ZXh0KHN0YXRzLmRhdGEudG90YWwpO1xuICAgICQoJyNzdGF0cy1kZWF0aHMtdG90YWwnKS50ZXh0KHN0YXRzLmRhdGEuZGVhdGhzKTtcbiAgICAkKCcjc3RhdHMtcmVjb3YtdG90YWwnKS50ZXh0KHN0YXRzLmRhdGEucmVjb3ZlcmVkKTtcbiAgICAvLyB1c2FcbiAgICAkKCcjc3RhdHMtdG90YWwtdXNhJykudGV4dCh1c2EuZGF0YS5jb21waWxlZC5hbGwudG90YWwpO1xuICAgICQoJyNzdGF0cy1kZWF0aHMtdXNhJykudGV4dCh1c2EuZGF0YS5jb21waWxlZC5hbGwuZGVhdGhzKTtcbiAgICAkKCcjc3RhdHMtcmVjb3YtdXNhJykudGV4dCh1c2EuZGF0YS5jb21waWxlZC5hbGwucmVjb3ZlcmVkKTtcbiAgICAvLyBjaGluYSwgb3RoZXJcbiAgICAkKCcjc3RhdHMtdG90YWwtY2hpbmEnKS50ZXh0KGNvdW50cmllcy5kYXRhLk1haW5sYW5kX0NoaW5hLnRvdGFsKTtcbiAgICAkKCcjc3RhdHMtZGVhdGhzLWNoaW5hJykudGV4dChjb3VudHJpZXMuZGF0YS5NYWlubGFuZF9DaGluYS5kZWF0aHMpO1xuICAgICQoJyNzdGF0cy1yZWNvdi1jaGluYScpLnRleHQoY291bnRyaWVzLmRhdGEuTWFpbmxhbmRfQ2hpbmEucmVjb3ZlcmVkKTtcbiAgICAkKCcjc3RhdHMtdG90YWwtb3RoZXInKS50ZXh0KGNvdW50cmllcy5kYXRhLl9vdGhlcnMudG90YWwpO1xuICAgICQoJyNzdGF0cy1kZWF0aHMtb3RoZXInKS50ZXh0KGNvdW50cmllcy5kYXRhLl9vdGhlcnMuZGVhdGhzKTtcbiAgICAkKCcjc3RhdHMtcmVjb3Ytb3RoZXInKS50ZXh0KGNvdW50cmllcy5kYXRhLl9vdGhlcnMucmVjb3ZlcmVkKTtcbiAgfSk7XG4gIGFqYXguZmFpbCgoYSwgYiwgYykgPT4gY29uc29sZS5lcnJvcihhLCBiLCBjKSk7XG59KShqUXVlcnkpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==