/* @flow */
/* eslint import/no-nodejs-modules: off */

import { getWebpackConfig } from 'grumbler-scripts/config/webpack.config';

import globals from './globals';

const MODULE_NAME = 'paypal';

export let WEBPACK_CONFIG_BUTTON_RENDER = getWebpackConfig({
    entry:         './src/button/template/componentTemplate',
    filename:      'button.js',
    modulename:    MODULE_NAME,
    web:           false,
    libraryTarget: 'commonjs2',
    vars:          {
        ...globals,
        __paypal_checkout__: {}
    }
});

export default [ WEBPACK_CONFIG_BUTTON_RENDER ];
