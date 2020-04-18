// import modules
var gulp = require('gulp');
var notify = require('gulp-notify');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');
var ngAnnotate = require('browserify-ngannotate');
var browserSync = require('browser-sync').create();
var rename = require('gulp-rename');
var templateCache = require('gulp-angular-templatecache');
var uglify = require('gulp-uglify');
var merge = require('merge-stream');

// where our files are located
var jsFiles = 'src/js/**/*.js';
var viewFiles = 'src/js/**/*.html';

// pipe errors to console
var interceptErrors = function (error) {
  var args = Array.prototype.slice.call(arguments);
  // send error to notification center
  notify
    .onError({
      title: 'Compile Error',
      message: '<%= error.message %>',
    })
    .apply(this, args);
  // end to keep gulp from hanging on the task
  this.emit('end');
};

// bundle js and pipe to build
gulp.task('browserify', ['views'], function () {
  // browserify app
  return (
    browserify('./src/js/app.js')
      // transpile code
      .transform(babelify, {presets: ['es2015']})
      // inject angular stuff
      .transform(ngAnnotate)
      // bundle the js
      .bundle()
      // error => use interceptErrors passthrough
      .on('error', interceptErrors)
      // pipe to main.js
      .pipe(source('main.js'))
      // move main.js to ./buidl
      .pipe(gulp.dest('./build/'))
  );
});

// pipe index.html to build
gulp.task('html', function () {
  return gulp
    .src('src/index.html')
    .on('error', interceptErrors)
    .pipe(gulp.dest('./build/'));
});

// bundle views into templatecache and pipe templatecache to app.templates.js in ./src/js/config
gulp.task('views', function () {
  return gulp
    .src(viewFiles)
    .pipe(
      templateCache({
        standalone: true,
      })
    )
    .on('error', interceptErrors)
    .pipe(rename('app.templates.js'))
    .pipe(gulp.dest('./src/js/config/'));
});

gulp.task('build', ['html', 'browserify'], function () {
  // pipe index.html to build folder
  var html = gulp
    .src('build/index.html')
    .pipe(gulp.dest('./dist/'));
  // minify the bundled js and pipe to build folder
  var js = gulp
    .src('build/main.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
  // return the merged streams
  return merge(html, js);
});

// load build assets to port 4000
gulp.task('default', ['html', 'browserify'], function() {
  browserSync.init(['./build/**/**.**'], {
    server: "./build",
    port: 4000,
    notify: false,
    ui: {
      port: 4001
    }
  });

  // watch for changes
  gulp.watch("src/index.html", ['html']);
  gulp.watch(viewFiles, ['views']);
  gulp.watch(jsFiles, ['browserify']);
});
