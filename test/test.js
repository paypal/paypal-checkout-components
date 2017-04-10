
window.mockDomain = 'mock://www.merchant-site.com';

import './tests';


paypal.setup({
    env: 'test'
});

afterEach(() => {
    delete window.navigator.mockUserAgent;
    delete window.document.documentMode;
    return window.paypal.destroyAll().then(() => {
        // return postRobot.bridge.destroyBridges();
    });
});

beforeEach(() => {
    window.console.clear();
    window.onerror = () => {
        // pass
    };
});
