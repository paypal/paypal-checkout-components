/* @flow */

import { webpackCompileToString } from '../screenshot/lib/compile';
import { BUTTON_RENDER } from '../../webpack.config';

jest.setTimeout(120000);

const buttonExports = {};

beforeAll(async () => {
    const script = await webpackCompileToString(BUTTON_RENDER);
    
    const exports = buttonExports; // eslint-disable-line no-unused-vars
    eval(script); // eslint-disable-line no-eval,security/detect-eval-with-expression

    if (typeof buttonExports.componentTemplate !== 'function') {
        throw new TypeError(`Expected componentTemplate to be a function`);
    }
});

test(`Button should render with ssr, with minimal options`, () => {

    const locale = 'en_US';

    const style = {};

    const html = buttonExports.componentTemplate({
        props: { locale, style }
    });

    if (!html || typeof html !== 'string') {
        throw new Error(`Expected html to be a non-empty string`);
    }
});

test(`Button should render with ssr, with all options`, () => {

    const env = 'production';

    const locale = 'fr_FR';

    const style = {
        size:   'medium',
        color:  'blue',
        shape:  'pill',
        label:  'pay',
        layout: 'horizontal',

        maxbuttons: 2,
        height:     45,

        fundingicons: false,
        branding:     true,
        tagline:      false
    };

    const html = buttonExports.componentTemplate({
        props: { env, locale, style }
    });

    if (!html || typeof html !== 'string') {
        throw new Error(`Expected html to be a non-empty string`);
    }
});

test(`Button should fail to render with ssr, with invalid style option`, () => {

    const locale = 'en_US';

    const style = {
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

    const locale = 'en_XX';

    const style = {};

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
