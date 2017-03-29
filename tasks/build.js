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
const defaultConfig = {
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
        // filename: filename,
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
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        }),
        new webpack.DefinePlugin({
            __TEST__: false,
            __IE_POPUP_SUPPORT__: true,
            __POPUP_SUPPORT__: true,
            __FILE_NAME__: '[file]',
            __FILE_VERSION__: JSON.stringify(nextMajorVersion),
            __MAJOR_VERSION__: JSON.stringify(getNextMajorVersion()),
            __MINOR_VERSION__: JSON.stringify(getNextMinorVersion())
        }),
        new webpack.NamedModulesPlugin(),
        new UglifyJSPlugin({
            test: /\.js$/,
            beautify: true,
            minimize: false,
            compress: { warnings: false },
            mangle: false,
            sourceMap: true
        })
    ]
};

function major() {
    let config = Object.assign({}, defaultConfig);
    config.output.filename = `${FILE_NAME}.js`;
    return gulp.src('src/load.js')
            .pipe(webpackStream(config, webpack))
            .pipe(gulp.dest('dist'));
}
major.displayName = 'webpack-major';
gulp.task(gulp.series(major));

function minor() {
    let config = Object.assign({}, defaultConfig);
    config.output.filename = `${FILE_NAME}.${nextMinorVersion}.js`;
    return gulp.src('src/load.js')
            .pipe(webpackStream(config, webpack))
            .pipe(gulp.dest('dist'));
}
minor.displayName = 'webpack-minor';


module.exports = {
    major: major,
    minor: minor
}