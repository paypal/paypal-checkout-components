/* @flow */
/* eslint import/no-nodejs-modules: off, import/no-default-export: off */

import type { WebpackConfig } from 'grumbler-scripts/config/types';
import { getWebpackConfig } from 'grumbler-scripts/config/webpack.config';

import { testGlobals } from './test/globals';
import globals from './globals';

const MODULE_NAME = 'paypal';

export const WEBPACK_CONFIG_TEST : WebpackConfig = getWebpackConfig({
    entry:         './test/paypal.js',
    libraryTarget: 'window',

    test:   true,
    debug:  true,

    vars: {
        ...globals,
        ...testGlobals,
        __CLIENT_ID__:   'abcxyz123',
        __MERCHANT_ID__: 'abc'
    }
});

export const WEBPACK_CONFIG_BUTTON_RENDER : WebpackConfig = getWebpackConfig({
    context:       __dirname,
    entry:         './src/ui/buttons',
    filename:      'button.js',
    modulename:    MODULE_NAME,
    web:           false,
    libraryTarget: 'commonjs2',
    vars:          globals
});

export default [ WEBPACK_CONFIG_BUTTON_RENDER ];
