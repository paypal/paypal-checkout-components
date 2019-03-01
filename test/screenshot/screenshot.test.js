/* @flow */
/* eslint no-restricted-globals: 0 */
/* eslint no-console: 0 */
/* eslint no-process-exit: 0 */
/* eslint unicorn/no-process-exit: 0 */

import fs from 'fs-extra';
import { getWebpackConfig } from 'grumbler-scripts/config/webpack.config';

import { testGlobals } from '../globals';
import globals from '../../globals';

import { webpackCompile } from './lib/compile';
import { openPage, takeScreenshot } from './lib/browser';
import { dotifyToString } from './lib/util';
import { diffPNG, readPNG, uploadToImgur } from './lib/image';
import { buttonConfigs } from './config';

const IMAGE_DIR = `${ __dirname }/images`;

const DIFF_THRESHOLD = 50;

const USER_AGENTS = {
    iphone6: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
};

const HEADLESS = true;

jest.setTimeout(120000);

const setupBrowserPage = (async () => {
    const { browser, page, open } = await openPage(await webpackCompile(getWebpackConfig({
        entry:         './test/paypal.js',
        libraryTarget: 'window',
        test:          true,
        vars:          { ...globals, ...testGlobals }
    })), { headless: HEADLESS });

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
    const filename = config.filename || dotifyToString(config) || 'base';

    const testPromise = (async () => {
        const { page } = await setupBrowserPage;

        const filepath = `${ IMAGE_DIR }/${ filename }.png`;
        const diffpath = `${ IMAGE_DIR }/${ filename }-old.png`;

        const { x, y, width, height } = await page.evaluate(async (options, userAgents) => {

            // $FlowFixMe
            document.body.innerHTML = '';

            const container = window.document.createElement('div');
            window.document.body.appendChild(container);
            

            const oldFundingEligibility = window.__TEST_FUNDING_ELIGIBILITY__;
            const oldRememberedFunding = window.__TEST_REMEMBERED_FUNDING__;

            if (options.fundingEligibility) {
                window.__TEST_FUNDING_ELIGIBILITY__ = options.fundingEligibility;
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
                window.navigator.mockUserAgent = userAgents[options.userAgent];
            }

            const renderPromise = window.paypal.Buttons(options.button).render(container);

            await new Promise(resolve => setTimeout(resolve, 100));

            const frame = container.querySelector('iframe');

            if (!frame) {
                await renderPromise.timeout(500);
            }

            const rect = frame.getBoundingClientRect();

            delete window.navigator.mockUserAgent;
            window.__TEST_FUNDING_ELIGIBILITY__ = oldFundingEligibility;
            window.__TEST_REMEMBERED_FUNDING__ = oldRememberedFunding;

            return {
                x:      rect.left,
                y:      rect.top,
                width:  rect.width,
                height: rect.height
            };

        }, config, USER_AGENTS);

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
            const delta = await diffPNG(screenshot, existing);

            if (delta > DIFF_THRESHOLD) {
                await existing.write(diffpath);
                await screenshot.write(filepath);

                let imgurUrl = '';

                // eslint-disable-next-line no-process-env
                if (process.env.TRAVIS) {
                    imgurUrl = await uploadToImgur(filepath);
                }

                throw new Error(`Button style changed with delta of ${ delta } for configuration:\n\n${ JSON.stringify(config, null, 4) }\n\nSee ${ diffpath } or ${ imgurUrl || '' }`);
            }

        } else {
            await screenshot.write(filepath);
        }
            
    });

    test(`Render button with ${ filename }`, async () => {
        console.log(`Render button with ${ filename }`);
        await testPromise();
    });
}
