/* @flow */
/* eslint no-restricted-globals: 0 */
/* eslint no-console: 0 */
/* eslint no-process-exit: 0 */
/* eslint unicorn/no-process-exit: 0 */

import fs from 'fs-extra';

import { webpack_tasks } from '../../webpack.conf';

import { webpackCompile } from './lib/compile';
import { openPage, takeScreenshot } from './lib/browser';
import { dotifyToString } from './lib/util';
import { diffPNG, readPNG, uploadToImgur } from './lib/image';
import { buttonConfigs } from './config';

const CHECKOUTJS_SCRIPT = `${ __dirname }/../../${ webpack_tasks.base.src }`;

const IMAGE_DIR = `${ __dirname }/images`;

const WEBPACK_CONFIG = {
    ...webpack_tasks.base.cfg,
    entry: CHECKOUTJS_SCRIPT
};

const DIFF_THRESHOLD = 20;

jest.setTimeout(50000);

let browser;
let page;

beforeAll(async () => {
    ({ browser, page } = await openPage(await webpackCompile(WEBPACK_CONFIG)));

    for (let filename of await fs.readdir(IMAGE_DIR)) {
        if (filename.endsWith('-old.png')) {
            await fs.unlink(`${ IMAGE_DIR }/${ filename }`);
        }
    }

    await page.evaluate(() => {
        window.paypal.setup({ env: 'test' });
    });
});

afterAll(async () => {
    await browser.close();
});

for (let config of buttonConfigs) {
    let filename = dotifyToString(config) || 'base';

    test(`Render button with ${ filename }`, async () => {
        let filepath = `${ IMAGE_DIR }/${ filename }.png`;
        let diffpath  = `${ IMAGE_DIR }/${ filename }-old.png`;

        let { x, y, width, height } = await page.evaluate((options) => {

            // $FlowFixMe
            document.body.innerHTML = '';

            let container = window.document.createElement('div');
            window.document.body.appendChild(container);

            if (options.container) {
                container.style.width = `${ options.container.width }px`;
            }

            window.paypal.Button.render(Object.assign({
                payment() { /* pass */ },
                onAuthorize() { /* pass */ }
            }, options.button), container);

            let rect = container.querySelector('iframe').getBoundingClientRect();

            return {
                x:      rect.left,
                y:      rect.top,
                width:  rect.width,
                height: rect.height
            };

        }, config);

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
