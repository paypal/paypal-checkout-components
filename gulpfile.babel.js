
let gulp = require('gulp');
let webpackStream = require('webpack-stream');
let gulpEslint = require('gulp-eslint');
let gulpFlowtype = require('gulp-flowtype');
let webpack = require('webpack');
let karma = require('karma');
let yargs = require('yargs');
let webpackConfig = require('./webpack.conf');
let del = require('del');

gulp.task('test', ['lint', 'typecheck', 'karma']);
gulp.task('build', ['test', 'webpack']);

Object.keys(webpackConfig.webpack_tasks).forEach(name => {

    gulp.task(`webpack-${name.replace(/_/g, '-')}`, () => {
        let task = webpackConfig.webpack_tasks[name];

        return gulp.src(task.src)
            .pipe(webpackStream(task.cfg, webpack))
            .pipe(gulp.dest(task.out));
    });
});

gulp.task('webpack', Object.keys(webpackConfig.webpack_tasks).map(name => `webpack-${name.replace(/_/g, '-')}`));

gulp.task('typecheck', [ 'lint' ], function() {
    return gulp.src([ 'src/**/*.js', 'test/**/*.js' ])
        .pipe(gulpFlowtype({
            abort: true
        }))
});

gulp.task('lint', ['lint-src', 'lint-test']);

gulp.task('lint-src', function() {
    return gulp.src([ 'src/**/*.js' ]).pipe(gulpEslint({
        fix: Boolean(yargs.argv['fix'])
    }))
        .pipe(gulpEslint.format())
        .pipe(gulpEslint.failAfterError())
});

gulp.task('lint-test', function() {
    return gulp.src([ 'test/{tests,windows}/**/*.js' ]).pipe(gulpEslint({
        fix: Boolean(yargs.argv['fix'])
    }))
        .pipe(gulpEslint.format())
        .pipe(gulpEslint.failAfterError())
});

gulp.task('karma', function (done) {

    if(yargs.argv['clear-cache']) {
        del.sync(['node_modules/.cache/babel-loader', 'node_modules/.cache/phantomjs']);
    }

    let server = new karma.Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: !(yargs.argv.debug || yargs.argv['keep-open']),
        client: {
            captureConsole: Boolean(yargs.argv['capture-console']),
            mocha: {
                timeout : process.env.TRAVIS ? 60 * 1000 : 10 * 1000,
                bail: true
            }
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
