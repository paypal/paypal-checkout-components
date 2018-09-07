/* @flow */
/* eslint import/unambiguous: 0 */
/* eslint import/no-nodejs-modules: 0 */

import fs from 'fs';
import path from 'path';

import webpack from 'webpack';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

import globals from './globals';

type JSONPrimitive = string | boolean | number;
type JSONObject = { [string] : JSONPrimitive | JSONObject } | Array<JSONPrimitive | JSONObject>;
type JSONObjectType = { [string] : JSONPrimitive | JSONObject };
type JSONType = JSONObject | JSONPrimitive;

function jsonifyPrimitives(item : JSONType) : JSONType {
    if (Array.isArray(item)) {
        return item.map(jsonifyPrimitives);
    } else if (typeof item === 'object' && item !== null) {
        let result = {};
        for (let key of Object.keys(item)) {
            result[key] = jsonifyPrimitives(item[key]);
        }
        return result;
    } else if (typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean' || item === null || item === undefined) {
        return JSON.stringify(item);
    } else {
        throw new TypeError(`Unrecognized type: ${ typeof item }`);
    }
}

let babelConfig = JSON.parse(fs.readFileSync('./node_modules/grumbler-scripts/config/.babelrc-browser').toString()); // eslint-disable-line no-sync

babelConfig.babelrc = false;
babelConfig.cacheDirectory = true;
babelConfig.presets[0][1].modules = false;

const FILE_NAME = 'checkout';

type WebPackConfig = {
    src? : string,
    filename? : string,
    modulename? : string,
    target? : string,
    minify? : boolean,
    vars? : JSONObjectType,
    test? : boolean,
    chunkname? : string
};

export function getWebpackConfig({
    src,
    filename,
    modulename,
    target = 'window',
    minify = false,
    vars = {},
    test = false,
    chunkname
} : WebPackConfig) : Object {

    if (!src && !test) {
        throw new Error(`Expected src`);
    }

    if (!filename && !test) {
        throw new Error(`Expected filename`);
    }

    vars = {
        ...globals,
        ...vars,

        // $FlowFixMe
        __PAYPAL_CHECKOUT__: {
            ...globals.__PAYPAL_CHECKOUT__,
            ...vars.__PAYPAL_CHECKOUT__
        },
        
        __FILE_NAME__: filename
    };
    
    if (minify) {
        vars.__MIN__ = true;
    } else {
        vars.__MIN__ = false;
    }

    if (test) {
        vars.__TEST__ = true;
    } else {
        vars.__TEST__ = false;
    }

    vars.__DEBUG__ = false;

    const plugins = [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: (chunkname ? 2 : 1)
        }),
        new webpack.DefinePlugin(jsonifyPrimitives(vars)),
        new webpack.NamedModulesPlugin(),
        new UglifyJSPlugin({
            test:          /\.js$/,
            uglifyOptions: {
                warnings: false,
                compress: {
                    sequences: minify
                },
                output: {
                    beautify: !minify
                },
                mangle: minify
            },
            parallel:  true,
            sourceMap: true,
            cache:     true
        }),
        new CircularDependencyPlugin({
            failOnError: true
        }),
        new webpack.optimize.ModuleConcatenationPlugin()
    ];

    if (!test) {
        plugins.push(new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        }));
    }

    /*

    if (chunkname) {
        plugins.push(new WebpackPromiseShimPlugin({
            module: 'zalgo-promise/src',
            key:    'ZalgoPromise'
        }));
    }

    */

    let config : Object = {
        module: {
            rules: [
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
        bail:    true,
        resolve: {
            extensions: [ '.js', '.jsx' ]
        },
        plugins
    };

    if (src) {
        config.entry = path.resolve(src);
    }

    if (filename) {
        config.output = {
            path:           path.resolve('./dist'),
            filename,
            libraryTarget:  target,
            umdNamedDefine: true,
            library:        modulename,
            chunkFilename:  chunkname,
            pathinfo:       false,
            jsonpFunction:  '__paypal_checkout_jsonp__',
            publicPath:     'https://www.paypalobjects.com/api/'
        };
    }

    if (test) {
        config.devtool = 'inline-source-map';
    }

    return config;
}

export let BASE = getWebpackConfig({
    src:       './src/load.js',
    filename:  `${ FILE_NAME }.js`
});

export let MAJOR = getWebpackConfig({
    src:      './src/load.js',
    filename: `${ FILE_NAME }.v${ globals.__PAYPAL_CHECKOUT__.__MAJOR_VERSION__ }.js`,
    vars:     {
        __POST_ROBOT__: {
            ...globals.__POST_ROBOT__,
            __IE_POPUP_SUPPORT__: true
        },
        __PAYPAL_CHECKOUT__: {
            __LEGACY_SUPPORT__: false
        }
    }
});

export let MINOR = getWebpackConfig({
    src:      './src/load.js',
    filename: `${ FILE_NAME }.${ globals.__PAYPAL_CHECKOUT__.__MINOR_VERSION__ }.js`,
    vars:     {
        __PAYPAL_CHECKOUT__: {
            __MAJOR__: false
        }
    }
});

export let MAJOR_MIN = getWebpackConfig({
    src:      './src/load.js',
    filename: `${ FILE_NAME }.min.js`,
    minify:   true
});

export let MINOR_MIN = getWebpackConfig({
    src:      './src/load.js',
    filename: `${ FILE_NAME }.${ globals.__PAYPAL_CHECKOUT__.__MINOR_VERSION__ }.min.js`,
    minify:   true,
    vars:     {
        __PAYPAL_CHECKOUT__: {
            __MAJOR__: false
        }
    }
});

export let LIB = getWebpackConfig({
    src:        './src/index.js',
    filename:   `${ FILE_NAME }.lib.js`,
    target:     `umd`,
    modulename: `paypal`,
    vars:       {
        __PAYPAL_CHECKOUT__: {
            __MAJOR__: false
        }
    }
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

export let BUTTON = getWebpackConfig({
    src:       './src/load.js',
    filename:  `${ FILE_NAME }.button.v${ globals.__PAYPAL_CHECKOUT__.__MAJOR_VERSION__ }.js`,
    chunkname: `${ FILE_NAME }.button.v${ globals.__PAYPAL_CHECKOUT__.__MAJOR_VERSION__ }.chunk.js`,

    vars:     {
        __PAYPAL_CHECKOUT__: {
            __LEGACY_SUPPORT__: false
        }
    }
});

export let TEST = getWebpackConfig({
    test: true,
    vars: {
        __PAYPAL_CHECKOUT__: {
            __MAJOR__:         false,
            __MAJOR_VERSION__: 'test',
            __MINOR_VERSION__: 'test_minor'
        }
    }
});

export default [
    BASE,
    MAJOR, MINOR,
    MAJOR_MIN, MINOR_MIN,
    LIB,
    BUTTON_RENDER,
    CHILD_LOADER, CHILD_LOADER_MIN
];
