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
var apiBase2 = "http://localhost:8013/" + 'api/';
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var countriesJSON = __webpack_require__(/*! ../../json/countries.json */ "./public/lib/json/countries.json");
var countriesJSON_ = Object.keys(countriesJSON);

var cdFetch = undefined; // core data fetch

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

  if (!lat && !long) $('#you-search-invalid').addClass('show');else $('#you-search-invalid').removeClass('show');
  $('#you-search-lat val').text(lat);
  $('#you-search-long val').text(long);
  // $('#you-search-name val').text(name);

  // OFF: distance model for now
  // Object.keys(dists).forEach(dist => {
  //   const locs = dists[dist], total = locs.length;
  //   // console.log('#geoloc-d'+dist);
  //   $('#geoloc-d'+dist+' .cases val').text(total);
  // });

  // ON: county model
  var _data$geocoding2 = data.geocoding,
      county = _data$geocoding2.county,
      state = _data$geocoding2.state,
      stData = cdFetch.states.data;

  $('#geoloc-county-name').text(county + ' County, ' + state);
  $('#geoloc-state-name span').text(state);
  var cTotal = 0,
      sTotal = 0;
  if (stData[state] && stData[state][county]) cTotal = stData[state][county].total;
  if (stData[state] && stData[state]._statewide) sTotal = stData[state]._statewide.total;
  $('#geoloc-county .cases val').text(cTotal);
  $('#geoloc-state .cases val').text(sTotal);
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

function percent(nume, deno) {
  var fixed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;

  var perc = void 0;
  if (typeof num !== 'number' || typeof deno !== 'number') perc = Number(nume) / Number(deno) * 100;else perc = nume / deno * 100;

  return isFinite(perc) ? perc.toFixed(fixed) : undefined;
}

function commas(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

(function ($) {
  var youSearching = false;
  $('#you-search-btn').on('click', function () {
    if (youSearching) return false;
    youSearching = true;
    var $t = $(this),
        val = $('#you-search-bar').val();
    $t.addClass('disabled');
    $('#you-search-invalid').removeClass('show');
    $('#you-search-lat val').html('locating...');
    $('#you-search-long val').html('locating...');

    var ajax1 = $.ajax({
      method: 'GET',
      url: apiBase + 'my/geoDistances',
      data: { address: val },
      dataType: 'json'
    });
    ajax1.done(function (data) {
      console.log(data);
      youSearching = false;
      $t.removeClass('disabled');
      loadGeodata(data);
    });
    ajax1.fail(function (a, b, c) {
      return console.error(a, b, c);
    });
  });

  // off for now, support only address
  $('#you-search-lat val').html('search...');
  $('#you-search-long val').html('search...');
  // if (!navigator.geolocation){
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
    url: apiBase + 'core/all',
    dataType: 'json'
  });
  ajax1.done(function (data) {
    console.log(data);
    cdFetch = data;
    var usa = data.usa,
        stats = data.stats,
        countries = data.countries;

    var totalConfirmed = stats.data.total;
    var totalDeaths = stats.data.deaths;
    var totalRecovered = stats.data.recovered;
    // stats
    $('#stats-last-update span').text(formatDate(new Date(stats.ts)));
    $('#stats-confirmed-total').text(commas(stats.data.total));
    $('#stats-deaths-total').text(commas(stats.data.deaths));
    $('#stats-recov-total').text(commas(stats.data.recovered));

    var countryCount = Object.keys(countries.data).length - 1; // -1 is _others
    var fatalityRate = percent(totalDeaths, totalConfirmed);
    var recoveryRate = percent(totalRecovered, totalConfirmed);

    $('#stats-confirmed-countries span').text(countryCount);
    $('#stats-fatality-rate span').text(fatalityRate);
    $('#stats-recovery-rate span').text(recoveryRate);

    var ctData = countries.data;
    // sort by values (desc)
    var ctSort = {
      total: Object.keys(ctData).sort(function (a, b) {
        return ctData[a].total < ctData[b].total ? 1 : ctData[a].total > ctData[b].total ? -1 : 0;
      }),
      deaths: Object.keys(ctData).sort(function (a, b) {
        return ctData[a].deaths < ctData[b].deaths ? 1 : ctData[a].deaths > ctData[b].deaths ? -1 : 0;
      }),
      recovered: Object.keys(ctData).sort(function (a, b) {
        return ctData[a].recovered < ctData[b].recovered ? 1 : ctData[a].recovered > ctData[b].recovered ? -1 : 0;
      })
    };

    Object.keys(ctSort).forEach(function (key) {
      // remove key '_others'
      ctSort[key].splice(ctSort[key].indexOf('_others'), 1);

      // get top 10 and loop & append
      $('#stats-top-countries-' + key).html('');
      ctSort[key].slice(0, 10).forEach(function (ctName_) {
        var ctDat = ctData[ctName_];
        var ctName = ctName_.split('_').join(' '),
            rateGlobal = '&nbsp;',
            ratePerc = '&nbsp;';
        if (countriesJSON_.includes(ctName)) ctName = countriesJSON[ctName];
        if (key === 'deaths' || key === 'recovered') {
          // compared to total [key] (global)
          rateGlobal = percent(ctDat[key], stats.data[key]) + '%';
          // compared to the country's total confirmed
          ratePerc = percent(ctDat[key], ctDat.total) + '%';
        }
        var template = '<li>' + ('<div class="hero-fc-top-name">' + ctName + '</div>') + ('<div class="hero-fc-top-num num">' + commas(ctDat[key]) + '</div>') + '<div class="hero-fc-top-rates">' + ('<span class="glob">' + rateGlobal + '</span>') + ('<span class="perc">' + ratePerc + '</span>') + '</div>' + '</li>';
        $('#stats-top-countries-' + key).append(template);
      });
    });

    // usa
    // $('#stats-total-usa').text(usa.data.compiled.all.total);
    // $('#stats-deaths-usa').text(usa.data.compiled.all.deaths);
    // $('#stats-recov-usa').text(usa.data.compiled.all.recovered);
    // // china, other
    // if (countries.data._others.total >= countries.data.China.total){
    //   countries.data._others.total = Math.max(0, countries.data._others.total-countries.data.China.total);
    //   countries.data._others.deaths = Math.max(0, countries.data._others.deaths-countries.data.China.deaths);
    //   countries.data._others.recovered = Math.max(0, countries.data._others.recovered-countries.data.China.recovered);
    // }
    // $('#stats-total-china').text(countries.data.China.total);
    // $('#stats-deaths-china').text(countries.data.China.deaths);
    // $('#stats-recov-china').text(countries.data.China.recovered);
    // $('#stats-total-other').text(countries.data._others.total);
    // $('#stats-deaths-other').text(countries.data._others.deaths);
    // $('#stats-recov-other').text(countries.data._others.recovered);

    // countries table
    var $table = $('#hero-countries-table-body');

    // prepare country data
    var blobCut = Math.ceil(ctSort.total.length / 2),
        // accounts for _others
    nBlobs = [ctSort.total.slice(0, blobCut), ctSort.total.slice(blobCut, -1)],

    // alternate blob content
    alternatedCNames_ = nBlobs.reduce(function (t, u, v, w) {
      return u.reduce(function (x, y, z) {
        return x[z * w.length + v] = y, x;
      }, t);
    }, []);

    $('#hero-countries-loading').addClass('loaded');
    $table.html('');
    // loop alternated country names (only for desktop > 1024px)
    if (window.innerWidth && window.innerWidth > 1024) ctSort.total = alternatedCNames_;
    ctSort.total.forEach(function (countryName_) {
      var countryName = countryName_.split('_').join(' ');
      if (countriesJSON_.includes(countryName)) countryName = countriesJSON[countryName];
      // console.log(countryName);
      var template = '<div class="hero-country">' + ('<div class="hero-country-name">' + countryName + '</div>') + ('<div class="hero-country-val total">' + ctData[countryName_].total + '</div>') + ('<div class="hero-country-val deaths">' + ctData[countryName_].deaths + '</div>') + ('<div class="hero-country-val recov">' + ctData[countryName_].recovered + '</div>') + '<div class="hero-country-dummy"></div>' + // dummy
      '</div>';
      $table.append(template);
    });
  });
  ajax1.fail(function (a, b, c) {
    return console.error(a, b, c);
  });

  //
  // News
  //
  var ajax2 = $.ajax({
    method: 'GET',
    url: apiBase2 + 'news/usa',
    dataType: 'json'
  });

  ajax2.done(function (res) {
    var data = res.data,
        lastUpdateTs = res.ts;


    $('#hero-news-list').html('');
    data.__sorted.forEach(function (ts) {
      var news = data[ts];
      var template = '<li>' + ('<div class="pubdate">' + formatDate(new Date(news.pubDate)) + '</div>') + ('<div class="headline">' + news.html + '</div>') + '</li>';
      $('#hero-news-list').append(template);
    });
  });
  ajax2.fail(function (a, b, c) {
    return console.error(a, b, c);
  });
})(jQuery);

