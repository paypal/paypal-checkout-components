/* @flow */
/* eslint no-restricted-globals: 0 */
/* eslint no-console: 0 */
/* eslint no-process-exit: 0 */
/* eslint unicorn/no-process-exit: 0 */

import fs from 'fs-extra';
import { getWebpackConfig } from 'grumbler-scripts/config/webpack.config';

import { testGlobals } from '../globals';

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

let setupBrowserPage = (async () => {
    let { browser, page } = await openPage(await webpackCompile(getWebpackConfig({
        libraryTarget: 'window',
        test:          true,
        vars:          testGlobals
    })), { headless: HEADLESS });

    for (let filename of await fs.readdir(IMAGE_DIR)) {
        if (filename.endsWith('-old.png')) {
            await fs.unlink(`${ IMAGE_DIR }/${ filename }`);
        }
    }

    return { browser, page };
})();

beforeAll(() => setupBrowserPage);

afterAll(async () => {
    let { browser } = await setupBrowserPage;
    await browser.close();
});

for (let config of buttonConfigs) {
    let filename = config.filename || dotifyToString(config) || 'base';

    test(`Render button with ${ filename }`, async () => {
        let { page } = await setupBrowserPage;

        let filepath = `${ IMAGE_DIR }/${ filename }.png`;
        let diffpath  = `${ IMAGE_DIR }/${ filename }-old.png`;

        let { x, y, width, height } = await page.evaluate((options, userAgents) => {

            // $FlowFixMe
            document.body.innerHTML = '';

            let container = window.document.createElement('div');
            window.document.body.appendChild(container);

            if (options.container) {
                container.style.width = `${ options.container.width }px`;
            } else {
                container.style.width = '200px';
            }

            if (options.userAgent) {
                window.navigator.mockUserAgent = userAgents[options.userAgent];
            }


            window.paypal.Buttons(options.button).render(container);

            let rect = container.querySelector('iframe').getBoundingClientRect();

            delete window.navigator.mockUserAgent;

            return {
                x:      rect.left,
                y:      rect.top,
                width:  rect.width,
                height: rect.height
            };

        }, config, USER_AGENTS);

        let existingExists = await fs.exists(filepath);

        let [ screenshot, existing ] = await Promise.all([
            takeScreenshot(page, { x, y, width, height }),
            existingExists ? readPNG(filepath) : null
        ]);

        if (existing) {
            let delta = await diffPNG(screenshot, existing);

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
}
