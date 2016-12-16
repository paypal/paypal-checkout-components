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

function getWebpackConfig(version, filename, target = 'window') {

    return {
      module: {
        loaders: [
          {
            test: /sinon\.js$/,
            loader: "imports?define=>false,require=>false"
          },
          {
            test: /\.js$/,
            exclude: /(sinon)/,
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
        library: MODULE_NAME,
        pathinfo: false
      },
      bail: true,
      plugins: [
        new webpack.optimize.UglifyJsPlugin({
          test: /\.js$/,
          beautify: true,
          minimize: false,
          compress: false,
          mangle: false
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

function getWebpackConfigMin(version, filename, target = 'window') {

    let config = getWebpackConfig(version, filename, target);

    config.plugins = [
        new webpack.optimize.UglifyJsPlugin({
            test: /\.js$/,
            minimize: true
        }),
        new webpack.DefinePlugin({
            __TEST__: false,
            __FILE_NAME__: JSON.stringify(filename),
            __FILE_VERSION__: JSON.stringify(version),
            ...getVersionVars()
        })
    ];
    return config;
}

let nextMajorVersion = getNextMajorVersion();
let nextMinorVersion = getNextMinorVersion();

export let WEBPACK_CONFIG_MAJOR = getWebpackConfig(nextMajorVersion, `${FILE_NAME}.js`);
export let WEBPACK_CONFIG_MINOR = getWebpackConfig(nextMinorVersion, `${FILE_NAME}.${nextMinorVersion}.js`);

export let WEBPACK_CONFIG_MAJOR_MIN = getWebpackConfigMin(nextMajorVersion, `${FILE_NAME}.min.js`);
export let WEBPACK_CONFIG_MINOR_MIN = getWebpackConfigMin(nextMinorVersion, `${FILE_NAME}.${nextMinorVersion}.min.js`);

export let WEBPACK_CONFIG_LIB =     getWebpackConfig(nextMajorVersion, `${FILE_NAME}.lib.js`, 'umd');
export let WEBPACK_CONFIG_LIB_MIN = getWebpackConfigMin(nextMajorVersion, `${FILE_NAME}.lib.min.js`, 'umd');
