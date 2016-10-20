import webpack from 'webpack';

export let FILE_NAME = 'paypal.checkout';
export let MODULE_NAME = 'ppxo';

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

function getWebpackConfig(version) {
    let filename = `${FILE_NAME}.v${version}.js`;

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
        libraryTarget: 'this',
        umdNamedDefine: true,
        library: MODULE_NAME,
        pathinfo: true
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
            __FILE_NAME__: JSON.stringify(filename),
            __FILE_VERSION__: JSON.stringify(version),
            ...getVersionVars()
        })
      ]
    };
}

function getWebpackConfigMin(version) {

    let config = getWebpackConfig(`${version}.min`);
    let filename = `${FILE_NAME}.v${version}.js`;

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

export let WEBPACK_CONFIG_MAJOR = getWebpackConfig(getNextMajorVersion());
export let WEBPACK_CONFIG_MINOR = getWebpackConfig(getNextMinorVersion());

export let WEBPACK_CONFIG_MAJOR_MIN = getWebpackConfigMin(getNextMajorVersion());
export let WEBPACK_CONFIG_MINOR_MIN = getWebpackConfigMin(getNextMinorVersion());
