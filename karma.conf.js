/* @flow */
/* eslint import/no-default-export: off */

import { getKarmaConfig } from '@krakenjs/grumbler-scripts/config/karma.conf';

import { WEBPACK_CONFIG_TEST } from './webpack.config';

export default function configKarma(karma : Object) {

    const karmaConfig = getKarmaConfig(karma, {
        basePath:  __dirname,
        testDir:   'test',
        windowDir: 'test/integration/windows',
        entry:     'test/integration/index.js',
        webpack:   WEBPACK_CONFIG_TEST
    });

    karma.set({
        ...karmaConfig,

        files: [
            {
                pattern:  'test/integration/vendor/react_v15.1.0.js',
                included: true,
                served:   true
            },

            {
                pattern:  'test/integration/vendor/react-dom_v15.1.0.js',
                included: true,
                served:   true
            },

            {
                pattern:  'test/integration/vendor/angular.min.js',
                included: true,
                served:   true
            },

            {
                pattern:  'test/integration/globals.js',
                included: true,
                served:   true
            },

            {
                pattern:  'test/paypal.js',
                included: true,
                served:   true
            },

            ...karmaConfig.files
        ],

        preprocessors: {
            ...karmaConfig.preprocessors,

            'src/index.js': [ 'webpack', 'sourcemap' ],
            'src/**/*.js':  [ 'sourcemap' ]
        },

        coverageReporter: {
            reporters: [
                {
                    type: 'lcov',
                    dir:  'coverage/karma'
                }
            ]
        }
    });
}
