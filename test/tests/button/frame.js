/* @flow */

import '../common';

for (let flow of [ 'popup', 'lightbox' ]) {

    describe(`paypal button component embedded frame on ${flow}`, () => {

        beforeEach(() => {
            window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
        });

        afterEach(() => {
            window.location.hash = '';
            window.paypal.Checkout.contexts.lightbox = false;
        });

        it('should render a button into a container and click on the button, then complete the payment', () => {

            let iframe = document.createElement('iframe');
            iframe.src = `/base/test/windows/buttonframe/index.htm#${flow}`;

            if (!document.body) {
                throw new Error('Expected document.body to be present');
            }

            document.body.appendChild(iframe);

            return window.paypal.postRobot.once('onAuthorize');
        });
    });
}
