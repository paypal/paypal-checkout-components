let argv = require('yargs').argv;
let path = require('path');
let webpack = require('webpack');

module.exports = function(config) {

    var browser = [ 'PhantomJS' ];

    if (process.env.TRAVIS) {
        browser = [ 'Chrome_travis_ci' ];
    } else if (argv.browser) {
        browser = argv.browser.split(',');
    }

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: __dirname,

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: [
            'mocha',
            'sinon-chai'
        ],

        // list of files / patterns to load in the browser
        files: [
            'test/lib/react_v15.1.0.js',
            'test/lib/react-dom_v15.1.0.js',
            'test/lib/angular.min.js',

            'node_modules/babel-polyfill/dist/polyfill.js',

            { pattern: 'src/load.js', included: true, served: true },

            { pattern: 'test/test.js', included: true, served: true },
            { pattern: 'test/**/*', included: false, served: true }
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

        webpackMiddleware: {
            noInfo: true,
            stats: false
        },

        webpack: {
            devtool: 'inline-source-map',

            resolve: {
                modules: [
                    __dirname,
                    'node_modules'
                ]
            },

            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /(dist|chai)/,
                        loader: 'babel-loader',
                        query: {
                            presets: [ [ 'es2015', { 'modules': false } ] ],
                            plugins: [
                                'transform-flow-strip-types',
                                'transform-object-rest-spread',
                                'syntax-object-rest-spread',
                                'transform-es3-property-literals',
                                'transform-es3-member-expression-literals',
                                'transform-decorators-legacy',
                                ['transform-es2015-for-of', {loose: true}],
                                ['flow-runtime', {
                                    'assert': true,
                                    'annotate': true
                                }],
                                [ 'istanbul', { only: `${__dirname}/src` } ]
                            ]
                        }
                    },
                    {
                        test: /\.(html?|css|json)$/,
                        loader: 'raw-loader'
                    }
                ]
            },
            bail: false,
            plugins: [
                new webpack.DefinePlugin({
                    __TEST__: JSON.stringify(true),
                    __IE_POPUP_SUPPORT__: JSON.stringify(true),
                    __POPUP_SUPPORT__: JSON.stringify(true),
                    __FILE_NAME__: JSON.stringify('paypal.checkout.v4.js'),
                    __FILE_VERSION__: JSON.stringify('4'),
                    __MAJOR_VERSION__: JSON.stringify('4'),
                    __MINOR_VERSION__: JSON.stringify('4.0'),
                    __DEFAULT_LOG_LEVEL__: JSON.stringify(argv.loglevel || argv['log-level'] || 'warn')
                })
            ]
        },


        // list of files to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/load.js': ['webpack', 'sourcemap'],
            'test/test.js': ['webpack', 'sourcemap'],
            'test/windows/**/*.js': ['webpack', 'sourcemap'],
            'src/**/*.js': ['sourcemap']
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: [
            'spec',
            'coverage'
        ],

        coverageReporter: {

            instrumenterOptions: {
                istanbul: { noCompact: true }
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
        },


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_WARN,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        browserNoActivityTimeout: 60 * 60 * 1000,
        browserDisconnectTimeout: 30 * 1000,
        browserDisconnectTolerance: 2,

        captureTimeout: 120000,

        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: browser,


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        runInParent: true,
        useIframe: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    });
};
