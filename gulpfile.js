const
  {watch, src, dest, parallel} = require('gulp'),
  browserSync = require('browser-sync').create(),
  sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  sourcemaps = require('gulp-sourcemaps'),
  lib = './public/lib/',
  bsConf = require('./bs-config'),
  isArray = a => Array.isArray(a), // a => a && typeof a === "object" && a.constructor === Array, // alt for no ES5
  isObject = o => o && typeof o === 'object' && o.constructor === Object,
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

sass.compiler = require('node-sass');

function sassBundle(){
  return src('public/lib/style/src/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./map'))
    .pipe(dest('public/lib/style/dist/'));
}

function sassWatch(){
  watch('public/lib/style/src/*.scss', sassBundle);
}

function bsWatch(){
  browserSync.init(deepExtend(bsConf, {
    proxy: 'http://localhost/website/CovidNow/public/',
    open: false,
    notify: false,
    watch: true,
    files: [
      './public/**/*.php',
      './public/components/**/*.php',
      lib.concat('style/*.css'),
      lib.concat('img/*.[jpg,png]'),
      lib.concat('js/dist/*.bundle.js'),
    ],
  }));
}

exports.watch = parallel(bsWatch, sassWatch);
