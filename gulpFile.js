/**
* gulpFile.js
* Gulp task runners for minimizing, concatenating, JS lint, SASS compiler, generating CSS and JS files for production build
* Also, for development we have a browser-sync watcher to aid the development process.
*/

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var autoprefixer = require('gulp-autoprefixer');
var open = require('gulp-open');
var os = require('os');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-clean-css');
var minifyJS = require('gulp-uglify');
var livereload = require('gulp-livereload');
var preprocessor = require('gulp-preprocess')
var del = require('del');
var rename = require('gulp-rename');
var csslint = require('gulp-csslint');
var webpack = require('gulp-webpack');


/*
  Required vendor files needs to go here.
*/
var vendor_files = [
  'bower_components/angular/angular.min.js',
  'bower_components/jquery/dist/jquery.min.js',
  'bower_components/angular-ui-router/release/angular-ui-router.min.js',
  'bower_components/bootstrap/dist/css/bootstrap.min.css',
  'bower_components/bootstrap/dist/js/bootstrap.min.js'
];

/*
  Vendor output path / directory
*/
var VENDOR_IN_PATH = './vendor/';
var VENDOR_OUT_PATH = './vendor/**/*.*';

/*
  Main app path / directory
*/
var APP_PATH = {
  js: './app/boot.js',
  sass: './app/styles/**/*.scss',
  templates: './app/templates/**/*.html',
  html: './app/index.html',
  assets: './app/asset/**/*.*',
  jsWatchFiles: './app/**/*.js'
}

/*
  distribution input path / directory
*/
var DIST_IN_PATH = {
  js: './dist/',
  css: './dist/',
  templates: './dist/templates/',
  html: './dist/',
  assets: './dist/assets/',
  vendor: './dist/vendor/'
}

/*
  distribution output path / directory
*/
var DIST_OUT_PATH = {
  js: './dist/*.js',
  css: './dist/*.css',
  templates: './dist/templates/**/*.html',
  assets: './dist/assets/**.*',
  vendor: './dist/vendor/**/*.*'
}

/*
  build path / directory
*/
var BUILD_PATH = {
  js: './build/',
  css: './build/',
  templates: './build/templates/',
  html: './build/',
  assets: './build/assets/'
}

/*
  @task vendor
  vendor gulp task, to tranfereing only the required vendor files for the application from bower components.
*/
gulp.task('vendor', function() {
  for(var i=0; i<vendor_files.length; i++) {
    gulp.src(vendor_files[i])
      .pipe(gulp.dest(VENDOR_OUT_PATH));
  }
});

/*
  @task dev:sass
  dev sass task for compiling the scss files to css files and tranfereing them to dist folder
*/
gulp.task('dev:sass', function() {
  return gulp.src(APP_PATH.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(csslint())
    .pipe(csslint.reporter())
    .pipe(rename('style.css'))
    .pipe(gulp.dest(DIST_IN_PATH.css))
    .pipe(livereload());
});

/*
  @task dev:js
  dev js task for de-modularizing the required file in boot.js and placing the final rendered js file
  in dist folder
*/
gulp.task('dev:js', function() {
  return gulp.src(APP_PATH.js)
    .pipe(webpack())
    .pipe(rename('app.bundle.js'))
    .pipe(gulp.dest(DIST_IN_PATH.js))
    .pipe(livereload());
});

/*
  @task dev:template
  dev template task for transfereing all the HTML templates to dist folder
*/
gulp.task('dev:template', function() {
  return gulp.src(APP_PATH.templates)
    .pipe(gulp.dest(DIST_IN_PATH.templates))
    .pipe(livereload());
});

/*
  @task dev:html
  dev html task for transfereing the index.html file to dist folder
  */
gulp.task('dev:html', function() {
  return gulp.src(APP_PATH.html)
    .pipe(preprocessor({context: {NODE_ENV: 'dev', DEBUG: true}}))
    .pipe(gulp.dest(DIST_IN_PATH.html))
    .pipe(livereload());
});

/*
  @task dev:asset
  dev assets task for transfereing all the required assets fot dist folder
*/
gulp.task('dev:asset', function() {
  return gulp.src(APP_PATH.assets)
    .pipe(gulp.dest(DIST_IN_PATH.assets))
    .pipe(livereload());
});

/*
  @task dev:vendor
  transfereing all the vendor to dist folder
*/
gulp.task('dev:vendor', function() {
  return gulp.src(VENDOR_OUT_PATH)
    .pipe(gulp.dest(DIST_IN_PATH.vendor));
})

/*
  @task build:js
  build js task for minifying js file for production.
*/
gulp.task('build:js', function() {
  return gulp.src(DIST_OUT_PATH.js)
    .pipe(rename(build.min.js))
    .pipe(minifyJS())
    .pipe(gulp.dest(BUILD_PATH.js));
});

/*
  @task build:css
  build css task for minifying css file for production
*/
gulp.task('build:css', function() {
  return gulp.src(DIST_OUT_PATH.css)
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(rename('build.min.css'))
    .pipe(minifyCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(BUILD_PATH.css));
});

/*
  @task build:template
  build template task for transfereing all the HTML templates to build folder
  for production
*/
gulp.task('build:template', function() {
  return gulp.src(DIST_OUT_PATH.templates)
    .pipe(gulp.dest(BUILD_PATH.templates));
});

/*
  @task build:html
  build html task for transfereing index.html to build folder for production
*/
gulp.task('build:html', function() {
  return gulp.src(APP_PATH.html)
    .pipe(preprocessor({context: {NODE_ENV: 'prod', DEBUG: true}}))
    .pipe(gulp.dest(BUILD_PATH.html));
});

/*
  @task build:asset
  build asset task for transfereing all the assets to build asset folder for production
*/
gulp.task('build:asset', function() {
  return gulp.src(DIST_OUT_PATH.assets)
    .pipe(gulp.dest(BUILD_PATH.assets));
});

/*
  @task dev:watch
  dev watch task for monitoring the app files and reloading the browser.
*/
gulp.task('dev:watch', function() {
  require('./server.js');
  livereload.listen();
  gulp.watch(APP_PATH.sass, ['dev:sass']);
  gulp.watch(APP_PATH.jsWatchFiles, ['dev:js']);
  gulp.watch(APP_PATH.templates, ['dev:template']);
  gulp.watch(APP_PATH.html, ['dev:html']);
  gulp.watch(APP_PATH.assets, ['dev:asset']);
});

/*
  configuring the default app browser for dev:open task
*/
const platform = os.platform();
var browser = platform === 'linux' ? 'google-chrome': (platform === 'darwin' ? 'google chrome': (platform === 'win32' ? 'chrome' : 'firefox'));


/*
  @task dev:open
  dev open task for opening the application in the default browser automatically
*/
gulp.task('dev:open', function() {
  var options = {
    uri: 'http://localhost:9000',
    app: browser
  };

  gulp.src(__filename)
    .pipe(open(options));
});


/*
  @task build
  build task for production build
*/
gulp.task('build', ['build:css', 'build:js', 'build:template', 'build:html', 'build:asset']);

/*
  @task default
  default task for gulp, which are dev tasks
*/
gulp.task('default', ['dev:vendor', 'dev:watch', 'dev:open']);
