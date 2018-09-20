/* @flow */
/* eslint import/no-nodejs-modules: off */

import { getWebpackConfig } from 'grumbler-scripts/config/webpack.config';

import { testGlobals } from './test/globals';
import globals from './globals';

const MODULE_NAME = 'paypal';

export let WEBPACK_CONFIG_TEST = getWebpackConfig({
    entry:         './test/paypal.js',
    libraryTarget: 'window',

    test: true,
    vars: {
        ...testGlobals,
        __paypal_checkout__: {
            ...testGlobals.__paypal_checkout__,
            serverConfig: {
                fundingEligibility: () => 'window.__TEST_FUNDING_ELIGIBILITY__'
            }
        },
        __PAYPAL_CHECKOUT__: {
            ...testGlobals.__PAYPAL_CHECKOUT__,
            __REMEMBERED_FUNDING__: () => 'window.__TEST_REMEMBERED_FUNDING__'
        },
        __CLIENT_ID__:      'abcxyz123',
        __MERCHANT_ID__:    'abc',
        __LOCALE_COUNTRY__: () => 'window.__TEST_LOCALE_COUNTRY__',
        __LOCALE_LANG__:    () => 'window.__TEST_LOCALE_LANG__'
    }
});

export let WEBPACK_CONFIG_BUTTON_RENDER = getWebpackConfig({
    entry:         './src/buttons/template/componentTemplate',
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