/***/ }),

/***/ "./public/lib/json/countries.json":
/*!****************************************!*\
  !*** ./public/lib/json/countries.json ***!
  \****************************************/
/*! exports provided: Iran (Islamic Republic of), occupied Palestinian territory, Democratic Republic of the Congo, Republic of Korea, Korea, South, Democratic Republic of Korea, Republic of Moldova, Russian Federation, United Arab Emirates, United Kingdom, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"Iran (Islamic Republic of)\":\"Iran\",\"occupied Palestinian territory\":\"Palestine\",\"Democratic Republic of the Congo\":\"DR Congo\",\"Republic of Korea\":\"South Korea\",\"Korea, South\":\"South Korea\",\"Democratic Republic of Korea\":\"North Korea\",\"Republic of Moldova\":\"Moldova\",\"Russian Federation\":\"Russia\",\"United Arab Emirates\":\"UAE\",\"United Kingdom\":\"UK\"}");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2xpYi9qcy9jdXN0b20vaG9tZS5qcyJdLCJuYW1lcyI6WyJhcGlCYXNlIiwicHJvY2VzcyIsImFwaUJhc2UyIiwibW9udGhzIiwiY291bnRyaWVzSlNPTiIsInJlcXVpcmUiLCJjb3VudHJpZXNKU09OXyIsIk9iamVjdCIsImtleXMiLCJjZEZldGNoIiwidW5kZWZpbmVkIiwiZ2VvbG9jU3VjY2VzcyIsInBvcyIsImxhdCIsImNvb3JkcyIsImxhdGl0dWRlIiwibG9uZyIsImxvbmdpdHVkZSIsIiQiLCJodG1sIiwiY29uc29sZSIsImxvZyIsImFqYXgxIiwiYWpheCIsIm1ldGhvZCIsInVybCIsImRhdGEiLCJkYXRhVHlwZSIsImRvbmUiLCJsb2FkR2VvZGF0YSIsImdlb2xvY0Vycm9yIiwiZ2VvY29kaW5nIiwiZGlzdHMiLCJkaXN0YW5jZXMiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwidGV4dCIsImNvdW50eSIsInN0YXRlIiwic3REYXRhIiwic3RhdGVzIiwiY1RvdGFsIiwic1RvdGFsIiwidG90YWwiLCJfc3RhdGV3aWRlIiwiZm9ybWF0RGF0ZSIsImRPYmoiLCJocnMiLCJnZXRIb3VycyIsIm1pbnMiLCJnZXRNaW51dGVzIiwiYW1wbSIsInN0clRpbWUiLCJnZXRNb250aCIsImdldERhdGUiLCJwZXJjZW50IiwibnVtZSIsImRlbm8iLCJmaXhlZCIsInBlcmMiLCJudW0iLCJOdW1iZXIiLCJpc0Zpbml0ZSIsInRvRml4ZWQiLCJjb21tYXMiLCJuIiwidG9TdHJpbmciLCJyZXBsYWNlIiwieW91U2VhcmNoaW5nIiwib24iLCIkdCIsInZhbCIsImFkZHJlc3MiLCJmYWlsIiwiYSIsImIiLCJjIiwiZXJyb3IiLCJ1c2EiLCJzdGF0cyIsImNvdW50cmllcyIsInRvdGFsQ29uZmlybWVkIiwidG90YWxEZWF0aHMiLCJkZWF0aHMiLCJ0b3RhbFJlY292ZXJlZCIsInJlY292ZXJlZCIsIkRhdGUiLCJ0cyIsImNvdW50cnlDb3VudCIsImxlbmd0aCIsImZhdGFsaXR5UmF0ZSIsInJlY292ZXJ5UmF0ZSIsImN0RGF0YSIsImN0U29ydCIsInNvcnQiLCJmb3JFYWNoIiwia2V5Iiwic3BsaWNlIiwiaW5kZXhPZiIsInNsaWNlIiwiY3REYXQiLCJjdE5hbWVfIiwiY3ROYW1lIiwic3BsaXQiLCJqb2luIiwicmF0ZUdsb2JhbCIsInJhdGVQZXJjIiwiaW5jbHVkZXMiLCJ0ZW1wbGF0ZSIsImFwcGVuZCIsIiR0YWJsZSIsImJsb2JDdXQiLCJNYXRoIiwiY2VpbCIsIm5CbG9icyIsImFsdGVybmF0ZWRDTmFtZXNfIiwicmVkdWNlIiwidCIsInUiLCJ2IiwidyIsIngiLCJ5IiwieiIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJjb3VudHJ5TmFtZSIsImNvdW50cnlOYW1lXyIsImFqYXgyIiwicmVzIiwibGFzdFVwZGF0ZVRzIiwiX19zb3J0ZWQiLCJuZXdzIiwicHViRGF0ZSIsImpRdWVyeSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNB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QUNuQkMsWUFBUSxLQURXO0FBRW5CQyxTQUFLdkIsV0FBUyxVQUZLO0FBR25CeUIsY0FBVTtBQUhTLEdBQVAsQ0FBZDs7QUFNQXFHLFFBQU1wRyxJQUFOLENBQVcsZUFBTztBQUFBLFFBQ1RGLElBRFMsR0FDaUJ1RyxHQURqQixDQUNUdkcsSUFEUztBQUFBLFFBQ0N3RyxZQURELEdBQ2lCRCxHQURqQixDQUNIMUMsRUFERzs7O0FBR2hCckUsTUFBRSxpQkFBRixFQUFxQkMsSUFBckIsQ0FBMEIsRUFBMUI7QUFDQU8sU0FBS3lHLFFBQUwsQ0FBY3BDLE9BQWQsQ0FBc0IsY0FBTTtBQUMxQixVQUFNcUMsT0FBTzFHLEtBQUs2RCxFQUFMLENBQWI7QUFDQSxVQUFNcUIsV0FBVyxvQ0FDUy9ELFdBQVcsSUFBSXlDLElBQUosQ0FBUzhDLEtBQUtDLE9BQWQsQ0FBWCxDQURULDJDQUVVRCxLQUFLakgsSUFGZixlQUdqQixPQUhBO0FBSUFELFFBQUUsaUJBQUYsRUFBcUIyRixNQUFyQixDQUE0QkQsUUFBNUI7QUFDRCxLQVBEO0FBUUQsR0FaRDtBQWFBb0IsUUFBTXZELElBQU4sQ0FBVyxVQUFDQyxDQUFELEVBQUlDLENBQUosRUFBT0MsQ0FBUDtBQUFBLFdBQWF4RCxRQUFReUQsS0FBUixDQUFjSCxDQUFkLEVBQWlCQyxDQUFqQixFQUFvQkMsQ0FBcEIsQ0FBYjtBQUFBLEdBQVg7QUFDRCxDQTNLRCxFQTJLRzBELE1BM0tILEUiLCJmaWxlIjoiaG9tZS5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3B1YmxpYy9saWIvanMvY3VzdG9tL2hvbWUuanNcIik7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGFwaUJhc2UgPSBwcm9jZXNzLmVudi5BUElfVVJMKydhcGkvJztcbmNvbnN0IGFwaUJhc2UyID0gcHJvY2Vzcy5lbnYuQVBJX1VSTF8yKydhcGkvJztcbmNvbnN0IG1vbnRocyA9IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW4nLCAnSnVsJywgJ0F1ZycsICdTZXAnLCAnT2N0JywgJ05vdicsICdEZWMnXTtcbmNvbnN0IGNvdW50cmllc0pTT04gPSByZXF1aXJlKCcuLi8uLi9qc29uL2NvdW50cmllcy5qc29uJyk7XG5jb25zdCBjb3VudHJpZXNKU09OXyA9IE9iamVjdC5rZXlzKGNvdW50cmllc0pTT04pO1xuXG5sZXQgY2RGZXRjaCA9IHVuZGVmaW5lZDsgLy8gY29yZSBkYXRhIGZldGNoXG5cbmZ1bmN0aW9uIGdlb2xvY1N1Y2Nlc3MocG9zKXtcbiAgY29uc3QgbGF0ID0gcG9zLmNvb3Jkcy5sYXRpdHVkZSwgbG9uZyA9IHBvcy5jb29yZHMubG9uZ2l0dWRlO1xuICAkKCcjeW91LXNlYXJjaC1sYXQgdmFsJykuaHRtbChsYXQpO1xuICAkKCcjeW91LXNlYXJjaC1sb25nIHZhbCcpLmh0bWwobG9uZyk7XG4gIGNvbnNvbGUubG9nKHBvcy5jb29yZHMpO1xuICBjb25zdCBhamF4MSA9ICQuYWpheCh7XG4gICAgbWV0aG9kOiAnR0VUJyxcbiAgICB1cmw6IGFwaUJhc2UrJ215L2dlb0Rpc3RhbmNlcycsXG4gICAgZGF0YToge2xhdCwgbG9uZ30sXG4gICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgfSk7XG4gIGFqYXgxLmRvbmUoZGF0YSA9PiB7XG4gICAgY29uc29sZS5sb2coJ2F1dG8gZ2VvbG9jJywgZGF0YSk7XG4gICAgbG9hZEdlb2RhdGEoZGF0YSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnZW9sb2NFcnJvcigpe1xuICAkKCcjeW91LXNlYXJjaC1sYXQgdmFsJykuaHRtbCgnbG9jYXRpbmcgZmFpbGVkLi4uJyk7XG4gICQoJyN5b3Utc2VhcmNoLWxvbmcgdmFsJykuaHRtbCgnbG9jYXRpbmcgZmFpbGVkLi4uJyk7XG59XG5cbmZ1bmN0aW9uIGxvYWRHZW9kYXRhKGRhdGEpe1xuICBjb25zdCB7Z2VvY29kaW5nOiB7bGF0LCBsb25nfSwgZGlzdGFuY2VzOiBkaXN0c30gPSBkYXRhO1xuICBpZiAoIWxhdCAmJiAhbG9uZykgJCgnI3lvdS1zZWFyY2gtaW52YWxpZCcpLmFkZENsYXNzKCdzaG93Jyk7XG4gIGVsc2UgJCgnI3lvdS1zZWFyY2gtaW52YWxpZCcpLnJlbW92ZUNsYXNzKCdzaG93Jyk7XG4gICQoJyN5b3Utc2VhcmNoLWxhdCB2YWwnKS50ZXh0KGxhdCk7XG4gICQoJyN5b3Utc2VhcmNoLWxvbmcgdmFsJykudGV4dChsb25nKTtcbiAgLy8gJCgnI3lvdS1zZWFyY2gtbmFtZSB2YWwnKS50ZXh0KG5hbWUpO1xuXG4gIC8vIE9GRjogZGlzdGFuY2UgbW9kZWwgZm9yIG5vd1xuICAvLyBPYmplY3Qua2V5cyhkaXN0cykuZm9yRWFjaChkaXN0ID0+IHtcbiAgLy8gICBjb25zdCBsb2NzID0gZGlzdHNbZGlzdF0sIHRvdGFsID0gbG9jcy5sZW5ndGg7XG4gIC8vICAgLy8gY29uc29sZS5sb2coJyNnZW9sb2MtZCcrZGlzdCk7XG4gIC8vICAgJCgnI2dlb2xvYy1kJytkaXN0KycgLmNhc2VzIHZhbCcpLnRleHQodG90YWwpO1xuICAvLyB9KTtcblxuICAvLyBPTjogY291bnR5IG1vZGVsXG4gIGNvbnN0IHtnZW9jb2Rpbmc6IHtjb3VudHksIHN0YXRlfX0gPSBkYXRhLCBzdERhdGEgPSBjZEZldGNoLnN0YXRlcy5kYXRhO1xuICAkKCcjZ2VvbG9jLWNvdW50eS1uYW1lJykudGV4dChjb3VudHkrJyBDb3VudHksICcrc3RhdGUpO1xuICAkKCcjZ2VvbG9jLXN0YXRlLW5hbWUgc3BhbicpLnRleHQoc3RhdGUpO1xuICBsZXQgY1RvdGFsID0gMCwgc1RvdGFsID0gMDtcbiAgaWYgKHN0RGF0YVtzdGF0ZV0gJiYgc3REYXRhW3N0YXRlXVtjb3VudHldKSBjVG90YWwgPSBzdERhdGFbc3RhdGVdW2NvdW50eV0udG90YWw7XG4gIGlmIChzdERhdGFbc3RhdGVdICYmIHN0RGF0YVtzdGF0ZV0uX3N0YXRld2lkZSkgc1RvdGFsID0gc3REYXRhW3N0YXRlXS5fc3RhdGV3aWRlLnRvdGFsO1xuICAkKCcjZ2VvbG9jLWNvdW50eSAuY2FzZXMgdmFsJykudGV4dChjVG90YWwpO1xuICAkKCcjZ2VvbG9jLXN0YXRlIC5jYXNlcyB2YWwnKS50ZXh0KHNUb3RhbCk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdERhdGUoZE9iail7XG4gIGxldCBocnMgPSBkT2JqLmdldEhvdXJzKCksIG1pbnMgPSBkT2JqLmdldE1pbnV0ZXMoKSwgYW1wbSA9IGhycyA+PSAxMiA/ICdwbScgOiAnYW0nO1xuICBocnMgPSBocnMgJSAxMjtcbiAgaHJzID0gaHJzID8gaHJzIDogMTI7IC8vIHRoZSBob3VyICcwJyBzaG91bGQgYmUgJzEyJ1xuICBtaW5zID0gbWlucyA8IDEwID8gJzAnK21pbnMgOiBtaW5zO1xuICBjb25zdCBzdHJUaW1lID0gYCR7aHJzfToke21pbnN9ICR7YW1wbX1gO1xuICByZXR1cm4gYCR7bW9udGhzW2RPYmouZ2V0TW9udGgoKV19ICR7ZE9iai5nZXREYXRlKCl9LCAke3N0clRpbWV9YDtcbn1cblxuZnVuY3Rpb24gcGVyY2VudChudW1lLCBkZW5vLCBmaXhlZD0yKXtcbiAgbGV0IHBlcmM7XG4gIGlmICh0eXBlb2YgbnVtICE9PSAnbnVtYmVyJyB8fCB0eXBlb2YgZGVubyAhPT0gJ251bWJlcicpIHBlcmMgPSBOdW1iZXIobnVtZSkvTnVtYmVyKGRlbm8pKjEwMDtcbiAgZWxzZSBwZXJjID0gbnVtZS9kZW5vKjEwMDtcblxuICByZXR1cm4gaXNGaW5pdGUocGVyYykgPyBwZXJjLnRvRml4ZWQoZml4ZWQpIDogdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBjb21tYXMobil7XG4gIHJldHVybiBuLnRvU3RyaW5nKCkucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgJywnKTtcbn1cblxuKGZ1bmN0aW9uKCQpe1xuICBsZXQgeW91U2VhcmNoaW5nID0gZmFsc2U7XG4gICQoJyN5b3Utc2VhcmNoLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgaWYgKHlvdVNlYXJjaGluZykgcmV0dXJuIGZhbHNlO1xuICAgIHlvdVNlYXJjaGluZyA9IHRydWU7XG4gICAgY29uc3QgJHQgPSAkKHRoaXMpLCB2YWwgPSAkKCcjeW91LXNlYXJjaC1iYXInKS52YWwoKTtcbiAgICAkdC5hZGRDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAkKCcjeW91LXNlYXJjaC1pbnZhbGlkJykucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcbiAgICAkKCcjeW91LXNlYXJjaC1sYXQgdmFsJykuaHRtbCgnbG9jYXRpbmcuLi4nKTtcbiAgICAkKCcjeW91LXNlYXJjaC1sb25nIHZhbCcpLmh0bWwoJ2xvY2F0aW5nLi4uJyk7XG5cbiAgICBjb25zdCBhamF4MSA9ICQuYWpheCh7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgdXJsOiBhcGlCYXNlKydteS9nZW9EaXN0YW5jZXMnLFxuICAgICAgZGF0YToge2FkZHJlc3M6IHZhbH0sXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgIH0pO1xuICAgIGFqYXgxLmRvbmUoZGF0YSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgIHlvdVNlYXJjaGluZyA9IGZhbHNlO1xuICAgICAgJHQucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICBsb2FkR2VvZGF0YShkYXRhKTtcbiAgICB9KTtcbiAgICBhamF4MS5mYWlsKChhLCBiLCBjKSA9PiBjb25zb2xlLmVycm9yKGEsIGIsIGMpKTtcbiAgfSk7XG5cbiAgLy8gb2ZmIGZvciBub3csIHN1cHBvcnQgb25seSBhZGRyZXNzXG4gICQoJyN5b3Utc2VhcmNoLWxhdCB2YWwnKS5odG1sKCdzZWFyY2guLi4nKTtcbiAgJCgnI3lvdS1zZWFyY2gtbG9uZyB2YWwnKS5odG1sKCdzZWFyY2guLi4nKTtcbiAgLy8gaWYgKCFuYXZpZ2F0b3IuZ2VvbG9jYXRpb24pe1xuICAvLyAgIGNvbnNvbGUubG9nKCdHZW9sb2NhdGlvbiBpcyBub3Qgc3VwcG9ydGVkIGJ5IHlvdXIgYnJvd3NlcicpO1xuICAvLyAgICQoJyN5b3Utc2VhcmNoLWxhdCB2YWwnKS5odG1sKCdub3Qgc3VwcG9ydGVkJyk7XG4gIC8vICAgJCgnI3lvdS1zZWFyY2gtbG9uZyB2YWwnKS5odG1sKCdub3Qgc3VwcG9ydGVkJyk7XG4gIC8vIH0gZWxzZSB7XG4gIC8vICAgJCgnI3lvdS1zZWFyY2gtbGF0IHZhbCcpLmh0bWwoJ2xvY2F0aW5nLi4uJyk7XG4gIC8vICAgJCgnI3lvdS1zZWFyY2gtbG9uZyB2YWwnKS5odG1sKCdsb2NhdGluZy4uLicpO1xuICAvLyAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oZ2VvbG9jU3VjY2VzcywgZ2VvbG9jRXJyb3IpO1xuICAvLyB9XG5cbiAgY29uc3QgYWpheDEgPSAkLmFqYXgoe1xuICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgdXJsOiBhcGlCYXNlKydjb3JlL2FsbCcsXG4gICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgfSk7XG4gIGFqYXgxLmRvbmUoZGF0YSA9PiB7XG4gICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgY2RGZXRjaCA9IGRhdGE7XG4gICAgY29uc3Qge3VzYSwgc3RhdHMsIGNvdW50cmllc30gPSBkYXRhO1xuICAgIGNvbnN0IHRvdGFsQ29uZmlybWVkID0gc3RhdHMuZGF0YS50b3RhbDtcbiAgICBjb25zdCB0b3RhbERlYXRocyA9IHN0YXRzLmRhdGEuZGVhdGhzO1xuICAgIGNvbnN0IHRvdGFsUmVjb3ZlcmVkID0gc3RhdHMuZGF0YS5yZWNvdmVyZWQ7XG4gICAgLy8gc3RhdHNcbiAgICAkKCcjc3RhdHMtbGFzdC11cGRhdGUgc3BhbicpLnRleHQoZm9ybWF0RGF0ZShuZXcgRGF0ZShzdGF0cy50cykpKTtcbiAgICAkKCcjc3RhdHMtY29uZmlybWVkLXRvdGFsJykudGV4dChjb21tYXMoc3RhdHMuZGF0YS50b3RhbCkpO1xuICAgICQoJyNzdGF0cy1kZWF0aHMtdG90YWwnKS50ZXh0KGNvbW1hcyhzdGF0cy5kYXRhLmRlYXRocykpO1xuICAgICQoJyNzdGF0cy1yZWNvdi10b3RhbCcpLnRleHQoY29tbWFzKHN0YXRzLmRhdGEucmVjb3ZlcmVkKSk7XG5cbiAgICBjb25zdCBjb3VudHJ5Q291bnQgPSBPYmplY3Qua2V5cyhjb3VudHJpZXMuZGF0YSkubGVuZ3RoIC0gMTsgLy8gLTEgaXMgX290aGVyc1xuICAgIGNvbnN0IGZhdGFsaXR5UmF0ZSA9IHBlcmNlbnQodG90YWxEZWF0aHMsIHRvdGFsQ29uZmlybWVkKTtcbiAgICBjb25zdCByZWNvdmVyeVJhdGUgPSBwZXJjZW50KHRvdGFsUmVjb3ZlcmVkLCB0b3RhbENvbmZpcm1lZCk7XG5cbiAgICAkKCcjc3RhdHMtY29uZmlybWVkLWNvdW50cmllcyBzcGFuJykudGV4dChjb3VudHJ5Q291bnQpO1xuICAgICQoJyNzdGF0cy1mYXRhbGl0eS1yYXRlIHNwYW4nKS50ZXh0KGZhdGFsaXR5UmF0ZSk7XG4gICAgJCgnI3N0YXRzLXJlY292ZXJ5LXJhdGUgc3BhbicpLnRleHQocmVjb3ZlcnlSYXRlKTtcblxuICAgIGNvbnN0IGN0RGF0YSA9IGNvdW50cmllcy5kYXRhO1xuICAgIC8vIHNvcnQgYnkgdmFsdWVzIChkZXNjKVxuICAgIGNvbnN0IGN0U29ydCA9IHtcbiAgICAgIHRvdGFsOiBPYmplY3Qua2V5cyhjdERhdGEpLnNvcnQoKGEsIGIpID0+IGN0RGF0YVthXS50b3RhbCA8IGN0RGF0YVtiXS50b3RhbCA/IDEgOiBjdERhdGFbYV0udG90YWwgPiBjdERhdGFbYl0udG90YWwgPyAtMSA6IDApLFxuICAgICAgZGVhdGhzOiBPYmplY3Qua2V5cyhjdERhdGEpLnNvcnQoKGEsIGIpID0+IGN0RGF0YVthXS5kZWF0aHMgPCBjdERhdGFbYl0uZGVhdGhzID8gMSA6IGN0RGF0YVthXS5kZWF0aHMgPiBjdERhdGFbYl0uZGVhdGhzID8gLTEgOiAwKSxcbiAgICAgIHJlY292ZXJlZDogT2JqZWN0LmtleXMoY3REYXRhKS5zb3J0KChhLCBiKSA9PiBjdERhdGFbYV0ucmVjb3ZlcmVkIDwgY3REYXRhW2JdLnJlY292ZXJlZCA/IDEgOiBjdERhdGFbYV0ucmVjb3ZlcmVkID4gY3REYXRhW2JdLnJlY292ZXJlZCA/IC0xIDogMCksXG4gICAgfTtcblxuICAgIE9iamVjdC5rZXlzKGN0U29ydCkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgLy8gcmVtb3ZlIGtleSAnX290aGVycydcbiAgICAgIGN0U29ydFtrZXldLnNwbGljZShjdFNvcnRba2V5XS5pbmRleE9mKCdfb3RoZXJzJyksIDEpO1xuXG4gICAgICAvLyBnZXQgdG9wIDEwIGFuZCBsb29wICYgYXBwZW5kXG4gICAgICAkKGAjc3RhdHMtdG9wLWNvdW50cmllcy0ke2tleX1gKS5odG1sKCcnKTtcbiAgICAgIGN0U29ydFtrZXldLnNsaWNlKDAsIDEwKS5mb3JFYWNoKGN0TmFtZV8gPT4ge1xuICAgICAgICBjb25zdCBjdERhdCA9IGN0RGF0YVtjdE5hbWVfXTtcbiAgICAgICAgbGV0IGN0TmFtZSA9IGN0TmFtZV8uc3BsaXQoJ18nKS5qb2luKCcgJyksIHJhdGVHbG9iYWwgPSAnJm5ic3A7JywgcmF0ZVBlcmMgPSAnJm5ic3A7JztcbiAgICAgICAgaWYgKGNvdW50cmllc0pTT05fLmluY2x1ZGVzKGN0TmFtZSkpIGN0TmFtZSA9IGNvdW50cmllc0pTT05bY3ROYW1lXTtcbiAgICAgICAgaWYgKGtleSA9PT0gJ2RlYXRocycgfHwga2V5ID09PSAncmVjb3ZlcmVkJyl7XG4gICAgICAgICAgLy8gY29tcGFyZWQgdG8gdG90YWwgW2tleV0gKGdsb2JhbClcbiAgICAgICAgICByYXRlR2xvYmFsID0gcGVyY2VudChjdERhdFtrZXldLCBzdGF0cy5kYXRhW2tleV0pKyclJztcbiAgICAgICAgICAvLyBjb21wYXJlZCB0byB0aGUgY291bnRyeSdzIHRvdGFsIGNvbmZpcm1lZFxuICAgICAgICAgIHJhdGVQZXJjID0gcGVyY2VudChjdERhdFtrZXldLCBjdERhdC50b3RhbCkrJyUnO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRlbXBsYXRlID0gJzxsaT4nK1xuICAgICAgICAgIGA8ZGl2IGNsYXNzPVwiaGVyby1mYy10b3AtbmFtZVwiPiR7Y3ROYW1lfTwvZGl2PmArXG4gICAgICAgICAgYDxkaXYgY2xhc3M9XCJoZXJvLWZjLXRvcC1udW0gbnVtXCI+JHtjb21tYXMoY3REYXRba2V5XSl9PC9kaXY+YCtcbiAgICAgICAgICAnPGRpdiBjbGFzcz1cImhlcm8tZmMtdG9wLXJhdGVzXCI+JytcbiAgICAgICAgICAgIGA8c3BhbiBjbGFzcz1cImdsb2JcIj4ke3JhdGVHbG9iYWx9PC9zcGFuPmArXG4gICAgICAgICAgICBgPHNwYW4gY2xhc3M9XCJwZXJjXCI+JHtyYXRlUGVyY308L3NwYW4+YCtcbiAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgJzwvbGk+JztcbiAgICAgICAgJChgI3N0YXRzLXRvcC1jb3VudHJpZXMtJHtrZXl9YCkuYXBwZW5kKHRlbXBsYXRlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gdXNhXG4gICAgLy8gJCgnI3N0YXRzLXRvdGFsLXVzYScpLnRleHQodXNhLmRhdGEuY29tcGlsZWQuYWxsLnRvdGFsKTtcbiAgICAvLyAkKCcjc3RhdHMtZGVhdGhzLXVzYScpLnRleHQodXNhLmRhdGEuY29tcGlsZWQuYWxsLmRlYXRocyk7XG4gICAgLy8gJCgnI3N0YXRzLXJlY292LXVzYScpLnRleHQodXNhLmRhdGEuY29tcGlsZWQuYWxsLnJlY292ZXJlZCk7XG4gICAgLy8gLy8gY2hpbmEsIG90aGVyXG4gICAgLy8gaWYgKGNvdW50cmllcy5kYXRhLl9vdGhlcnMudG90YWwgPj0gY291bnRyaWVzLmRhdGEuQ2hpbmEudG90YWwpe1xuICAgIC8vICAgY291bnRyaWVzLmRhdGEuX290aGVycy50b3RhbCA9IE1hdGgubWF4KDAsIGNvdW50cmllcy5kYXRhLl9vdGhlcnMudG90YWwtY291bnRyaWVzLmRhdGEuQ2hpbmEudG90YWwpO1xuICAgIC8vICAgY291bnRyaWVzLmRhdGEuX290aGVycy5kZWF0aHMgPSBNYXRoLm1heCgwLCBjb3VudHJpZXMuZGF0YS5fb3RoZXJzLmRlYXRocy1jb3VudHJpZXMuZGF0YS5DaGluYS5kZWF0aHMpO1xuICAgIC8vICAgY291bnRyaWVzLmRhdGEuX290aGVycy5yZWNvdmVyZWQgPSBNYXRoLm1heCgwLCBjb3VudHJpZXMuZGF0YS5fb3RoZXJzLnJlY292ZXJlZC1jb3VudHJpZXMuZGF0YS5DaGluYS5yZWNvdmVyZWQpO1xuICAgIC8vIH1cbiAgICAvLyAkKCcjc3RhdHMtdG90YWwtY2hpbmEnKS50ZXh0KGNvdW50cmllcy5kYXRhLkNoaW5hLnRvdGFsKTtcbiAgICAvLyAkKCcjc3RhdHMtZGVhdGhzLWNoaW5hJykudGV4dChjb3VudHJpZXMuZGF0YS5DaGluYS5kZWF0aHMpO1xuICAgIC8vICQoJyNzdGF0cy1yZWNvdi1jaGluYScpLnRleHQoY291bnRyaWVzLmRhdGEuQ2hpbmEucmVjb3ZlcmVkKTtcbiAgICAvLyAkKCcjc3RhdHMtdG90YWwtb3RoZXInKS50ZXh0KGNvdW50cmllcy5kYXRhLl9vdGhlcnMudG90YWwpO1xuICAgIC8vICQoJyNzdGF0cy1kZWF0aHMtb3RoZXInKS50ZXh0KGNvdW50cmllcy5kYXRhLl9vdGhlcnMuZGVhdGhzKTtcbiAgICAvLyAkKCcjc3RhdHMtcmVjb3Ytb3RoZXInKS50ZXh0KGNvdW50cmllcy5kYXRhLl9vdGhlcnMucmVjb3ZlcmVkKTtcblxuICAgIC8vIGNvdW50cmllcyB0YWJsZVxuICAgIGNvbnN0ICR0YWJsZSA9ICQoJyNoZXJvLWNvdW50cmllcy10YWJsZS1ib2R5Jyk7XG5cbiAgICAvLyBwcmVwYXJlIGNvdW50cnkgZGF0YVxuICAgIGNvbnN0XG4gICAgICBibG9iQ3V0ID0gTWF0aC5jZWlsKChjdFNvcnQudG90YWwubGVuZ3RoKSAvIDIpLCAvLyBhY2NvdW50cyBmb3IgX290aGVyc1xuICAgICAgbkJsb2JzID0gW2N0U29ydC50b3RhbC5zbGljZSgwLCBibG9iQ3V0KSwgY3RTb3J0LnRvdGFsLnNsaWNlKGJsb2JDdXQsIC0xKV0sXG4gICAgICAvLyBhbHRlcm5hdGUgYmxvYiBjb250ZW50XG4gICAgICBhbHRlcm5hdGVkQ05hbWVzXyA9IG5CbG9icy5yZWR1Y2UoKHQsIHUsIHYsIHcpID0+IHUucmVkdWNlKCh4LCB5LCB6KSA9PiAoeFt6ICogdy5sZW5ndGggKyB2XSA9IHksIHgpLCB0KSwgW10pO1xuXG4gICAgJCgnI2hlcm8tY291bnRyaWVzLWxvYWRpbmcnKS5hZGRDbGFzcygnbG9hZGVkJyk7XG4gICAgJHRhYmxlLmh0bWwoJycpO1xuICAgIC8vIGxvb3AgYWx0ZXJuYXRlZCBjb3VudHJ5IG5hbWVzIChvbmx5IGZvciBkZXNrdG9wID4gMTAyNHB4KVxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCAmJiB3aW5kb3cuaW5uZXJXaWR0aCA+IDEwMjQpIGN0U29ydC50b3RhbCA9IGFsdGVybmF0ZWRDTmFtZXNfO1xuICAgIGN0U29ydC50b3RhbC5mb3JFYWNoKGNvdW50cnlOYW1lXyA9PiB7XG4gICAgICBsZXQgY291bnRyeU5hbWUgPSBjb3VudHJ5TmFtZV8uc3BsaXQoJ18nKS5qb2luKCcgJyk7XG4gICAgICBpZiAoY291bnRyaWVzSlNPTl8uaW5jbHVkZXMoY291bnRyeU5hbWUpKSBjb3VudHJ5TmFtZSA9IGNvdW50cmllc0pTT05bY291bnRyeU5hbWVdO1xuICAgICAgLy8gY29uc29sZS5sb2coY291bnRyeU5hbWUpO1xuICAgICAgY29uc3QgdGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cImhlcm8tY291bnRyeVwiPicrXG4gICAgICAgIGA8ZGl2IGNsYXNzPVwiaGVyby1jb3VudHJ5LW5hbWVcIj4ke2NvdW50cnlOYW1lfTwvZGl2PmArXG4gICAgICAgIGA8ZGl2IGNsYXNzPVwiaGVyby1jb3VudHJ5LXZhbCB0b3RhbFwiPiR7Y3REYXRhW2NvdW50cnlOYW1lX10udG90YWx9PC9kaXY+YCtcbiAgICAgICAgYDxkaXYgY2xhc3M9XCJoZXJvLWNvdW50cnktdmFsIGRlYXRoc1wiPiR7Y3REYXRhW2NvdW50cnlOYW1lX10uZGVhdGhzfTwvZGl2PmArXG4gICAgICAgIGA8ZGl2IGNsYXNzPVwiaGVyby1jb3VudHJ5LXZhbCByZWNvdlwiPiR7Y3REYXRhW2NvdW50cnlOYW1lX10ucmVjb3ZlcmVkfTwvZGl2PmArXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiaGVyby1jb3VudHJ5LWR1bW15XCI+PC9kaXY+JysgLy8gZHVtbXlcbiAgICAgICc8L2Rpdj4nO1xuICAgICAgJHRhYmxlLmFwcGVuZCh0ZW1wbGF0ZSk7XG4gICAgfSk7XG4gIH0pO1xuICBhamF4MS5mYWlsKChhLCBiLCBjKSA9PiBjb25zb2xlLmVycm9yKGEsIGIsIGMpKTtcblxuICAvL1xuICAvLyBOZXdzXG4gIC8vXG4gIGNvbnN0IGFqYXgyID0gJC5hamF4KHtcbiAgICBtZXRob2Q6ICdHRVQnLFxuICAgIHVybDogYXBpQmFzZTIrJ25ld3MvdXNhJyxcbiAgICBkYXRhVHlwZTogJ2pzb24nLFxuICB9KTtcblxuICBhamF4Mi5kb25lKHJlcyA9PiB7XG4gICAgY29uc3Qge2RhdGEsIHRzOiBsYXN0VXBkYXRlVHN9ID0gcmVzO1xuXG4gICAgJCgnI2hlcm8tbmV3cy1saXN0JykuaHRtbCgnJyk7XG4gICAgZGF0YS5fX3NvcnRlZC5mb3JFYWNoKHRzID0+IHtcbiAgICAgIGNvbnN0IG5ld3MgPSBkYXRhW3RzXTtcbiAgICAgIGNvbnN0IHRlbXBsYXRlID0gJzxsaT4nK1xuICAgICAgICBgPGRpdiBjbGFzcz1cInB1YmRhdGVcIj4ke2Zvcm1hdERhdGUobmV3IERhdGUobmV3cy5wdWJEYXRlKSl9PC9kaXY+YCtcbiAgICAgICAgYDxkaXYgY2xhc3M9XCJoZWFkbGluZVwiPiR7bmV3cy5odG1sfTwvZGl2PmArXG4gICAgICAnPC9saT4nO1xuICAgICAgJCgnI2hlcm8tbmV3cy1saXN0JykuYXBwZW5kKHRlbXBsYXRlKTtcbiAgICB9KTtcbiAgfSk7XG4gIGFqYXgyLmZhaWwoKGEsIGIsIGMpID0+IGNvbnNvbGUuZXJyb3IoYSwgYiwgYykpO1xufSkoalF1ZXJ5KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=