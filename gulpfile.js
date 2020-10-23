const
  {watch, src, dest, parallel} = require('gulp'),
  browserSync = require('browser-sync').create(),
  sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  debug = require('gulp-debug'),
  sourcemaps = require('gulp-sourcemaps'),
  replace = require('gulp-replace'),
  filesize = require('gulp-filesize');

const
  bsConf = require('./bs-config'),
  md5 = require('blueimp-md5'),
  lib = './public/lib/',
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
  // return src('public/lib/style/scss/*.scss')
  // return src(['public/lib/style/scss/*.scss', 'public/lib/style/sass/*.sass'])
  // just top level (files directly under src/ file)
  return src(['public/lib/style/src/*.sass', '!public/lib/style/src/_*.sass'])
    .pipe(debug())
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./map'))
    .pipe(dest('public/lib/style/dist/'))
    .pipe(filesize());
}

function sassWatch(){
  // watch(['public/lib/style/scss/*.scss', 'public/lib/style/sass/*.sass'], sassBundle);
  watch(['public/lib/style/*/**.sass', 'public/lib/style/*/**.scss'], sassBundle);
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
      lib.concat('style/dist/*.min.css'),
      // disalble, this leads to actual reload (not hot reload) for every change
      // lib.concat('style/**/*.sass'),
      lib.concat('img/*.[jpg,png]'),
      lib.concat('js/dist/*.bundle.js'),
    ],
  }));
}

function build(cb){
  // cache buster
  const hash = md5(new Date().getTime());
  src(['./public/**/*.php', './public/components/**/*.php'])
    .pipe(replace(/\?cbv=[a-zA-Z\d]+/g, () => '?cbv='+hash))
    .pipe(dest(f => f.base))
    .on('end', () => {
      console.log(`GULP build complete with hash ${hash}`);
      cb();
    }); // signal end
}

exports.watch = parallel(bsWatch, sassWatch);
exports.build = build;
