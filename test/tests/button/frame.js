/* @flow */

import '../common';

for (const flow of [ 'popup', 'iframe' ]) {

    describe(`paypal button component embedded frame on ${ flow }`, () => {

        beforeEach(() => {
            window.paypal.Checkout.contexts.iframe = (flow === 'iframe');
        });

        afterEach(() => {
            window.location.hash = '';
            window.paypal.Checkout.contexts.iframe = false;
        });

        it('should render a button into a container and click on the button, then complete the payment', () => {

            const iframe = document.createElement('iframe');
            iframe.src = `/base/test/windows/buttonframe/index.htm#${ flow }`;

            if (!document.body) {
                throw new Error('Expected document.body to be present');
            }

            document.body.appendChild(iframe);

            return window.paypal.postRobot.once('onAuthorize').then(() => {
                if (iframe.parentNode) {
                    iframe.parentNode.removeChild(iframe);
                }
            });
        });

        it('should render a button into a container and click on the button, then complete the payment, with the post-bridge', () => {

            window.paypal.postRobot.CONFIG.ALLOW_POSTMESSAGE_POPUP = false;

            const iframe = document.createElement('iframe');
            iframe.src = `/base/test/windows/buttonframe/index.htm#${ flow }`;

            if (!document.body) {
                throw new Error('Expected document.body to be present');
            }

            document.body.appendChild(iframe);

            return window.paypal.postRobot.once('onAuthorize').then(() => {
                if (iframe.parentNode) {
                    iframe.parentNode.removeChild(iframe);
                }
            });
        });
    });
}
