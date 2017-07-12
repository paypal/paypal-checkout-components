let argv = require('yargs').argv;
let path = require('path');
let webpack = require('webpack');

module.exports = function(config) {

    let debug     = Boolean(argv.debug);
    let quick     = Boolean(argv.quick);
    let keepOpen  = Boolean(argv['keep-open']);
    let autoWatch = Boolean(keepOpen);
    let coverage  = !Boolean(argv['disable-coverage']) && !quick;
    let browsers  = argv['browser'];
    let logLevel  = argv['log-level'] || argv['loglevel'] || (keepOpen ? 'info' : '');

    let karmaConfig = {

        files: [

            {
                pattern: 'test/lib/react_v15.1.0.js',
                included: true,
                served: true
            },

            {
                pattern: 'test/lib/react-dom_v15.1.0.js',
                included: true,
                served: true
            },

            {
                pattern: 'test/lib/angular.min.js',
                included: true,
                served: true
            },

            {
                pattern: 'test/lib/pptm.js',
                included: false,
                served: true
            },

            {
                pattern: 'node_modules/babel-polyfill/dist/polyfill.js',
                included: true,
                served: true
            },

            {
                pattern: 'src/load.js',
                included: true,
                served: true
            },

            {
                pattern: 'test/test.js',
                included: true,
                served: true
            },

            {
                pattern: 'test/**/*',
                included: false,
                served: true
            }

        ],

        proxies: {
            '/tagmanager/': '/base/test/lib/'
        },

        preprocessors: {
            'src/load.js':          ['webpack', 'sourcemap'],
            'test/test.js':         ['webpack', 'sourcemap'],
            'test/windows/**/*.js': ['webpack', 'sourcemap'],
            'src/**/*.js':          ['sourcemap']
        },

        customLaunchers: {

            xChrome: {
                base: 'Chrome',
                flags: [
                    '--no-sandbox',
                    '--enable-precise-memory-info',
                    '--js-flags="--expose-gc"'
                ],
                debug: debug
            },

            xPhantom: {
                base: 'PhantomJS',
                flags: [
                    '--load-images=true',
                    '--disk-cache=true',
                    '--disk-cache-path=node_modules/.cache/phantomjs',
                    '--max-disk-cache-size=1000000'
                ],
                debug: debug
            }

        },

        webpack: {
            devtool: 'inline-source-map',

            resolve: {
                modules: [
                    __dirname,
                    'node_modules'
                ],
                extensions: [ '.js', '.jsx' ]
            },

            module: {
                rules: [

                    {
                        test: /\.jsx?$/,
                        exclude: /(dist|chai)/,
                        loader: 'babel-loader',
                        query: {
                            cacheDirectory: true,

                            presets: [
                                [
                                    "env", {
                                        "targets": {
                                            "ie": 9,
                                            "chrome": 27,
                                            "firefox": 30,
                                            "safari": 5,
                                            "opera": 23
                                        },
                                        "modules": false,
                                        "loose": true
                                    }
                                ],
                                "react"
                            ],

                            plugins: [
                                [ "transform-flow-strip-types", { "loose": true } ],
                                [ "transform-object-rest-spread", { "loose": true } ],
                                [ "syntax-object-rest-spread", { "loose": true } ],
                                [ "transform-class-properties", { "loose": true } ],
                                [ "transform-es3-property-literals", { "loose": true } ],
                                [ "transform-es3-member-expression-literals", { "loose": true } ],
                                [ "transform-decorators-legacy", { "loose": true } ],
                                [ "transform-es2015-for-of", { "loose": true } ],
                                [ "babel-plugin-transform-react-jsx", { "pragma": "jsxDom" } ]
                                // [ "flow-runtime", { "assert": true, "annotate": true } ]
                            ]
                        }
                    },

                    {
                        test: /\.(html?|css|json|svg)$/,
                        loader: 'raw-loader'
                    }

                ]
            },

            bail: false,

            plugins: [
                new webpack.DefinePlugin({
                    __TEST__:              JSON.stringify(true),
                    __IE_POPUP_SUPPORT__:  JSON.stringify(true),
                    __POPUP_SUPPORT__:     JSON.stringify(true),
                    __LEGACY_SUPPORT__:    JSON.stringify(true),
                    __FILE_NAME__:         JSON.stringify('checkout.js'),
                    __FILE_VERSION__:      JSON.stringify('4'),
                    __MAJOR_VERSION__:     JSON.stringify('4'),
                    __MINOR_VERSION__:     JSON.stringify('4.0'),
                    __DEFAULT_LOG_LEVEL__: JSON.stringify(debug ? 'debug' : logLevel || 'error'),
                    __CHILD_WINDOW_ENFORCE_LOG_LEVEL__: JSON.stringify(true),
                    __SEND_POPUP_LOGS_TO_OPENER__: JSON.stringify(true)
                })
            ]
        },

        reporters: [
            quick ? 'progress' : 'spec'
        ],

        autoWatch: autoWatch,
        logLevel: debug ? config.LOG_DEBUG : logLevel || config.LOG_WARN,

        basePath: __dirname,

        frameworks: [
            'mocha',
            'sinon-chai'
        ],

        plugins: [
            require('karma-webpack'),
            require('karma-mocha'),
            require('karma-phantomjs-launcher'),
            require('karma-chrome-launcher'),
            require('karma-safari-launcher'),
            require('karma-firefox-launcher'),
            require('karma-ie-launcher'),
            require('karma-slimerjs-launcher'),
            require('karma-sinon-chai'),
            require('karma-coverage'),
            require('karma-spec-reporter'),
            require('karma-sourcemap-loader')
        ],

        port: 9876,

        webpackMiddleware: {
            noInfo: !debug,
            stats: !debug
        },

        browserNoActivityTimeout: 60 * 60 * 1000,
        browserDisconnectTimeout: 30 * 1000,
        browserDisconnectTolerance: 2,
        captureTimeout: 120000,
        reportSlowerThan: 10000,

        browserConsoleLogOptions: {
            level: debug ? 'debug' : 'error',
            format: '%b %T: %m',
            terminal: true
        }
    };


    if (process.env.TRAVIS) {
        karmaConfig.browsers = [ 'xChrome' ];
    } else if (browsers) {
        karmaConfig.browsers = browsers.split(',');
    } else {
        karmaConfig.browsers = [ 'xChrome' ];
    }


    if (coverage) {

        karmaConfig.reporters.push('coverage');

        karmaConfig.webpack.module.rules
            .find(rule => rule.loader === 'babel-loader')
            .query.plugins.push([
                'istanbul', {
                    only: `${__dirname}/src`
                }
            ]);

        karmaConfig.coverageReporter = {
            instrumenterOptions: {
                istanbul: {
                    noCompact: true
                }
            },
            reporters: [
                {
                    type: 'text'
                },
                {
                    type : 'html',
                    dir : 'coverage/',
                    subdir: '.'
                }
            ]
        };
    }

    config.set(karmaConfig);
};
