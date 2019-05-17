/* @flow */
/* eslint import/no-default-export: off */

import { getKarmaConfig } from 'grumbler-scripts/config/karma.conf';

import { TEST } from './webpack.config';

// eslint-disable-next-line no-process-env
process.env.CHROME_BIN = require('puppeteer').executablePath();

export default function configKarma(karma : Object) {

    const karmaConfig = getKarmaConfig(karma, {
        basePath:  __dirname,
        testDir:   'test',
        windowDir: 'test/windows',
        entry:     'test/index.js',
        webpack:   TEST
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
                pattern:  'src/load.js',
                included: true,
                served:   true
            },

            ...karmaConfig.files
        ],

        preprocessors: {
            ...karmaConfig.preprocessors,

            'src/load.js': [ 'webpack', 'sourcemap' ],
            'src/**/*.js': [ 'sourcemap' ]
        },

        proxies: {
            '/tagmanager/': '/base/test/lib/'
        }
    });
}
