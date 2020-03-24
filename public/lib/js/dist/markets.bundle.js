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
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/lib/js/custom/markets.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/lib/js/custom/markets.js":
/*!*****************************************!*\
  !*** ./public/lib/js/custom/markets.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var
// from Yahoo Finance
highestYTD = {
  '^DJI': 29568.57,
  '^SPX': 3393.52,
  '^NYA': 14183.26,
  '^RUT': 1715.08,
  '^TNX': 1.9030
};

function stockChange($els, _change) {
  var change = _change;
  if (typeof change !== 'number') change = parseFloat(change);
  var isUp = change > 0,
      isDown = change < 0;
  $els.forEach(function ($el) {
    if (isUp) $el.removeClass('down nochange').addClass('up');else if (isDown) $el.removeClass('up nochange').addClass('down');else $el.removeClass('down up').addClass('nochange');
  });
}

(function ($) {
  var prom = $.ajax({
    url: 'https://api.coinwis.com/trivial/composite-indice',
    dataType: 'json'
  });

  prom.done(function (res) {
    console.log(res);
    Object.keys(res).forEach(function (name) {
      var $stock = $('#market-' + name.replace('^', '')),
          stock = res[name],
          highest = highestYTD[name];

      var price = stock.price,
          change = stock.change,
          changePerc = stock.changePerc;

      var ytdChange = Number(price) - highest;
      var ytdChangePerc = (ytdChange / highest * 100).toFixed(2) + '%';

      var $price = $stock.find('.price'),
          $change = $stock.find('.change'),
          $changePerc = $stock.find('.change-perc'),
          $ytdChange = $stock.find('.ytd-change'),
          $ytdChangePerc = $stock.find('.ytd-change-perc');

      stockChange([$change, $changePerc], change);
      stockChange([$ytdChange, $ytdChangePerc], ytdChange);

      $price.html(price);
      $change.html(change);
      $changePerc.html(parseFloat(changePerc).toFixed(2) + '%');
      $ytdChange.html(ytdChange.toFixed(2));
      $ytdChangePerc.html(ytdChangePerc);
    });
  });

  prom.fail(function (a, b, c) {
    console.error(a, b, c);
  });
})(jQuery);

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2xpYi9qcy9jdXN0b20vbWFya2V0cy5qcyJdLCJuYW1lcyI6WyJoaWdoZXN0WVREIiwic3RvY2tDaGFuZ2UiLCIkZWxzIiwiX2NoYW5nZSIsImNoYW5nZSIsInBhcnNlRmxvYXQiLCJpc1VwIiwiaXNEb3duIiwiZm9yRWFjaCIsIiRlbCIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCIkIiwicHJvbSIsImFqYXgiLCJ1cmwiLCJkYXRhVHlwZSIsImRvbmUiLCJjb25zb2xlIiwibG9nIiwicmVzIiwiT2JqZWN0Iiwia2V5cyIsIiRzdG9jayIsIm5hbWUiLCJyZXBsYWNlIiwic3RvY2siLCJoaWdoZXN0IiwicHJpY2UiLCJjaGFuZ2VQZXJjIiwieXRkQ2hhbmdlIiwiTnVtYmVyIiwieXRkQ2hhbmdlUGVyYyIsInRvRml4ZWQiLCIkcHJpY2UiLCJmaW5kIiwiJGNoYW5nZSIsIiRjaGFuZ2VQZXJjIiwiJHl0ZENoYW5nZSIsIiR5dGRDaGFuZ2VQZXJjIiwiaHRtbCIsImZhaWwiLCJhIiwiYiIsImMiLCJlcnJvciIsImpRdWVyeSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFD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QUFrQixDQUFsQixDQUFoQjtBQUNBTSxxQkFBZUMsSUFBZixDQUFvQlIsYUFBcEI7QUFDRCxLQXpCRDtBQTBCRCxHQTVCRDs7QUE4QkFuQixPQUFLNEIsSUFBTCxDQUFVLFVBQUNDLENBQUQsRUFBSUMsQ0FBSixFQUFPQyxDQUFQLEVBQWE7QUFDckIxQixZQUFRMkIsS0FBUixDQUFjSCxDQUFkLEVBQWlCQyxDQUFqQixFQUFvQkMsQ0FBcEI7QUFDRCxHQUZEO0FBR0QsQ0F2Q0QsRUF1Q0dFLE1BdkNILEUiLCJmaWxlIjoibWFya2V0cy5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3B1YmxpYy9saWIvanMvY3VzdG9tL21hcmtldHMuanNcIik7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0XG4gIC8vIGZyb20gWWFob28gRmluYW5jZVxuICBoaWdoZXN0WVREID0ge1xuICAgICdeREpJJzogMjk1NjguNTcsXG4gICAgJ15TUFgnOiAzMzkzLjUyLFxuICAgICdeTllBJzogMTQxODMuMjYsXG4gICAgJ15SVVQnOiAxNzE1LjA4LFxuICAgICdeVE5YJzogMS45MDMwLFxuICB9O1xuXG5mdW5jdGlvbiBzdG9ja0NoYW5nZSgkZWxzLCBfY2hhbmdlKXtcbiAgbGV0IGNoYW5nZSA9IF9jaGFuZ2U7XG4gIGlmICh0eXBlb2YgY2hhbmdlICE9PSAnbnVtYmVyJykgY2hhbmdlID0gcGFyc2VGbG9hdChjaGFuZ2UpO1xuICBjb25zdCBpc1VwID0gY2hhbmdlID4gMCwgaXNEb3duID0gY2hhbmdlIDwgMDtcbiAgJGVscy5mb3JFYWNoKCRlbCA9PiB7XG4gICAgaWYgKGlzVXApICRlbC5yZW1vdmVDbGFzcygnZG93biBub2NoYW5nZScpLmFkZENsYXNzKCd1cCcpO1xuICAgIGVsc2UgaWYgKGlzRG93bikgJGVsLnJlbW92ZUNsYXNzKCd1cCBub2NoYW5nZScpLmFkZENsYXNzKCdkb3duJyk7XG4gICAgZWxzZSAkZWwucmVtb3ZlQ2xhc3MoJ2Rvd24gdXAnKS5hZGRDbGFzcygnbm9jaGFuZ2UnKTtcbiAgfSk7XG59XG5cbihmdW5jdGlvbigkKXtcbiAgY29uc3QgcHJvbSA9ICQuYWpheCh7XG4gICAgdXJsOiAnaHR0cHM6Ly9hcGkuY29pbndpcy5jb20vdHJpdmlhbC9jb21wb3NpdGUtaW5kaWNlJyxcbiAgICBkYXRhVHlwZTogJ2pzb24nLFxuICB9KTtcblxuICBwcm9tLmRvbmUocmVzID0+IHtcbiAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgIE9iamVjdC5rZXlzKHJlcykuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgIGNvbnN0XG4gICAgICAgICRzdG9jayA9ICQoJyNtYXJrZXQtJytuYW1lLnJlcGxhY2UoJ14nLCAnJykpLFxuICAgICAgICBzdG9jayA9IHJlc1tuYW1lXSxcbiAgICAgICAgaGlnaGVzdCA9IGhpZ2hlc3RZVERbbmFtZV07XG5cbiAgICAgIGNvbnN0IHtwcmljZSwgY2hhbmdlLCBjaGFuZ2VQZXJjfSA9IHN0b2NrO1xuICAgICAgY29uc3QgeXRkQ2hhbmdlID0gTnVtYmVyKHByaWNlKS1oaWdoZXN0O1xuICAgICAgY29uc3QgeXRkQ2hhbmdlUGVyYyA9ICgoeXRkQ2hhbmdlL2hpZ2hlc3QpKjEwMCkudG9GaXhlZCgyKSsnJSc7XG5cbiAgICAgIGNvbnN0XG4gICAgICAgICRwcmljZSA9ICRzdG9jay5maW5kKCcucHJpY2UnKSxcbiAgICAgICAgJGNoYW5nZSA9ICRzdG9jay5maW5kKCcuY2hhbmdlJyksXG4gICAgICAgICRjaGFuZ2VQZXJjID0gJHN0b2NrLmZpbmQoJy5jaGFuZ2UtcGVyYycpLFxuICAgICAgICAkeXRkQ2hhbmdlID0gJHN0b2NrLmZpbmQoJy55dGQtY2hhbmdlJyksXG4gICAgICAgICR5dGRDaGFuZ2VQZXJjID0gJHN0b2NrLmZpbmQoJy55dGQtY2hhbmdlLXBlcmMnKTtcblxuICAgICAgc3RvY2tDaGFuZ2UoWyRjaGFuZ2UsICRjaGFuZ2VQZXJjXSwgY2hhbmdlKTtcbiAgICAgIHN0b2NrQ2hhbmdlKFskeXRkQ2hhbmdlLCAkeXRkQ2hhbmdlUGVyY10sIHl0ZENoYW5nZSk7XG5cbiAgICAgICRwcmljZS5odG1sKHByaWNlKTtcbiAgICAgICRjaGFuZ2UuaHRtbChjaGFuZ2UpO1xuICAgICAgJGNoYW5nZVBlcmMuaHRtbChwYXJzZUZsb2F0KGNoYW5nZVBlcmMpLnRvRml4ZWQoMikrJyUnKTtcbiAgICAgICR5dGRDaGFuZ2UuaHRtbCh5dGRDaGFuZ2UudG9GaXhlZCgyKSk7XG4gICAgICAkeXRkQ2hhbmdlUGVyYy5odG1sKHl0ZENoYW5nZVBlcmMpO1xuICAgIH0pO1xuICB9KTtcblxuICBwcm9tLmZhaWwoKGEsIGIsIGMpID0+IHtcbiAgICBjb25zb2xlLmVycm9yKGEsIGIsIGMpO1xuICB9KTtcbn0pKGpRdWVyeSk7XG4iXSwic291cmNlUm9vdCI6IiJ9