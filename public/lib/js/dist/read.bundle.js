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
  var padtop = Math.max(0, navht - wintop); // console.log(padtop);

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

    if ($inner[0] !== e.target && !$inner.has(e.target).length && $trigger[0] !== e.target && !$trigger.has(e.target).length) {
      $trigger.removeClass('active');
      $inner.removeClass('opened');
    }
  });
})(jQuery);

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2xpYi9qcy9jdXN0b20vcmVhZC5qcyJdLCJuYW1lcyI6WyJwcmV2UGFkVG9wIiwiYWRqdXN0TWVudVBhZCIsIm5hdmh0Iiwid2ludG9wIiwicGFkdG9wIiwiTWF0aCIsIm1heCIsIiQiLCJjc3MiLCJoZWlnaHQiLCJ3aW5kb3ciLCJzY3JvbGxUb3AiLCJvbiIsIiR0IiwiaGFzQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwiZG9jdW1lbnQiLCJlIiwiJHRyaWdnZXIiLCIkaW5uZXIiLCJ0YXJnZXQiLCJoYXMiLCJsZW5ndGgiLCJqUXVlcnkiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRmE7O0FBRWIsSUFBSUEsVUFBVSxHQUFHLENBQUMsQ0FBbEI7O0FBQ0EsU0FBU0MsYUFBVCxDQUF1QkMsS0FBdkIsRUFBOEJDLE1BQTlCLEVBQXFDO0FBQ25DLE1BQU1DLE1BQU0sR0FBR0MsSUFBSSxDQUFDQyxHQUFMLENBQVMsQ0FBVCxFQUFZSixLQUFLLEdBQUNDLE1BQWxCLENBQWYsQ0FEbUMsQ0FFbkM7O0FBQ0EsTUFBSUMsTUFBTSxLQUFLSixVQUFmLEVBQTJCTyxDQUFDLENBQUMsV0FBRCxDQUFELENBQWVDLEdBQWYsQ0FBbUIsYUFBbkIsRUFBa0NKLE1BQWxDO0FBQzNCSixZQUFVLEdBQUdJLE1BQWI7QUFDRDs7QUFFRCxDQUFDLFVBQVNHLENBQVQsRUFBVztBQUNWLE1BQU1MLEtBQUssR0FBR0ssQ0FBQyxDQUFDLFdBQUQsQ0FBRCxDQUFlRSxNQUFmLEVBQWQsQ0FEVSxDQUM2Qjs7QUFDdkNSLGVBQWEsQ0FBQ0MsS0FBRCxFQUFRSyxDQUFDLENBQUNHLE1BQUQsQ0FBRCxDQUFVQyxTQUFWLEVBQVIsQ0FBYixDQUZVLENBRW1DOztBQUM3Q0osR0FBQyxDQUFDRyxNQUFELENBQUQsQ0FBVUUsRUFBVixDQUFhLGdCQUFiLEVBQStCLFlBQVU7QUFDdkNYLGlCQUFhLENBQUNDLEtBQUQsRUFBUUssQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRSSxTQUFSLEVBQVIsQ0FBYjtBQUNELEdBRkQ7QUFJQUosR0FBQyxDQUFDLG1CQUFELENBQUQsQ0FBdUJLLEVBQXZCLENBQTBCLE9BQTFCLEVBQW1DLFlBQVU7QUFDM0MsUUFBTUMsRUFBRSxHQUFHTixDQUFDLENBQUMsSUFBRCxDQUFaOztBQUNBLFFBQUlNLEVBQUUsQ0FBQ0MsUUFBSCxDQUFZLFFBQVosQ0FBSixFQUEwQjtBQUN4QkQsUUFBRSxDQUFDRSxXQUFILENBQWUsUUFBZjtBQUNBUixPQUFDLENBQUMsaUJBQUQsQ0FBRCxDQUFxQlEsV0FBckIsQ0FBaUMsUUFBakM7QUFDRCxLQUhELE1BR087QUFDTEYsUUFBRSxDQUFDRyxRQUFILENBQVksUUFBWjtBQUNBVCxPQUFDLENBQUMsaUJBQUQsQ0FBRCxDQUFxQlMsUUFBckIsQ0FBOEIsUUFBOUI7QUFDRDtBQUNGLEdBVEQ7QUFXQVQsR0FBQyxDQUFDVSxRQUFELENBQUQsQ0FBWUwsRUFBWixDQUFlLE9BQWYsRUFBd0IsVUFBU00sQ0FBVCxFQUFXO0FBQ2pDLFFBQU1DLFFBQVEsR0FBR1osQ0FBQyxDQUFDLG1CQUFELENBQWxCO0FBQUEsUUFBeUNhLE1BQU0sR0FBR2IsQ0FBQyxDQUFDLGlCQUFELENBQW5EOztBQUNBLFFBQ0VhLE1BQU0sQ0FBQyxDQUFELENBQU4sS0FBY0YsQ0FBQyxDQUFDRyxNQUFoQixJQUEwQixDQUFDRCxNQUFNLENBQUNFLEdBQVAsQ0FBV0osQ0FBQyxDQUFDRyxNQUFiLEVBQXFCRSxNQUFoRCxJQUNBSixRQUFRLENBQUMsQ0FBRCxDQUFSLEtBQWdCRCxDQUFDLENBQUNHLE1BRGxCLElBQzRCLENBQUNGLFFBQVEsQ0FBQ0csR0FBVCxDQUFhSixDQUFDLENBQUNHLE1BQWYsRUFBdUJFLE1BRnRELEVBR0M7QUFDQ0osY0FBUSxDQUFDSixXQUFULENBQXFCLFFBQXJCO0FBQ0FLLFlBQU0sQ0FBQ0wsV0FBUCxDQUFtQixRQUFuQjtBQUNEO0FBQ0YsR0FURDtBQVVELENBNUJELEVBNEJHUyxNQTVCSCxFIiwiZmlsZSI6InJlYWQuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9wdWJsaWMvbGliL2pzL2N1c3RvbS9yZWFkLmpzXCIpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5sZXQgcHJldlBhZFRvcCA9IC0xO1xuZnVuY3Rpb24gYWRqdXN0TWVudVBhZChuYXZodCwgd2ludG9wKXtcbiAgY29uc3QgcGFkdG9wID0gTWF0aC5tYXgoMCwgbmF2aHQtd2ludG9wKTtcbiAgLy8gY29uc29sZS5sb2cocGFkdG9wKTtcbiAgaWYgKHBhZHRvcCAhPT0gcHJldlBhZFRvcCkgJCgnI2RvYy1tZW51JykuY3NzKCdwYWRkaW5nLXRvcCcsIHBhZHRvcCk7XG4gIHByZXZQYWRUb3AgPSBwYWR0b3A7XG59XG5cbihmdW5jdGlvbigkKXtcbiAgY29uc3QgbmF2aHQgPSAkKCcjbWFpbi1uYXYnKS5oZWlnaHQoKTsgLy8gODlweCBtb2JpbGUsIDk5cHggY29tcC5cbiAgYWRqdXN0TWVudVBhZChuYXZodCwgJCh3aW5kb3cpLnNjcm9sbFRvcCgpKTsgLy8gaW5pdCBydW5cbiAgJCh3aW5kb3cpLm9uKCdzY3JvbGwuZG9jbWVudScsIGZ1bmN0aW9uKCl7XG4gICAgYWRqdXN0TWVudVBhZChuYXZodCwgJCh0aGlzKS5zY3JvbGxUb3AoKSk7XG4gIH0pO1xuXG4gICQoJyNkb2MtbWVudS10cmlnZ2VyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBjb25zdCAkdCA9ICQodGhpcyk7XG4gICAgaWYgKCR0Lmhhc0NsYXNzKCdhY3RpdmUnKSl7XG4gICAgICAkdC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAkKCcjZG9jLW1lbnUtaW5uZXInKS5yZW1vdmVDbGFzcygnb3BlbmVkJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICR0LmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICQoJyNkb2MtbWVudS1pbm5lcicpLmFkZENsYXNzKCdvcGVuZWQnKTtcbiAgICB9XG4gIH0pO1xuXG4gICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgIGNvbnN0ICR0cmlnZ2VyID0gJCgnI2RvYy1tZW51LXRyaWdnZXInKSwgJGlubmVyID0gJCgnI2RvYy1tZW51LWlubmVyJyk7XG4gICAgaWYgKFxuICAgICAgJGlubmVyWzBdICE9PSBlLnRhcmdldCAmJiAhJGlubmVyLmhhcyhlLnRhcmdldCkubGVuZ3RoICYmXG4gICAgICAkdHJpZ2dlclswXSAhPT0gZS50YXJnZXQgJiYgISR0cmlnZ2VyLmhhcyhlLnRhcmdldCkubGVuZ3RoXG4gICAgKXtcbiAgICAgICR0cmlnZ2VyLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICRpbm5lci5yZW1vdmVDbGFzcygnb3BlbmVkJyk7XG4gICAgfVxuICB9KTtcbn0pKGpRdWVyeSk7XG4iXSwic291cmNlUm9vdCI6IiJ9