/* @flow */

import { once } from 'post-robot/src';

import '../common';

for (let flow of [ 'popup', 'iframe' ]) {

    describe(`paypal button component embedded frame on ${ flow }`, () => {

        beforeEach(() => {
            let client = window.paypal.client();
            client.Checkout.contexts.iframe = (flow === 'iframe');
        });

        afterEach(() => {
            window.location.hash = '';
            let client = window.paypal.client();
            client.Checkout.contexts.iframe = false;
        });

        it('should render a button into a container and click on the button, then complete the checkout', () => {

            let iframe = document.createElement('iframe');
            iframe.src = `/base/test/windows/buttonframe/index.htm#${ flow }`;

            if (!document.body) {
                throw new Error('Expected document.body to be present');
            }

            document.body.appendChild(iframe);

            return once('onApprove').then(() => {
                if (iframe.parentNode) {
                    iframe.parentNode.removeChild(iframe);
                }
            });
        });
    });
}
