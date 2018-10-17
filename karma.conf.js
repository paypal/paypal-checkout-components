/* @flow */
/* eslint import/no-default-export: off */

import { getKarmaConfig } from 'grumbler-scripts/config/karma.conf';

import { WEBPACK_CONFIG_TEST } from './webpack.config';

export default function configKarma(karma : Object) {

    const karmaConfig = getKarmaConfig(karma, {
        basePath: __dirname,
        webpack:  WEBPACK_CONFIG_TEST
    });

    karma.set({
        ...karmaConfig,

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
                pattern:  'test/tests/globals.js',
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
        }
    });
}
