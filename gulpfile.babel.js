import gulp from 'gulp';
import gulpWebpack from 'gulp-webpack';
import eslint from 'gulp-eslint';
import { Server } from 'karma';
import { argv } from 'yargs';
import { WEBPACK_CONFIG, WEBPACK_CONFIG_MIN } from './webpack.conf';

gulp.task('build', ['webpack', 'webpack-min']);

gulp.task('webpack', ['lint'], function() {
  return gulp.src('src/index.js')
      .pipe(gulpWebpack(WEBPACK_CONFIG))
      .pipe(gulp.dest('dist'));
});

gulp.task('webpack-min', ['lint'], function() {
  return gulp.src('src/index.js')
      .pipe(gulpWebpack(WEBPACK_CONFIG_MIN))
      .pipe(gulp.dest('dist'));
});

gulp.task('lint', function() {
  return gulp.src('src/**/*.js').pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('karma', ['lint'], function (done) {

  let server = new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: !Boolean(argv['keep-browser-open']),
    client: {
      captureConsole: Boolean(argv['capture-console'])
    }
  });

  server.on('browser_error', function (browser, err) {
    console.log('Karma Run Failed: ' + err.message);
    throw err;
  });

  server.on('run_complete', function (browsers, results) {
    if (results.failed) {
      return done(new Error('Karma: Tests Failed'));
    }
    done();
  });

  server.start();
});
