let argv = require('yargs').argv;
let path = require('path');
let webpack = require('webpack');

function defaultConfig(config) {
    return {
        basePath: __dirname,
        browserDisconnectTimeout: 30 * 1000,
        browserDisconnectTolerance: 2,
        browserNoActivityTimeout: 60 * 60 * 1000,
        browsers: argv.browser ? argv.browser.split(',') : ['PhantomJS_custom'],
        captureTimeout: 30000,
        client: {
            captureConsole: argv.debug ? true : false,
            mocha: {
                timeout : 10000 // 6 seconds - upped from 2 seconds
            }
        },
        colors: true,
        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },
        files: [
            'test/lib/react_v15.1.0.js',
            'test/lib/react-dom_v15.1.0.js',
            'test/lib/angular.min.js',
            'node_modules/babel-polyfill/dist/polyfill.js',
            { pattern: 'test/lib/button.js', included: false, served: true }
            // Conditional files loaded below
        ],
        frameworks: [
            'mocha',
            'sinon-chai'
        ],
        logLevel: argv['debug'] ? config.LOG_DEBUG : config.LOG_WARN,
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
            require('karma-sourcemap-loader'),
            require('karma-renamer-preprocessor')
        ],
        port: 9876,
        preprocessors: {
            'test/test.js': ['webpack', 'sourcemap'],
            'test/windows/**/*.js': ['webpack']
        },
        reporters: [],
        reportSlowerThan: 8000,
        runInParent: true,
        singleRun: true,
    

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
                                }]
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
        }
    };
}


module.exports = function(config) {
    let karmaConfig = defaultConfig(config)

    if (argv.quick) {
        karmaConfig.reporters.push('progress');
        karmaConfig.files.push({ pattern: 'dist/checkout.test.js', included: true, served: true });
        karmaConfig.preprocessors['dist/checkout.test.js'] = ['sourcemap'];
    } else {
        karmaConfig.reporters.push('spec');
        karmaConfig.files.push({ pattern: 'src/load.js', included: true, served: true });
        karmaConfig.preprocessors['src/load.js'] = ['webpack', 'sourcemap', 'renamer'];
        karmaConfig.renamerPreprocessor = {
            transformPath: function(path) {
                return path.replace(/src\/load\.js$/, 'dist/checkout.test.js');
            }
        };
        
        addCoverage(karmaConfig);
    }

    karmaConfig.files = karmaConfig.files.concat([{ pattern: 'test/windows/**/*', included: false, served: true }, { pattern: 'test/test.js', included: true, served: true }]);

    if (karmaConfig.browsers.indexOf('PhantomJS') || karmaConfig.browsers.indexOf('PhantomJS_custom')) {
        addPhantom(karmaConfig);
    }

    config.set(karmaConfig);
};


function addPhantom(config) {
    
    
    config.customLaunchers['PhantomJS_custom'] = {
        base: 'PhantomJS',
        options: {
            settings: {
                webSecurityEnabled: false,
                clearMemoryCaches: true
            }
        },
        flags: ['--load-images=true', '--disk-cache=true'],
        debug: true
    };

}

function addCoverage(config) {
    config.reporters.push('coverage');
    config.coverageReporter = {

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
    config.webpack.module.rules[0].query.plugins.push(['istanbul', { only: `${__dirname}/src` }]);
}
