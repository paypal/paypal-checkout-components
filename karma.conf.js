import { argv } from 'yargs';
import path from 'path';
import webpack from 'webpack';

import { getWebpackConfig } from './webpack.config';

export default function karmaConfig(config) {

    let debug          = Boolean(argv.debug);
    let quick          = Boolean(argv.quick);
    let keepOpen       = Boolean(argv['keep-open']);
    let autoWatch      = Boolean(keepOpen);
    let coverage       = !argv['disable-coverage'] && !quick;
    let browsers       = argv.browser;
    let logLevel       = argv['log-level'] || argv.loglevel || (keepOpen ? 'info' : '');
    let headless       = !keepOpen;
    let captureConsole = Boolean(argv['capture-console']);

    let karmaConfig = {

        singleRun: !(debug || keepOpen),

        client: {
            captureConsole,
            mocha:          {
                timeout: process.env.TRAVIS ? 60 * 1000 : 10 * 1000,
                bail:    true
            }
        },

        files: [

            {
                pattern:  'test/lib/react_v15.1.0.js',
                included: true,
                served:   true
            },

            {
                pattern:  'test/lib/react-dom_v15.1.0.js',
                included: true,
                served:   true
            },

            {
                pattern:  'test/lib/angular.min.js',
                included: true,
                served:   true
            },

            {
                pattern:  'test/lib/pptm.js',
                included: false,
                served:   true
            },

            {
                pattern:  'node_modules/babel-polyfill/dist/polyfill.js',
                included: true,
                served:   true
            },

            {
                pattern:  'src/load.js',
                included: true,
                served:   true
            },

            {
                pattern:  'test/test.js',
                included: true,
                served:   true
            },

            {
                pattern:  'test/**/*',
                included: false,
                served:   true
            }

        ],

        proxies: {
            '/tagmanager/': '/base/test/lib/'
        },

        preprocessors: {
            'src/load.js':          [ 'webpack', 'sourcemap' ],
            'test/test.js':         [ 'webpack', 'sourcemap' ],
            'test/windows/**/*.js': [ 'webpack', 'sourcemap' ],
            'src/**/*.js':          [ 'sourcemap' ]
        },

        customLaunchers: {

            xChrome: {
                base:  'Chrome',
                flags: [
                    '--no-sandbox',
                    '--disable-gpu',
                    '--remote-debugging-port=9222',
                    '--remote-debugging-address=0.0.0.0',
                    // '--auto-open-devtools-for-tabs',
                    '--enable-precise-memory-info',
                    '--js-flags="--expose-gc"'
                ],
                debug
            }
        },

        webpack: getWebpackConfig({
            test:  true,
            major: true
        }),

        reporters: [
            quick ? 'progress' : 'spec'
        ],

        autoWatch,
        logLevel:  debug ? config.LOG_DEBUG : logLevel || config.LOG_WARN,

        basePath: __dirname,

        frameworks: [
            'mocha',
            'sinon-chai'
        ],

        plugins: [
            require('karma-webpack'),
            require('karma-mocha'),
            require('karma-chrome-launcher'),
            require('karma-safari-launcher'),
            require('karma-firefox-launcher'),
            require('karma-ie-launcher'),
            require('karma-sinon-chai'),
            require('karma-coverage'),
            require('karma-spec-reporter'),
            require('karma-sourcemap-loader')
        ],

        port: 9876,

        webpackMiddleware: {
            noInfo: !debug,
            stats:  !debug
        },

        browserNoActivityTimeout:   60 * 60 * 1000,
        browserDisconnectTimeout:   30 * 1000,
        browserDisconnectTolerance: 2,
        captureTimeout:             120000,
        reportSlowerThan:           10000,

        browserConsoleLogOptions: {
            level:    debug ? 'debug' : 'error',
            format:   '%b %T: %m',
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
            .options.plugins.push([
                'istanbul', {
                    only: `${ __dirname }/src`
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
                    type:   'html',
                    dir:    'coverage/',
                    subdir: '.'
                }
            ]
        };
    }

    if (headless) {
        karmaConfig.customLaunchers.xChrome.flags.push('--headless');
    }

    config.set(karmaConfig);
}
