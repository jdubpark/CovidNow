!function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=51)}({51:function(e,n,t){"use strict";var r=-1;function o(e,n){var t=Math.max(0,e-n);t!==r&&$("#doc-menu").css("padding-top",t),r=t}!function(e){var n=e("#main-nav").height();o(n,e(window).scrollTop()),e(window).on("scroll.docmenu",(function(){o(n,e(this).scrollTop())})),e("#doc-menu-trigger").on("click",(function(){var n=e(this);n.hasClass("active")?(n.removeClass("active"),e("#doc-menu-inner").removeClass("opened")):(n.addClass("active"),e("#doc-menu-inner").addClass("opened"))})),e(document).on("click",(function(n){var t=e("#doc-menu-trigger"),r=e("#doc-menu-inner");r[0]===n.target||r.has(n.target).length||t[0]===n.target||t.has(n.target).length||(t.removeClass("active"),r.removeClass("opened"))}))}(jQuery)}});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2xpYi9qcy9jdXN0b20vcmVhZC5qcyJdLCJuYW1lcyI6WyJpbnN0YWxsZWRNb2R1bGVzIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsIm1vZHVsZUlkIiwiZXhwb3J0cyIsIm1vZHVsZSIsImkiLCJsIiwibW9kdWxlcyIsImNhbGwiLCJtIiwiYyIsImQiLCJuYW1lIiwiZ2V0dGVyIiwibyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImdldCIsInIiLCJTeW1ib2wiLCJ0b1N0cmluZ1RhZyIsInZhbHVlIiwidCIsIm1vZGUiLCJfX2VzTW9kdWxlIiwibnMiLCJjcmVhdGUiLCJrZXkiLCJiaW5kIiwibiIsIm9iamVjdCIsInByb3BlcnR5IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJwIiwicyIsInByZXZQYWRUb3AiLCJhZGp1c3RNZW51UGFkIiwibmF2aHQiLCJ3aW50b3AiLCJwYWR0b3AiLCJNYXRoIiwibWF4IiwiJCIsImNzcyIsImhlaWdodCIsIndpbmRvdyIsInNjcm9sbFRvcCIsIm9uIiwidGhpcyIsIiR0IiwiaGFzQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwiZG9jdW1lbnQiLCJlIiwiJHRyaWdnZXIiLCIkaW5uZXIiLCJ0YXJnZXQiLCJoYXMiLCJsZW5ndGgiLCJqUXVlcnkiXSwibWFwcGluZ3MiOiJhQUNFLElBQUlBLEVBQW1CLEdBR3ZCLFNBQVNDLEVBQW9CQyxHQUc1QixHQUFHRixFQUFpQkUsR0FDbkIsT0FBT0YsRUFBaUJFLEdBQVVDLFFBR25DLElBQUlDLEVBQVNKLEVBQWlCRSxHQUFZLENBQ3pDRyxFQUFHSCxFQUNISSxHQUFHLEVBQ0hILFFBQVMsSUFVVixPQU5BSSxFQUFRTCxHQUFVTSxLQUFLSixFQUFPRCxRQUFTQyxFQUFRQSxFQUFPRCxRQUFTRixHQUcvREcsRUFBT0UsR0FBSSxFQUdKRixFQUFPRCxRQUtmRixFQUFvQlEsRUFBSUYsRUFHeEJOLEVBQW9CUyxFQUFJVixFQUd4QkMsRUFBb0JVLEVBQUksU0FBU1IsRUFBU1MsRUFBTUMsR0FDM0NaLEVBQW9CYSxFQUFFWCxFQUFTUyxJQUNsQ0csT0FBT0MsZUFBZWIsRUFBU1MsRUFBTSxDQUFFSyxZQUFZLEVBQU1DLElBQUtMLEtBS2hFWixFQUFvQmtCLEVBQUksU0FBU2hCLEdBQ1gsb0JBQVhpQixRQUEwQkEsT0FBT0MsYUFDMUNOLE9BQU9DLGVBQWViLEVBQVNpQixPQUFPQyxZQUFhLENBQUVDLE1BQU8sV0FFN0RQLE9BQU9DLGVBQWViLEVBQVMsYUFBYyxDQUFFbUIsT0FBTyxLQVF2RHJCLEVBQW9Cc0IsRUFBSSxTQUFTRCxFQUFPRSxHQUV2QyxHQURVLEVBQVBBLElBQVVGLEVBQVFyQixFQUFvQnFCLElBQy9CLEVBQVBFLEVBQVUsT0FBT0YsRUFDcEIsR0FBVyxFQUFQRSxHQUE4QixpQkFBVkYsR0FBc0JBLEdBQVNBLEVBQU1HLFdBQVksT0FBT0gsRUFDaEYsSUFBSUksRUFBS1gsT0FBT1ksT0FBTyxNQUd2QixHQUZBMUIsRUFBb0JrQixFQUFFTyxHQUN0QlgsT0FBT0MsZUFBZVUsRUFBSSxVQUFXLENBQUVULFlBQVksRUFBTUssTUFBT0EsSUFDdEQsRUFBUEUsR0FBNEIsaUJBQVRGLEVBQW1CLElBQUksSUFBSU0sS0FBT04sRUFBT3JCLEVBQW9CVSxFQUFFZSxFQUFJRSxFQUFLLFNBQVNBLEdBQU8sT0FBT04sRUFBTU0sSUFBUUMsS0FBSyxLQUFNRCxJQUM5SSxPQUFPRixHQUlSekIsRUFBb0I2QixFQUFJLFNBQVMxQixHQUNoQyxJQUFJUyxFQUFTVCxHQUFVQSxFQUFPcUIsV0FDN0IsV0FBd0IsT0FBT3JCLEVBQWdCLFNBQy9DLFdBQThCLE9BQU9BLEdBRXRDLE9BREFILEVBQW9CVSxFQUFFRSxFQUFRLElBQUtBLEdBQzVCQSxHQUlSWixFQUFvQmEsRUFBSSxTQUFTaUIsRUFBUUMsR0FBWSxPQUFPakIsT0FBT2tCLFVBQVVDLGVBQWUxQixLQUFLdUIsRUFBUUMsSUFHekcvQixFQUFvQmtDLEVBQUksR0FJakJsQyxFQUFvQkEsRUFBb0JtQyxFQUFJLEksa0NDaEZyRCxJQUFJQyxHQUFjLEVBQ2xCLFNBQVNDLEVBQWNDLEVBQU9DLEdBQzVCLElBQU1DLEVBQVNDLEtBQUtDLElBQUksRUFBR0osRUFBTUMsR0FFN0JDLElBQVdKLEdBQVlPLEVBQUUsYUFBYUMsSUFBSSxjQUFlSixHQUM3REosRUFBYUksR0FHZixTQUFVRyxHQUNSLElBQU1MLEVBQVFLLEVBQUUsYUFBYUUsU0FDN0JSLEVBQWNDLEVBQU9LLEVBQUVHLFFBQVFDLGFBQy9CSixFQUFFRyxRQUFRRSxHQUFHLGtCQUFrQixXQUM3QlgsRUFBY0MsRUFBT0ssRUFBRU0sTUFBTUYsZ0JBRy9CSixFQUFFLHFCQUFxQkssR0FBRyxTQUFTLFdBQ2pDLElBQU1FLEVBQUtQLEVBQUVNLE1BQ1RDLEVBQUdDLFNBQVMsV0FDZEQsRUFBR0UsWUFBWSxVQUNmVCxFQUFFLG1CQUFtQlMsWUFBWSxZQUVqQ0YsRUFBR0csU0FBUyxVQUNaVixFQUFFLG1CQUFtQlUsU0FBUyxjQUlsQ1YsRUFBRVcsVUFBVU4sR0FBRyxTQUFTLFNBQVNPLEdBQy9CLElBQU1DLEVBQVdiLEVBQUUscUJBQXNCYyxFQUFTZCxFQUFFLG1CQUVsRGMsRUFBTyxLQUFPRixFQUFFRyxRQUFXRCxFQUFPRSxJQUFJSixFQUFFRyxRQUFRRSxRQUNoREosRUFBUyxLQUFPRCxFQUFFRyxRQUFXRixFQUFTRyxJQUFJSixFQUFFRyxRQUFRRSxTQUVwREosRUFBU0osWUFBWSxVQUNyQkssRUFBT0wsWUFBWSxjQXpCekIsQ0E0QkdTIiwiZmlsZSI6InJlYWQuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDUxKTtcbiIsIid1c2Ugc3RyaWN0JztcblxubGV0IHByZXZQYWRUb3AgPSAtMTtcbmZ1bmN0aW9uIGFkanVzdE1lbnVQYWQobmF2aHQsIHdpbnRvcCl7XG4gIGNvbnN0IHBhZHRvcCA9IE1hdGgubWF4KDAsIG5hdmh0LXdpbnRvcCk7XG4gIC8vIGNvbnNvbGUubG9nKHBhZHRvcCk7XG4gIGlmIChwYWR0b3AgIT09IHByZXZQYWRUb3ApICQoJyNkb2MtbWVudScpLmNzcygncGFkZGluZy10b3AnLCBwYWR0b3ApO1xuICBwcmV2UGFkVG9wID0gcGFkdG9wO1xufVxuXG4oZnVuY3Rpb24oJCl7XG4gIGNvbnN0IG5hdmh0ID0gJCgnI21haW4tbmF2JykuaGVpZ2h0KCk7IC8vIDg5cHggbW9iaWxlLCA5OXB4IGNvbXAuXG4gIGFkanVzdE1lbnVQYWQobmF2aHQsICQod2luZG93KS5zY3JvbGxUb3AoKSk7IC8vIGluaXQgcnVuXG4gICQod2luZG93KS5vbignc2Nyb2xsLmRvY21lbnUnLCBmdW5jdGlvbigpe1xuICAgIGFkanVzdE1lbnVQYWQobmF2aHQsICQodGhpcykuc2Nyb2xsVG9wKCkpO1xuICB9KTtcblxuICAkKCcjZG9jLW1lbnUtdHJpZ2dlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgY29uc3QgJHQgPSAkKHRoaXMpO1xuICAgIGlmICgkdC5oYXNDbGFzcygnYWN0aXZlJykpe1xuICAgICAgJHQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgJCgnI2RvYy1tZW51LWlubmVyJykucmVtb3ZlQ2xhc3MoJ29wZW5lZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkdC5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAkKCcjZG9jLW1lbnUtaW5uZXInKS5hZGRDbGFzcygnb3BlbmVkJyk7XG4gICAgfVxuICB9KTtcblxuICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICBjb25zdCAkdHJpZ2dlciA9ICQoJyNkb2MtbWVudS10cmlnZ2VyJyksICRpbm5lciA9ICQoJyNkb2MtbWVudS1pbm5lcicpO1xuICAgIGlmIChcbiAgICAgICRpbm5lclswXSAhPT0gZS50YXJnZXQgJiYgISRpbm5lci5oYXMoZS50YXJnZXQpLmxlbmd0aCAmJlxuICAgICAgJHRyaWdnZXJbMF0gIT09IGUudGFyZ2V0ICYmICEkdHJpZ2dlci5oYXMoZS50YXJnZXQpLmxlbmd0aFxuICAgICl7XG4gICAgICAkdHJpZ2dlci5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAkaW5uZXIucmVtb3ZlQ2xhc3MoJ29wZW5lZCcpO1xuICAgIH1cbiAgfSk7XG59KShqUXVlcnkpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==