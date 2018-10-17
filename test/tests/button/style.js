/* @flow */
/* eslint max-lines: 0 */

import { ZalgoPromise } from 'zalgo-promise/src';

import { generateOrderID, createTestContainer, destroyTestContainer, getElementRecursive, assert } from '../common';

for (const flow of [ 'popup', 'iframe' ]) {

    describe(`paypal button style cases on ${ flow }`, () => {

        beforeEach(() => {
            createTestContainer();

            window.paypal.Checkout.contexts.iframe = (flow === 'iframe');
        });

        afterEach(() => {
            destroyTestContainer();
            window.location.hash = '';

            window.paypal.Checkout.contexts.iframe = false;
        });

        it('should render a button and click and get a black overlay', (done) => {


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
