'use strict'

// #############################################################################
// Plugins
// #############################################################################
var gulp         = require('gulp');
var path         = require('path');
var minify_js    = require('gulp-uglify');
var jshint       = require('gulp-jshint');
var stylish      = require('jshint-stylish');
var concat       = require('gulp-concat');
var rename       = require('gulp-rename');
var sourcemaps   = require('gulp-sourcemaps');
var clean        = require('gulp-clean');
var merge        = require('gulp-sequence');
var gulpif       = require('gulp-if');
var minify_html  = require('gulp-minify-html');
var include      = require('gulp-file-include');
var sass         = require('gulp-sass');
var minify_css   = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var beeper       = require('beeper'); // creates a Terminal beep; TODO: assign to errors
var pagespeed    = require('psi');
var ngrok        = require('ngrok');
var browserSync  = require('browser-sync');
var runSequence  = require('run-sequence');
var h5bp         = require('h5bp');

var SITE = '';
var PORT = 8000;


// #############################################################################
// Directory + File Paths
// #############################################################################
var paths = {
  source: '_source',
  bower: 'bower_components',
  distribution: '../dist'
};

var scriptPaths = [
  {
    name: 'scripts-header',
    hint: false,
    source: [
      path.join(paths.bower, 'modernizr/modernizr.js')
    ],
    destination: path.join(paths.distribution, '/javascripts')
  },
  {
    name: 'scripts-footer',
    hint: true,
    source: [
      path.join(paths.source, '/javascripts/**/*.js')
    ],
    destination: path.join(paths.distribution, '/javascripts')
  }
];

var htmlPaths = [
  path.join(paths.source, '/templates/**/!(_)*.html')
];

var stylePaths = [
  path.join(paths.source, '/stylesheets/**/*.scss')
];


// #############################################################################
// Tasks
// #############################################################################

// =============================================================================
// Tasks > javascripts                                            $ gulp scripts
// =============================================================================
gulp.task('scripts', function(){
  var tasks = scriptPaths.map(function(files) {
    return gulp.src(files.source)
      .pipe(gulpif(files.hint, jshint('.jshintrc')))
      .pipe(gulpif(files.hint, jshint.reporter(stylish)))
      .pipe(gulpif(files.hint, jshint.reporter('fail')))
      .pipe(sourcemaps.init())
        .pipe(concat(files.name + '.js'))
        .pipe(minify_js())
        .pipe(rename({suffix: '.min'}))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(files.destination));
  });
  
  return merge(tasks);
});


// =============================================================================
// Tasks > Compile SCSS Styles                                     $ gulp styles
// =============================================================================
gulp.task('styles', function () {
  gulp.src(stylePaths)
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer('last 2 versions'))
      .pipe(minify_css())
    .pipe(sourcemaps.write())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(path.join(paths.distribution, '/stylesheets')));
});

// =============================================================================
// Tasks > Compile HTML                                              $ gulp html
// =============================================================================
gulp.task('html', function() {
  gulp.src(htmlPaths)
    .pipe(include({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(minify_html({
      comments: true,
      spare: true
    }))
    .pipe(gulp.dest(paths.distribution))
});

// =============================================================================
// Tasks > Clean Disribution Directory                              $ gulp clean
// =============================================================================
gulp.task('clean', function () {
  return gulp.src(paths.distribution, { read: false })
    .pipe(clean({ force: true }));
});

// =============================================================================
// Tasks > Start a local server                                    $ gulp server
// =============================================================================
gulp.task('server', ['watch'], function(){
  var app = h5bp.createServer({ root: paths.distribution });
  app.listen(PORT);
});

// =============================================================================
// Tasks > Watch files then run tasks                               $ gulp watch
// =============================================================================
gulp.task('watch', function() {
  // Watch script files
  gulp.watch(path.join(paths.source, '/javascripts/**/*.js'), ['scripts']);
});

// =============================================================================
// Tasks > Page Speed Insights                                      $ gulp speed
// =============================================================================
// ngrok public URL made from localhost:PORT
gulp.task('ngrok-url', function(callback) {
  return ngrok.connect(PORT, function (err, url) {
    SITE = url;
    callback();
  });
});

// PageSpeed Desktop
gulp.task('pagespeed-desktop', function (callback) {
  pagespeed.output(SITE, {
    key: 'AIzaSyBpQImDtbBpSVdkb0Hl5Qm4Ov5ipkWgqeU',
    strategy: 'desktop'
  }, callback);
});

// PageSpeed Mobile
gulp.task('pagespeed-mobile', function (callback) {
  pagespeed.output(SITE, {
    key: 'AIzaSyBpQImDtbBpSVdkb0Hl5Qm4Ov5ipkWgqeU',
    strategy: 'mobile'
  }, callback);
});

// Sequence of PageSpeed related tasks
gulp.task('pagespeed-sequence', function (callback) {
  return runSequence(
    'server',
    'ngrok-url',
    'pagespeed-desktop',
    'pagespeed-mobile',
    callback
  );
});

// Actual PageSpeed task that runs all the others
gulp.task('speed', ['pagespeed-sequence'], function(callback) {
  process.exit();
  return callback
});

// =============================================================================
// Tasks > Default task                                                   $ gulp
// =============================================================================
gulp.task('default', ['clean', 'html', 'styles', 'scripts']);

// =============================================================================
// Tasks > Build the site                                           $ gulp build
// =============================================================================
gulp.task('build', ['html', 'styles', 'scripts']);
