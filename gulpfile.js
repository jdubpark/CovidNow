const
  gulp = require("gulp"),
  browserSync = require("browser-sync"),
  lib = "./public/lib/",
  bsConf = require("./bs-config"),
  isArray = a => Array.isArray(a), // a => a && typeof a === "object" && a.constructor === Array, // alt for no ES5
  isObject = o => o && typeof o === "object" && o.constructor === Object,
  isDictionary = d => isObject(d) && !isArray(d);

function deepExtend(...extend){
  let end = undefined;
  for (let val of extend){
    if (isDictionary(val)){
      // contains dictionary
      if (!isObject(end)) end = {}; // change end to {} if end is not object
      for (let k in val) end[k] = deepExtend(end[k], val[k]); // loops through all nested objects
    } else end = val;
  }
  return end;
}

gulp.task("bs", function(){
  browserSync.init(deepExtend(bsConf, {
    proxy: "http://localhost/website/CovidNow/public/",
    open: false,
    notify: false,
    watch: true,
    files: [
      "./public/**/*.php",
      "./public/components/**/*.php",
      lib.concat("style/*.css"),
      lib.concat("img/*.[jpg,png]"),
      lib.concat("js/dist/*.bundle.js"),
    ],
  }));
});
