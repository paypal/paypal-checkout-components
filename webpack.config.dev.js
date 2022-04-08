/* @flow */
/* eslint import/no-nodejs-modules: off, import/no-default-export: off */

import type { WebpackConfig } from '@krakenjs/grumbler-scripts/config/types';
import { getWebpackConfig } from '@krakenjs/grumbler-scripts/config/webpack.config';
import { ENV } from '@paypal/sdk-constants';

import { getTestGlobals } from './test/globals';
import globals from './globals';

const FILE_NAME = 'sdk';

const PROTOCOL = 'https';
const HOSTNAME = 'localhost.paypal.com';
const PORT = 9001;

const testGlobals = getTestGlobals(globals);

const WEBPACK_CONFIG_DEV : WebpackConfig = getWebpackConfig({
    entry:         './paypal.dev.js',
    filename:      `${ FILE_NAME }.js`,
    debug:         true,
    minify:        false,
    env:           ENV.LOCAL,
    vars:          {
        ...testGlobals,
        __PROTOCOL__:        PROTOCOL,
        __HOST__:            `${ HOSTNAME }:${ PORT }`,
        __SDK_HOST__:        `${ HOSTNAME }:${ PORT }`,
        __PORT__:            PORT,
        __PATH__:            `/${ FILE_NAME }.js`,
        __PAYPAL_DOMAIN__:   'https://localhost.paypal.com:9001',
        __PAYPAL_CHECKOUT__: {
            ...testGlobals.__PAYPAL_CHECKOUT__,
            __URI__:                {
                __CHECKOUT__:   `/demo/dev/checkout.htm`,
                __BUTTONS__:    `/demo/dev/button.htm`,
                __MENU__:       `/demo/dev/menu.htm`,
                __CARD_FIELD__: `/demo/dev/cardfield.htm`
            }
        }
    }
});

const WEBPACK_CONFIG_BUTTON_RENDER : WebpackConfig = getWebpackConfig({
    context:       __dirname,
    entry:         './src/ui/buttons',
    filename:      'button.js',
    modulename:    'button',
    debug:         true,
    minify:        false,
    web:           false,
    libraryTarget: 'global'
});

const WEBPACK_CONFIG_JSX_PRAGMATIC : WebpackConfig = getWebpackConfig({
    context:       __dirname,
    entry:         '@krakenjs/jsx-pragmatic',
    filename:      'jsx-pragmatic.js',
    modulename:    'jsx',
    debug:         true,
    minify:        false,
    libraryTarget: 'global'
});

const WEBPACK_CONFIG_SDK_CONSTANTS : WebpackConfig = getWebpackConfig({
    context:       __dirname,
    entry:         '@paypal/sdk-constants',
    filename:      'sdk-constants.js',
    modulename:    'constants',
    debug:         true,
    minify:        false,
    libraryTarget: 'global'
});

export default [
    WEBPACK_CONFIG_DEV,
    WEBPACK_CONFIG_BUTTON_RENDER,
    WEBPACK_CONFIG_JSX_PRAGMATIC,
    WEBPACK_CONFIG_SDK_CONSTANTS
];
