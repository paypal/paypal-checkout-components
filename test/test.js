
window.mockDomain = 'mock://www.merchant-site.com';

import './tests';


paypal.setup({
    env: 'test'
});

const MAX_OVERALL_MEMORY = 300;
const MAX_TEST_MEMORY = 50;

let memoryReported = (window.performance && window.performance.memory &&
                      window.performance.memory.usedJSHeapSize);

function getMemory() {
    return window.performance.memory.usedJSHeapSize / Math.pow(2, 20);
}

let startMem;

beforeEach(() => {
    if (memoryReported) {
        startMem = getMemory();
    }

    window.console.clear();
    window.onerror = () => {
        // pass
    };
});

afterEach(() => {
    delete window.navigator.mockUserAgent;
    delete window.document.documentMode;

    if (window.gc) {
        window.gc();
    }

    if (memoryReported) {
        let mem = getMemory();
        let diff = mem - startMem;

        if (mem > MAX_OVERALL_MEMORY) {
            throw new Error(`Overall memory exceeded ${MAX_OVERALL_MEMORY}mb - ${mem.toFixed(2)}`);
        }

        if (diff > MAX_TEST_MEMORY) {
            throw new Error(`Test memory exceeded ${MAX_TEST_MEMORY}mb - ${diff.toFixed(2)}`);
        }
    }

    return window.paypal.destroyAll().then(() => {
        // return new Promise(resolve => setTimeout(resolve, 2000))
        // return postRobot.bridge.destroyBridges();
    });
});
