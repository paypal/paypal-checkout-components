
import gulp from 'gulp';
import gulpWebpack from 'webpack-stream';
import eslint from 'gulp-eslint';
import flow from 'gulp-flowtype';
import webpack from 'webpack';
import { Server } from 'karma';
import { argv } from 'yargs';
import { webpack_tasks } from './webpack.conf';

gulp.task('test', ['lint', 'karma', 'typecheck']);
gulp.task('build', ['test', 'webpack']);

Object.keys(webpack_tasks).forEach(name => {

    gulp.task(`webpack-${name.replace(/_/g, '-')}`, [ 'lint' ], () => {
        let task = webpack_tasks[name];

        return gulp.src(task.src)
            .pipe(gulpWebpack(task.cfg, webpack))
            .pipe(gulp.dest(task.out));
    });
});

gulp.task('webpack', Object.keys(webpack_tasks).map(name => `webpack-${name.replace(/_/g, '-')}`));

gulp.task('typecheck', [ 'lint' ], function() {
    return gulp.src([ 'src/**/*.js', 'test/**/*.js' ])
        .pipe(flow())
});

gulp.task('lint', ['lint-src', 'lint-test']);

gulp.task('lint-src', function() {
    return gulp.src([ 'src/**/*.js' ]).pipe(eslint({
        fix: Boolean(argv['fix'])
    }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
});

gulp.task('lint-test', function() {
    return gulp.src([ 'test/{tests,windows}/**/*.js' ]).pipe(eslint({
        fix: Boolean(argv['fix'])
    }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
});

gulp.task('karma', ['lint'], function (done) {

    let server = new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: !Boolean(argv['keep-browser-open']),
        client: {
            captureConsole: Boolean(argv['capture-console']),
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
