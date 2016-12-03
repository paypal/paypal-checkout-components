
window.mockDomain = 'mock://www.merchant-site.com';

import paypal from 'src/index';
import xcomponent from 'xcomponent/src/index';
import postRobot from 'post-robot/src/index';
import './tests';

paypal.setup({
    env: 'test'
});

afterEach(() => {
    delete window.navigator.mockUserAgent;
    return xcomponent.destroyAll().then(() => {
        return postRobot.destroyBridges();
    });
});

window.console.karma = function() {
    let karma = window.karma || (window.top && window.top.karma) || (window.opener && window.opener.karma);
    karma.log('debug', arguments);
    console.log.apply(console, arguments);
};
