/* @flow */
/* eslint no-restricted-globals: 0, promise/no-native: 0 */

import { getWebpackConfig } from '@krakenjs/grumbler-scripts/config/webpack.config';
import { html, ElementNode } from '@krakenjs/jsx-pragmatic';
import { ERROR_CODE } from '@paypal/sdk-constants';

import { webpackCompileToString } from '../screenshot/lib/compile';
import { fundingEligibility } from '../globals';

jest.setTimeout(120000);

const cache = {};

async function getButtonScript() : Promise<{| Buttons : (Object) => typeof ElementNode, DEFAULT_PROPS : Object |}> {

    const config = {
        entry:         './src/ui/buttons',
        libraryTarget: 'commonjs',
        web:           false
    };

    const cacheKey = JSON.stringify(config);
    if (cache[cacheKey]) {
        return cache[cacheKey];
    }

    const script = await webpackCompileToString(getWebpackConfig(config));

    const exports : Object = {};
    eval(script); // eslint-disable-line no-eval,security/detect-eval-with-expression

    if (typeof exports.Buttons !== 'function') {
        throw new TypeError(`Expected componentTemplate to be a function`);
    }

    // $FlowFixMe
    cache[cacheKey] = exports; // eslint-disable-line require-atomic-updates

    // $FlowFixMe
    return exports;
}

test(`Button should render with ssr, with minimal options`, async () => {

    const { Buttons } = await getButtonScript();

    const buttonHTML = Buttons({
        locale:          { country: 'US', lang: 'en' },
        platform:        'desktop',
        sessionID:       'xyz',
        buttonSessionID: 'abc',
        fundingEligibility
    }).render(html());

    if (!buttonHTML || typeof buttonHTML !== 'string') {
        throw new Error(`Expected html to be a non-empty string`);
    }
});

test(`Button should render with ssr, with zh_Hant locale option`, async () => {

    const { Buttons } = await getButtonScript();

    const buttonHTML = Buttons({
        locale:          { country: 'HK', lang: 'zh_Hant' },
        platform:        'desktop',
        sessionID:       'xyz',
        buttonSessionID: 'abc',
        fundingEligibility
    }).render(html());

    if (!buttonHTML || typeof buttonHTML !== 'string') {
        throw new Error(`Expected html to be a non-empty string`);
    }
});

test(`Button should render with ssr, with en_HK locale option`, async () => {

    const { Buttons } = await getButtonScript();

    const buttonHTML = Buttons({
        locale:          { country: 'HK', lang: 'en' },
        platform:        'desktop',
        sessionID:       'xyz',
        buttonSessionID: 'abc',
        fundingEligibility
    }).render(html());

    if (!buttonHTML || typeof buttonHTML !== 'string') {
        throw new Error(`Expected html to be a non-empty string`);
    }
});

test(`Button should fail to render with ssr, with invalid style option`, async () => {

    const { Buttons } = await getButtonScript();

    let expectedErr;

    try {
        Buttons({
            style:           { color: 'red' },
            locale:          { country: 'US', lang: 'en' },
            platform:        'desktop',
            sessionID:       'xyz',
            buttonSessionID: 'abc',
            fundingEligibility
        }).render(html());
    } catch (err) {
        expectedErr = err;
    }

    if (!expectedErr) {
        throw new Error(`Expected button render to error out`);
    }
});

test(`Button should fail to render with ssr, with no fundingSources available`, async () => {

    const { Buttons } = await getButtonScript();

    let expectedErr;

    try {
        Buttons({
            locale:             { country: 'US', lang: 'en' },
            platform:           'desktop',
            sessionID:          'xyz',
            buttonSessionID:    'abc',
            fundingEligibility: {}
        }).render(html());
    } catch (err) {
        expectedErr = err;
    }

    if (!expectedErr) {
        throw new Error(`Expected button render to error out`);
    }
    if (expectedErr.code !== ERROR_CODE.VALIDATION_ERROR) {
        throw new Error(`Expected button render to error out with err.code = ${ ERROR_CODE.VALIDATION_ERROR }`);
    }
});

test(`Button should fail to render with ssr, with invalid locale`, async () => {

    const { Buttons } = await getButtonScript();

    let expectedErr;

    try {
        Buttons({
            locale:          { country: 'FR', lang: 'de' },
            platform:        'desktop',
            sessionID:       'xyz',
            buttonSessionID: 'abc',
            fundingEligibility
        }).render(html());
    } catch (err) {
        expectedErr = err;
    }

    if (!expectedErr) {
        throw new Error(`Expected button render to error out`);
    }
});


