let gulp = require('gulp');
let testTasks = require('./tasks/test');
let buildTasks = require('./tasks/build');



// let webpackConfig = require('./webpack.conf');




/*
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
*/

let karma = gulp.series(testTasks.karma);
karma.displayName = 'karma';
gulp.task(karma);

let test = gulp.series(
                    gulp.parallel(testTasks.lint, testTasks.flow), 
                    buildTasks.test, 
                    testTasks.karma
            );
test.displayName = 'test';
gulp.task(test);

let build = gulp.series(buildTasks.all);
build.displayName = 'build';
gulp.task(build);

let buildWatch = gulp.series(buildTasks.watch);
buildWatch.displayName = 'build:watch';
gulp.task(buildWatch);

let buildMinor = gulp.series(buildTasks.minor);
buildMinor.displayName = 'build:minor';
gulp.task(buildMinor);

let buildMin = gulp.series(buildTasks.min);
buildMin.displayName = 'build:min';
gulp.task(buildMin);
