
window.mockDomain = 'mock://www.merchant-site.com';

import paypal from 'src/index';
import { Checkout, Button } from 'src/index';
import xcomponent from 'xcomponent/src/index';
import './tests';

Checkout.props.timeout = Button.props.timeout = {
    type: 'number',
    required: false,
    def() {
        return 3000;
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
