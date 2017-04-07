let argv = require('yargs').argv;
let path = require('path');
let webpack = require('webpack');

function browsers() {
    
    if (process.env.TRAVIS) {
        karmaConfig.browsers.push( 'Chrome_travis_ci' );
        karmaConfig.customLaunchers.Chrome_travis_ci = {
            base: 'Chrome',
            flags: ['--no-sandbox']
        };
    } else if (argv.browser) {
        karmaConfig.browsers = argv.browser.split(',');
    } else {
        // karmaConfig.browsers.push('PhantomJS');
        karmaConfig.browsers.push('PhantomJS_custom');
    }

    if (karmaConfig.browsers.indexOf('PhantomJS_custom') !== -1) {
        addPhantom();
    }
    
    if(karmaConfig.browsers.indexOf('Chrome_travis_ci') !== -1) {
        karmaConfig.customLaunchers.Chrome_travis_ci = {
            base: 'Chrome',
            flags: ['--no-sandbox']
        };
    }

}

function addPhantom() {
    karmaConfig.phantomjsLauncher = {
        exitOnResourceError: true
    };
    karmaConfig.customLaunchers.PhantomJS_custom = {
        base: 'PhantomJS',
        flags: ['--load-images=true', '--disk-cache=true', '--disk-cache-path=node_modules/.cache/phantomjs', '--max-disk-cache-size=1000000'],
        debug: argv.debug ? true : false
    }
}

function addCoverage() {
    karmaConfig.reporters.push('coverage');
    karmaConfig.webpack.module.rules[0].query.plugins.push([ 'istanbul', { only: `${__dirname}/src` } ]);
    karmaConfig.coverageReporter = {
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
    };
}

let karmaConfig = {
    autoWatch: argv.watch ? true : false,
    basePath: __dirname,
    browsers: [],
    browserNoActivityTimeout: 60 * 60 * 1000,
    browserDisconnectTimeout: 30 * 1000,
    browserDisconnectTolerance: 2,
    captureTimeout: 120000,
    client: {
        captureConsole: argv.debug ? true : false,
        mocha: {
            timeout : 60000,
            bail: true
        }
    },
    customLaunchers: {}, 
    files: [
        'test/lib/react_v15.1.0.js',
        'test/lib/react-dom_v15.1.0.js',
        'test/lib/angular.min.js',
        'node_modules/babel-polyfill/dist/polyfill.js',
        { pattern: 'src/load.js', included: true, served: true },
        { pattern: 'test/test.js', included: true, served: true },
        { pattern: 'test/**/*', included: false, served: true }
    ],
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
    preprocessors: {
        'src/load.js': ['webpack', 'sourcemap'],
        'test/test.js': ['webpack', 'sourcemap'],
        'test/windows/**/*.js': ['webpack', 'sourcemap'],
        'src/**/*.js': ['sourcemap']
    },
    reporters: [
        argv.quick ? 'progress' : 'spec',
    ],
    reportSlowerThan: 10000,
    runInParent: true,
    singleRun: argv.debug || argv['keep-open'] ? false : true,
    useIframe: false,
    webpackMiddleware: {
        noInfo: argv.debug ? false : true,
        stats: argv.debug ? true : false
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
                        cacheDirectory: true,
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
                __DEFAULT_LOG_LEVEL__: JSON.stringify(argv.debug ? 'debug' :  'error')
            })
        ]
    },
};



module.exports = function(config) {

    karmaConfig. logLevel = argv.debug ? config.LOG_DEBUG : config.LOG_WARN;
    
    if (!argv.quick) {
        addCoverage();
    }

    browsers();

    config.set(karmaConfig);
};
