/* @flow */
/* eslint import/no-nodejs-modules: off, import/no-default-export: off */

import { getWebpackConfig } from 'grumbler-scripts/config/webpack.config';

import { globals } from './globals';

const MODULE_NAME = 'spb';

type SmartWebpackConfig = {|
    entry : string,
    filename : string,
    minify? : boolean,
    debug? : boolean,
    vars? : { [string] : mixed }
|};

function getSmartWebpackConfig({ entry, filename, minify = true, debug = false } : SmartWebpackConfig) : Object {
    return getWebpackConfig({
        entry:         `${ __dirname }/${ entry }`,
        modulename:    MODULE_NAME,
        filename,
        minify,
        debug,
        libraryTarget: 'window',
        vars:          globals
    });
}

export const WEBPACK_CONFIG_BUTTONS = getSmartWebpackConfig({
    entry:         'src/button',
    filename:      'smart-payment-buttons',
    minify:   false,
    vars:     globals
});

export const WEBPACK_CONFIG_BUTTONS_MIN = getSmartWebpackConfig({
    entry:    'src/button',
    filename: 'smart-payment-buttons',
    minify:   true,
    vars:     globals
});

export const WEBPACK_CONFIG_BUTTONS_DEBUG = getSmartWebpackConfig({
    entry:    'src/button',
    filename: 'smart-payment-buttons',
    debug:    true,
    minify:   false,
    vars:     globals
});

export const WEBPACK_CONFIG_MENU = getSmartWebpackConfig({
    entry:    'src/menu',
    filename: 'smart-menu',
    minify:   false,
    vars:     globals
});

export const WEBPACK_CONFIG_MENU_MIN = getSmartWebpackConfig({
    entry:    'src/menu',
    filename: 'smart-menu',
    minify:   true,
    vars:     globals
});

export const WEBPACK_CONFIG_MENU_DEBUG = getSmartWebpackConfig({
    entry:    'src/menu',
    filename: 'smart-menu',
    debug:    true,
    minify:   false,
    vars:     globals
});

export const WEBPACK_CONFIG_TEST = getWebpackConfig({
    modulename: MODULE_NAME,
    test:       true,
    options:    {
        devtool: 'inline-source-map'
    },
    vars: {
        ...globals,
        __TEST__: true
    }
});

export default [
    WEBPACK_CONFIG_BUTTONS,
    WEBPACK_CONFIG_BUTTONS_MIN,
    WEBPACK_CONFIG_MENU,
    WEBPACK_CONFIG_MENU_MIN
];