test(`Button renderer should export DEFAULT_PROPS`, async () => {

    const { DEFAULT_PROPS } = await getButtonScript();

    if (!DEFAULT_PROPS) {
        throw new Error(`Expected DEFAULT_PROPS to be exported`);
    }

    if (!DEFAULT_PROPS.hasOwnProperty('COMMIT')) {
        throw new Error(`Expected DEFAULT_PROPS.COMMIT to be exported`);
    }

    if (!DEFAULT_PROPS.hasOwnProperty('VAULT')) {
        throw new Error(`Expected DEFAULT_PROPS.VAULT to be exported`);
    }

    if (!DEFAULT_PROPS.hasOwnProperty('INTENT')) {
        throw new Error(`Expected DEFAULT_PROPS.INTENT to be exported`);
    }

    if (!DEFAULT_PROPS.hasOwnProperty('ENV')) {
        throw new Error(`Expected DEFAULT_PROPS.ENV to be exported`);
    }

    if (!DEFAULT_PROPS.hasOwnProperty('PLATFORM')) {
        throw new Error(`Expected DEFAULT_PROPS.PLATFORM to be exported`);
    }
});

test(`Design should be applied when there is valid personalization`, async () => {

    const { Buttons } = await getButtonScript();

    const personalization = {
        buttonDesign: {
            id:       'run-divide-logo-animation',
            text:     'Safe and easy way to pay',
            tracking: {
                click:      '',
                impression: ''
            }
        }
    };

    const buttonHTML = Buttons({
        locale:          { country: 'US', lang: 'en' },
        platform:        'desktop',
        sessionID:       'xyz',
        buttonSessionID: 'abc',
        personalization,
        fundingEligibility
    }).render(html());

    if (!buttonHTML || typeof buttonHTML !== 'string') {
        throw new Error(`Expected html to be a non-empty string`);
    }

    const designContainer = buttonHTML.match('data-design-experiment');
    const designScript = buttonHTML.match('divide-logo-animation-left-side');

    if (!designContainer || !designScript) {
        throw new Error('Expected animation to applied in script and container');
    }


});

test(`Design for adding label text next to logo should be applied when there is valid personalization`, async () => {
    const { Buttons } = await getButtonScript();

    const personalization = {
        buttonDesign: {
            id:       'run-add-label-text-next-to-logo-design',
            text:     'Safe and easy way to pay',
            tracking: {
                click:      '',
                impression: ''
            }
        }
    };

    const buttonHTML = Buttons({
        locale:          { country: 'US', lang: 'en' },
        platform:        'desktop',
        sessionID:       'xyz',
        buttonSessionID: 'abc',
        personalization,
        fundingEligibility
    }).render(html());

    if (!buttonHTML || typeof buttonHTML !== 'string') {
        throw new Error(`Expected html to be a non-empty string`);
    }
    const designContainer = buttonHTML.match('data-design-experiment');
    const designScript = buttonHTML.match('.personalized-design-container');

    if (!designContainer || !designScript) {
        throw new Error('Expected design to be applied in script and container');
    }
});

test(`Tag should be applied with no design for control`, async () => {

    const { Buttons } = await getButtonScript();

    const personalization = {
        buttonDesign: {
            id:       'large-button-design-control',
            text:     '',
            tracking: {
                click:      '',
                impression: ''
            }
        }
    };

    const buttonHTML = Buttons({
        locale:          { country: 'US', lang: 'en' },
        platform:        'desktop',
        sessionID:       'xyz',
        buttonSessionID: 'abc',
        personalization,
        fundingEligibility
    }).render(html());

    if (!buttonHTML || typeof buttonHTML !== 'string') {
        throw new Error(`Expected html to be a non-empty string`);
    }

    const designSignal = buttonHTML.match('data-design-experiment');
    const designScript = buttonHTML.match('.personalized-design-container');

    if (!designSignal || designScript) {
        throw new Error('Expected to find a data-design-experiment tag but no script');
    }


});

test(`Tag should be applied with no design for control`, async () => {

    const { Buttons } = await getButtonScript();

    const personalization = {
        buttonDesign: {
            id:       'not-a-real-design',
            text:     '',
            tracking: {
                click:      '',
                impression: ''
            }
        }
    };

    const buttonHTML = Buttons({
        locale:          { country: 'US', lang: 'en' },
        platform:        'desktop',
        sessionID:       'xyz',
        buttonSessionID: 'abc',
        personalization,
        fundingEligibility
    }).render(html());

    if (!buttonHTML || typeof buttonHTML !== 'string') {
        throw new Error(`Expected html to be a non-empty string`);
    }

    const designSignal = buttonHTML.match('data-design-experiment');
    const designScript = buttonHTML.match('.personalized-design-container');

    if (designSignal || designScript) {
        throw new Error('Expected not to find a data-design-experiment tag and no script');
    }


});

test(`Animation should not be applied when buttonAnimation is null`, async () => {

    const { Buttons } = await getButtonScript();

    const personalization = {
        buttonAnimation: null
    };

    const buttonHTML = Buttons({
        locale:          { country: 'US', lang: 'en' },
        platform:        'desktop',
        sessionID:       'xyz',
        buttonSessionID: 'abc',
        personalization,
        fundingEligibility
    }).render(html());

    if (!buttonHTML || typeof buttonHTML !== 'string') {
        throw new Error(`Expected html to be a non-empty string`);
    }

    const animationSignal = buttonHTML.match('data-design-experiment');

    if (animationSignal) {
        throw new Error('Expected design to be applied in script and container');
    }

});
