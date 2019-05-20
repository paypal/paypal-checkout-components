/* @flow */
/* eslint import/no-default-export: off */

import { getWebpackConfig } from 'grumbler-scripts/config/webpack.config';

import globals from './globals';

const FILE_NAME = 'checkout';

export const BASE = getWebpackConfig({
    entry:         './src/load.js',
    filename:      `${ FILE_NAME }.js`,
    minify:        false,
    libraryTarget: null,
    vars:          globals
});

export const MAJOR = getWebpackConfig({
    entry:         './src/load.js',
    filename:      `${ FILE_NAME }.v${ globals.__PAYPAL_CHECKOUT__.__MAJOR_VERSION__ }.js`,
    minify:        false,
    libraryTarget: null,
    vars:          {
        ...globals,
        __POST_ROBOT__: {
            ...globals.__POST_ROBOT__,
            __IE_POPUP_SUPPORT__: true
        },
        __PAYPAL_CHECKOUT__: {
            ...globals.__PAYPAL_CHECKOUT__,
            __LEGACY_SUPPORT__: false
        }
    }
});

export const MINOR = getWebpackConfig({
    entry:         './src/load.js',
    filename:      `${ FILE_NAME }.${ globals.__PAYPAL_CHECKOUT__.__MINOR_VERSION__ }.js`,
    minify:        false,
    libraryTarget: null,
    vars:          {
        ...globals,
        __PAYPAL_CHECKOUT__: {
            ...globals.__PAYPAL_CHECKOUT__,
            __MAJOR__: false
        }
    }
});

export const MAJOR_MIN = getWebpackConfig({
    entry:         './src/load.js',
    filename:      `${ FILE_NAME }.min.js`,
    minify:        true,
    libraryTarget: null,
    vars:          globals
});

export const MINOR_MIN = getWebpackConfig({
    entry:         './src/load.js',
    filename:      `${ FILE_NAME }.${ globals.__PAYPAL_CHECKOUT__.__MINOR_VERSION__ }.min.js`,
    minify:        true,
    libraryTarget: null,
    vars:          {
        ...globals,
        __PAYPAL_CHECKOUT__: {
            ...globals.__PAYPAL_CHECKOUT__,
            __MAJOR__: false
        }
    }
});

export const LIB = getWebpackConfig({
    entry:         './src/index.js',
    filename:      `${ FILE_NAME }.lib.js`,
    libraryTarget:   `umd`,
    modulename:    `paypal`,
    minify:        false,
    vars:          {
        ...globals,
        __PAYPAL_CHECKOUT__: {
            ...globals.__PAYPAL_CHECKOUT__,
            __MAJOR__: false
        }
    }
});

export const BUTTON_RENDER = getWebpackConfig({
    entry:         './src/button/template/componentTemplate.jsx',
    filename:      `${ FILE_NAME }.button.render.js`,
    libraryTarget: `commonjs`,
    minify:        false,
    vars:          globals
});

export const CHILD_LOADER = getWebpackConfig({
    entry:         './src/loader/index.js',
    filename:      `checkout.child.loader.js`,
    minify:        false,
    libraryTarget: null,
    vars:          globals
});

export const CHILD_LOADER_MIN = getWebpackConfig({
    entry:         './src/loader/index.js',
    filename:      `checkout.child.loader.min.js`,
    minify:        true,
    libraryTarget: null,
    vars:          globals
});

export const BUTTON = getWebpackConfig({
    entry:         './src/load.js',
    filename:      `${ FILE_NAME }.button.v${ globals.__PAYPAL_CHECKOUT__.__MAJOR_VERSION__ }.js`,
    chunkname:     `${ FILE_NAME }.button.v${ globals.__PAYPAL_CHECKOUT__.__MAJOR_VERSION__ }.chunk.js`,
    minify:        false,
    libraryTarget: null,
    vars:          {
        ...globals,
        __PAYPAL_CHECKOUT__: {
            ...globals.__PAYPAL_CHECKOUT__,
            __LEGACY_SUPPORT__: false
        }
    }
});

export const TEST = getWebpackConfig({
    test:          true,
    minify:        false,
    libraryTarget: null,
    vars:          {
        ...globals,
        __PAYPAL_CHECKOUT__: {
            ...globals.__PAYPAL_CHECKOUT__,
            __MAJOR__:         false,
            __MAJOR_VERSION__: 'test',
            __MINOR_VERSION__: 'test_minor'
        }
    }
});

export default [
    BASE,
    MAJOR, MINOR,
    MAJOR_MIN, MINOR_MIN,
    LIB,
    BUTTON_RENDER,
    CHILD_LOADER, CHILD_LOADER_MIN
];
