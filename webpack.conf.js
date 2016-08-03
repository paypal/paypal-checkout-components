import webpack from 'webpack';

export let FILE_NAME = 'paypal.checkout.v4';
export let MODULE_NAME = 'ppxo';

export let WEBPACK_CONFIG = {
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
    filename: `${FILE_NAME}.js`,
    libraryTarget: 'umd',
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
    })
  ]
};

export let WEBPACK_CONFIG_MIN = Object.assign({}, WEBPACK_CONFIG, {
  output: {
    filename: `${FILE_NAME}.min.js`,
    libraryTarget: 'umd',
    umdNamedDefine: true,
    library: MODULE_NAME
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      test: /\.js$/,
      minimize: true
    })
  ]
});
