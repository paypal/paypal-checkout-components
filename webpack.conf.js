import webpack from 'webpack';

export let FILE_NAME = 'checkout';
export let MODULE_NAME = 'paypal';

function getNextVersion() {
    let version = require('./package.json').version;
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

function getWebpackConfig({ version, filename, modulename = MODULE_NAME, target = 'window', minify = false }) {

    return {
        module: {
            loaders: [
                {
                    test: /sinon\.js$/,
                    loader: "imports?define=>false,require=>false"
                },
                {
                    test: /\.jsx?$/,
                    exclude: /(sinon|chai)/,
                    loader: 'babel'
                },
                {
                    test: /\.(html?|css|json)$/,
                    loader: 'raw-loader'
                }
            ]
        },
        output: {
            filename: filename,
            libraryTarget: target,
            umdNamedDefine: true,
            library: modulename,
            pathinfo: false
        },
        bail: true,
        devtool: 'source-map',
        resolve: {
            extensions: [ '', '.js', '.jsx' ],
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                test: /\.js$/,
                beautify: !minify,
                minimize: minify,
                compress: minify,
                mangle: minify
            }),
            new webpack.DefinePlugin({
                __TEST__: false,
                __FILE_NAME__: JSON.stringify(filename),
                __FILE_VERSION__: JSON.stringify(version),
                ...getVersionVars()
            }),
            new webpack.NamedModulesPlugin()
        ]
    };
}

let nextMajorVersion = getNextMajorVersion();
let nextMinorVersion = getNextMinorVersion();

export let WEBPACK_CONFIG_MAJOR = getWebpackConfig({
    version: nextMajorVersion,
    filename: `${FILE_NAME}.js`,
});

export let WEBPACK_CONFIG_MINOR = getWebpackConfig({
    version: nextMinorVersion,
    filename: `${FILE_NAME}.${nextMinorVersion}.js`,
});

export let WEBPACK_CONFIG_MAJOR_MIN = getWebpackConfig({
    version: nextMajorVersion,
    filename: `${FILE_NAME}.min.js`,
    minify: true
});

export let WEBPACK_CONFIG_MINOR_MIN = getWebpackConfig({
    version: nextMinorVersion,
    filename: `${FILE_NAME}.${nextMinorVersion}.min.js`,
    minify: true
});

export let WEBPACK_CONFIG_LIB = getWebpackConfig({
    version: nextMajorVersion,
    filename: `${FILE_NAME}.lib.js`,
    target: `umd`
});

export let WEBPACK_CONFIG_DEMO = getWebpackConfig({
    version: nextMajorVersion,
    filename: `demo.js`,
    modulename: `ppdemo`
});
