/* @flow */
/* eslint max-lines: 0 */

import { wrapPromise } from '@krakenjs/belter/src';

import { createTestContainer, destroyTestContainer, WEBVIEW_USER_AGENT } from '../common';

for (const flow of [ 'popup', 'iframe' ]) {

    describe(`paypal button cloning on ${ flow }`, () => {

        beforeEach(() => {
            createTestContainer();

            if (flow === 'iframe') {
                window.navigator.mockUserAgent = WEBVIEW_USER_AGENT;
            }
        });

        afterEach(() => {
            destroyTestContainer();
        });

        it('should instantiate a button, clone the button, and click on the button, then complete the checkout without createOrder', () => {
            return wrapPromise(({ expect, avoid }) => {
                if (window.paypal.Buttons.instances.length) {
                    throw new Error(`Expected no existing button instances, found ${ window.paypal.Buttons.instances.length }`);
                }

                const button = window.paypal.Buttons({
                    test:      { flow, action: null },
                    onApprove: expect('onApprove'),
                    onCancel:  avoid('onCancel')
                });

                button.render('#testContainer');

                if (window.paypal.Buttons.instances.length !== 1) {
                    throw new Error(`Expected only one button instance`);
                }
                
                return button.clone({
                    decorate: props => {
                        return {
                            ...props,
                            test: { flow, action: 'checkout' }
                        };
                    }
                }).render('#testContainer');
            });
        });

        it('should instantiate a button without rendering, clone the button, and click on the button, then complete the checkout without createOrder', () => {
            return wrapPromise(({ expect, avoid }) => {
                if (window.paypal.Buttons.instances.length) {
                    throw new Error(`Expected no existing button instances, found ${ window.paypal.Buttons.instances.length }`);
                }

                const button = window.paypal.Buttons({
                    test:      { flow, action: 'checkout' },
                    onApprove: expect('onApprove'),
                    onCancel:  avoid('onCancel')
                });

                if (window.paypal.Buttons.instances.length !== 1) {
                    throw new Error(`Expected only one button instance`);
                }
                
                return button.clone({
                    decorate: props => {
                        return {
                            ...props,
                            test: { flow, action: 'checkout' }
                        };
                    }
                }).render('#testContainer');
            });
        });

        it('should instantiate a button, clone the button from instances, and click on the button, then complete the checkout without createOrder', () => {
            return wrapPromise(({ expect, avoid }) => {
                if (window.paypal.Buttons.instances.length) {
                    throw new Error(`Expected no existing button instances, found ${ window.paypal.Buttons.instances.length }`);
                }

                const button = window.paypal.Buttons({
                    test:      { flow, action: null },
                    onApprove: expect('onApprove'),
                    onCancel:  avoid('onCancel')
                });

                button.render('#testContainer');

                if (window.paypal.Buttons.instances.length !== 1) {
                    throw new Error(`Expected only one button instance`);
                }

                return window.paypal.Buttons.instances[0].clone({
                    decorate: props => {
                        return {
                            ...props,
                            test: { flow, action: 'checkout' }
                        };
                    }
                }).render('#testContainer');
            });
        });

        it('should instantiate a button, clone the button with decorated props, and click on the button, then complete the checkout without createOrder', () => {
            return wrapPromise(({ expect, avoid }) => {
                if (window.paypal.Buttons.instances.length) {
                    throw new Error(`Expected no existing button instances, found ${ window.paypal.Buttons.instances.length }`);
                }

                const button = window.paypal.Buttons({
                    test:      { flow, action: null },
                    onCancel:  avoid('onCancel')
                });

                button.render('#testContainer');

                if (window.paypal.Buttons.instances.length !== 1) {
                    throw new Error(`Expected only one button instance`);
                }
                
                return button.clone({
                    decorate: props => {
                        return {
                            ...props,
                            onApprove: expect('onApprove'),
                            test:      { flow, action: 'checkout' }
                        };
                    }
                }).render('#testContainer');
            });
        });
    });
}
