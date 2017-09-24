/* @flow */
/* eslint no-restricted-globals: 0 */
/* eslint no-console: 0 */
/* eslint no-process-exit: 0 */
/* eslint unicorn/no-process-exit: 0 */
/* eslint import/no-nodejs-modules: 0 */

import os from 'os';

import puppeteer from 'puppeteer';

import { createTempFile } from './util';
import { readPNG, type PngType } from './image';

export async function openPage(scriptURL : string) : Promise<Object> {

    let browser = await puppeteer.launch();
    let page    = await browser.newPage();

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

    await page.goto(`file://${ await createTempFile('puppeteer-blank.html') }`);

    await page.addScriptTag(scriptURL);

    return { browser, page };
}

export async function takeScreenshot(page : Object, { x, y, width, height } : { x : number, y : number, width : number, height : number }) :
    Promise<PngType> {

    let path = `${ os.tmpdir() }/${ Math.random().toString() }.png`;

    await page.screenshot({
        path,
        clip: { x, y, width, height }
    });

    let png = await readPNG(path);

    return png;
}
