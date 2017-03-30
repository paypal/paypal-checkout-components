let gulp = require('gulp');
let webpackStream = require('webpack-stream');
let webpack = require('webpack');
let argv = require('yargs').argv;
let UglifyJSPlugin = require('uglifyjs-webpack-plugin');

function getNextVersion() {
    let version = require('../package.json').version;
    version = version.split('.');
    version[2] = (parseInt(version[2]) + 1).toString();
    version = version.join('.');
    return version;
}

function getNextMajorVersion() {
    return getNextVersion().split('.')[0];
}

function getNextMinorVersion() {
    return getNextVersion();
}

function getVersionVars() {
    return {
        __MAJOR_VERSION__: JSON.stringify(getNextMajorVersion()),
        __MINOR_VERSION__: JSON.stringify(getNextMinorVersion())
    };
}

let nextMajorVersion = getNextMajorVersion();
let nextMinorVersion = getNextMinorVersion();

const FILE_NAME = 'checkout';

function defaultConfig (filename) {
    return {
        devtool: 'source-map',
        stats: {
            hash: argv['debug'] ? true : false,
            timings: argv['debug'] ? true : false,
            chunks: argv['debug'] ? true : false,
            chunkModules: argv['debug'] ? true : false,
            modules: argv['debug'] ? true : false,
            cached: argv['debug'] ? true : false,
            cachedAssets: argv['debug'] ? true : false,
            reasons: argv['debug'] ? true : false,
            source: argv['debug'] ? true : false,
            errorDetails: argv['debug'] ? true : false,
            performance: argv['debug'] ? true : false,
            warnings: argv['debug'] ? true : false
        },
        module: {
            rules: [
                {
                    test: /sinon\.js$/,
                    loader: "imports?define=>false,require=>false"
                },
                {
                    test: /\.jsx?$/,
                    exclude: /(sinon|chai)/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.(html?|css|json)$/,
                    loader: 'raw-loader'
                }
            ]
        },
        output: {
            filename: filename,
            //libraryTarget: target,
            umdNamedDefine: true,
            // library: modulename,
            pathinfo: false
        },
        bail: true,
        resolve: {
            extensions: [ '.js', '.jsx' ]
        },
        plugins: [

            new webpack.DefinePlugin({
                __TEST__: false,
                __IE_POPUP_SUPPORT__: true,
                __POPUP_SUPPORT__: true,
                __FILE_NAME__: JSON.stringify(filename),
                __FILE_VERSION__: JSON.stringify(nextMajorVersion),
                __MAJOR_VERSION__: JSON.stringify(getNextMajorVersion()),
                __MINOR_VERSION__: JSON.stringify(getNextMinorVersion())
            }),
            new webpack.NamedModulesPlugin()
        ]
    };
}

function watch() {
    let config = defaultConfig(`${FILE_NAME}.js`);
    config.watch = true;
    config.devtool = 'cheap-module-eval-source-map';
    config.output.libraryTarget = 'window';
    
    return gulp.src('src/load.js')
            .pipe(webpackStream(config, webpack))
            .pipe(gulp.dest('dist'));
}
watch.displayName = 'webpack-watch';

function major() {
    let config = defaultConfig(`${FILE_NAME}.js`);
    config.output.libraryTarget = 'window';
    config.plugins.push(
        new UglifyJSPlugin({
            test: /\.js$/,
            beautify: true,
            minimize: false,
            compress: { warnings: false },
            mangle: false,
            sourceMap: true
        })
    );
    return gulp.src('src/load.js')
            .pipe(webpackStream(config, webpack))
            .pipe(gulp.dest('dist'));
}
major.displayName = 'webpack-major';

function majorMin() {
    let config = defaultConfig(`${FILE_NAME}.min.js`);
    config.output.libraryTarget = 'window';
    config.plugins.push(
        new UglifyJSPlugin({
            test: /\.js$/,
            beautify: false,
            minimize: true,
            compress: { warnings: false },
            mangle: true,
            sourceMap: true
        })
    );
    return gulp.src('src/load.js')
            .pipe(webpackStream(config, webpack))
            .pipe(gulp.dest('dist'));
}
majorMin.displayName = 'webpack-major-min';

function minor() {
    let config = defaultConfig(`${FILE_NAME}.${nextMinorVersion}.js`);
    config.output.libraryTarget = 'window';
    config.plugins.push(
        new UglifyJSPlugin({
            test: /\.js$/,
            beautify: true,
            minimize: false,
            compress: { warnings: false },
            mangle: false,
            sourceMap: true
        })
    );
    return gulp.src('src/load.js')
            .pipe(webpackStream(config, webpack))
            .pipe(gulp.dest('dist'));
}
minor.displayName = 'webpack-minor';

function minorMin() {
    let config = defaultConfig(`${FILE_NAME}..${nextMinorVersion}.min.js`);
    config.output.libraryTarget = 'window';
    config.plugins.push(
        new UglifyJSPlugin({
            test: /\.js$/,
            beautify: false,
            minimize: true,
            compress: { warnings: false },
            mangle: true,
            sourceMap: true
        })
    );
    return gulp.src('src/load.js')
            .pipe(webpackStream(config, webpack))
            .pipe(gulp.dest('dist'));
}
minorMin.displayName = 'webpack-minor-min';

function lib() {
    let config = defaultConfig(`${FILE_NAME}.lib.js`);
    config.output.libraryTarget = 'umd';
    config.output.library = 'paypal';
    config.plugins.push(
        new UglifyJSPlugin({
            test: /\.js$/,
            beautify: true,
            minimize: false,
            compress: { warnings: false },
            mangle: false,
            sourceMap: true
        })
    );
    return gulp.src('src/index.js')
            .pipe(webpackStream(config, webpack))
            .pipe(gulp.dest('dist'));
}
lib.displayName = 'webpack-lib';

function child() {
    let config = defaultConfig(`checkout.child.loader.js`);
    config.plugins.push(
        new UglifyJSPlugin({
            test: /\.js$/,
            beautify: true,
            minimize: false,
            compress: { warnings: false },
            mangle: false,
            sourceMap: true
        })
    );
    return gulp.src('src/loader/index.js')
            .pipe(webpackStream(config, webpack))
            .pipe(gulp.dest('dist'));
}
child.displayName = 'webpack-child';

function childMin() {
    let config = defaultConfig(`checkout.child.loader.js`);
    config.plugins.push(
        new UglifyJSPlugin({
            test: /\.js$/,
            beautify: false,
            minimize: true,
            compress: { warnings: false },
            mangle: true,
            sourceMap: true
        })
    );
    return gulp.src('src/loader/index.js')
            .pipe(webpackStream(config, webpack))
            .pipe(gulp.dest('dist'));
}
childMin.displayName = 'webpack-child-min';



let min = gulp.parallel(majorMin, minorMin, childMin);
let def = gulp.parallel(major, minor, child);
let all = gulp.series(def, min, lib);

module.exports = {
    all: all,
    min: min,
    minor: def,
    major: major,
    watch: watch
}