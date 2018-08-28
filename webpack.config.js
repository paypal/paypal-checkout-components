/* @flow */
/* eslint import/no-nodejs-modules: off */

import { getWebpackConfig } from 'grumbler-scripts/config/webpack.config';

const FILE_NAME = 'smart-payment-buttons';
const MODULE_NAME = 'spb';

export let WEBPACK_CONFIG = getWebpackConfig({
    filename:      `${ FILE_NAME }.js`,
    modulename:    MODULE_NAME,
    libraryTarget: 'window'
});

export let WEBPACK_CONFIG_MIN = getWebpackConfig({
    filename:      `${ FILE_NAME }.min.js`,
    modulename:    MODULE_NAME,
    minify:        true,
    libraryTarget: 'window',
    vars:          {
        __MIN__: true
    }
});

export let WEBPACK_CONFIG_TEST = getWebpackConfig({
    filename:   `${ FILE_NAME }.js`,
    modulename: MODULE_NAME,
    options:    {
        devtool: 'inline-source-map'
    },
    vars: {
        __TEST__: true
    }
});

export default [ WEBPACK_CONFIG, WEBPACK_CONFIG_MIN ];
