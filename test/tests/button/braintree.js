/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';

import { createTestContainer, destroyTestContainer, generatePaymentID } from '../common';

const MOCK_BRAINTREE_AUTH = 'MOCK_BRAINTREE_AUTH';
const MOCK_BRAINTREE_NONCE = 'MOCK_BRAINTREE_NONCE';

let mockBraintree = {

    client: {
        create(options) : ZalgoPromise<mixed> {
            return ZalgoPromise.try(() => {
                if (!options || typeof options !== 'object') {
                    throw new Error(`Braintree expected options to be passed as an object`);
                }

                if (options.authorization !== MOCK_BRAINTREE_AUTH) {
                    throw new Error(`Braintree expected authorization to be ${MOCK_BRAINTREE_AUTH}`);
                }

                return {};
            });
        }
    },

    paypalCheckout: {
        create(options) : ZalgoPromise<mixed> {
            return ZalgoPromise.try(() => {

                if (!options || typeof options !== 'object') {
                    throw new Error(`Braintree expected options to be passed as an object`);
                }

                if (!options.client) {
                    throw new Error(`Braintree expected options.client to be passed`);
                }

                return {

                    createPayment(paymentOptions) : ZalgoPromise<string> {
                        return ZalgoPromise.try(() => {

                            if (!options || typeof options !== 'object') {
                                throw new Error(`Braintree expected payment options to be passed as an object`);
                            }

                            return generatePaymentID();
                        });
                    },

                    tokenizePayment(data) : ZalgoPromise<{ nonce : string }> {
                        return ZalgoPromise.try(() => {

                            if (!data || typeof data !== 'object') {
                                throw new Error(`Braintree expected tokenize data to be passed as an object`);
                            }

                            if (!data.payerID) {
                                throw new Error(`Braintree expected payerID to be passed`);
                            }

                            return {
                                nonce: MOCK_BRAINTREE_NONCE
                            };
                        });
                    }
                };
            });
        }
    }
};


for (let flow of [ 'popup', 'iframe' ]) {

    describe(`paypal button braintree tests on ${flow}`, () => {

        beforeEach(() => {
            createTestContainer();
            window.paypal.Checkout.contexts.iframe = (flow === 'iframe');
        });

        afterEach(() => {
            destroyTestContainer();
            window.location.hash = '';
            window.paypal.Checkout.contexts.iframe = false;
        });

        it('should render a button into a container and click on the button, then complete the payment with actions.braintree', (done) => {

            window.paypal.Button.render({

                test: { flow, action: 'checkout' },

                braintree: mockBraintree,

                client: {
                    test: MOCK_BRAINTREE_AUTH
                },

                payment(data, actions) : ZalgoPromise<string> {
                    return actions.braintree.create({
                        flow:     'checkout',
                        amount:   '1.00',
                        currency: 'USD',
                        intent:   'sale'
                    });
                },

                onAuthorize(data) : void {

                    if (data.nonce !== MOCK_BRAINTREE_NONCE) {
                        return done(new Error(`Expected data.nonce to be ${MOCK_BRAINTREE_NONCE}, got ${data.nonce}`));
                    }

                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer');
        });

        it('should render a button into a container and click on the button, then complete the payment with data.braintree', (done) => {

            window.paypal.Button.render({

                test: { flow, action: 'checkout' },

                braintree: mockBraintree,

                client: {
                    test: MOCK_BRAINTREE_AUTH
                },

                payment(data, actions) : ZalgoPromise<string> {
                    return data.braintree.create({
                        flow:     'checkout',
                        amount:   '1.00',
                        currency: 'USD',
                        intent:   'sale'
                    });
                },

                onAuthorize(data) : void {

                    if (data.nonce !== MOCK_BRAINTREE_NONCE) {
                        return done(new Error(`Expected data.nonce to be ${MOCK_BRAINTREE_NONCE}, got ${data.nonce}`));
                    }

                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer');
        });
    });
}
