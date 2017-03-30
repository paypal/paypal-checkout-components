let argv = require('yargs').argv;
let path = require('path');
let webpack = require('webpack');

module.exports = function(config) {

    let karmaConfig = {
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: __dirname,
        port: 9876,
        colors: true,
        logLevel: argv['debug'] ? config.LOG_DEBUG : config.LOG_WARN,
        client: {
            captureConsole: argv.debug ? true : false,
            mocha: {
                timeout : 10000 // 6 seconds - upped from 2 seconds
            }
        },
        singleRun: true,
        runInParent: true,
        useIframe: false,

        browserNoActivityTimeout: 60 * 60 * 1000,
        browserDisconnectTimeout: 30 * 1000,
        browserDisconnectTolerance: 2,
        captureTimeout: 120000,
        reportSlowerThan: 8000,
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: [
            'mocha',
            'sinon-chai'
        ],
        files: [
            'test/lib/react_v15.1.0.js',
            'test/lib/react-dom_v15.1.0.js',
            'test/lib/angular.min.js',

            'node_modules/babel-polyfill/dist/polyfill.js',

            { pattern: 'dist/checkout.js', included: true, served: true },
            { pattern: 'test/test.js', included: true, served: true }
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
            // require('karma-sourcemap-loader')
        ],
        reporters: ['coverage'],
        browsers: ['PhantomJS'],
        preprocessors: {
            'test/test.js': ['webpack'],
            'test/windows/**/*.js': ['webpack']
        },
        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },
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
        }
    };
    
    

    if (process.env.TRAVIS) {
        karmaConfig.browser = [ 'Chrome_travis_ci' ];
    } else if (argv.browser) {
        karmaConfig.browser = argv.browser.split(',');
    }

    if (argv.quick) {
        karmaConfig.reporters.push('progress');
    } else {
        karmaConfig.reporters.push('spec');
    }

    if (!argv.nowebpack) {
        karmaConfig.webpackMiddleware = {
            noInfo: argv.debug ? false : true,
            stats: argv.debug ? true : false
        };

        karmaConfig.webpack = {
            // devtool: 'inline-source-map',

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
                    __TEST__: true,
                    __IE_POPUP_SUPPORT__: true,
                    __POPUP_SUPPORT__: true,
                    __FILE_NAME__: '"paypal.checkout.v4.js"',
                    __FILE_VERSION__: '"4"',
                    __MAJOR_VERSION__: '"4"',
                    __MINOR_VERSION__: '"4.0"'
                })
            ]
        };
    }

    config.set(karmaConfig);
};
