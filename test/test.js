
window.mockDomain = 'mock://www.merchant-site.com';

import './tests';


paypal.setup({
    env: 'test'
});

afterEach((done) => {
    delete window.navigator.mockUserAgent;
    delete window.document.documentMode;
    return window.paypal.destroyAll()
        .then(() => {
            return done();
        });
});

beforeEach(() => {
    window.console.clear();
    window.onerror = () => {
        // pass
    };
});
