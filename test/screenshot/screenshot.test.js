/* @flow */
/* eslint no-restricted-globals: 0 */
/* eslint no-console: 0 */
/* eslint no-process-exit: 0 */
/* eslint unicorn/no-process-exit: 0 */

import fs from 'fs-extra';

import { BASE_SCREENSHOT_TEST } from '../../webpack.config';

import { webpackCompile } from './lib/compile';
import { openPage, takeScreenshot } from './lib/browser';
import { dotifyToString } from './lib/util';
import { diffPNG, readPNG, uploadToImgur } from './lib/image';
import { buttonConfigs } from './config';

console.log(">>> screenshot.test.js top level log")

const IMAGE_DIR = `${ __dirname }/images`;

const DIFF_THRESHOLD = 100;

const USER_AGENTS = {
    iphone6: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
};

jest.setTimeout(120000);

const setupBrowserPage = (async () => {
    console.log(">>> screenshot.test.js setupBrowserPage log")
    const { browser, page } = await openPage(await webpackCompile(BASE_SCREENSHOT_TEST));

    for (const filename of await fs.readdir(IMAGE_DIR)) {
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
    const { browser } = await setupBrowserPage;
    await browser.close();
});

const total = buttonConfigs.length;
let index = 1;

for (const config of buttonConfigs) {
    console.log(">>> screenshot.test.js for loop log")
    const filename = config.filename || dotifyToString(config) || 'base';

    test(`Render button with ${ filename }`, async () => {
        console.log(">>> screenshot.test.js for loop test block log")
        const { page } = await setupBrowserPage;
        console.log(">>> screenshot.test.js for loop post await setupBrowserPage log")

        // fasten up the animation
        await page._client.send('Animation.setPlaybackRate', { playbackRate: 12 });
        console.log(">>> screenshot.test.js for loop post age._client.send() log")
        const filepath = `${ IMAGE_DIR }/${ filename }.png`;
        const diffpath  = `${ IMAGE_DIR }/${ filename }-old.png`;

        const { x, y, width, height } = await page.evaluate(async (options, userAgents) => {
            console.log(">>> screenshot.test.js for loop page.evaluate log")

            // $FlowFixMe
            document.body.innerHTML = '';

            const container = window.document.createElement('div');
            window.document.body.appendChild(container);

            if (options.container) {
                container.style.width = `${ options.container.width }px`;
            }

            if (options.userAgent) {
                window.navigator.mockUserAgent = userAgents[options.userAgent];
            }

            let decorate;

            if (options.button.funding && options.button.funding.allowed && options.button.funding.allowed.indexOf(window.paypal.FUNDING.VENMO) !== -1) {
                decorate = window.paypal.Button.props.funding.decorate;
                window.paypal.Button.props.funding.decorate = (funding = {}) => {
                    // eslint-disable-next-line prefer-object-spread
                    return Object.assign({}, funding, { remembered: [ window.paypal.FUNDING.VENMO ] });
                };
            }

            // eslint-disable-next-line prefer-object-spread
            window.paypal.Button.render(Object.assign({
                payment() {
                    // pass
                },
                onAuthorize() {
                    // pass
                }
            }, options.button), container);

            await new Promise(resolve => setTimeout(resolve, 100));
            
            const rect = container.querySelector('iframe').getBoundingClientRect();

            delete window.navigator.mockUserAgent;

            if (decorate) {
                // eslint-disable-next-line require-atomic-updates
                window.paypal.Button.props.funding.decorate = decorate;
            }

            return {
                x:      rect.left,
                y:      rect.top,
                width:  rect.width,
                height: rect.height
            };

        }, config, USER_AGENTS);

        const existingExists = await fs.exists(filepath);

        const [ screenshot, existing ] = await Promise.all([
            takeScreenshot(page, { x, y, width, height }),
            existingExists ? readPNG(filepath) : null
        ]);

        if (existing) {
            console.log(">>> screenshot.test.js for loop if (existing) block log")
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
            console.log(">>> screenshot.test.js for loop if (existing) else block log")
            await screenshot.write(filepath);
        }
        console.log(`>>> screenshot.test.js for loop pre-increment index log: ${index}`)
        index += 1;
        console.log(`>>> screenshot.test.js for loop post-increment index log: ${index}`)
        console.log(`Generating button screenshot: ${ index } / ${ total }`);
    });
}
