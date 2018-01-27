/* @flow */
/* eslint import/unambiguous: 0 */
/* eslint import/no-nodejs-modules: 0 */

import fs from 'fs';
import qs from 'querystring';
import path from 'path';

import webpack from 'webpack';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import { WebpackPromiseShimPlugin } from 'webpack-promise-shim-plugin';

let babelConfig = JSON.parse(fs.readFileSync('./.babelrc').toString()); // eslint-disable-line no-sync

babelConfig.babelrc = false;
babelConfig.cacheDirectory = true;
babelConfig.presets[0][1].modules = false;

const FILE_NAME = 'checkout';

function getNextVersion() : string {
    let version = require('./package.json').version;
    version = version.split('.');
    version[2] = (parseInt(version[2], 10) + 1).toString();
    version = version.join('.');
    return version;
}

function getNextMajorVersion() : string {
    return getNextVersion().split('.')[0];
}

function getNextMinorVersion() : string {
    return getNextVersion();
}

function getVersionVars() : { [string] : string } {
    return {
        __MAJOR_VERSION__: JSON.stringify(getNextMajorVersion()),
        __MINOR_VERSION__: JSON.stringify(getNextMinorVersion())
    };
}

type WebPackConfig = {
    src : string,
    filename : string,
    modulename? : string,
    target? : string,
    major? : boolean,
    minify? : boolean,
    vars? : { [string] : (string | number | boolean) },
    chunkname? : string
};

function getWebpackConfig({ src, filename, modulename, target = 'window', major = true, minify = false, vars = {}, chunkname } : WebPackConfig) : Object {

    vars = {
        __TEST__:                           false,
        __IE_POPUP_SUPPORT__:               true,
        __POPUP_SUPPORT__:                  true,
        __LEGACY_SUPPORT__:                 true,
        __FILE_NAME__:                      JSON.stringify(filename),
        __DEFAULT_LOG_LEVEL__:              JSON.stringify('warn'),
        __MAJOR__:                          major,
        __MINIFIED__:                       minify,
        __CHILD_WINDOW_ENFORCE_LOG_LEVEL__: true,
        __SEND_POPUP_LOGS_TO_OPENER__:      false,
        __ALLOW_POSTMESSAGE_POPUP__:        true,
        ...getVersionVars(),
        ...vars
    };

    const PREPROCESSOR_OPTS = {
        'ifdef-triple-slash': 'false',
        ...vars
    };

    let config = {
        entry:  path.resolve(src),
        module: {
            rules: [
                {
                    test:   /\.js$/,
                    loader: `ifdef-loader?${ qs.stringify(PREPROCESSOR_OPTS) }`
                },
                {
                    test:   /sinon\.js$/,
                    loader: 'imports?define=>false,require=>false'
                },
                {
                    test:    /\.jsx?$/,
                    exclude: /(sinon|chai)/,
                    loader:  'babel-loader',
                    options: babelConfig
                },
                {
                    test:   /\.(html?|css|json|svg)$/,
                    loader: 'raw-loader'
                }
            ]
        },
        output: {
            path:                path.resolve('./dist'),
            filename,
            libraryTarget:       target,
            umdNamedDefine:      true,
            library:             modulename,
            chunkFilename:       chunkname,
            pathinfo:            false,
            jsonpFunction:       '__paypal_checkout_jsonp__',
            publicPath:          'https://www.paypalobjects.com/api/'
        },
        bail:    true,
        resolve: {
            extensions: [ '.js', '.jsx' ]
        },
        plugins: [
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map'
            }),
            new WebpackPromiseShimPlugin({
                module: 'zalgo-promise/src',
                key:    'ZalgoPromise'
            }),
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: (chunkname ? 2 : 1)
            }),
            new webpack.DefinePlugin(vars),
            new webpack.NamedModulesPlugin(),
            new UglifyJSPlugin({
                test:     /\.js$/,
                beautify: !minify,
                minimize: minify,
                compress: {
                    warnings:  false,
                    sequences: minify
                },
                mangle:    minify,
                sourceMap: true
            }),
            new CircularDependencyPlugin({
                exclude:     /node_modules/,
                failOnError: true
            })
            // new webpack.optimize.ModuleConcatenationPlugin()
        ]
    };

    return config;
}

let nextMajorVersion = getNextMajorVersion();
let nextMinorVersion = getNextMinorVersion();

export let BASE = getWebpackConfig({
    src:       './src/load.js',
    filename:  `${ FILE_NAME }.js`,
    major:     true
});

export let MAJOR = getWebpackConfig({
    src:      './src/load.js',
    filename: `${ FILE_NAME }.v${ nextMajorVersion }.js`,
    major:    true,
    vars:     {
        __IE_POPUP_SUPPORT__: false,
        __LEGACY_SUPPORT__:   true
    }
});

export let MINOR = getWebpackConfig({
    src:      './src/load.js',
    filename: `${ FILE_NAME }.${ nextMinorVersion }.js`
});

export let MAJOR_MIN = getWebpackConfig({
    src:      './src/load.js',
    filename: `${ FILE_NAME }.min.js`,
    minify:   true,
    major:    true
});

export let MINOR_MIN = getWebpackConfig({
    src:      './src/load.js',
    filename: `${ FILE_NAME }.${ nextMinorVersion }.min.js`,
    minify:   true
});

export let LIB = getWebpackConfig({
    src:        './src/index.js',
    filename:   `${ FILE_NAME }.lib.js`,
    target:     `umd`,
    modulename: `paypal`,
    major:      true
});

export let BUTTON_RENDER = getWebpackConfig({
    src:      './src/button/template/componentTemplate.jsx',
    filename: `${ FILE_NAME }.button.render.js`,
    target:   `commonjs`
});

export let CHILD_LOADER = getWebpackConfig({
    src:      './src/loader/index.js',
    filename: `checkout.child.loader.js`
});

export let CHILD_LOADER_MIN = getWebpackConfig({
    src:      './src/loader/index.js',
    filename: `checkout.child.loader.min.js`,
    minify:   true
});

// eslint-disable-next-line import/no-anonymous-default-export
export default [
    BASE,
    MAJOR, MINOR,
    MAJOR_MIN, MINOR_MIN,
    LIB,
    BUTTON_RENDER,
    CHILD_LOADER, CHILD_LOADER_MIN
];
