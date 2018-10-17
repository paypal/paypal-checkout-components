/* @flow */

import './tests';

window.mockDomain = 'mock://www.merchant-site.com';

const MAX_OVERALL_MEMORY = 800;
const MAX_TEST_MEMORY = 80;

const memoryReported = (window.performance && window.performance.memory &&
                      window.performance.memory.usedJSHeapSize);

function getMemory() : number {
    return window.performance.memory.usedJSHeapSize / Math.pow(2, 20);
}

let startMem;
let originalUserAgent;

beforeEach(() => {
    if (memoryReported) {
        startMem = getMemory();
    }

    // eslint-disable-next-line unicorn/prefer-add-event-listener
    window.onerror = () => {
        // pass
    };

    window.__CACHE_START_TIME__ = Date.now();

    originalUserAgent = window.navigator.userAgent;

    delete window.__test__;
});

afterEach(() => {

    window.localStorage.clear();
    delete window.__paypal_storage__;
    delete window.__paypal_global__;

    Object.defineProperty(window.navigator, 'userAgent', {
        value:        originalUserAgent,
        configurable: true
    });

    delete window.document.documentMode;

    if (window.gc) {
        window.gc();
    }

    if (memoryReported) {
        const mem = getMemory();
        const diff = mem - startMem;

        if (mem > MAX_OVERALL_MEMORY) {
            throw new Error(`Overall memory exceeded ${ MAX_OVERALL_MEMORY }mb - ${ mem.toFixed(2) }`);
        }

        if (diff > MAX_TEST_MEMORY) {
            throw new Error(`Test memory exceeded ${ MAX_TEST_MEMORY }mb - ${ diff.toFixed(2) }`);
        }
    }

    return window.paypal.destroyAll();
});
