/* @flow */

import './tests';

window.mockDomain = 'mock://www.merchant-site.com';

window.paypal.setup({
    env: 'test'
});

const MAX_OVERALL_MEMORY = 900;
const MAX_TEST_MEMORY = 80;

let memoryReported = (window.performance && window.performance.memory &&
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

    // window.console.clear();
    window.onerror = () => {
        // pass
    };

    window.__CACHE_START_TIME__ = Date.now();

    originalUserAgent = window.navigator.userAgent;

    window.paypal.postRobot.CONFIG.ALLOW_POSTMESSAGE_POPUP = true;

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
        let mem = getMemory();
        let diff = mem - startMem;

        if (mem > MAX_OVERALL_MEMORY) {
            throw new Error(`Overall memory exceeded ${ MAX_OVERALL_MEMORY }mb - ${ mem.toFixed(2) }`);
        }

        if (diff > MAX_TEST_MEMORY) {
            throw new Error(`Test memory exceeded ${ MAX_TEST_MEMORY }mb - ${ diff.toFixed(2) }`);
        }
    }
    
    window.paypal.postRobot.bridge.destroyBridges();

    return window.paypal.destroyAll();
});
