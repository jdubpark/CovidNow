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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2xpYi9qcy9jdXN0b20vaG9tZS5qcyJdLCJuYW1lcyI6WyJhcGlCYXNlIiwicHJvY2VzcyIsImdlb2xvY1N1Y2Nlc3MiLCJwb3MiLCJsYXQiLCJjb29yZHMiLCJsYXRpdHVkZSIsImxvbmciLCJsb25naXR1ZGUiLCIkIiwiaHRtbCIsImNvbnNvbGUiLCJsb2ciLCJhamF4MSIsImFqYXgiLCJtZXRob2QiLCJ1cmwiLCJkYXRhIiwiZGF0YVR5cGUiLCJkb25lIiwibG9hZEdlb2RhdGEiLCJnZW9sb2NFcnJvciIsImdlb2NvZGluZyIsImRpc3RzIiwiZGlzdGFuY2VzIiwidGV4dCIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwibG9jcyIsImRpc3QiLCJ0b3RhbCIsImxlbmd0aCIsImNkRmV0Y2giLCJ1bmRlZmluZWQiLCJ5b3VTZWFyY2hpbmciLCJvbiIsIiR0IiwidmFsIiwiYWRkQ2xhc3MiLCJhZGRyZXNzIiwiZmFpbCIsImEiLCJiIiwiYyIsImVyciIsInJlbW92ZUNsYXNzIiwibmF2aWdhdG9yIiwiZ2VvbG9jYXRpb24iLCJnZXRDdXJyZW50UG9zaXRpb24iLCJ1c2EiLCJzdGF0cyIsImNvdW50cmllcyIsImRlYXRocyIsInJlY292ZXJlZCIsImNvbXBpbGVkIiwiYWxsIiwiTWFpbmxhbmRfQ2hpbmEiLCJfb3RoZXJzIiwiZXJyb3IiLCJqUXVlcnkiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FB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LEVBQXdCZ0IsSUFBeEIsQ0FBNkIyQixVQUFVbkMsSUFBVixDQUFleUMsT0FBZixDQUF1QkosU0FBcEQ7QUFDRCxHQW5CRDtBQW9CQXhDLE9BQUsyQixJQUFMLENBQVUsVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKLEVBQU9DLENBQVA7QUFBQSxXQUFhakMsUUFBUWdELEtBQVIsQ0FBY2pCLENBQWQsRUFBaUJDLENBQWpCLEVBQW9CQyxDQUFwQixDQUFiO0FBQUEsR0FBVjtBQUNELENBOURELEVBOERHZ0IsTUE5REgsRSIsImZpbGUiOiJob21lLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vcHVibGljL2xpYi9qcy9jdXN0b20vaG9tZS5qc1wiKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgYXBpQmFzZSA9IHByb2Nlc3MuZW52LkFQSV9VUkwrJ2FwaS8nO1xuXG5mdW5jdGlvbiBnZW9sb2NTdWNjZXNzKHBvcyl7XG4gIGNvbnN0IGxhdCA9IHBvcy5jb29yZHMubGF0aXR1ZGUsIGxvbmcgPSBwb3MuY29vcmRzLmxvbmdpdHVkZTtcbiAgJCgnI3lvdS1zZWFyY2gtbGF0IHZhbCcpLmh0bWwobGF0KTtcbiAgJCgnI3lvdS1zZWFyY2gtbG9uZyB2YWwnKS5odG1sKGxvbmcpO1xuICBjb25zb2xlLmxvZyhwb3MuY29vcmRzKTtcbiAgY29uc3QgYWpheDEgPSAkLmFqYXgoe1xuICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgdXJsOiBhcGlCYXNlKydteS9nZW9EaXN0YW5jZXMnLFxuICAgIGRhdGE6IHtsYXQsIGxvbmd9LFxuICAgIGRhdGFUeXBlOiAnanNvbicsXG4gIH0pO1xuICBhamF4MS5kb25lKGRhdGEgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdhdXRvIGdlb2xvYycsIGRhdGEpO1xuICAgIGxvYWRHZW9kYXRhKGRhdGEpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2VvbG9jRXJyb3IoKXtcbiAgJCgnI3lvdS1zZWFyY2gtbGF0IHZhbCcpLmh0bWwoJ2xvY2F0aW5nIGZhaWxlZC4uLicpO1xuICAkKCcjeW91LXNlYXJjaC1sb25nIHZhbCcpLmh0bWwoJ2xvY2F0aW5nIGZhaWxlZC4uLicpO1xufVxuXG5mdW5jdGlvbiBsb2FkR2VvZGF0YShkYXRhKXtcbiAgY29uc3Qge2dlb2NvZGluZzoge2xhdCwgbG9uZ30sIGRpc3RhbmNlczogZGlzdHN9ID0gZGF0YTtcbiAgJCgnI3lvdS1zZWFyY2gtbGF0IHZhbCcpLnRleHQobGF0KTtcbiAgJCgnI3lvdS1zZWFyY2gtbG9uZyB2YWwnKS50ZXh0KGxvbmcpO1xuICAvLyAkKCcjeW91LXNlYXJjaC1uYW1lIHZhbCcpLnRleHQobmFtZSk7XG5cbiAgT2JqZWN0LmtleXMoZGlzdHMpLmZvckVhY2goZGlzdCA9PiB7XG4gICAgY29uc3QgbG9jcyA9IGRpc3RzW2Rpc3RdLCB0b3RhbCA9IGxvY3MubGVuZ3RoO1xuICAgIC8vIGNvbnNvbGUubG9nKCcjZ2VvbG9jLWQnK2Rpc3QpO1xuICAgICQoJyNnZW9sb2MtZCcrZGlzdCsnIC5jYXNlcyB2YWwnKS50ZXh0KHRvdGFsKTtcbiAgfSk7XG59XG5cbihmdW5jdGlvbigkKXtcbiAgbGV0IGNkRmV0Y2ggPSB1bmRlZmluZWQ7IC8vIGNvcmUgZGF0YSBmZXRjaFxuXG4gIGxldCB5b3VTZWFyY2hpbmcgPSBmYWxzZTtcbiAgJCgnI3lvdS1zZWFyY2gtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBpZiAoeW91U2VhcmNoaW5nKSByZXR1cm4gZmFsc2U7XG4gICAgeW91U2VhcmNoaW5nID0gdHJ1ZTtcbiAgICBjb25zdCAkdCA9ICQodGhpcyksIHZhbCA9ICQoJyN5b3Utc2VhcmNoLWJhcicpLnZhbCgpO1xuICAgICR0LmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuXG4gICAgY29uc3QgYWpheDEgPSAkLmFqYXgoe1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHVybDogYXBpQmFzZSsnbXkvZ2VvRGlzdGFuY2VzJyxcbiAgICAgIGRhdGE6IHthZGRyZXNzOiB2YWx9LFxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICB9KTtcbiAgICBhamF4MS5kb25lKGRhdGEgPT4ge1xuICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICBsb2FkR2VvZGF0YShkYXRhKTtcbiAgICB9KTtcbiAgICBhamF4MS5mYWlsKChhLCBiLCBjKSA9PiBjb25zb2xlLmVycihhLCBiLCBjKSk7XG5cbiAgICB5b3VTZWFyY2hpbmcgPSBmYWxzZTtcbiAgICAkdC5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcbiAgfSk7XG5cbiAgaWYgKCFuYXZpZ2F0b3IuZ2VvbG9jYXRpb24pe1xuICAgIGNvbnNvbGUubG9nKCdHZW9sb2NhdGlvbiBpcyBub3Qgc3VwcG9ydGVkIGJ5IHlvdXIgYnJvd3NlcicpO1xuICAgICQoJyN5b3Utc2VhcmNoLWxhdCB2YWwnKS5odG1sKCdub3Qgc3VwcG9ydGVkJyk7XG4gICAgJCgnI3lvdS1zZWFyY2gtbG9uZyB2YWwnKS5odG1sKCdub3Qgc3VwcG9ydGVkJyk7XG4gIH0gZWxzZSB7XG4gICAgJCgnI3lvdS1zZWFyY2gtbGF0IHZhbCcpLmh0bWwoJ2xvY2F0aW5nLi4uJyk7XG4gICAgJCgnI3lvdS1zZWFyY2gtbG9uZyB2YWwnKS5odG1sKCdsb2NhdGluZy4uLicpO1xuICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oZ2VvbG9jU3VjY2VzcywgZ2VvbG9jRXJyb3IpO1xuICB9XG5cbiAgY29uc3QgYWpheCA9ICQuYWpheCh7XG4gICAgbWV0aG9kOiAnR0VUJyxcbiAgICB1cmw6IGFwaUJhc2UrJ2NvcmUvYWxsJyxcbiAgICBkYXRhVHlwZTogJ2pzb24nLFxuICB9KTtcbiAgYWpheC5kb25lKGRhdGEgPT4ge1xuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIGNkRmV0Y2ggPSBkYXRhO1xuICAgIGNvbnN0IHt1c2EsIHN0YXRzLCBjb3VudHJpZXN9ID0gZGF0YTtcbiAgICAvLyBzdGF0c1xuICAgICQoJyNzdGF0cy10b3RhbC10b3RhbCcpLnRleHQoc3RhdHMuZGF0YS50b3RhbCk7XG4gICAgJCgnI3N0YXRzLWRlYXRocy10b3RhbCcpLnRleHQoc3RhdHMuZGF0YS5kZWF0aHMpO1xuICAgICQoJyNzdGF0cy1yZWNvdi10b3RhbCcpLnRleHQoc3RhdHMuZGF0YS5yZWNvdmVyZWQpO1xuICAgIC8vIHVzYVxuICAgICQoJyNzdGF0cy10b3RhbC11c2EnKS50ZXh0KHVzYS5kYXRhLmNvbXBpbGVkLmFsbC50b3RhbCk7XG4gICAgJCgnI3N0YXRzLWRlYXRocy11c2EnKS50ZXh0KHVzYS5kYXRhLmNvbXBpbGVkLmFsbC5kZWF0aHMpO1xuICAgICQoJyNzdGF0cy1yZWNvdi11c2EnKS50ZXh0KHVzYS5kYXRhLmNvbXBpbGVkLmFsbC5yZWNvdmVyZWQpO1xuICAgIC8vIGNoaW5hLCBvdGhlclxuICAgICQoJyNzdGF0cy10b3RhbC1jaGluYScpLnRleHQoY291bnRyaWVzLmRhdGEuTWFpbmxhbmRfQ2hpbmEudG90YWwpO1xuICAgICQoJyNzdGF0cy1kZWF0aHMtY2hpbmEnKS50ZXh0KGNvdW50cmllcy5kYXRhLk1haW5sYW5kX0NoaW5hLmRlYXRocyk7XG4gICAgJCgnI3N0YXRzLXJlY292LWNoaW5hJykudGV4dChjb3VudHJpZXMuZGF0YS5NYWlubGFuZF9DaGluYS5yZWNvdmVyZWQpO1xuICAgICQoJyNzdGF0cy10b3RhbC1vdGhlcicpLnRleHQoY291bnRyaWVzLmRhdGEuX290aGVycy50b3RhbCk7XG4gICAgJCgnI3N0YXRzLWRlYXRocy1vdGhlcicpLnRleHQoY291bnRyaWVzLmRhdGEuX290aGVycy5kZWF0aHMpO1xuICAgICQoJyNzdGF0cy1yZWNvdi1vdGhlcicpLnRleHQoY291bnRyaWVzLmRhdGEuX290aGVycy5yZWNvdmVyZWQpO1xuICB9KTtcbiAgYWpheC5mYWlsKChhLCBiLCBjKSA9PiBjb25zb2xlLmVycm9yKGEsIGIsIGMpKTtcbn0pKGpRdWVyeSk7XG4iXSwic291cmNlUm9vdCI6IiJ9