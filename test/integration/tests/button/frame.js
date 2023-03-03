/* @flow */

import { once } from '@krakenjs/post-robot/src';

import { WEBVIEW_USER_AGENT } from '../common';

for (const flow of [ 'popup', 'iframe' ]) {

    describe(`paypal button component embedded frame on ${ flow }`, () => {

        beforeEach(() => {
            if (flow === 'iframe') {
                window.navigator.mockUserAgent = WEBVIEW_USER_AGENT;
            }
        });

        it('should render a button into a container and click on the button, then complete the checkout', () => {

            const iframe = document.createElement('iframe');
            iframe.src = `/base/test/integration/windows/buttonframe/index.htm#${ flow }`;

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
