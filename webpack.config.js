/* @flow */
/* eslint import/no-nodejs-modules: off, import/no-default-export: off */

import { getWebpackConfig } from 'grumbler-scripts/config/webpack.config';

const FILE_NAME = 'smart-payment-buttons';
const MODULE_NAME = 'spb';

export const WEBPACK_CONFIG = getWebpackConfig({
    entry:         `${ __dirname  }/src/index.js`,
    filename:      `${ FILE_NAME }.js`,
    modulename:    MODULE_NAME,
    minify:        false,
    libraryTarget: 'window'
});

export const WEBPACK_CONFIG_MIN = getWebpackConfig({
    entry:         `${ __dirname }/src/index.js`,
    filename:      `${ FILE_NAME }.min.js`,
    modulename:    MODULE_NAME,
    minify:        true,
    libraryTarget: 'window',
    vars:          {
        __MIN__: true
    }
});

export const WEBPACK_CONFIG_TEST = getWebpackConfig({
    modulename: MODULE_NAME,
    test:       true,
    options:    {
        devtool: 'inline-source-map'
    },
    vars: {
        __TEST__: true
    }
});

export default [ WEBPACK_CONFIG, WEBPACK_CONFIG_MIN ];
