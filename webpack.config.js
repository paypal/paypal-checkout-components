/* @flow */
/* eslint import/no-nodejs-modules: off, import/no-default-export: off */

import type { WebpackConfig } from 'grumbler-scripts/config/types';
import { getWebpackConfig } from 'grumbler-scripts/config/webpack.config';

import { globals } from './globals';

type SmartWebpackConfig = {|
    modulename : string,
    env? : string,
    entry : string,
    filename : string,
    minify? : boolean,
    debug? : boolean,
    vars? : { [string] : mixed },
    libraryTarget? : string
|};

function getSmartWebpackConfig({ entry, env, filename, minify = true, debug = false, libraryTarget = 'window', modulename } : SmartWebpackConfig) : Object {
    return getWebpackConfig({
        env,
        entry:         `${ __dirname }/${ entry }`,
        modulename,
        filename,
        minify,
        debug,
        libraryTarget,
        vars:          globals,
        sourcemaps:    false
    });
}

export const WEBPACK_CONFIG_BUTTONS : WebpackConfig = getSmartWebpackConfig({
    modulename: 'spb',
    entry:      'src/button',
    filename:   'smart-payment-buttons',
    minify:     false,
    debug:      true,
    vars:       globals
});

export const WEBPACK_CONFIG_BUTTONS_MIN : WebpackConfig = getSmartWebpackConfig({
    modulename: 'spb',
    entry:      'src/button',
    filename:   'smart-payment-buttons',
    minify:     true,
    vars:       globals
});

export const WEBPACK_CONFIG_BUTTONS_DEBUG : WebpackConfig = getSmartWebpackConfig({
    modulename: 'spb',
    entry:      'src/button',
    filename:   'smart-payment-buttons',
    debug:      true,
    minify:     false,
    vars:       globals
});

export const WEBPACK_CONFIG_BUTTONS_LOCAL_DEBUG : WebpackConfig = getSmartWebpackConfig({
    modulename:    'spb',
    env:           'local',
    entry:         'src/button',
    filename:      'smart-payment-buttons',
    debug:         true,
    minify:        false,
    vars:          globals,
    libraryTarget: 'umd'
});

export const WEBPACK_CONFIG_MENU : WebpackConfig = getSmartWebpackConfig({
    modulename: 'spb',
    entry:      'src/menu',
    filename:   'smart-menu',
    minify:     false,
    vars:       globals
});

export const WEBPACK_CONFIG_MENU_MIN : WebpackConfig = getSmartWebpackConfig({
    modulename: 'spb',
    entry:      'src/menu',
    filename:   'smart-menu',
    minify:     true,
    vars:       globals
});

export const WEBPACK_CONFIG_MENU_DEBUG : WebpackConfig = getSmartWebpackConfig({
    modulename: 'spb',
    entry:      'src/menu',
    filename:   'smart-menu',
    debug:      true,
    minify:     false,
    vars:       globals
});

export const WEBPACK_CONFIG_NATIVE_POPUP : WebpackConfig = getSmartWebpackConfig({
    modulename:    'spbNativePopup',
    entry:         'src/native/popup',
    filename:      'smart-native-popup',
    minify:        false,
    vars:          globals,
    libraryTarget: 'umd'
});

export const WEBPACK_CONFIG_NATIVE_POPUP_MIN : WebpackConfig = getSmartWebpackConfig({
    modulename:    'spbNativePopup',
    entry:         'src/native/popup',
    filename:      'smart-native-popup',
    minify:        true,
    vars:          globals,
    libraryTarget: 'umd'
});

export const WEBPACK_CONFIG_NATIVE_POPUP_DEBUG : WebpackConfig = getSmartWebpackConfig({
    modulename:    'spbNativePopup',
    entry:         'src/native/popup',
    filename:      'smart-native-popup',
    debug:         true,
    minify:        false,
    vars:          globals,
    libraryTarget: 'umd'
});

export const WEBPACK_CONFIG_NATIVE_FALLBACK : WebpackConfig = getSmartWebpackConfig({
    modulename:    'spbNativeFallback',
    entry:         'src/native/fallback',
    filename:      'smart-native-fallback',
    minify:        false,
    vars:          globals,
    libraryTarget: 'umd'
});

export const WEBPACK_CONFIG_NATIVE_FALLBACK_MIN : WebpackConfig = getSmartWebpackConfig({
    modulename:    'spbNativeFallback',
    entry:         'src/native/fallback',
    filename:      'smart-native-fallback',
    minify:        true,
    vars:          globals,
    libraryTarget: 'umd'
});

export const WEBPACK_CONFIG_NATIVE_FALLBACK_DEBUG : WebpackConfig = getSmartWebpackConfig({
    modulename:    'spbNativeFallback',
    entry:         'src/native/fallback',
    filename:      'smart-native-fallback',
    debug:         true,
    minify:        false,
    vars:          globals,
    libraryTarget: 'umd'
});

export const WEBPACK_CONFIG_TEST : WebpackConfig = getWebpackConfig({
    modulename: 'spb',
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
    WEBPACK_CONFIG_MENU_MIN,
    WEBPACK_CONFIG_NATIVE_POPUP,
    WEBPACK_CONFIG_NATIVE_POPUP_MIN,
    WEBPACK_CONFIG_NATIVE_FALLBACK,
    WEBPACK_CONFIG_NATIVE_FALLBACK_MIN
];
