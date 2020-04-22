// import modules

// gulp build tool
var gulp = require('gulp');
// notify displays error notifications
var notify = require('gulp-notify');
// vinyl source returns a stream to the given file
var source = require('vinyl-source-stream');
// browserify bundles Node modules for use in the browser
var browserify = require('browserify');
// babelify compiles ES6 javascript to browser-compatible javascript
var babelify = require('babelify');
// ngannotate loads dependencies to our Angular files
var ngAnnotate = require('browserify-ngannotate');
// browserSync loads code to the browser so when we are developing and save, our page reloads
// with our changes.
var browserSync = require('browser-sync').create();
// rename renames files
var rename = require('gulp-rename');
// produces a cache of our html to be served to the browser
var templateCache = require('gulp-angular-templatecache');
// minifies (similar to file compression) our javascript so pages load faster
var uglify = require('gulp-uglify');
// merge filestreams together
var merge = require('merge-stream');

// glob patterns for where our source js and html template files are located
// all .js files in src/js
var jsFiles = 'src/js/**/*.js';
// all .html files in src/js
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

// views task: bundle all html templates into a templatecache (a big blob of html in a js file),
// rename it app.templates.js and move it to ./src/js/config/
gulp.task('views', function () {
  return (
    gulp
      // take all the html templates
      .src(viewFiles)
      // pipe them into a templatecache file
      .pipe(
        templateCache({
          standalone: true,
        })
      )
      // if there are errors, print them
      .on('error', interceptErrors)
      // rename the file app.templates.js
      .pipe(rename('app.templates.js'))
      // move it to ./src/js/config/
      .pipe(gulp.dest('./src/js/config/'))
  );
});

// browserify task: run views to get the HTML into ./src/js/config, then bundle up all the
// JS, JS dependencies, and HTML into a big file of ES5 Javascript called main.js in the ./build/ folder
gulp.task('browserify', ['views'], function () {
  return (
    // bundle up all the JS through the root file app.js
    browserify('./src/js/app.js')
      // transpile to es5
      .transform(babelify, {presets: ['es2015']})
      // inject dependencies
      .transform(ngAnnotate)
      // bundle the js
      .bundle()
      // error => use interceptErrors passthrough
      .on('error', interceptErrors)
      // output to main.js
      .pipe(source('main.js'))
      // move main.js to ./build
      .pipe(gulp.dest('./build/'))
  );
});

// html task: move index.html (entry point for the browser) to ./build/
gulp.task('html', function () {
  return gulp
    .src('src/index.html')
    .on('error', interceptErrors)
    .pipe(gulp.dest('./build/'));
});

// default task (this run when you do 'gulp' in the command line)
// run html and browserify to put all the html+JS into ./build/, then serve the assets
// in ./build/ to the browser at localhost:4000.
gulp.task('default', ['html', 'browserify'], function () {
  // serve assets to localhost:4000
  browserSync.init(['./build/**/**.**'], {
    server: './build',
    port: 4000,
    notify: false,
    ui: {
      port: 4001,
    },
  });

  // watch for changes and recompile changed files with html, view, browserify tasks respectively.
  gulp.watch('src/index.html', ['html']);
  gulp.watch(viewFiles, ['views']);
  gulp.watch(jsFiles, ['browserify']);
});

// build task: create distribution-ready code. run html to get index.html into ./build/, run browserify
// to get all the JS and HTML templates into ./build/, then minify the JS+templates and move them into
// ./dist/ along with index.html
gulp.task('build', ['html', 'browserify'], function () {
  // pipe index.html to build folder
  var html = gulp.src('build/index.html').pipe(gulp.dest('./dist/'));
  // minify the bundled js and pipe to build folder
  var js = gulp.src('build/main.js').pipe(uglify()).pipe(gulp.dest('./dist/'));
  // return the merged streams
  return merge(html, js);
});
