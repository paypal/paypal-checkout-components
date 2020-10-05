/* @flow */
/* eslint import/no-nodejs-modules: off, import/no-default-export: off */

import type { WebpackConfig } from 'grumbler-scripts/config/types';
import { getWebpackConfig } from 'grumbler-scripts/config/webpack.config';

import { globals } from './globals';

const MODULE_NAME = 'spb';

type SmartWebpackConfig = {|
    env? : string,
    entry : string,
    filename : string,
    minify? : boolean,
    debug? : boolean,
    vars? : { [string] : mixed },
    libraryTarget? : string
|};

function getSmartWebpackConfig({ entry, env, filename, minify = true, debug = false, libraryTarget = 'window' } : SmartWebpackConfig) : Object {
    return getWebpackConfig({
        env,
        entry:         `${ __dirname }/${ entry }`,
        modulename:    MODULE_NAME,
        filename,
        minify,
        debug,
        libraryTarget,
        vars:          globals,
        sourcemaps:    false
    });
}

export const WEBPACK_CONFIG_BUTTONS : WebpackConfig = getSmartWebpackConfig({
    entry:         'src/button',
    filename:      'smart-payment-buttons',
    minify:   false,
    debug:    true,
    vars:     globals
});

export const WEBPACK_CONFIG_BUTTONS_MIN : WebpackConfig = getSmartWebpackConfig({
    entry:    'src/button',
    filename: 'smart-payment-buttons',
    minify:   true,
    vars:     globals
});

export const WEBPACK_CONFIG_BUTTONS_DEBUG : WebpackConfig = getSmartWebpackConfig({
    entry:    'src/button',
    filename: 'smart-payment-buttons',
    debug:    true,
    minify:   false,
    vars:     globals
});

export const WEBPACK_CONFIG_BUTTONS_LOCAL_DEBUG : WebpackConfig = getSmartWebpackConfig({
    env:           'local',
    entry:         'src/button',
    filename:      'smart-payment-buttons',
    debug:         true,
    minify:        false,
    vars:          globals,
    libraryTarget: 'umd'
});

export const WEBPACK_CONFIG_MENU : WebpackConfig = getSmartWebpackConfig({
    entry:    'src/menu',
    filename: 'smart-menu',
    minify:   false,
    vars:     globals
});

export const WEBPACK_CONFIG_MENU_MIN : WebpackConfig = getSmartWebpackConfig({
    entry:    'src/menu',
    filename: 'smart-menu',
    minify:   true,
    vars:     globals
});

export const WEBPACK_CONFIG_MENU_DEBUG : WebpackConfig = getSmartWebpackConfig({
    entry:    'src/menu',
    filename: 'smart-menu',
    debug:    true,
    minify:   false,
    vars:     globals
});

export const WEBPACK_CONFIG_TEST : WebpackConfig = getWebpackConfig({
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
