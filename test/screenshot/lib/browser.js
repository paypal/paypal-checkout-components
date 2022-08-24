/* @flow */
/* eslint no-restricted-globals: 0 */
/* eslint no-console: 0 */
/* eslint no-process-exit: 0 */
/* eslint unicorn/no-process-exit: 0 */
/* eslint import/no-nodejs-modules: 0 */

import puppeteer from 'puppeteer';

import { createTempFile } from './util';

export async function openPage(scriptURL : string, { headless = true, devtools = false } : {| headless? : boolean, devtools? : boolean |}) : Promise<Object> {
    const browser = await puppeteer.launch({ headless, devtools, args: [ '--no-sandbox' ] });

    const open = async () => {
        const page = await browser.newPage();

        page.emulate({
            viewport: {
                width:             1000,
                height:            1000,
                deviceScaleFactor: 2
            },
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36'
        });

        page.on('error', err => {
            console.error('Browser error:', err.stack);
            process.exit(1);
        });

        const filename = await createTempFile(`puppeteer-blank.html`);
        await page.goto(`file://${ filename }`);

        await page.addScriptTag({ url: scriptURL });

        return page;
    };

    return {
        browser,
        page: await open(),
        open
    };
}