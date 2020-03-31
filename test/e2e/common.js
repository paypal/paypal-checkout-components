/* @flow */
/* eslint no-console: off, import/no-nodejs-modules: off */

import { join } from 'path';

import puppeteer from 'puppeteer';
import { withMock, methods } from 'mocketeer';

import { HEADLESS, DEVTOOLS, DOMAIN, RETRIES, LOG, TIMEOUT } from './config';

export function log(...args : $ReadOnlyArray<mixed>) {
    if (LOG) {
        console.info(...args);
    }
}

function normalizeString(str : string, reg : RegExp) : string {
    return str.replace(reg, '_').replace(/^_+/, '').replace(/_+$/, '');
}

function getDate() : string {
    return normalizeString(new Date().toISOString(), /[^0-9]+/g);
}

export async function screenshot(page : Object, name : string) : Promise<void> {
    if (!page.screenshot && page._frameManager) {
        page = page._frameManager.page();
    }

    await page.screenshot({
        path: join(__dirname, 'screenshots', `${ getDate() }_${ normalizeString(name, /[^a-zA-Z_0-9-]+/g) }.png`)
    });
}

export function logFailedRequests(page : Object) {
    page.on('response', req => {
        const url = req.url();
        const status = req.status().toString();
        let corrID = req.headers()['paypal-debug-id'];

        if (corrID) {
            corrID = corrID.split(',')[0];
        }

        if (status.startsWith('4') || status.startsWith('5')) {
            log(status, url, corrID || '(unknown correlation id)');
        }
    });
}

export async function getElement(page : Object, selector : string) : Promise<Object> {
    const element = await page.$(selector);

    if (!element) {
        throw new Error(`Could not find element: ${ selector }`);
    }

    return element;
}

export async function retry<T>(handler : () => Promise<T>, attempts : number) : Promise<T> {
    try {
        return await handler();
    } catch (err) {
        attempts -= 1;
        if (!attempts) {
            throw err;
        }

        log(`Failed with error, retrying (${ attempts } attempts remaining):`, err);
        return retry(handler, attempts);
    }
}

export async function withPage(handler : ({| page : Object |}) => Promise<void>) : Promise<void> {
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

        logFailedRequests(page);

        await withMock(
            methods.get(DOMAIN, {
                status: 200,
                body:   '<head></head><body></body>'
            }),
            page,
            async () => {
                await retry(async () => {
                    await page.goto(DOMAIN);
                    await handler({ page });
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
            await screenshot(page, `frame_opened`);
            return page;
        }
    } catch (err) {
        // pass
    }

    throw new Error(`Could not find frame with name: ${ name }`);
}

type PopupOpts = {| timeout? : number |};

const getDefaultPopupOpts = () : PopupOpts => {
    // $FlowFixMe
    return {};
};

export async function waitForPopup(page : Object, opts? : PopupOpts = getDefaultPopupOpts()) : Promise<Object> {
    const { timeout = TIMEOUT * 1000 } = opts;
    log('WAIT FOR POPUP');
    const popupPage = await new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error(`Timed out waiting for popup window for ${ timeout }ms`));
        }, timeout);
        page.once('popup', (popup) => {
            clearTimeout(timer);
            log('POPUP OPENED');
            resolve(popup);
        });
    });
    logFailedRequests(popupPage);
    await screenshot(popupPage, `popup_opened`);
    return popupPage;
}

export async function delay(time : number) : Promise<void> {
    return await new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

type ElementOpts = {| timeout? : number |};

const getDefaultElementOpts = () : ElementOpts => {
    // $FlowFixMe
    return {};
};

export async function waitForElement(page : Object, selector : string, opts? : ElementOpts = getDefaultElementOpts()) : Promise<void> {
    const { timeout = TIMEOUT * 1000 } = opts;
    log('WAIT FOR', selector);
    await screenshot(page, `wait_for_${ selector }`);
    try {
        await page.waitForSelector(selector, { timeout });
    } catch (err) {
        await screenshot(page, `wait_for_${ selector }_failed`);
        throw err;
    }
    await screenshot(page, `wait_for_${ selector }_success`);
}

type WaitOpts = {| timeout? : number |};

const getDefaultWaitOpts = () : WaitOpts => {
    // $FlowFixMe
    return {};
};

export async function waitAndType(page : Object, selector : string, text : string, opts? : WaitOpts = getDefaultWaitOpts()) : Promise<void> {
    const { timeout = TIMEOUT * 1000 } = opts;
    await waitForElement(page, selector, { timeout });
    await delay(1000);
    await screenshot(page, `pre_type_${ selector }`);
    log('TYPE', selector, text);
    await screenshot(page, `post_click_${ selector }`);
    await page.type(selector, text);
}

export async function waitAndClick(page : Object, selector : string, opts? : WaitOpts = getDefaultWaitOpts()) : Promise<void> {
    const { timeout = TIMEOUT * 1000 } = opts;
    await waitForElement(page, selector, { timeout });
    await delay(1000);
    await screenshot(page, `pre_click_${ selector }`);
    log('CLICK', selector);
    await screenshot(page, `post_click_${ selector }`);
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

export async function waitForClose(page : Object, opts? : WaitOpts = getDefaultWaitOpts()) : Promise<void> {
    const { timeout = TIMEOUT * 1000 } = opts;

    const start = Date.now();

    log('WAIT FOR CLOSE');

    await screenshot(page, `wait_close`);

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
