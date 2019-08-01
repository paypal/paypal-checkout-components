/* @flow */
/* eslint import/no-nodejs-modules: off, import/no-default-export: off */

import { getWebpackConfig } from 'grumbler-scripts/config/webpack.config';
import { ENV } from '@paypal/sdk-constants';

import { testGlobals } from './test/globals';
import globals from './globals';

const FILE_NAME = 'sdk';

const PROTOCOL = 'https';
const HOSTNAME = 'localhost.paypal.com';
const PORT = 9000;

const WEBPACK_CONFIG_DEV = getWebpackConfig({
    entry:         './paypal.dev.js',
    filename:      `${ FILE_NAME }.js`,
    debug:         true,
    minify:        false,
    env:           ENV.LOCAL,
    vars:          {
        ...globals,
        ...testGlobals,
        __PROTOCOL__:        PROTOCOL,
        __HOST__:            `${ HOSTNAME }:${ PORT }`,
        __SDK_HOST__:        `${ HOSTNAME }:${ PORT }`,
        __PORT__:            PORT,
        __PATH__:            `/${ FILE_NAME }.js`,
        __PAYPAL_CHECKOUT__: {
            ...testGlobals.__PAYPAL_CHECKOUT__,
            __URI__:                {
                __CHECKOUT__: `/demo/dev/checkout.htm`,
                __BUTTONS__:  `/demo/dev/button.htm`
            }
        },
        __paypal_checkout__: {
            ...testGlobals.__paypal_checkout__,

            serverConfig: {
                fundingEligibility: {
                    paypal: {
                        eligible: true
                    },
                    credit: {
                        eligible: true
                    },
                    venmo: {
                        eligible: true
                    },
                    card: {
                        eligible: true,
                        vendors:  {
                            visa: {
                                eligible: true
                            },
                            mastercard: {
                                eligible: true
                            },
                            amex: {
                                eligible: true
                            }
                        }
                    }
                }
            }
        }
    }
});

const WEBPACK_CONFIG_BUTTON_RENDER = getWebpackConfig({
    context:       __dirname,
    entry:         './src/ui/buttons',
    filename:      'button.js',
    modulename:    'button',
    debug:         true,
    minify:        false,
    web:           false,
    libraryTarget: 'global'
});

const WEBPACK_CONFIG_JSX_PRAGMATIC = getWebpackConfig({
    context:       __dirname,
    entry:         'jsx-pragmatic',
    filename:      'jsx-pragmatic.js',
    modulename:    'jsx',
    debug:         true,
    minify:        false,
    libraryTarget: 'global'
});

export default [
    WEBPACK_CONFIG_DEV,
    WEBPACK_CONFIG_BUTTON_RENDER,
    WEBPACK_CONFIG_JSX_PRAGMATIC
];
