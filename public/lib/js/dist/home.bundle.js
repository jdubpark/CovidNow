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
var countriesJSON = __webpack_require__(/*! ../../json/countries.json */ "./public/lib/json/countries.json");
var countriesJSON_ = Object.keys(countriesJSON);

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
    $('#stats-total-china').text(countries.data.China.total);
    $('#stats-deaths-china').text(countries.data.China.deaths);
    $('#stats-recov-china').text(countries.data.China.recovered);
    $('#stats-total-other').text(countries.data._others.total);
    $('#stats-deaths-other').text(countries.data._others.deaths);
    $('#stats-recov-other').text(countries.data._others.recovered);

    // countries
    var ctData = countries.data,
        $table = $('#hero-countries-table-body');
    // sort desc (highest to lowest)
    var countryNames_ = Object.keys(ctData).sort(function (a, b) {
      return ctData[a].total < ctData[b].total ? 1 : ctData[a].total > ctData[b].total ? -1 : 0;
    });
    $('#hero-countries-loading').addClass('loaded');
    $table.html('');
    countryNames_.forEach(function (countryName_) {
      if (countryName_[0] === '_') return; // ignore starting with _

      var countryName = countryName_.split('_').join(' ');
      if (countriesJSON_.includes(countryName)) countryName = countriesJSON[countryName];
      console.log(countryName);
      var template = '<div class="hero-country">' + ('<div class="hero-country-name">' + countryName + '</div>') + ('<div class="hero-country-val total">' + ctData[countryName_].total + '</div>') + ('<div class="hero-country-val deaths">' + ctData[countryName_].deaths + '</div>') + ('<div class="hero-country-val recov">' + ctData[countryName_].recovered + '</div>') + '<div class="hero-country-dummy"></div>' + // dummy
      '</div>';
      $table.append(template);
    });
  });
  ajax.fail(function (a, b, c) {
    return console.error(a, b, c);
  });
})(jQuery);

/***/ }),

/***/ "./public/lib/json/countries.json":
/*!****************************************!*\
  !*** ./public/lib/json/countries.json ***!
  \****************************************/
