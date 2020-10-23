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
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/lib/js/src/universal.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/lib/js/src/universal.js":
/*!****************************************!*\
  !*** ./public/lib/js/src/universal.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const pb2topThres = 100;

function pb2topShow(){
  const $t = $(this);
  if ($(this).scrollTop() > pb2topThres){
    if (!$('#page-back-to-top').hasClass('show')) $('#page-back-to-top').addClass('show');
    $t.off('scroll.pb2top-show');
    $t.on('scroll.pb2top-hide', pb2topHide);
  }
}

function pb2topHide(){
  const $t = $(this);
  if ($t.scrollTop() < pb2topThres){
    if ($('#page-back-to-top').hasClass('show')) $('#page-back-to-top').removeClass('show');
    $t.off('scroll.pb2top-hide');
    $t.on('scroll.pb2top-show', pb2topShow);
  }
}

function windowToTop(){
  const $t = $(this), $page = $('html, body');
  $t.off('click.window2top');

  // slim doesn't have $.animate

  const duration = 600; // ms
  const cb = () => {
    $page.off('scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove');
    $t.on('click.window2top', windowToTop);
  };

  // https://stackoverflow.com/questions/21474678/scrolltop-animation-without-jquery
  // ease in and out

  // cancel if already on top
  if (document.documentElement.scrollTop === 0) return cb();
  const cosParameter = document.documentElement.scrollTop / 2;
  let scrollCount = 0, oldTimestamp = null, reqId = null;
  function step(newTimestamp){
    if (oldTimestamp !== null){
      // if duration is 0 scrollCount will be Infinity
      scrollCount += Math.PI * (newTimestamp - oldTimestamp) / duration;
      if (scrollCount >= Math.PI){
        document.documentElement.scrollTop = 0;
        return cb();
      }
      document.documentElement.scrollTop = cosParameter + cosParameter * Math.cos(scrollCount);
    }
    oldTimestamp = newTimestamp;
    reqId = window.requestAnimationFrame(step);
  }
  reqId = window.requestAnimationFrame(step);

  // https://stackoverflow.com/questions/18445590/jquery-animate-stop-scrolling-when-user-scrolls-manually
  $page.on('scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove', function(){
    window.cancelAnimationFrame(reqId);
    cb();
  });

  return false;
}


(function($){
  $('#main-nav-trigger').on('click', function(){
    const $t = $(this);
    if ($t.hasClass('active')){
      $t.removeClass('active');
      $('#main-nav-menu').removeClass('opened');
      $('body').removeClass('paused');
    } else {
      $t.addClass('active');
      $('#main-nav-menu').addClass('opened');
      $('body').addClass('paused');
    }
  });

  $(window).on('scroll.pb2top-show', pb2topShow);
  $('#page-back-to-top').on('click.window2top', windowToTop)
})(jQuery);


/***/ })

/******/ });
//# sourceMappingURL=universal.bundle.js.map