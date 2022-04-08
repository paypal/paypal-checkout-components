/* @flow */
/* eslint no-restricted-globals: off, no-console: off, no-process-exit: off, no-process-env: off, unicorn/no-process-exit: off */

import fs from 'fs-extra';
import { getWebpackConfig } from '@krakenjs/grumbler-scripts/config/webpack.config';

import { getTestGlobals } from '../globals';
import globals from '../../globals';
import { testContent } from '../content';

import { webpackCompile } from './lib/compile';
import { openPage, takeScreenshot } from './lib/browser';
import { sha256, dotifyToString } from './lib/util';
import { diffPNG, readPNG, uploadToImgur } from './lib/image';
import { buttonConfigs } from './config';

const IMAGE_DIR = `${ __dirname }/images`;

const DEFAULT_DIFF_THRESHOLD = 500;

const HEADLESS = (process.env.HEADLESS !== '0');
const DEVTOOLS = (process.env.DEVTOOLS === '1');

jest.setTimeout(120000);

const setupBrowserPage = (async () => {
    const { browser, page, open } = await openPage(await webpackCompile(getWebpackConfig({
        entry:         './test/paypal.js',
        libraryTarget: 'window',
        test:          true,
        web:           false,
        vars:          { ...getTestGlobals(globals) }
    })), { headless: HEADLESS, devtools: DEVTOOLS });

    for (const filename of await fs.readdir(IMAGE_DIR)) {
        if (filename.endsWith('-old.png')) {
            await fs.unlink(`${ IMAGE_DIR }/${ filename }`);
        }
    }

    return { browser, page, open };
})();

beforeAll(async () => {
    await setupBrowserPage;
});

afterAll(async () => {
    const { browser } = await setupBrowserPage;
    await browser.close();
});

for (const config of buttonConfigs) {
    const { only, diffThreshold = DEFAULT_DIFF_THRESHOLD, ...buttonConfig } = config;
    const description = dotifyToString(buttonConfig) || 'base';
    const filename = sha256(JSON.stringify(buttonConfig));

    const testPromise = (async () => {
        const { page } = await setupBrowserPage;

        const filepath = `${ IMAGE_DIR }/${ filename }.png`;
        const diffpath = `${ IMAGE_DIR }/${ filename }-old.png`;

        buttonConfig.button = buttonConfig.button || {};
        buttonConfig.button.content = testContent;

        const { x, y, width, height } = await page.evaluate(async (options) => {

            // $FlowFixMe
            document.body.innerHTML = '';

            const container = window.document.createElement('div');
            window.document.body.appendChild(container);

            if (options.fundingEligibility) {
                window.__TEST_FUNDING_ELIGIBILITY__ = options.fundingEligibility;
            }

            if (options.wallet) {
                window.__TEST_WALLET__ = options.wallet;
            }

            if (options.rememberedFunding) {
                window.__TEST_REMEMBERED_FUNDING__ = options.rememberedFunding;
            }

            if (options.container) {
                container.style.width = `${ options.container.width }px`;
            } else {
                container.style.width = '200px';
            }

            if (options.userAgent) {
                const screenHeight = 667;

                window.navigator.mockUserAgent = options.userAgent;
                window.outerHeight = screenHeight;
                window.innerHeight = 553;
                window.screen = {
                    screenHeight
                };
            }

            const renderPromise = window.paypal.Buttons(options.button || {}).render(container);

            await new Promise(resolve => setTimeout(resolve, 300));

            const frame = container.querySelector('iframe');

            if (!frame) {
                await renderPromise.timeout(500);
            }

            const rect = frame.getBoundingClientRect();

            delete window.navigator.mockUserAgent;
            delete window.__TEST_FUNDING_ELIGIBILITY__;
            delete window.__TEST_REMEMBERED_FUNDING__;

            return {
                x:      rect.left,
                y:      rect.top,
                width:  rect.width,
                height: rect.height
            };

        }, buttonConfig);

        if (width === 0) {
            throw new Error(`Button width is 0`);
        }

        if (height === 0) {
            throw new Error(`Button height is 0`);
        }

        const existingExists = await fs.exists(filepath);

        const [ screenshot, existing ] = await Promise.all([
            takeScreenshot(page, { x, y, width, height }),
            existingExists ? readPNG(filepath) : null
        ]);

        if (existing) {
            let delta;

            try {
                delta = await diffPNG(screenshot, existing);
            } catch (err) {
                await existing.write(diffpath);
                await screenshot.write(filepath);
                throw err;
            }

            if (delta > diffThreshold) {
                await existing.write(diffpath);
                await screenshot.write(filepath);

                let imgurUrl = '';

                if (process.env.TRAVIS) {
                    imgurUrl = await uploadToImgur(filepath);
                }

                throw new Error(`Button style changed with delta of ${ delta } for configuration:\n\n${ JSON.stringify(config, null, 4) }\n\nSee ${ diffpath } or ${ imgurUrl || '' }`);
            }

        } else {
            await screenshot.write(filepath);
        }

    });

    (only ? test.only : test)(`Render button with ${ description }`, async () => {
        console.log(`Render button with ${ description }`);
        await testPromise();
    });
}
