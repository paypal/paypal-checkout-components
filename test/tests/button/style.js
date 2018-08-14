/* @flow */
/* eslint max-lines: 0 */

import { ZalgoPromise } from 'zalgo-promise/src';

import { generateECToken, createTestContainer, destroyTestContainer, getElementRecursive, assert } from '../common';

for (let flow of [ 'popup', 'iframe' ]) {

    describe(`paypal button style cases on ${ flow }`, () => {

        beforeEach(() => {
            createTestContainer();
            let client = window.paypal.client();
            client.Checkout.contexts.iframe = (flow === 'iframe');
        });

        afterEach(() => {
            destroyTestContainer();
            window.location.hash = '';
            let client = window.paypal.client();
            client.Checkout.contexts.iframe = false;
        });

        it('should render a button and click and get a black overlay', (done) => {

            let client = window.paypal.client();

            client.Button.render({

                test: {
                    flow,
                    action: 'checkout',
                    onRender() {
                        assert.ok(getElementRecursive('.paypal-checkout-background-color-black'));
                        done();
                    }
                },

                payment() : string | ZalgoPromise<string> {
                    return generateECToken();
                },

                onAuthorize() : void {
                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer');
        });
    });
}
