import 'babel-polyfill';

window.mockDomain = 'mock://www.merchant-site.com';

import paypal from 'src/index';
import xcomponent from 'xcomponent/src/index';
import './tests';


paypal.setup({
    env: 'test'
});

afterEach(() => {
    delete window.navigator.mockUserAgent;
    return xcomponent.destroyAll().then(() => {
        // return postRobot.destroyBridges();
    });
});

beforeEach(() => {
    window.console.clear();
    window.onerror = () => {
        // pass
    };
});