/*! exports provided: Iran (Islamic Republic of), occupied Palestinian territory, Democratic Republic of the Congo, Republic of Korea, Democratic Republic of Korea, Republic of Moldova, Russian Federation, United Arab Emirates, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"Iran (Islamic Republic of)\":\"Iran\",\"occupied Palestinian territory\":\"Palestine\",\"Democratic Republic of the Congo\":\"DR Congo\",\"Republic of Korea\":\"South Korea\",\"Democratic Republic of Korea\":\"North Korea\",\"Republic of Moldova\":\"Moldova\",\"Russian Federation\":\"Russia\",\"United Arab Emirates\":\"U.A.E\"}");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2xpYi9qcy9jdXN0b20vaG9tZS5qcyJdLCJuYW1lcyI6WyJhcGlCYXNlIiwicHJvY2VzcyIsIm1vbnRocyIsImNvdW50cmllc0pTT04iLCJyZXF1aXJlIiwiY291bnRyaWVzSlNPTl8iLCJPYmplY3QiLCJrZXlzIiwiZ2VvbG9jU3VjY2VzcyIsInBvcyIsImxhdCIsImNvb3JkcyIsImxhdGl0dWRlIiwibG9uZyIsImxvbmdpdHVkZSIsIiQiLCJodG1sIiwiY29uc29sZSIsImxvZyIsImFqYXgxIiwiYWpheCIsIm1ldGhvZCIsInVybCIsImRhdGEiLCJkYXRhVHlwZSIsImRvbmUiLCJsb2FkR2VvZGF0YSIsImdlb2xvY0Vycm9yIiwiZ2VvY29kaW5nIiwiZGlzdHMiLCJkaXN0YW5jZXMiLCJ0ZXh0IiwiZm9yRWFjaCIsImxvY3MiLCJkaXN0IiwidG90YWwiLCJsZW5ndGgiLCJmb3JtYXREYXRlIiwiZE9iaiIsImhycyIsImdldEhvdXJzIiwibWlucyIsImdldE1pbnV0ZXMiLCJhbXBtIiwic3RyVGltZSIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsImNkRmV0Y2giLCJ1bmRlZmluZWQiLCJ5b3VTZWFyY2hpbmciLCJvbiIsIiR0IiwidmFsIiwiYWRkQ2xhc3MiLCJhZGRyZXNzIiwiZmFpbCIsImEiLCJiIiwiYyIsImVyciIsInJlbW92ZUNsYXNzIiwibmF2aWdhdG9yIiwiZ2VvbG9jYXRpb24iLCJnZXRDdXJyZW50UG9zaXRpb24iLCJ1c2EiLCJzdGF0cyIsImNvdW50cmllcyIsIkRhdGUiLCJ0cyIsImRlYXRocyIsInJlY292ZXJlZCIsImNvbXBpbGVkIiwiYWxsIiwiQ2hpbmEiLCJfb3RoZXJzIiwiY3REYXRhIiwiJHRhYmxlIiwiY291bnRyeU5hbWVzXyIsInNvcnQiLCJjb3VudHJ5TmFtZV8iLCJjb3VudHJ5TmFtZSIsInNwbGl0Iiwiam9pbiIsImluY2x1ZGVzIiwi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QVAsRUFBcUI1QyxLQUY3QywwREFHeUJ3QyxPQUFPSSxZQUFQLEVBQXFCVixNQUg5Qyx5REFJd0JNLE9BQU9JLFlBQVAsRUFBcUJULFNBSjdDLGVBS2Ysd0NBTGUsR0FLMkI7QUFDNUMsY0FOQTtBQU9BTSxhQUFPUyxNQUFQLENBQWNELFFBQWQ7QUFDRCxLQWREO0FBZUQsR0ExQ0Q7QUEyQ0FoRSxPQUFLbUMsSUFBTCxDQUFVLFVBQUNDLENBQUQsRUFBSUMsQ0FBSixFQUFPQyxDQUFQO0FBQUEsV0FBYXpDLFFBQVFxRSxLQUFSLENBQWM5QixDQUFkLEVBQWlCQyxDQUFqQixFQUFvQkMsQ0FBcEIsQ0FBYjtBQUFBLEdBQVY7QUFDRCxDQXJGRCxFQXFGRzZCLE1BckZILEUiLCJmaWxlIjoiaG9tZS5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3B1YmxpYy9saWIvanMvY3VzdG9tL2hvbWUuanNcIik7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGFwaUJhc2UgPSBwcm9jZXNzLmVudi5BUElfVVJMKydhcGkvJztcbmNvbnN0IG1vbnRocyA9IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW4nLCAnSnVsJywgJ0F1ZycsICdTZXAnLCAnT2N0JywgJ05vdicsICdEZWMnXTtcbmNvbnN0IGNvdW50cmllc0pTT04gPSByZXF1aXJlKCcuLi8uLi9qc29uL2NvdW50cmllcy5qc29uJyk7XG5jb25zdCBjb3VudHJpZXNKU09OXyA9IE9iamVjdC5rZXlzKGNvdW50cmllc0pTT04pO1xuXG5mdW5jdGlvbiBnZW9sb2NTdWNjZXNzKHBvcyl7XG4gIGNvbnN0IGxhdCA9IHBvcy5jb29yZHMubGF0aXR1ZGUsIGxvbmcgPSBwb3MuY29vcmRzLmxvbmdpdHVkZTtcbiAgJCgnI3lvdS1zZWFyY2gtbGF0IHZhbCcpLmh0bWwobGF0KTtcbiAgJCgnI3lvdS1zZWFyY2gtbG9uZyB2YWwnKS5odG1sKGxvbmcpO1xuICBjb25zb2xlLmxvZyhwb3MuY29vcmRzKTtcbiAgY29uc3QgYWpheDEgPSAkLmFqYXgoe1xuICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgdXJsOiBhcGlCYXNlKydteS9nZW9EaXN0YW5jZXMnLFxuICAgIGRhdGE6IHtsYXQsIGxvbmd9LFxuICAgIGRhdGFUeXBlOiAnanNvbicsXG4gIH0pO1xuICBhamF4MS5kb25lKGRhdGEgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdhdXRvIGdlb2xvYycsIGRhdGEpO1xuICAgIGxvYWRHZW9kYXRhKGRhdGEpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2VvbG9jRXJyb3IoKXtcbiAgJCgnI3lvdS1zZWFyY2gtbGF0IHZhbCcpLmh0bWwoJ2xvY2F0aW5nIGZhaWxlZC4uLicpO1xuICAkKCcjeW91LXNlYXJjaC1sb25nIHZhbCcpLmh0bWwoJ2xvY2F0aW5nIGZhaWxlZC4uLicpO1xufVxuXG5mdW5jdGlvbiBsb2FkR2VvZGF0YShkYXRhKXtcbiAgY29uc3Qge2dlb2NvZGluZzoge2xhdCwgbG9uZ30sIGRpc3RhbmNlczogZGlzdHN9ID0gZGF0YTtcbiAgJCgnI3lvdS1zZWFyY2gtbGF0IHZhbCcpLnRleHQobGF0KTtcbiAgJCgnI3lvdS1zZWFyY2gtbG9uZyB2YWwnKS50ZXh0KGxvbmcpO1xuICAvLyAkKCcjeW91LXNlYXJjaC1uYW1lIHZhbCcpLnRleHQobmFtZSk7XG5cbiAgT2JqZWN0LmtleXMoZGlzdHMpLmZvckVhY2goZGlzdCA9PiB7XG4gICAgY29uc3QgbG9jcyA9IGRpc3RzW2Rpc3RdLCB0b3RhbCA9IGxvY3MubGVuZ3RoO1xuICAgIC8vIGNvbnNvbGUubG9nKCcjZ2VvbG9jLWQnK2Rpc3QpO1xuICAgICQoJyNnZW9sb2MtZCcrZGlzdCsnIC5jYXNlcyB2YWwnKS50ZXh0KHRvdGFsKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdERhdGUoZE9iail7XG4gIGxldCBocnMgPSBkT2JqLmdldEhvdXJzKCksIG1pbnMgPSBkT2JqLmdldE1pbnV0ZXMoKSwgYW1wbSA9IGhycyA+PSAxMiA/ICdwbScgOiAnYW0nO1xuICBocnMgPSBocnMgJSAxMjtcbiAgaHJzID0gaHJzID8gaHJzIDogMTI7IC8vIHRoZSBob3VyICcwJyBzaG91bGQgYmUgJzEyJ1xuICBtaW5zID0gbWlucyA8IDEwID8gJzAnK21pbnMgOiBtaW5zO1xuICBjb25zdCBzdHJUaW1lID0gYCR7aHJzfToke21pbnN9ICR7YW1wbX1gO1xuICByZXR1cm4gYCR7bW9udGhzW2RPYmouZ2V0TW9udGgoKV19ICR7ZE9iai5nZXREYXRlKCl9LCAke3N0clRpbWV9YDtcbn1cblxuKGZ1bmN0aW9uKCQpe1xuICBsZXQgY2RGZXRjaCA9IHVuZGVmaW5lZDsgLy8gY29yZSBkYXRhIGZldGNoXG5cbiAgbGV0IHlvdVNlYXJjaGluZyA9IGZhbHNlO1xuICAkKCcjeW91LXNlYXJjaC1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgIGlmICh5b3VTZWFyY2hpbmcpIHJldHVybiBmYWxzZTtcbiAgICB5b3VTZWFyY2hpbmcgPSB0cnVlO1xuICAgIGNvbnN0ICR0ID0gJCh0aGlzKSwgdmFsID0gJCgnI3lvdS1zZWFyY2gtYmFyJykudmFsKCk7XG4gICAgJHQuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XG5cbiAgICBjb25zdCBhamF4MSA9ICQuYWpheCh7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgdXJsOiBhcGlCYXNlKydteS9nZW9EaXN0YW5jZXMnLFxuICAgICAgZGF0YToge2FkZHJlc3M6IHZhbH0sXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgIH0pO1xuICAgIGFqYXgxLmRvbmUoZGF0YSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgIGxvYWRHZW9kYXRhKGRhdGEpO1xuICAgIH0pO1xuICAgIGFqYXgxLmZhaWwoKGEsIGIsIGMpID0+IGNvbnNvbGUuZXJyKGEsIGIsIGMpKTtcblxuICAgIHlvdVNlYXJjaGluZyA9IGZhbHNlO1xuICAgICR0LnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xuICB9KTtcblxuICBpZiAoIW5hdmlnYXRvci5nZW9sb2NhdGlvbil7XG4gICAgY29uc29sZS5sb2coJ0dlb2xvY2F0aW9uIGlzIG5vdCBzdXBwb3J0ZWQgYnkgeW91ciBicm93c2VyJyk7XG4gICAgJCgnI3lvdS1zZWFyY2gtbGF0IHZhbCcpLmh0bWwoJ25vdCBzdXBwb3J0ZWQnKTtcbiAgICAkKCcjeW91LXNlYXJjaC1sb25nIHZhbCcpLmh0bWwoJ25vdCBzdXBwb3J0ZWQnKTtcbiAgfSBlbHNlIHtcbiAgICAkKCcjeW91LXNlYXJjaC1sYXQgdmFsJykuaHRtbCgnbG9jYXRpbmcuLi4nKTtcbiAgICAkKCcjeW91LXNlYXJjaC1sb25nIHZhbCcpLmh0bWwoJ2xvY2F0aW5nLi4uJyk7XG4gICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihnZW9sb2NTdWNjZXNzLCBnZW9sb2NFcnJvcik7XG4gIH1cblxuICBjb25zdCBhamF4ID0gJC5hamF4KHtcbiAgICBtZXRob2Q6ICdHRVQnLFxuICAgIHVybDogYXBpQmFzZSsnY29yZS9hbGwnLFxuICAgIGRhdGFUeXBlOiAnanNvbicsXG4gIH0pO1xuICBhamF4LmRvbmUoZGF0YSA9PiB7XG4gICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgY2RGZXRjaCA9IGRhdGE7XG4gICAgY29uc3Qge3VzYSwgc3RhdHMsIGNvdW50cmllc30gPSBkYXRhO1xuICAgIC8vIHN0YXRzXG4gICAgJCgnI3N0YXRzLWxhc3QtdXBkYXRlIHNwYW4nKS50ZXh0KGZvcm1hdERhdGUobmV3IERhdGUoc3RhdHMudHMpKSk7XG4gICAgJCgnI3N0YXRzLXRvdGFsLXRvdGFsJykudGV4dChzdGF0cy5kYXRhLnRvdGFsKTtcbiAgICAkKCcjc3RhdHMtZGVhdGhzLXRvdGFsJykudGV4dChzdGF0cy5kYXRhLmRlYXRocyk7XG4gICAgJCgnI3N0YXRzLXJlY292LXRvdGFsJykudGV4dChzdGF0cy5kYXRhLnJlY292ZXJlZCk7XG4gICAgLy8gdXNhXG4gICAgJCgnI3N0YXRzLXRvdGFsLXVzYScpLnRleHQodXNhLmRhdGEuY29tcGlsZWQuYWxsLnRvdGFsKTtcbiAgICAkKCcjc3RhdHMtZGVhdGhzLXVzYScpLnRleHQodXNhLmRhdGEuY29tcGlsZWQuYWxsLmRlYXRocyk7XG4gICAgJCgnI3N0YXRzLXJlY292LXVzYScpLnRleHQodXNhLmRhdGEuY29tcGlsZWQuYWxsLnJlY292ZXJlZCk7XG4gICAgLy8gY2hpbmEsIG90aGVyXG4gICAgJCgnI3N0YXRzLXRvdGFsLWNoaW5hJykudGV4dChjb3VudHJpZXMuZGF0YS5DaGluYS50b3RhbCk7XG4gICAgJCgnI3N0YXRzLWRlYXRocy1jaGluYScpLnRleHQoY291bnRyaWVzLmRhdGEuQ2hpbmEuZGVhdGhzKTtcbiAgICAkKCcjc3RhdHMtcmVjb3YtY2hpbmEnKS50ZXh0KGNvdW50cmllcy5kYXRhLkNoaW5hLnJlY292ZXJlZCk7XG4gICAgJCgnI3N0YXRzLXRvdGFsLW90aGVyJykudGV4dChjb3VudHJpZXMuZGF0YS5fb3RoZXJzLnRvdGFsKTtcbiAgICAkKCcjc3RhdHMtZGVhdGhzLW90aGVyJykudGV4dChjb3VudHJpZXMuZGF0YS5fb3RoZXJzLmRlYXRocyk7XG4gICAgJCgnI3N0YXRzLXJlY292LW90aGVyJykudGV4dChjb3VudHJpZXMuZGF0YS5fb3RoZXJzLnJlY292ZXJlZCk7XG5cbiAgICAvLyBjb3VudHJpZXNcbiAgICBjb25zdCBjdERhdGEgPSBjb3VudHJpZXMuZGF0YSwgJHRhYmxlID0gJCgnI2hlcm8tY291bnRyaWVzLXRhYmxlLWJvZHknKTtcbiAgICAvLyBzb3J0IGRlc2MgKGhpZ2hlc3QgdG8gbG93ZXN0KVxuICAgIGNvbnN0IGNvdW50cnlOYW1lc18gPSBPYmplY3Qua2V5cyhjdERhdGEpLnNvcnQoKGEsIGIpID0+IGN0RGF0YVthXS50b3RhbCA8IGN0RGF0YVtiXS50b3RhbCA/IDEgOiBjdERhdGFbYV0udG90YWwgPiBjdERhdGFbYl0udG90YWwgPyAtMSA6IDApO1xuICAgICQoJyNoZXJvLWNvdW50cmllcy1sb2FkaW5nJykuYWRkQ2xhc3MoJ2xvYWRlZCcpO1xuICAgICR0YWJsZS5odG1sKCcnKTtcbiAgICBjb3VudHJ5TmFtZXNfLmZvckVhY2goY291bnRyeU5hbWVfID0+IHtcbiAgICAgIGlmIChjb3VudHJ5TmFtZV9bMF0gPT09ICdfJykgcmV0dXJuOyAvLyBpZ25vcmUgc3RhcnRpbmcgd2l0aCBfXG5cbiAgICAgIGxldCBjb3VudHJ5TmFtZSA9IGNvdW50cnlOYW1lXy5zcGxpdCgnXycpLmpvaW4oJyAnKTtcbiAgICAgIGlmIChjb3VudHJpZXNKU09OXy5pbmNsdWRlcyhjb3VudHJ5TmFtZSkpIGNvdW50cnlOYW1lID0gY291bnRyaWVzSlNPTltjb3VudHJ5TmFtZV07XG4gICAgICBjb25zb2xlLmxvZyhjb3VudHJ5TmFtZSk7XG4gICAgICBjb25zdCB0ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwiaGVyby1jb3VudHJ5XCI+JytcbiAgICAgICAgYDxkaXYgY2xhc3M9XCJoZXJvLWNvdW50cnktbmFtZVwiPiR7Y291bnRyeU5hbWV9PC9kaXY+YCtcbiAgICAgICAgYDxkaXYgY2xhc3M9XCJoZXJvLWNvdW50cnktdmFsIHRvdGFsXCI+JHtjdERhdGFbY291bnRyeU5hbWVfXS50b3RhbH08L2Rpdj5gK1xuICAgICAgICBgPGRpdiBjbGFzcz1cImhlcm8tY291bnRyeS12YWwgZGVhdGhzXCI+JHtjdERhdGFbY291bnRyeU5hbWVfXS5kZWF0aHN9PC9kaXY+YCtcbiAgICAgICAgYDxkaXYgY2xhc3M9XCJoZXJvLWNvdW50cnktdmFsIHJlY292XCI+JHtjdERhdGFbY291bnRyeU5hbWVfXS5yZWNvdmVyZWR9PC9kaXY+YCtcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJoZXJvLWNvdW50cnktZHVtbXlcIj48L2Rpdj4nKyAvLyBkdW1teVxuICAgICAgJzwvZGl2Pic7XG4gICAgICAkdGFibGUuYXBwZW5kKHRlbXBsYXRlKTtcbiAgICB9KTtcbiAgfSk7XG4gIGFqYXguZmFpbCgoYSwgYiwgYykgPT4gY29uc29sZS5lcnJvcihhLCBiLCBjKSk7XG59KShqUXVlcnkpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==