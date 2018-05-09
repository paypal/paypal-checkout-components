/* @flow */

import { getWebpackConfig } from 'grumbler-scripts/config/webpack.config';

import { webpackCompileToString } from '../screenshot/lib/compile';
import globals from '../../globals';

jest.setTimeout(120000);

let buttonExports = {};

beforeAll(async () => {
    let script = await webpackCompileToString(getWebpackConfig({
        entry:         './src/button/template/componentTemplate.jsx',
        libraryTarget: 'commonjs',
        vars:          globals
    }));

    let exports = buttonExports; // eslint-disable-line no-unused-vars
    eval(script); // eslint-disable-line no-eval,security/detect-eval-with-expression

    if (typeof buttonExports.componentTemplate !== 'function') {
        throw new TypeError(`Expected componentTemplate to be a function`);
    }
});

test(`Button should render with ssr, with minimal options`, () => {

    let locale = 'en_US';

    let style = {};

    let html = buttonExports.componentTemplate({
        props: { locale, style }
    });

    if (!html || typeof html !== 'string') {
        throw new Error(`Expected html to be a non-empty string`);
    }
});

test(`Button should render with ssr, with all options`, () => {

    let env = 'production';

    let locale = 'fr_FR';

    let style = {
        color:  'blue',
        shape:  'pill',
        label:  'pay',
        layout: 'horizontal',

        maxbuttons: 2,
        height:     45,
        
        tagline:      false
    };

    let html = buttonExports.componentTemplate({
        props: { env, locale, style }
    });

    if (!html || typeof html !== 'string') {
        throw new Error(`Expected html to be a non-empty string`);
    }
});

test(`Button should fail to render with ssr, with invalid style option`, () => {

    let locale = 'en_US';

    let style = {
        color: 'vermillion'
    };

    let expectedErr;

    try {
        buttonExports.componentTemplate({
            props: { locale, style }
        });
    } catch (err) {
        expectedErr = err;
    }

    if (!expectedErr) {
        throw new Error(`Expected button render to error out`);
    }
});

test(`Button should fail to render with ssr, with invalid locale`, () => {

    let locale = 'en_XX';

    let style = {};

    let expectedErr;

    try {
        buttonExports.componentTemplate({
            props: { locale, style }
        });
    } catch (err) {
        expectedErr = err;
    }

    if (!expectedErr) {
        throw new Error(`Expected button render to error out`);
    }
});
