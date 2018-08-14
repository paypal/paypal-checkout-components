/* @flow */
/* eslint no-restricted-globals: 0, promise/no-native: 0 */

import { getWebpackConfig } from 'grumbler-scripts/config/webpack.config';

import { webpackCompileToString } from '../screenshot/lib/compile';
import { testGlobals } from '../globals';

let fundingEligibility = testGlobals.__paypal_checkout__.serverConfig.fundingEligibility;

jest.setTimeout(120000);

let cache = {};

async function getButtonScript() : Promise<{ Buttons : (Object) => string }> {

    let config = {
        entry:         './src/button/template/componentTemplate.jsx',
        libraryTarget: 'commonjs',
        vars:          testGlobals
    };

    let cacheKey = JSON.stringify(config);
    if (cache[cacheKey]) {
        return cache[cacheKey];
    }

    let script = await webpackCompileToString(getWebpackConfig(config));

    let exports : Object = {};
    eval(script); // eslint-disable-line no-eval,security/detect-eval-with-expression

    if (typeof exports.Buttons !== 'function') {
        throw new TypeError(`Expected componentTemplate to be a function`);
    }

    cache[cacheKey] = exports;

    return exports;
}

test(`Button should render with ssr, with minimal options`, async () => {

    let { Buttons } = await getButtonScript();

    let html = Buttons({
        locale:          { country: 'US', lang: 'en' },
        platform:        'desktop',
        sessionID:       'xyz',
        buttonSessionID: 'abc',
        fundingEligibility
    }).toString();

    if (!html || typeof html !== 'string') {
        throw new Error(`Expected html to be a non-empty string`);
    }
});

test(`Button should fail to render with ssr, with invalid style option`, async () => {

    let { Buttons } = await getButtonScript();

    let expectedErr;

    try {
        Buttons({
            style:           { color: 'red' },
            locale:          { country: 'US', lang: 'en' },
            platform:        'desktop',
            sessionID:       'xyz',
            buttonSessionID: 'abc',
            fundingEligibility
        }).toString();
    } catch (err) {
        expectedErr = err;
    }

    if (!expectedErr) {
        throw new Error(`Expected button render to error out`);
    }
});

test(`Button should fail to render with ssr, with invalid locale`, async () => {

    let { Buttons } = await getButtonScript();

    let expectedErr;

    try {
        Buttons({
            locale:          { country: 'FR', lang: 'de' },
            platform:        'desktop',
            sessionID:       'xyz',
            buttonSessionID: 'abc',
            fundingEligibility
        }).toString();
    } catch (err) {
        expectedErr = err;
    }

    if (!expectedErr) {
        throw new Error(`Expected button render to error out`);
    }
});
