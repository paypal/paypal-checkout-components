/* @flow */
/* eslint max-lines: 0 */

import { wrapPromise } from 'belter/src';

import { createTestContainer, destroyTestContainer } from '../common';

for (const flow of [ 'popup', 'iframe' ]) {

    describe(`paypal button component instant click path on ${ flow }`, () => {

        beforeEach(() => {
            createTestContainer();
            window.paypal.Checkout.contexts.iframe = (flow === 'iframe');
        });

        afterEach(() => {
            destroyTestContainer();
            window.location.hash = '';
            window.paypal.Checkout.contexts.iframe = false;
        });

        it('should render a button into a container and click on the button instantly, then complete the checkout', () => {
            return wrapPromise(({ expect, error }) => {

                const buttonRender = window.paypal.Buttons({
                    test:      { flow },
                    onApprove: expect('onApprove'),
                    onCancel:  error('onCancel'),
                    onError:   error('onError', err => { throw err; })
                }).render('#testContainer');

                const frame = document.querySelector('#testContainer iframe.zoid-prerender-frame');

                if (!frame) {
                    throw new Error(`Can not find prerender frame`);
                }

                // $FlowFixMe
                const win = frame.contentWindow;
                const button = win.document.querySelector('[role="button"]');

                frame.click();
                button.click();

                return buttonRender;
            });
        });
    });
}
