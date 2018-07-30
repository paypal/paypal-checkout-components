/* @flow */
/* eslint no-restricted-globals: 0, promise/no-native: 0 */

import { getWebpackConfig } from 'grumbler-scripts/config/webpack.config';

import { webpackCompileToString } from '../screenshot/lib/compile';
import globals from '../../globals';

jest.setTimeout(120000);

let cache = {};

async function getButtonScript(vars = {}) : Promise<{ componentTemplate : (Object) => string }> {

    let config = {
        entry:         './src/button/template/componentTemplate.jsx',
        libraryTarget: 'commonjs',
        
        vars: {
            ...globals,
            ...vars,
            __PAYPAL_CHECKOUT__: {
                ...globals.__PAYPAL_CHECKOUT__,
                __TREE_SHAKE__: false
            }
        }
    };

    let cacheKey = JSON.stringify(config);
    if (cache[cacheKey]) {
        return cache[cacheKey];
    }

    let script = await webpackCompileToString(getWebpackConfig(config));

    let exports : Object = {};
    eval(script); // eslint-disable-line no-eval,security/detect-eval-with-expression

    if (typeof exports.componentTemplate !== 'function') {
        throw new TypeError(`Expected componentTemplate to be a function`);
    }

    cache[cacheKey] = exports;

    return exports;
}

test(`Button should render with ssr, with minimal options`, async () => {

    let locale = 'en_US';

    let style = {};

    let { componentTemplate } = await getButtonScript();

    let html = componentTemplate({
        props: { locale, style }
    });

    if (!html || typeof html !== 'string') {
        throw new Error(`Expected html to be a non-empty string`);
    }
});

test(`Button should render with ssr, with all options`, async () => {

    let env = 'production';

    let locale = 'fr_FR';

    let style = {
        color:  'blue',
        shape:  'pill',
        label:  'pay',
        layout: 'horizontal',

        height:     45,
        
        tagline:      false
    };

    let { componentTemplate } = await getButtonScript();

    let html = componentTemplate({
        props: { env, locale, style }
    });

    if (!html || typeof html !== 'string') {
        throw new Error(`Expected html to be a non-empty string`);
    }
});

test(`Button should fail to render with ssr, with invalid style option`, async () => {

    let locale = 'en_US';

    let style = {
        color: 'vermillion'
    };

    let { componentTemplate } = await getButtonScript();

    let expectedErr;

    try {
        componentTemplate({
            props: { locale, style }
        });
    } catch (err) {
        expectedErr = err;
    }

    if (!expectedErr) {
        throw new Error(`Expected button render to error out`);
    }
});

test(`Button should fail to render with ssr, with invalid locale`, async () => {

    let locale = 'en_XX';

    let style = {};

    let { componentTemplate } = await getButtonScript();

    let expectedErr;

    try {
        componentTemplate({
            props: { locale, style }
        });
    } catch (err) {
        expectedErr = err;
    }

    if (!expectedErr) {
        throw new Error(`Expected button render to error out`);
    }
});
