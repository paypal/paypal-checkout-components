/* @flow */

import { insertMockSDKScript } from '@paypal/sdk-client/src';

import './tests';

window.mockDomain = 'mock://www.merchant-site.com';

const MEM_PER_TEST = 2;

const memoryReported = (window.performance && window.performance.memory &&
                      window.performance.memory.usedJSHeapSize);

function getMemory() : number {
    return window.performance.memory.usedJSHeapSize / Math.pow(2, 20);
}

let maxMem = getMemory() * 2;
let originalUserAgent;

beforeEach(() => {
    if (memoryReported) {
        maxMem += MEM_PER_TEST;
    }

    // eslint-disable-next-line unicorn/prefer-add-event-listener
    window.onerror = () => {
        // pass
    };

    window.__CACHE_START_TIME__ = Date.now();
    originalUserAgent = window.navigator.userAgent;

    insertMockSDKScript();

    delete window.__test__;
});

afterEach(() => {
    window.localStorage.clear();
    delete window.__paypal_storage__;
    delete window.__paypal_global__;

    window.location.hash = '';

    Object.defineProperty(window.navigator, 'userAgent', {
        value:        originalUserAgent,
        configurable: true
    });

    delete window.navigator.mockUserAgent;
    delete window.document.documentMode;

    return window.paypal.destroyAll().then(() => {
        if (window.paypal.Buttons.instances.length) {
            throw new Error(`Expected no remaining instances of paypal button; found ${ window.paypal.Buttons.instances.length }`);
        }

        if (window.paypal.Checkout.instances.length) {
            throw new Error(`Expected no remaining instances of paypal button; found ${ window.paypal.Checkout.instances.length }`);
        }
    });
});

after(() => {
    if (memoryReported) {
        if (window.gc) {
            window.gc();
        }

        const mem = getMemory();

        if (mem > maxMem) {
            // throw new Error(`Overall memory exceeded ${ parseInt(maxMem, 10) }mb - ${ mem.toFixed(2) }mb used`);
        }
    }
});
