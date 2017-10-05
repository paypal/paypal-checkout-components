let path = require('path');
let webpack = require('webpack');
let UglifyJSPlugin = require('uglifyjs-webpack-plugin');
let CircularDependencyPlugin = require('circular-dependency-plugin');

export let FILE_NAME = 'xo-buttonjs';
export let MODULE_NAME = 'xobuttonjs';

function getWebpackConfig({ filename, modulename, minify = false, options = {}, vars = {} }) {

    return {

        entry: './public/js/button/index.js',

        output: {
            path: path.resolve('./dist'),
            filename: filename,
            libraryTarget: 'umd',
            umdNamedDefine: true,
            library: modulename,
            pathinfo: false
        },

        resolve: {
            modules: [
                __dirname,
                'node_modules',
                'public/components'
            ]
        },

        module: {
            rules: [
                {
                    test: /sinon\.js$/,
                    loader: "imports?define=>false,require=>false"
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.(html?|css|json)$/,
                    loader: 'raw-loader'
                }
            ]
        },

        bail: true,

        devtool: 'source-map',

        plugins: [
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map'
            }),
            new webpack.DefinePlugin({
                __TEST__: false,
                ...vars
            }),
            new webpack.NamedModulesPlugin(),
            new UglifyJSPlugin({
                test: /\.js$/,
                beautify: !minify,
                minimize: minify,
                compress: {
                    warnings: false,
                    sequences: minify
                },
                mangle: minify,
                sourceMap: true
            })
            /* new CircularDependencyPlugin({
                exclude: /node_modules/,
                failOnError: true
            }) */
        ],

        ...options
    };
}

let WEBPACK_CONFIG = getWebpackConfig({
    filename: `${FILE_NAME}.js`,
    modulename: MODULE_NAME
});

let WEBPACK_CONFIG_MIN = getWebpackConfig({
    filename: `${FILE_NAME}.min.js`,
    modulename: MODULE_NAME,
    minify: true
});

let WEBPACK_CONFIG_TEST = getWebpackConfig({
    filename: `${FILE_NAME}.js`,
    modulename: MODULE_NAME,
    options: {
        devtool: 'inline-source-map'
    },
    vars: {
        __TEST__: true
    }
});

module.exports = [ WEBPACK_CONFIG, WEBPACK_CONFIG_MIN ];

module.exports.WEBPACK_CONFIG = WEBPACK_CONFIG;
module.exports.WEBPACK_CONFIG_MIN = WEBPACK_CONFIG_MIN;
module.exports.WEBPACK_CONFIG_TEST = WEBPACK_CONFIG_TEST;
