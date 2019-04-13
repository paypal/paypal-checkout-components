/* @flow */
/* eslint no-console: off */

// $FlowFixMe
import puppeteer from 'puppeteer';
import { withMock, methods } from 'mocketeer';

import { HEADLESS, DEVTOOLS, DOMAIN, RETRIES, LOG } from './config';

export function log(...args : $ReadOnlyArray<mixed>) {
    if (LOG) {
        console.info(...args);
    }
}

export async function retry<T>(handler : () => Promise<T>, attempts : number) : Promise<T> {
    try {
        return await handler();
    } catch (err) {
        attempts -= 1;
        if (!attempts) {
            throw err;
        }

        log('Failed with error, retrying:', err);
        return retry(handler, attempts);
    }
}

export async function withPage(handler : ({ page : Object }) => Promise<void>) : Promise<void> {
    const browser = await puppeteer.launch({
        headless:          HEADLESS,
        devtools:          DEVTOOLS,
        ignoreHTTPSErrors: true,
        args:              [
            '--no-sandbox'
        ]
    });

    try {
        const page = await browser.newPage();

        await withMock(
            methods.get(DOMAIN, {
                status: 200,
                body:   '<head></head><body></body>'
            }),
            page,
            async () => {
                await retry(async () => {
                    await page.goto(DOMAIN);
                    await handler({ browser, page });
                }, RETRIES);
            }
        );

        
    } catch (err) {
        await browser.close();
        throw err;
    }
    
    await browser.close();
}

export async function findFrameByName(page : Object, name : string) : Object {
    log('FIND FRAME', name);
    const namedFrame = (await page.frames()).find(frame => {
        return frame.name().startsWith(name);
    });

    if (namedFrame) {
        return namedFrame;
    }

    const element = await page.$(`iframe[name=${ name }]`);

    try {
        const frame = await element.contentFrame();
        if (frame) {
            log('FOUND FRAME', name);
            return frame;
        }
    } catch (err) {
        // pass
    }

    throw new Error(`Could not find frame with name: ${ name }`);
}

export async function waitForPopup(page : Object, opts? : { timeout? : number } = {}) : Promise<Object> {
    const { timeout = 5000 } = opts;
    log('WAIT FOR POPUP');
    return await new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error(`Timed out waiting for popup window for ${ timeout }ms`));
        }, timeout);
        page.once('popup', (popup) => {
            clearTimeout(timer);
            log('POPUP OPENED');
            resolve(popup);
        });
    });
}

export async function delay(time : number) : Promise<void> {
    return await new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

export async function waitForElement(page : Object, selector : string, opts? : { timeout? : number } = {}) : Promise<void> {
    const { timeout } = opts;
    log('WAIT FOR', selector);
    await page.waitForSelector(selector, { timeout });
}

export async function waitAndType(page : Object, selector : string, text : string) : Promise<void> {
    await waitForElement(page, selector);
    await delay(1000);
    log('TYPE', selector, text);
    await page.type(selector, text);
}

export async function waitAndClick(page : Object, selector : string) : Promise<void> {
    await waitForElement(page, selector);
    await delay(1000);
    log('CLICK', selector);
    await page.click(selector);
}

export async function elementExists(page : Object, selector : string) : Promise<boolean> {
    log('CHECK EXISTS', selector);

    try {
        await waitForElement(page, selector, { timeout: 1000 });
    } catch (err) {
        // pass
    }

    try {
        if (await page.$(selector)) {
            log('EXISTS', selector);
            return true;
        }
    } catch (err) {
        // pass
    }

    log('DOES NOT EXIST', selector);
    return false;
}

export async function waitForClose(page : Object, opts? : { timeout? : number } = {}) : Promise<void> {
    const { timeout = 30000 } = opts;

    const start = Date.now();

    log('WAIT FOR CLOSE');

    return await new Promise((resolve, reject) => {
        const interval = setInterval(async () => {
            const elapsed = Date.now() - start;

            if (await page.isClosed()) {
                clearInterval(interval);
                resolve();
            }

            if (elapsed > timeout) {
                clearInterval(interval);
                return reject(new Error(`Timed out after ${ timeout }ms waiting for page to close`));
            }
        }, 500);
    });
}

export async function pause() : Promise<void> {
    return await new Promise(() => {
        // pass
    });
}
