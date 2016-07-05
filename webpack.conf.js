import webpack from 'webpack';

export let FILE_NAME = 'checkout-components';
export let MODULE_NAME = 'checkoutComponents';

export let WEBPACK_CONFIG = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel'
      },
      {
        test: /\.(html?|css)$/,
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
