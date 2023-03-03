/* @flow */
/* eslint max-lines: 0 */

import { wrapPromise } from '@krakenjs/belter/src';

import { createTestContainer, destroyTestContainer, WEBVIEW_USER_AGENT } from '../common';

for (const flow of [ 'popup', 'iframe' ]) {

    describe(`paypal button component instant click path on ${ flow }`, () => {

        beforeEach(() => {
            createTestContainer();
            if (flow === 'iframe') {
                window.navigator.mockUserAgent = WEBVIEW_USER_AGENT;
            }
        });

        afterEach(() => {
            destroyTestContainer();
        });

        it('should render a button into a container and click on the button instantly, then complete the checkout', () => {
            return wrapPromise(({ expect, error }) => {

                const buttonRender = window.paypal.Buttons({
                    test:      { flow },
                    onApprove: expect('onApprove'),
                    onCancel:  error('onCancel'),
                    onError:   error('onError', err => { throw err; })
                }).render('#testContainer');

                const frame = document.querySelector('#testContainer iframe.prerender-frame');

                if (!frame) {
                    throw new Error(`Can not find prerender frame`);
                }

                // $FlowFixMe
                const win = frame.contentWindow;
                const button = win.document.querySelector('[role="link"]');

                frame.click();
                button.click();

                return buttonRender;
            });
        });

        it('should render a button into a container and press space button on the button instantly, then complete the checkout', () => {
            return wrapPromise(({ expect, error }) => {

                const buttonRender = window.paypal.Buttons({
                    test:                  { flow },
                    onApprove:             expect('onApprove'),
                    onCancel:              error('onCancel'),
                    onError:               error('onError', err => { throw err; })
                }).render('#testContainer');

                const frame = document.querySelector('#testContainer iframe.prerender-frame');

                if (!frame) {
                    throw new Error(`Can not find prerender frame`);
                }

                // $FlowFixMe
                const win = frame.contentWindow;
                const button = win.document.querySelector('[role="link"]');

                frame.click();
                button.dispatchEvent(new KeyboardEvent('keypress', { 'keyCode': 32 }));

                return buttonRender;
            });
        });

        it('should render a button into a container and press enter button on the button instantly, then complete the checkout', () => {
            return wrapPromise(({ expect, error }) => {

                const buttonRender = window.paypal.Buttons({
                    test:                  { flow },
                    onApprove:             expect('onApprove'),
                    onCancel:              error('onCancel'),
                    onError:               error('onError', err => { throw err; })
                }).render('#testContainer');

                const frame = document.querySelector('#testContainer iframe.prerender-frame');

                if (!frame) {
                    throw new Error(`Can not find prerender frame`);
                }

                // $FlowFixMe
                const win = frame.contentWindow;
                const button = win.document.querySelector('[role="link"]');

                frame.click();
                button.dispatchEvent(new KeyboardEvent('keypress', { 'keyCode': 13 }));

                return buttonRender;
            });
        });
    });
}
