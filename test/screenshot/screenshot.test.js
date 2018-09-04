/* @flow */
/* eslint no-restricted-globals: 0 */
/* eslint no-console: 0 */
/* eslint no-process-exit: 0 */
/* eslint unicorn/no-process-exit: 0 */

import fs from 'fs-extra';

import { BASE } from '../../webpack.config';

import { webpackCompile } from './lib/compile';
import { openPage, takeScreenshot } from './lib/browser';
import { dotifyToString } from './lib/util';
import { diffPNG, readPNG, uploadToImgur } from './lib/image';
import { buttonConfigs } from './config';

const IMAGE_DIR = `${ __dirname }/images`;

const DIFF_THRESHOLD = 100;

const USER_AGENTS = {
    iphone6: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
};

jest.setTimeout(120000);

let setupBrowserPage = (async () => {
    let { browser, page } = await openPage(await webpackCompile(BASE));

    for (let filename of await fs.readdir(IMAGE_DIR)) {
        if (filename.endsWith('-old.png')) {
            await fs.unlink(`${ IMAGE_DIR }/${ filename }`);
        }
    }

    await page.evaluate(() => {
        window.paypal.setup({ env: 'test' });
    });

    return { browser, page };
})();

beforeAll(() => setupBrowserPage);

afterAll(async () => {
    let { browser } = await setupBrowserPage;
    await browser.close();
});

const total = buttonConfigs.length;
let index = 1;

for (let config of buttonConfigs) {
    let filename = config.filename || dotifyToString(config) || 'base';

    test(`Render button with ${ filename }`, async () => {
        let { page } = await setupBrowserPage;

        // fasten up the animation
        await page._client.send('Animation.setPlaybackRate', { playbackRate: 12.0 });
        let filepath = `${ IMAGE_DIR }/${ filename }.png`;
        let diffpath  = `${ IMAGE_DIR }/${ filename }-old.png`;

        let { x, y, width, height } = await page.evaluate((options, userAgents) => {

            // $FlowFixMe
            document.body.innerHTML = '';

            let container = window.document.createElement('div');
            window.document.body.appendChild(container);

            if (options.container) {
                container.style.width = `${ options.container.width }px`;
            }

            if (options.userAgent) {
                window.navigator.mockUserAgent = userAgents[options.userAgent];
            }

            window.paypal.Button.render(Object.assign({
                payment() { /* pass */ },
                onAuthorize() { /* pass */ }
            }, options.button), container);

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
        index += 1;
        console.log(`Generating button screenshot: ${ index } / ${ total }`);
    });
}
