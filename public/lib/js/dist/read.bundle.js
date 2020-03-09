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
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/lib/js/custom/read.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/lib/js/custom/read.js":
/*!**************************************!*\
  !*** ./public/lib/js/custom/read.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var prevPadTop = -1;
function adjustMenuPad(navht, wintop) {
  var padtop = Math.max(0, navht - wintop);
  // console.log(padtop);
  if (padtop !== prevPadTop) $('#doc-menu').css('padding-top', padtop);
  prevPadTop = padtop;
}

(function ($) {
  var navht = $('#main-nav').height(); // 89px mobile, 99px comp.
  adjustMenuPad(navht, $(window).scrollTop()); // init run
  $(window).on('scroll.docmenu', function () {
    adjustMenuPad(navht, $(this).scrollTop());
  });

  $('#doc-menu-trigger').on('click', function () {
    var $t = $(this);
    if ($t.hasClass('active')) {
      $t.removeClass('active');
      $('#doc-menu-inner').removeClass('opened');
    } else {
      $t.addClass('active');
      $('#doc-menu-inner').addClass('opened');
    }
  });

  $(document).on('click', function (e) {
    var $trigger = $('#doc-menu-trigger'),
        $inner = $('#doc-menu-inner');
    console.log(e.target);
    if ($inner !== e.target && !$inner.has(e.target).length && $trigger !== e.target && !$trigger.has(e.target).length) {
      $trigger.removeClass('active');
      $inner.removeClass('opened');
    }
  });
})(jQuery);

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2xpYi9qcy9jdXN0b20vcmVhZC5qcyJdLCJuYW1lcyI6WyJwcmV2UGFkVG9wIiwiYWRqdXN0TWVudVBhZCIsIm5hdmh0Iiwid2ludG9wIiwicGFkdG9wIiwiTWF0aCIsIm1heCIsIiQiLCJjc3MiLCJoZWlnaHQiLCJ3aW5kb3ciLCJzY3JvbGxUb3AiLCJvbiIsIiR0IiwiaGFzQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwiZG9jdW1lbnQiLCJlIiwiJHRyaWdnZXIiLCIkaW5uZXIiLCJjb25zb2xlIiwibG9nIiwidGFyZ2V0IiwiaGFzIiwibGVuZ3RoIiwialF1ZXJ5Il0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhOztBQUViLElBQUlBLGFBQWEsQ0FBQyxDQUFsQjtBQUNBLFNBQVNDLGFBQVQsQ0FBdUJDLEtBQXZCLEVBQThCQyxNQUE5QixFQUFxQztBQUNuQyxNQUFNQyxTQUFTQyxLQUFLQyxHQUFMLENBQVMsQ0FBVCxFQUFZSixRQUFNQyxNQUFsQixDQUFmO0FBQ0E7QUFDQSxNQUFJQyxXQUFXSixVQUFmLEVBQTJCTyxFQUFFLFdBQUYsRUFBZUMsR0FBZixDQUFtQixhQUFuQixFQUFrQ0osTUFBbEM7QUFDM0JKLGVBQWFJLE1BQWI7QUFDRDs7QUFFRCxDQUFDLFVBQVNHLENBQVQsRUFBVztBQUNWLE1BQU1MLFFBQVFLLEVBQUUsV0FBRixFQUFlRSxNQUFmLEVBQWQsQ0FEVSxDQUM2QjtBQUN2Q1IsZ0JBQWNDLEtBQWQsRUFBcUJLLEVBQUVHLE1BQUYsRUFBVUMsU0FBVixFQUFyQixFQUZVLENBRW1DO0FBQzdDSixJQUFFRyxNQUFGLEVBQVVFLEVBQVYsQ0FBYSxnQkFBYixFQUErQixZQUFVO0FBQ3ZDWCxrQkFBY0MsS0FBZCxFQUFxQkssRUFBRSxJQUFGLEVBQVFJLFNBQVIsRUFBckI7QUFDRCxHQUZEOztBQUlBSixJQUFFLG1CQUFGLEVBQXVCSyxFQUF2QixDQUEwQixPQUExQixFQUFtQyxZQUFVO0FBQzNDLFFBQU1DLEtBQUtOLEVBQUUsSUFBRixDQUFYO0FBQ0EsUUFBSU0sR0FBR0MsUUFBSCxDQUFZLFFBQVosQ0FBSixFQUEwQjtBQUN4QkQsU0FBR0UsV0FBSCxDQUFlLFFBQWY7QUFDQVIsUUFBRSxpQkFBRixFQUFxQlEsV0FBckIsQ0FBaUMsUUFBakM7QUFDRCxLQUhELE1BR087QUFDTEYsU0FBR0csUUFBSCxDQUFZLFFBQVo7QUFDQVQsUUFBRSxpQkFBRixFQUFxQlMsUUFBckIsQ0FBOEIsUUFBOUI7QUFDRDtBQUNGLEdBVEQ7O0FBV0FULElBQUVVLFFBQUYsRUFBWUwsRUFBWixDQUFlLE9BQWYsRUFBd0IsVUFBU00sQ0FBVCxFQUFXO0FBQ2pDLFFBQU1DLFdBQVdaLEVBQUUsbUJBQUYsQ0FBakI7QUFBQSxRQUF5Q2EsU0FBU2IsRUFBRSxpQkFBRixDQUFsRDtBQUNBYyxZQUFRQyxHQUFSLENBQVlKLEVBQUVLLE1BQWQ7QUFDQSxRQUNFSCxXQUFXRixFQUFFSyxNQUFiLElBQXVCLENBQUNILE9BQU9JLEdBQVAsQ0FBV04sRUFBRUssTUFBYixFQUFxQkUsTUFBN0MsSUFDQU4sYUFBYUQsRUFBRUssTUFEZixJQUN5QixDQUFDSixTQUFTSyxHQUFULENBQWFOLEVBQUVLLE1BQWYsRUFBdUJFLE1BRm5ELEVBR0M7QUFDQ04sZUFBU0osV0FBVCxDQUFxQixRQUFyQjtBQUNBSyxhQUFPTCxXQUFQLENBQW1CLFFBQW5CO0FBQ0Q7QUFDRixHQVZEO0FBV0QsQ0E3QkQsRUE2QkdXLE1BN0JILEUiLCJmaWxlIjoicmVhZC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3B1YmxpYy9saWIvanMvY3VzdG9tL3JlYWQuanNcIik7XG4iLCIndXNlIHN0cmljdCc7XG5cbmxldCBwcmV2UGFkVG9wID0gLTE7XG5mdW5jdGlvbiBhZGp1c3RNZW51UGFkKG5hdmh0LCB3aW50b3Ape1xuICBjb25zdCBwYWR0b3AgPSBNYXRoLm1heCgwLCBuYXZodC13aW50b3ApO1xuICAvLyBjb25zb2xlLmxvZyhwYWR0b3ApO1xuICBpZiAocGFkdG9wICE9PSBwcmV2UGFkVG9wKSAkKCcjZG9jLW1lbnUnKS5jc3MoJ3BhZGRpbmctdG9wJywgcGFkdG9wKTtcbiAgcHJldlBhZFRvcCA9IHBhZHRvcDtcbn1cblxuKGZ1bmN0aW9uKCQpe1xuICBjb25zdCBuYXZodCA9ICQoJyNtYWluLW5hdicpLmhlaWdodCgpOyAvLyA4OXB4IG1vYmlsZSwgOTlweCBjb21wLlxuICBhZGp1c3RNZW51UGFkKG5hdmh0LCAkKHdpbmRvdykuc2Nyb2xsVG9wKCkpOyAvLyBpbml0IHJ1blxuICAkKHdpbmRvdykub24oJ3Njcm9sbC5kb2NtZW51JywgZnVuY3Rpb24oKXtcbiAgICBhZGp1c3RNZW51UGFkKG5hdmh0LCAkKHRoaXMpLnNjcm9sbFRvcCgpKTtcbiAgfSk7XG5cbiAgJCgnI2RvYy1tZW51LXRyaWdnZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgIGNvbnN0ICR0ID0gJCh0aGlzKTtcbiAgICBpZiAoJHQuaGFzQ2xhc3MoJ2FjdGl2ZScpKXtcbiAgICAgICR0LnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICQoJyNkb2MtbWVudS1pbm5lcicpLnJlbW92ZUNsYXNzKCdvcGVuZWQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJHQuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgJCgnI2RvYy1tZW51LWlubmVyJykuYWRkQ2xhc3MoJ29wZW5lZCcpO1xuICAgIH1cbiAgfSk7XG5cbiAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgY29uc3QgJHRyaWdnZXIgPSAkKCcjZG9jLW1lbnUtdHJpZ2dlcicpLCAkaW5uZXIgPSAkKCcjZG9jLW1lbnUtaW5uZXInKTtcbiAgICBjb25zb2xlLmxvZyhlLnRhcmdldCk7XG4gICAgaWYgKFxuICAgICAgJGlubmVyICE9PSBlLnRhcmdldCAmJiAhJGlubmVyLmhhcyhlLnRhcmdldCkubGVuZ3RoICYmXG4gICAgICAkdHJpZ2dlciAhPT0gZS50YXJnZXQgJiYgISR0cmlnZ2VyLmhhcyhlLnRhcmdldCkubGVuZ3RoXG4gICAgKXtcbiAgICAgICR0cmlnZ2VyLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICRpbm5lci5yZW1vdmVDbGFzcygnb3BlbmVkJyk7XG4gICAgfVxuICB9KTtcbn0pKGpRdWVyeSk7XG4iXSwic291cmNlUm9vdCI6IiJ9