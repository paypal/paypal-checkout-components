/* @flow */

import puppeteer from 'puppeteer';
import { withMock, methods } from 'mocketeer';

import { HEADLESS, DEVTOOLS, DOMAIN } from './config';

export async function withPage(handler : ({ page : Object }) => Promise<void>) : Promise<void> {
    const browser = await puppeteer.launch({
        headless:          HEADLESS,
        devtools:          DEVTOOLS,
        ignoreHTTPSErrors: true,
        handleSIGINT:      false
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
                await page.goto(DOMAIN);
                await handler({ browser, page });
            }
        );

        
    } catch (err) {
        await browser.close();
        throw err;
    }
    
    await browser.close();
}

export async function findFrameByName(page : Object, name : string) : Object {
    const namedFrame = (await page.frames()).find(frame => {
        return frame.name().startsWith(name);
    });

    if (!namedFrame) {
        throw new Error(`Could not find frame with name: ${ name }`);
    }

    return namedFrame;
}

export async function waitForPopup(page : Object, opts? : { timeout? : number } = {}) : Promise<Object> {
    const { timeout = 5000 } = opts;
    return await new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error(`Timed out waiting for popup window for ${ timeout }ms`));
        }, timeout);
        page.once('popup', (popup) => {
            clearTimeout(timer);
            resolve(popup);
        });
    });
}

export async function delay(time : number) : Promise<void> {
    return await new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

export async function waitAndType(page : Object, selector : string, text : string) : Promise<void> {
    await page.waitForSelector(selector);
    await delay(1000);
    await page.type(selector, text);
}

export async function waitAndClick(page : Object, selector : string) : Promise<void> {
    await page.waitForSelector(selector);
    await delay(1000);
    await page.click(selector);
}

export async function elementExists(page : Object, selector : string) : Promise<boolean> {
    try {
        return Boolean(await page.$(selector));
    } catch (err) {
        return false;
    }
}

export async function waitForClose(page : Object, opts? : { timeout? : number } = {}) : Promise<void> {
    const { timeout = 30000 } = opts;

    const start = Date.now();

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
