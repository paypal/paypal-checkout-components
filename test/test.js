
window.mockDomain = 'mock://www.merchant-site.com';

import paypal from 'src/index';
import { Checkout, Button } from 'src/index';
import xcomponent from 'xcomponent/src/index';
import './tests';

Checkout.props.timeout = Button.props.timeout = {
    type: 'number',
    required: false,
    def() {
        return 1000;
    }
};

paypal.setup({
    env: 'test'
});

afterEach(() => {
    delete window.navigator.mockUserAgent;
    return xcomponent.destroyAll().then(() => {
        // return postRobot.destroyBridges();
    });
});

window.console.karma = function() {
    let karma = window.karma || (window.top && window.top.karma) || (window.opener && window.opener.karma);
    karma.log('debug', arguments);
    console.log.apply(console, arguments);
};
