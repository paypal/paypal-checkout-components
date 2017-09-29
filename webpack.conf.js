let webpack = require('webpack');
let CircularDependencyPlugin = require('circular-dependency-plugin')
let UglifyJSPlugin = require('uglifyjs-webpack-plugin');
let path = require('path');
let fs = require('fs');

let babelConfig = JSON.parse(fs.readFileSync('./.babelrc'));

babelConfig.babelrc = false;
babelConfig.cacheDirectory = true;
babelConfig.presets[0][1].modules = false;

const FILE_NAME = 'checkout';

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

function getWebpackConfig({ version, filename, modulename, target = 'window', minify = false, vars = {} }) {

    let config = {
        module: {
            rules: [
                {
                    test: /sinon\.js$/,
                    loader: "imports?define=>false,require=>false"
                },
                {
                    test: /\.jsx?$/,
                    exclude: /(sinon|chai)/,
                    loader: 'babel-loader',
                    options: babelConfig
                },
                {
                    test: /\.(html?|css|json|svg)$/,
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
        resolve: {
            extensions: [ '.js', '.jsx' ]
        },
        plugins: [
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map'
            }),
            new webpack.DefinePlugin({
                __TEST__: JSON.stringify(false),
                __IE_POPUP_SUPPORT__: JSON.stringify(true),
                __POPUP_SUPPORT__: JSON.stringify(true),
                __LEGACY_SUPPORT__: JSON.stringify(true),
                __FILE_NAME__: JSON.stringify(filename),
                __FILE_VERSION__: JSON.stringify(version),
                __DEFAULT_LOG_LEVEL__: JSON.stringify('warn'),
                __CHILD_WINDOW_ENFORCE_LOG_LEVEL__: JSON.stringify(true),
                __SEND_POPUP_LOGS_TO_OPENER__: JSON.stringify(false),
                ...vars,
                ...getVersionVars()
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
            }),
            new CircularDependencyPlugin({
              exclude: /node_modules/,
              failOnError: true
            })
            // new webpack.optimize.ModuleConcatenationPlugin()
        ]
    };

    return config;
}

let nextMajorVersion = getNextMajorVersion();
let nextMinorVersion = getNextMinorVersion();

module.exports.webpack_tasks = {

    base: {
        src: 'src/load.js',
        out: 'dist',
        cfg: getWebpackConfig({
            version: nextMajorVersion,
            filename: `${FILE_NAME}.js`
        })
    },

    major: {
        src: 'src/load.js',
        out: 'dist',
        cfg: getWebpackConfig({
            version: nextMajorVersion,
            filename: `${FILE_NAME}.v${nextMajorVersion}.js`,
            vars: {
                __IE_POPUP_SUPPORT__: JSON.stringify(false),
                __LEGACY_SUPPORT__: JSON.stringify(false)
            }
        })
    },

    minor: {
        src: 'src/load.js',
        out: 'dist',
        cfg: getWebpackConfig({
            version: nextMinorVersion,
            filename: `${FILE_NAME}.${nextMinorVersion}.js`
        })
    },

    major_min: {
        src: 'src/load.js',
        out: 'dist',
        cfg: getWebpackConfig({
            version: nextMajorVersion,
            filename: `${FILE_NAME}.min.js`,
            minify: true
        })
    },

    minor_min: {
        src: 'src/load.js',
        out: 'dist',
        cfg: getWebpackConfig({
            version: nextMinorVersion,
            filename: `${FILE_NAME}.${nextMinorVersion}.min.js`,
            minify: true
        })
    },


    lib: {
        src: 'src/index.js',
        out: 'dist',
        cfg: getWebpackConfig({
            version: nextMajorVersion,
            filename: `${FILE_NAME}.lib.js`,
            target: `umd`,
            modulename: `paypal`
        })
    },

    button_render: {
        src: 'src/components/button/templates/component/index.js',
        out: 'dist',
        cfg: getWebpackConfig({
            version: nextMajorVersion,
            filename: `${FILE_NAME}.button.render.js`,
            target: `commonjs`
        })
    },


    child_loader: {
        src: 'src/loader/index.js',
        out: 'dist',
        cfg: getWebpackConfig({
            version: nextMajorVersion,
            filename: `checkout.child.loader.js`
        })
    },

    child_loader_min: {
        src: 'src/loader/index.js',
        out: 'dist',
        cfg: getWebpackConfig({
            version: nextMajorVersion,
            filename: `checkout.child.loader.min.js`,
            minify: true
        })
    }
};
