!function(t){var a={};function e(o){if(a[o])return a[o].exports;var r=a[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}e.m=t,e.c=a,e.d=function(t,a,o){e.o(t,a)||Object.defineProperty(t,a,{enumerable:!0,get:o})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,a){if(1&a&&(t=e(t)),8&a)return t;if(4&a&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&a&&"string"!=typeof t)for(var r in t)e.d(o,r,function(a){return t[a]}.bind(null,r));return o},e.n=function(t){var a=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(a,"a",a),a},e.o=function(t,a){return Object.prototype.hasOwnProperty.call(t,a)},e.p="",e(e.s=1)}([,function(t,a,e){"use strict";var o="https://covidnow.com/api/",r=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],s=e(2),n=Object.keys(s),l=void 0;function c(t){var a=t.geocoding,e=a.lat,o=a.long;t.distances;e||o?$("#you-search-invalid").removeClass("show"):$("#you-search-invalid").addClass("show"),$("#you-search-lat val").text(e),$("#you-search-long val").text(o);var r=t.geocoding,s=r.county,n=r.state,c=l.states.data;$("#geoloc-county-name").text(s+" County, "+n),$("#geoloc-state-name span").text(n);var d=0,i=0;c[n]&&c[n][s]&&(d=c[n][s].total),c[n]&&c[n]._statewide&&(i=c[n]._statewide.total),$("#geoloc-county .cases val").text(d),$("#geoloc-state .cases val").text(i)}!function(t){var a=!1;t("#you-search-btn").on("click",(function(){if(a)return!1;a=!0;var e=t(this),r=t("#you-search-bar").val();e.addClass("disabled"),t("#you-search-invalid").removeClass("show"),t("#you-search-lat val").html("locating..."),t("#you-search-long val").html("locating...");var s=t.ajax({method:"GET",url:o+"my/geoDistances",data:{address:r},dataType:"json"});s.done((function(t){console.log(t),a=!1,e.removeClass("disabled"),c(t)})),s.fail((function(t,a,e){return console.error(t,a,e)}))})),t("#you-search-lat val").html("search..."),t("#you-search-long val").html("search...");var e=t.ajax({method:"GET",url:o+"core/all",dataType:"json"});e.done((function(a){console.log(a),l=a;var e,o,c,d,i,u=a.usa,h=a.stats,v=a.countries;t("#stats-last-update span").text((e=new Date(h.ts),o=e.getHours(),c=e.getMinutes(),d=o>=12?"pm":"am",i=(o=(o%=12)||12)+":"+(c=c<10?"0"+c:c)+" "+d,r[e.getMonth()]+" "+e.getDate()+", "+i)),t("#stats-total-total").text(h.data.total),t("#stats-deaths-total").text(h.data.deaths),t("#stats-recov-total").text(h.data.recovered),t("#stats-total-usa").text(u.data.compiled.all.total),t("#stats-deaths-usa").text(u.data.compiled.all.deaths),t("#stats-recov-usa").text(u.data.compiled.all.recovered),v.data._others.total>=v.data.China.total&&(v.data._others.total=Math.max(0,v.data._others.total-v.data.China.total),v.data._others.deaths=Math.max(0,v.data._others.deaths-v.data.China.deaths),v.data._others.recovered=Math.max(0,v.data._others.recovered-v.data.China.recovered)),t("#stats-total-china").text(v.data.China.total),t("#stats-deaths-china").text(v.data.China.deaths),t("#stats-recov-china").text(v.data.China.recovered),t("#stats-total-other").text(v.data._others.total),t("#stats-deaths-other").text(v.data._others.deaths),t("#stats-recov-other").text(v.data._others.recovered);var f=v.data,y=t("#hero-countries-table-body"),p=Object.keys(f);p.splice(p.indexOf("_others"),1),p.sort((function(t,a){return f[t].total<f[a].total?1:f[t].total>f[a].total?-1:0}));var m=Math.ceil(p.length/2),g=[p.slice(0,m),p.slice(m,-1)].reduce((function(t,a,e,o){return a.reduce((function(t,a,r){return t[r*o.length+e]=a,t}),t)}),[]);t("#hero-countries-loading").addClass("loaded"),y.html(""),window.innerWidth&&window.innerWidth>1024&&(p=g),p.forEach((function(t){var a=t.split("_").join(" ");n.includes(a)&&(a=s[a]);var e='<div class="hero-country"><div class="hero-country-name">'+a+'</div><div class="hero-country-val total">'+f[t].total+'</div><div class="hero-country-val deaths">'+f[t].deaths+'</div><div class="hero-country-val recov">'+f[t].recovered+'</div><div class="hero-country-dummy"></div></div>';y.append(e)}))})),e.fail((function(t,a,e){return console.error(t,a,e)}))}(jQuery)},function(t){t.exports=JSON.parse('{"Iran (Islamic Republic of)":"Iran","occupied Palestinian territory":"Palestine","Democratic Republic of the Congo":"DR Congo","Republic of Korea":"South Korea","Democratic Republic of Korea":"North Korea","Republic of Moldova":"Moldova","Russian Federation":"Russia","United Arab Emirates":"U.A.E"}')}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2xpYi9qcy9jdXN0b20vaG9tZS5qcyJdLCJuYW1lcyI6WyJpbnN0YWxsZWRNb2R1bGVzIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsIm1vZHVsZUlkIiwiZXhwb3J0cyIsIm1vZHVsZSIsImkiLCJsIiwibW9kdWxlcyIsImNhbGwiLCJtIiwiYyIsImQiLCJuYW1lIiwiZ2V0dGVyIiwibyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImdldCIsInIiLCJTeW1ib2wiLCJ0b1N0cmluZ1RhZyIsInZhbHVlIiwidCIsIm1vZGUiLCJfX2VzTW9kdWxlIiwibnMiLCJjcmVhdGUiLCJrZXkiLCJiaW5kIiwibiIsIm9iamVjdCIsInByb3BlcnR5IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJwIiwicyIsImFwaUJhc2UiLCJwcm9jZXNzIiwibW9udGhzIiwiY291bnRyaWVzSlNPTiIsInJlcXVpcmUiLCJjb3VudHJpZXNKU09OXyIsImtleXMiLCJjZEZldGNoIiwidW5kZWZpbmVkIiwibG9hZEdlb2RhdGEiLCJkYXRhIiwiZ2VvY29kaW5nIiwibGF0IiwibG9uZyIsImRpc3RhbmNlcyIsIiQiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwidGV4dCIsImNvdW50eSIsInN0YXRlIiwic3REYXRhIiwic3RhdGVzIiwiY1RvdGFsIiwic1RvdGFsIiwidG90YWwiLCJfc3RhdGV3aWRlIiwieW91U2VhcmNoaW5nIiwib24iLCIkdCIsInRoaXMiLCJ2YWwiLCJodG1sIiwiYWpheDEiLCJhamF4IiwibWV0aG9kIiwidXJsIiwiYWRkcmVzcyIsImRhdGFUeXBlIiwiZG9uZSIsImNvbnNvbGUiLCJsb2ciLCJmYWlsIiwiYSIsImIiLCJlcnJvciIsImRPYmoiLCJocnMiLCJtaW5zIiwiYW1wbSIsInN0clRpbWUiLCJ1c2EiLCJzdGF0cyIsImNvdW50cmllcyIsIkRhdGUiLCJ0cyIsImdldEhvdXJzIiwiZ2V0TWludXRlcyIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsImRlYXRocyIsInJlY292ZXJlZCIsImNvbXBpbGVkIiwiYWxsIiwiX290aGVycyIsIkNoaW5hIiwiTWF0aCIsIm1heCIsImN0RGF0YSIsIiR0YWJsZSIsImNvdW50cnlOYW1lc18iLCJzcGxpY2UiLCJpbmRleE9mIiwic29ydCIsImJsb2JDdXQiLCJjZWlsIiwibGVuZ3RoIiwiYWx0ZXJuYXRlZENOYW1lc18iLCJzbGljZSIsInJlZHVjZSIsInUiLCJ2IiwidyIsIngiLCJ5IiwieiIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJmb3JFYWNoIiwiY291bnRyeU5hbWVfIiwiY291bnRyeU5hbWUiLCJzcGxpdCIsImpvaW4iLCJpbmNsdWRlcyIsInRlbXBsYXRlIiwiYXBwZW5kIiwialF1ZXJ5Il0sIm1hcHBpbmdzIjoiYUFDRSxJQUFJQSxFQUFtQixHQUd2QixTQUFTQyxFQUFvQkMsR0FHNUIsR0FBR0YsRUFBaUJFLEdBQ25CLE9BQU9GLEVBQWlCRSxHQUFVQyxRQUduQyxJQUFJQyxFQUFTSixFQUFpQkUsR0FBWSxDQUN6Q0csRUFBR0gsRUFDSEksR0FBRyxFQUNISCxRQUFTLElBVVYsT0FOQUksRUFBUUwsR0FBVU0sS0FBS0osRUFBT0QsUUFBU0MsRUFBUUEsRUFBT0QsUUFBU0YsR0FHL0RHLEVBQU9FLEdBQUksRUFHSkYsRUFBT0QsUUFLZkYsRUFBb0JRLEVBQUlGLEVBR3hCTixFQUFvQlMsRUFBSVYsRUFHeEJDLEVBQW9CVSxFQUFJLFNBQVNSLEVBQVNTLEVBQU1DLEdBQzNDWixFQUFvQmEsRUFBRVgsRUFBU1MsSUFDbENHLE9BQU9DLGVBQWViLEVBQVNTLEVBQU0sQ0FBRUssWUFBWSxFQUFNQyxJQUFLTCxLQUtoRVosRUFBb0JrQixFQUFJLFNBQVNoQixHQUNYLG9CQUFYaUIsUUFBMEJBLE9BQU9DLGFBQzFDTixPQUFPQyxlQUFlYixFQUFTaUIsT0FBT0MsWUFBYSxDQUFFQyxNQUFPLFdBRTdE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QUFJLEtBRzlHLElBQ0VpRCxFQUFVUixLQUFLUyxLQUFNTCxFQUFjTSxPQUFVLEdBRzdDQyxFQUZTLENBQUNQLEVBQWNRLE1BQU0sRUFBR0osR0FBVUosRUFBY1EsTUFBTUosR0FBVSxJQUU5Q0ssUUFBTyxTQUFDN0YsRUFBRzhGLEVBQUdDLEVBQUdDLEdBQVYsT0FBZ0JGLEVBQUVELFFBQU8sU0FBQ0ksRUFBR0MsRUFBR0MsR0FBUCxPQUFjRixFQUFFRSxFQUFJSCxFQUFFTixPQUFTSyxHQUFLRyxFQUFHRCxJQUFJakcsS0FBSSxJQUU1RzZCLEVBQUUsMkJBQTJCRSxTQUFTLFVBQ3RDb0QsRUFBT3JDLEtBQUssSUFFUnNELE9BQU9DLFlBQWNELE9BQU9DLFdBQWEsT0FBTWpCLEVBQWdCTyxHQUNuRVAsRUFBY2tCLFNBQVEsU0FBQUMsR0FDcEIsSUFBSUMsRUFBY0QsRUFBYUUsTUFBTSxLQUFLQyxLQUFLLEtBQzNDdkYsRUFBZXdGLFNBQVNILEtBQWNBLEVBQWN2RixFQUFjdUYsSUFFdEUsSUFBTUksRUFBVyw0REFDbUJKLEVBRG5CLDZDQUV3QnRCLEVBQU9xQixHQUFjaEUsTUFGN0MsOENBR3lCMkMsRUFBT3FCLEdBQWM3QixPQUg5Qyw2Q0FJd0JRLEVBQU9xQixHQUFjNUIsVUFKN0MscURBT2pCUSxFQUFPMEIsT0FBT0QsU0FHbEI1RCxFQUFLUSxNQUFLLFNBQUNDLEVBQUdDLEVBQUd2RSxHQUFQLE9BQWFtRSxRQUFRSyxNQUFNRixFQUFHQyxFQUFHdkUsTUF4RzdDLENBeUdHMkgsUyIsImZpbGUiOiJob21lLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgYXBpQmFzZSA9IHByb2Nlc3MuZW52LkFQSV9VUkwrJ2FwaS8nO1xuY29uc3QgbW9udGhzID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsICdPY3QnLCAnTm92JywgJ0RlYyddO1xuY29uc3QgY291bnRyaWVzSlNPTiA9IHJlcXVpcmUoJy4uLy4uL2pzb24vY291bnRyaWVzLmpzb24nKTtcbmNvbnN0IGNvdW50cmllc0pTT05fID0gT2JqZWN0LmtleXMoY291bnRyaWVzSlNPTik7XG5cbmxldCBjZEZldGNoID0gdW5kZWZpbmVkOyAvLyBjb3JlIGRhdGEgZmV0Y2hcblxuZnVuY3Rpb24gZ2VvbG9jU3VjY2Vzcyhwb3Mpe1xuICBjb25zdCBsYXQgPSBwb3MuY29vcmRzLmxhdGl0dWRlLCBsb25nID0gcG9zLmNvb3Jkcy5sb25naXR1ZGU7XG4gICQoJyN5b3Utc2VhcmNoLWxhdCB2YWwnKS5odG1sKGxhdCk7XG4gICQoJyN5b3Utc2VhcmNoLWxvbmcgdmFsJykuaHRtbChsb25nKTtcbiAgY29uc29sZS5sb2cocG9zLmNvb3Jkcyk7XG4gIGNvbnN0IGFqYXgxID0gJC5hamF4KHtcbiAgICBtZXRob2Q6ICdHRVQnLFxuICAgIHVybDogYXBpQmFzZSsnbXkvZ2VvRGlzdGFuY2VzJyxcbiAgICBkYXRhOiB7bGF0LCBsb25nfSxcbiAgICBkYXRhVHlwZTogJ2pzb24nLFxuICB9KTtcbiAgYWpheDEuZG9uZShkYXRhID0+IHtcbiAgICBjb25zb2xlLmxvZygnYXV0byBnZW9sb2MnLCBkYXRhKTtcbiAgICBsb2FkR2VvZGF0YShkYXRhKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdlb2xvY0Vycm9yKCl7XG4gICQoJyN5b3Utc2VhcmNoLWxhdCB2YWwnKS5odG1sKCdsb2NhdGluZyBmYWlsZWQuLi4nKTtcbiAgJCgnI3lvdS1zZWFyY2gtbG9uZyB2YWwnKS5odG1sKCdsb2NhdGluZyBmYWlsZWQuLi4nKTtcbn1cblxuZnVuY3Rpb24gbG9hZEdlb2RhdGEoZGF0YSl7XG4gIGNvbnN0IHtnZW9jb2Rpbmc6IHtsYXQsIGxvbmd9LCBkaXN0YW5jZXM6IGRpc3RzfSA9IGRhdGE7XG4gIGlmICghbGF0ICYmICFsb25nKSAkKCcjeW91LXNlYXJjaC1pbnZhbGlkJykuYWRkQ2xhc3MoJ3Nob3cnKTtcbiAgZWxzZSAkKCcjeW91LXNlYXJjaC1pbnZhbGlkJykucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcbiAgJCgnI3lvdS1zZWFyY2gtbGF0IHZhbCcpLnRleHQobGF0KTtcbiAgJCgnI3lvdS1zZWFyY2gtbG9uZyB2YWwnKS50ZXh0KGxvbmcpO1xuICAvLyAkKCcjeW91LXNlYXJjaC1uYW1lIHZhbCcpLnRleHQobmFtZSk7XG5cbiAgLy8gT0ZGOiBkaXN0YW5jZSBtb2RlbCBmb3Igbm93XG4gIC8vIE9iamVjdC5rZXlzKGRpc3RzKS5mb3JFYWNoKGRpc3QgPT4ge1xuICAvLyAgIGNvbnN0IGxvY3MgPSBkaXN0c1tkaXN0XSwgdG90YWwgPSBsb2NzLmxlbmd0aDtcbiAgLy8gICAvLyBjb25zb2xlLmxvZygnI2dlb2xvYy1kJytkaXN0KTtcbiAgLy8gICAkKCcjZ2VvbG9jLWQnK2Rpc3QrJyAuY2FzZXMgdmFsJykudGV4dCh0b3RhbCk7XG4gIC8vIH0pO1xuXG4gIC8vIE9OOiBjb3VudHkgbW9kZWxcbiAgY29uc3Qge2dlb2NvZGluZzoge2NvdW50eSwgc3RhdGV9fSA9IGRhdGEsIHN0RGF0YSA9IGNkRmV0Y2guc3RhdGVzLmRhdGE7XG4gICQoJyNnZW9sb2MtY291bnR5LW5hbWUnKS50ZXh0KGNvdW50eSsnIENvdW50eSwgJytzdGF0ZSk7XG4gICQoJyNnZW9sb2Mtc3RhdGUtbmFtZSBzcGFuJykudGV4dChzdGF0ZSk7XG4gIGxldCBjVG90YWwgPSAwLCBzVG90YWwgPSAwO1xuICBpZiAoc3REYXRhW3N0YXRlXSAmJiBzdERhdGFbc3RhdGVdW2NvdW50eV0pIGNUb3RhbCA9IHN0RGF0YVtzdGF0ZV1bY291bnR5XS50b3RhbDtcbiAgaWYgKHN0RGF0YVtzdGF0ZV0gJiYgc3REYXRhW3N0YXRlXS5fc3RhdGV3aWRlKSBzVG90YWwgPSBzdERhdGFbc3RhdGVdLl9zdGF0ZXdpZGUudG90YWw7XG4gICQoJyNnZW9sb2MtY291bnR5IC5jYXNlcyB2YWwnKS50ZXh0KGNUb3RhbCk7XG4gICQoJyNnZW9sb2Mtc3RhdGUgLmNhc2VzIHZhbCcpLnRleHQoc1RvdGFsKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0RGF0ZShkT2JqKXtcbiAgbGV0IGhycyA9IGRPYmouZ2V0SG91cnMoKSwgbWlucyA9IGRPYmouZ2V0TWludXRlcygpLCBhbXBtID0gaHJzID49IDEyID8gJ3BtJyA6ICdhbSc7XG4gIGhycyA9IGhycyAlIDEyO1xuICBocnMgPSBocnMgPyBocnMgOiAxMjsgLy8gdGhlIGhvdXIgJzAnIHNob3VsZCBiZSAnMTInXG4gIG1pbnMgPSBtaW5zIDwgMTAgPyAnMCcrbWlucyA6IG1pbnM7XG4gIGNvbnN0IHN0clRpbWUgPSBgJHtocnN9OiR7bWluc30gJHthbXBtfWA7XG4gIHJldHVybiBgJHttb250aHNbZE9iai5nZXRNb250aCgpXX0gJHtkT2JqLmdldERhdGUoKX0sICR7c3RyVGltZX1gO1xufVxuXG4oZnVuY3Rpb24oJCl7XG4gIGxldCB5b3VTZWFyY2hpbmcgPSBmYWxzZTtcbiAgJCgnI3lvdS1zZWFyY2gtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBpZiAoeW91U2VhcmNoaW5nKSByZXR1cm4gZmFsc2U7XG4gICAgeW91U2VhcmNoaW5nID0gdHJ1ZTtcbiAgICBjb25zdCAkdCA9ICQodGhpcyksIHZhbCA9ICQoJyN5b3Utc2VhcmNoLWJhcicpLnZhbCgpO1xuICAgICR0LmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuICAgICQoJyN5b3Utc2VhcmNoLWludmFsaWQnKS5yZW1vdmVDbGFzcygnc2hvdycpO1xuICAgICQoJyN5b3Utc2VhcmNoLWxhdCB2YWwnKS5odG1sKCdsb2NhdGluZy4uLicpO1xuICAgICQoJyN5b3Utc2VhcmNoLWxvbmcgdmFsJykuaHRtbCgnbG9jYXRpbmcuLi4nKTtcblxuICAgIGNvbnN0IGFqYXgxID0gJC5hamF4KHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICB1cmw6IGFwaUJhc2UrJ215L2dlb0Rpc3RhbmNlcycsXG4gICAgICBkYXRhOiB7YWRkcmVzczogdmFsfSxcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgfSk7XG4gICAgYWpheDEuZG9uZShkYXRhID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgeW91U2VhcmNoaW5nID0gZmFsc2U7XG4gICAgICAkdC5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgIGxvYWRHZW9kYXRhKGRhdGEpO1xuICAgIH0pO1xuICAgIGFqYXgxLmZhaWwoKGEsIGIsIGMpID0+IGNvbnNvbGUuZXJyb3IoYSwgYiwgYykpO1xuICB9KTtcblxuICAvLyBvZmYgZm9yIG5vdywgc3VwcG9ydCBvbmx5IGFkZHJlc3NcbiAgJCgnI3lvdS1zZWFyY2gtbGF0IHZhbCcpLmh0bWwoJ3NlYXJjaC4uLicpO1xuICAkKCcjeW91LXNlYXJjaC1sb25nIHZhbCcpLmh0bWwoJ3NlYXJjaC4uLicpO1xuICAvLyBpZiAoIW5hdmlnYXRvci5nZW9sb2NhdGlvbil7XG4gIC8vICAgY29uc29sZS5sb2coJ0dlb2xvY2F0aW9uIGlzIG5vdCBzdXBwb3J0ZWQgYnkgeW91ciBicm93c2VyJyk7XG4gIC8vICAgJCgnI3lvdS1zZWFyY2gtbGF0IHZhbCcpLmh0bWwoJ25vdCBzdXBwb3J0ZWQnKTtcbiAgLy8gICAkKCcjeW91LXNlYXJjaC1sb25nIHZhbCcpLmh0bWwoJ25vdCBzdXBwb3J0ZWQnKTtcbiAgLy8gfSBlbHNlIHtcbiAgLy8gICAkKCcjeW91LXNlYXJjaC1sYXQgdmFsJykuaHRtbCgnbG9jYXRpbmcuLi4nKTtcbiAgLy8gICAkKCcjeW91LXNlYXJjaC1sb25nIHZhbCcpLmh0bWwoJ2xvY2F0aW5nLi4uJyk7XG4gIC8vICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihnZW9sb2NTdWNjZXNzLCBnZW9sb2NFcnJvcik7XG4gIC8vIH1cblxuICBjb25zdCBhamF4ID0gJC5hamF4KHtcbiAgICBtZXRob2Q6ICdHRVQnLFxuICAgIHVybDogYXBpQmFzZSsnY29yZS9hbGwnLFxuICAgIGRhdGFUeXBlOiAnanNvbicsXG4gIH0pO1xuICBhamF4LmRvbmUoZGF0YSA9PiB7XG4gICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgY2RGZXRjaCA9IGRhdGE7XG4gICAgY29uc3Qge3VzYSwgc3RhdHMsIGNvdW50cmllc30gPSBkYXRhO1xuICAgIC8vIHN0YXRzXG4gICAgJCgnI3N0YXRzLWxhc3QtdXBkYXRlIHNwYW4nKS50ZXh0KGZvcm1hdERhdGUobmV3IERhdGUoc3RhdHMudHMpKSk7XG4gICAgJCgnI3N0YXRzLXRvdGFsLXRvdGFsJykudGV4dChzdGF0cy5kYXRhLnRvdGFsKTtcbiAgICAkKCcjc3RhdHMtZGVhdGhzLXRvdGFsJykudGV4dChzdGF0cy5kYXRhLmRlYXRocyk7XG4gICAgJCgnI3N0YXRzLXJlY292LXRvdGFsJykudGV4dChzdGF0cy5kYXRhLnJlY292ZXJlZCk7XG4gICAgLy8gdXNhXG4gICAgJCgnI3N0YXRzLXRvdGFsLXVzYScpLnRleHQodXNhLmRhdGEuY29tcGlsZWQuYWxsLnRvdGFsKTtcbiAgICAkKCcjc3RhdHMtZGVhdGhzLXVzYScpLnRleHQodXNhLmRhdGEuY29tcGlsZWQuYWxsLmRlYXRocyk7XG4gICAgJCgnI3N0YXRzLXJlY292LXVzYScpLnRleHQodXNhLmRhdGEuY29tcGlsZWQuYWxsLnJlY292ZXJlZCk7XG4gICAgLy8gY2hpbmEsIG90aGVyXG4gICAgaWYgKGNvdW50cmllcy5kYXRhLl9vdGhlcnMudG90YWwgPj0gY291bnRyaWVzLmRhdGEuQ2hpbmEudG90YWwpe1xuICAgICAgY291bnRyaWVzLmRhdGEuX290aGVycy50b3RhbCA9IE1hdGgubWF4KDAsIGNvdW50cmllcy5kYXRhLl9vdGhlcnMudG90YWwtY291bnRyaWVzLmRhdGEuQ2hpbmEudG90YWwpO1xuICAgICAgY291bnRyaWVzLmRhdGEuX290aGVycy5kZWF0aHMgPSBNYXRoLm1heCgwLCBjb3VudHJpZXMuZGF0YS5fb3RoZXJzLmRlYXRocy1jb3VudHJpZXMuZGF0YS5DaGluYS5kZWF0aHMpO1xuICAgICAgY291bnRyaWVzLmRhdGEuX290aGVycy5yZWNvdmVyZWQgPSBNYXRoLm1heCgwLCBjb3VudHJpZXMuZGF0YS5fb3RoZXJzLnJlY292ZXJlZC1jb3VudHJpZXMuZGF0YS5DaGluYS5yZWNvdmVyZWQpO1xuICAgIH1cbiAgICAkKCcjc3RhdHMtdG90YWwtY2hpbmEnKS50ZXh0KGNvdW50cmllcy5kYXRhLkNoaW5hLnRvdGFsKTtcbiAgICAkKCcjc3RhdHMtZGVhdGhzLWNoaW5hJykudGV4dChjb3VudHJpZXMuZGF0YS5DaGluYS5kZWF0aHMpO1xuICAgICQoJyNzdGF0cy1yZWNvdi1jaGluYScpLnRleHQoY291bnRyaWVzLmRhdGEuQ2hpbmEucmVjb3ZlcmVkKTtcbiAgICAkKCcjc3RhdHMtdG90YWwtb3RoZXInKS50ZXh0KGNvdW50cmllcy5kYXRhLl9vdGhlcnMudG90YWwpO1xuICAgICQoJyNzdGF0cy1kZWF0aHMtb3RoZXInKS50ZXh0KGNvdW50cmllcy5kYXRhLl9vdGhlcnMuZGVhdGhzKTtcbiAgICAkKCcjc3RhdHMtcmVjb3Ytb3RoZXInKS50ZXh0KGNvdW50cmllcy5kYXRhLl9vdGhlcnMucmVjb3ZlcmVkKTtcblxuICAgIC8vIGNvdW50cmllc1xuICAgIGNvbnN0IGN0RGF0YSA9IGNvdW50cmllcy5kYXRhLCAkdGFibGUgPSAkKCcjaGVyby1jb3VudHJpZXMtdGFibGUtYm9keScpO1xuICAgIC8vIHNvcnQgZGVzYyAoaGlnaGVzdCB0byBsb3dlc3QpXG4gICAgbGV0IGNvdW50cnlOYW1lc18gPSBPYmplY3Qua2V5cyhjdERhdGEpO1xuICAgIC8vIHJlbW92ZSAnX290aGVycydcbiAgICBjb3VudHJ5TmFtZXNfLnNwbGljZShjb3VudHJ5TmFtZXNfLmluZGV4T2YoJ19vdGhlcnMnKSwgMSk7XG4gICAgLy8gc29ydCBjb3VudHJ5IG5hbWVzIGJ5IHZhbHVlIChkZXNjIHRvdGFsKVxuICAgIGNvdW50cnlOYW1lc18uc29ydCgoYSwgYikgPT4gY3REYXRhW2FdLnRvdGFsIDwgY3REYXRhW2JdLnRvdGFsID8gMSA6IGN0RGF0YVthXS50b3RhbCA+IGN0RGF0YVtiXS50b3RhbCA/IC0xIDogMCk7XG5cbiAgICAvLyBwcmVwYXJlIGNvdW50cnkgZGF0YVxuICAgIGNvbnN0XG4gICAgICBibG9iQ3V0ID0gTWF0aC5jZWlsKChjb3VudHJ5TmFtZXNfLmxlbmd0aCkgLyAyKSwgLy8gYWNjb3VudHMgZm9yIF9vdGhlcnNcbiAgICAgIG5CbG9icyA9IFtjb3VudHJ5TmFtZXNfLnNsaWNlKDAsIGJsb2JDdXQpLCBjb3VudHJ5TmFtZXNfLnNsaWNlKGJsb2JDdXQsIC0xKV0sXG4gICAgICAvLyBhbHRlcm5hdGUgYmxvYiBjb250ZW50XG4gICAgICBhbHRlcm5hdGVkQ05hbWVzXyA9IG5CbG9icy5yZWR1Y2UoKHQsIHUsIHYsIHcpID0+IHUucmVkdWNlKCh4LCB5LCB6KSA9PiAoeFt6ICogdy5sZW5ndGggKyB2XSA9IHksIHgpLCB0KSwgW10pO1xuXG4gICAgJCgnI2hlcm8tY291bnRyaWVzLWxvYWRpbmcnKS5hZGRDbGFzcygnbG9hZGVkJyk7XG4gICAgJHRhYmxlLmh0bWwoJycpO1xuICAgIC8vIGxvb3AgYWx0ZXJuYXRlZCBjb3VudHJ5IG5hbWVzIChvbmx5IGZvciBkZXNrdG9wID4gMTAyNHB4KVxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCAmJiB3aW5kb3cuaW5uZXJXaWR0aCA+IDEwMjQpIGNvdW50cnlOYW1lc18gPSBhbHRlcm5hdGVkQ05hbWVzXztcbiAgICBjb3VudHJ5TmFtZXNfLmZvckVhY2goY291bnRyeU5hbWVfID0+IHtcbiAgICAgIGxldCBjb3VudHJ5TmFtZSA9IGNvdW50cnlOYW1lXy5zcGxpdCgnXycpLmpvaW4oJyAnKTtcbiAgICAgIGlmIChjb3VudHJpZXNKU09OXy5pbmNsdWRlcyhjb3VudHJ5TmFtZSkpIGNvdW50cnlOYW1lID0gY291bnRyaWVzSlNPTltjb3VudHJ5TmFtZV07XG4gICAgICAvLyBjb25zb2xlLmxvZyhjb3VudHJ5TmFtZSk7XG4gICAgICBjb25zdCB0ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwiaGVyby1jb3VudHJ5XCI+JytcbiAgICAgICAgYDxkaXYgY2xhc3M9XCJoZXJvLWNvdW50cnktbmFtZVwiPiR7Y291bnRyeU5hbWV9PC9kaXY+YCtcbiAgICAgICAgYDxkaXYgY2xhc3M9XCJoZXJvLWNvdW50cnktdmFsIHRvdGFsXCI+JHtjdERhdGFbY291bnRyeU5hbWVfXS50b3RhbH08L2Rpdj5gK1xuICAgICAgICBgPGRpdiBjbGFzcz1cImhlcm8tY291bnRyeS12YWwgZGVhdGhzXCI+JHtjdERhdGFbY291bnRyeU5hbWVfXS5kZWF0aHN9PC9kaXY+YCtcbiAgICAgICAgYDxkaXYgY2xhc3M9XCJoZXJvLWNvdW50cnktdmFsIHJlY292XCI+JHtjdERhdGFbY291bnRyeU5hbWVfXS5yZWNvdmVyZWR9PC9kaXY+YCtcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJoZXJvLWNvdW50cnktZHVtbXlcIj48L2Rpdj4nKyAvLyBkdW1teVxuICAgICAgJzwvZGl2Pic7XG4gICAgICAkdGFibGUuYXBwZW5kKHRlbXBsYXRlKTtcbiAgICB9KTtcbiAgfSk7XG4gIGFqYXguZmFpbCgoYSwgYiwgYykgPT4gY29uc29sZS5lcnJvcihhLCBiLCBjKSk7XG59KShqUXVlcnkpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==