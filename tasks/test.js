let gulp = require('gulp');
let gulpEslint = require('gulp-eslint');
let argv = require('yargs').argv;
let gulpFlowtype = require('gulp-flowtype');
let karmaServer = require('karma');


function lint() {
    return gulp.src([ 'src/**/*.js', 'test/{tests,windows}/*.js' ])
            .pipe(gulpEslint({
                fix: Boolean(argv['fix'])
            }))
            .pipe(gulpEslint.format())
            .pipe(gulpEslint.failAfterError());
}
lint.displayName = 'lint';
gulp.task(gulp.series(lint));

function flow() {
    return gulp.src([ 'src/**/*.js', 'test/**/*.js' ])
        .pipe(gulpFlowtype())
}
flow.displayName = 'flow';
gulp.task(gulp.series(flow));


function karma(done) {
    let server = new karmaServer.Server({
        configFile: process.cwd() + '/karma.conf.js',
        singleRun: !Boolean(argv['keep-browser-open']),
        client: {
            captureConsole: Boolean(argv['capture-console']),
            mocha: {
                timeout : process.env.TRAVIS ? 60 * 1000 : 10 * 1000,
                bail: true
            }
        }
    }, function () {
        done();
    }).start();
}
karma.displayName = 'karma';
gulp.task(gulp.series(karma));


module.exports = {
    lint: lint,
    flow: flow,
    karma: karma
}
