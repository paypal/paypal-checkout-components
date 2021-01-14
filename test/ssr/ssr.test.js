/* @flow */
/* eslint no-restricted-globals: 0, promise/no-native: 0,  no-process-env: 0, no-unused-vars: 0*/

import { getWebpackConfig } from 'grumbler-scripts/config/webpack.config';
import { html, ElementNode } from 'jsx-pragmatic';

import { openPage } from '../screenshot/lib/browser';
import { webpackCompile, webpackCompileToString } from '../screenshot/lib/compile';
import { fundingEligibility, testGlobals } from '../globals';
// import baseConfig from '../../webpack.config.dev';
import globals from '../../globals';

const HEADLESS = (process.env.HEADLESS !== '0');
const DEVTOOLS = (process.env.DEVTOOLS === '1');
jest.setTimeout(120000);

const cache = {};

// const setupBrowserPage = (async () => {
//     const { browser, page, open } = await openPage(await webpackCompile(getWebpackConfig({
//         entry:         './test/paypal.js',
//         libraryTarget: 'window',
//         test:          true,
//         web:           false,
//         vars:          { ...globals, ...testGlobals }
//     })), { headless: HEADLESS, devtools: DEVTOOLS });

//     // for (const filename of await fs.readdir(IMAGE_DIR)) {
//     //     if (filename.endsWith('-old.png')) {
//     //         await fs.unlink(`${ IMAGE_DIR }/${ filename }`);
//     //     }
//     // }

//     return { browser, page, open };
// })();

// beforeAll(async () => {
//     await setupBrowserPage;
// });

// afterAll(async () => {
//     const { browser } = await setupBrowserPage;
//     await browser.close();
// });

async function getButtonScript() : Promise<{| Buttons : (Object) => typeof ElementNode, DEFAULT_PROPS : Object |}> {
    // const {
    //     __SDK_HOST__,
    //     __PATH__
    // } = testGlobals;

    const config = {
        entry:         './src/ui/buttons',
        libraryTarget: 'commonjs',
        web:           false,
        vars:          { ...globals, ...testGlobals }
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
    // const { page } = await setupBrowserPage;

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
