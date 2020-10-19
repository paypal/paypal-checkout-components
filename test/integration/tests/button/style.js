/* @flow */
/* eslint max-lines: 0 */

import { ZalgoPromise } from 'zalgo-promise/src';
import { once } from 'belter/src';

import { generateOrderID, createTestContainer, destroyTestContainer, getElementRecursive, assert, WEBVIEW_USER_AGENT } from '../common';

for (const flow of [ 'popup', 'iframe' ]) {

    describe(`paypal button style cases on ${ flow }`, () => {

        beforeEach(() => {
            createTestContainer();
            if (flow === 'iframe') {
                window.navigator.mockUserAgent = WEBVIEW_USER_AGENT;
            }
        });

        afterEach(() => {
            destroyTestContainer();
        });

        it('should render a button and click and get a black overlay', (done) => {
            done = once(done);
            window.paypal.Buttons({

                test: {
                    flow,
                    action: 'checkout',
                    onRender() {
                        assert.ok(getElementRecursive('.paypal-checkout-background-color-black'));
                        done();
                    }
                },

                createOrder() : string | ZalgoPromise<string> {
                    return ZalgoPromise.resolve(generateOrderID());
                },

                onApprove() : void {
                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }).render('#testContainer');
        });
    });
}

describe('paypal button color', () => {
    beforeEach(() => {
        createTestContainer();
    });

    afterEach(() => {
        destroyTestContainer();
    });

    it('should render a button with gold background when no color is specified', () => {
        window.paypal.Buttons({

            test: {
                onRender() {
                    assert.ok(getElementRecursive('.paypal-button-color-gold'));
                }
            }

        }).render('#testContainer');
    });

    it('should render a button with black background when passed "black"', () => {
        window.paypal.Buttons({

            test: {
                style: {
                    color: 'black'
                },
                onRender() {
                    assert.ok(getElementRecursive('.paypal-button-color-black'));
                }
            }
        }).render('#testContainer');
    });

    it('should render a button with gold background when passed empty string', (done) => {
        done = once(done);
        window.paypal.Buttons({

            test: {
                style: {
                    color: ''
                },
                onRender() {
                    assert.ok(getElementRecursive('.paypal-button-color-gold'));
                    done();
                }
            },

            onError: done

        }).render('#testContainer');
    });
});
