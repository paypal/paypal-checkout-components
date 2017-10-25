/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';

import { createTestContainer, destroyTestContainer, generatePaymentID } from '../common';

const MOCK_BRAINTREE_AUTH = 'MOCK_BRAINTREE_AUTH';
const MOCK_BRAINTREE_NONCE = 'MOCK_BRAINTREE_NONCE';

let mockPayPalCheckout = {

    createPayment(paymentOptions) : ZalgoPromise<string> {
        return ZalgoPromise.try(() => {

            if (!paymentOptions || typeof paymentOptions !== 'object') {
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

let mockBraintree = {

    client: {
        create(options) : ZalgoPromise<mixed> {
            return ZalgoPromise.try(() => {
                if (!options || typeof options !== 'object') {
                    throw new Error(`Braintree expected options to be passed as an object`);
                }

                if (options.authorization !== MOCK_BRAINTREE_AUTH) {
                    throw new Error(`Braintree expected authorization to be ${ MOCK_BRAINTREE_AUTH }`);
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

                return mockPayPalCheckout;
            });
        }
    }
};


for (let flow of [ 'popup', 'iframe' ]) {

    describe(`paypal button braintree tests on ${ flow }`, () => {

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
                        return done(new Error(`Expected data.nonce to be ${ MOCK_BRAINTREE_NONCE }, got ${ data.nonce }`));
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

                payment(data) : ZalgoPromise<string> {
                    return data.braintree.create({
                        flow:     'checkout',
                        amount:   '1.00',
                        currency: 'USD',
                        intent:   'sale'
                    });
                },

                onAuthorize(data) : void {

                    if (data.nonce !== MOCK_BRAINTREE_NONCE) {
                        return done(new Error(`Expected data.nonce to be ${ MOCK_BRAINTREE_NONCE }, got ${ data.nonce }`));
                    }

                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer');
        });

        it('should accept actions.payment.create', (done) => {

            let payment = {
                intent:       'authorize',
                transactions: [
                    {
                        amount: {
                            total:    '13.37',
                            currency: 'EUR'
                        }
                    }
                ]
            };

            window.paypal.Button.render({

                test: { flow, action: 'checkout' },

                braintree: mockBraintree,

                client: {
                    test: MOCK_BRAINTREE_AUTH
                },

                payment(data, actions) : ZalgoPromise<string> {
                    return actions.payment.create(payment);
                },

                onAuthorize(data) : void {

                    if (data.nonce !== MOCK_BRAINTREE_NONCE) {
                        return done(new Error(`Expected data.nonce to be ${ MOCK_BRAINTREE_NONCE }, got ${ data.nonce }`));
                    }

                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                },

                onError: done

            }, '#testContainer');
        });

        it('should accept actions.payment.create with a payment object', (done) => {

            let payment = {
                intent:       'authorize',
                transactions: [
                    {
                        amount: {
                            total:    '13.37',
                            currency: 'EUR'
                        }
                    }
                ]
            };

            window.paypal.Button.render({

                test: { flow, action: 'checkout' },

                braintree: mockBraintree,

                client: {
                    test: MOCK_BRAINTREE_AUTH
                },

                payment(data, actions) : ZalgoPromise<string> {
                    return actions.payment.create({ payment });
                },

                onAuthorize(data) : void {

                    if (data.nonce !== MOCK_BRAINTREE_NONCE) {
                        return done(new Error(`Expected data.nonce to be ${ MOCK_BRAINTREE_NONCE }, got ${ data.nonce }`));
                    }

                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                },

                onError: done

            }, '#testContainer');
        });

        it('should accept actions.payment.create and correctly map to a Braintree payment', (done) => {

            let payment = {
                intent:       'authorize',
                transactions: [
                    {
                        amount: {
                            total:    '13.37',
                            currency: 'EUR'
                        }
                    }
                ],
                payer: {
                    external_selected_funding_instrument_type: 'CREDIT',
                    shipping_address:                          {
                        line1:          'address_line1',
                        line2:          'address_line2',
                        city:           'address_city',
                        state:          'address_state',
                        postal_code:    'address_postal_code',
                        country_code:   'address_country_code',
                        phone:          'address_phone',
                        recipient_name: 'address_recipient_name'
                    }
                },
                application_context: {
                    brand_name:          'Snake Plissken',
                    shipping_preference: 'SET_PROVIDED_ADDRESS',
                    landing_page:        'billing'
                }
            };

            let createPayment = mockPayPalCheckout.createPayment;

            // $FlowFixMe
            mockPayPalCheckout.createPayment = (paymentOptions) => {

                // $FlowFixMe
                mockPayPalCheckout.createPayment = createPayment;

                if (paymentOptions.flow !== 'checkout') {
                    throw new Error(`Expected flow to be checkout`);
                }

                if (paymentOptions.intent !== payment.intent) {
                    throw new Error(`Expected ${ paymentOptions.intent } to be ${ payment.intent }`);
                }

                if (paymentOptions.amount !== payment.transactions[0].amount.total) {
                    throw new Error(`Expected ${ paymentOptions.amount } to be ${ payment.transactions[0].amount.total }`);
                }

                if (paymentOptions.currency !== payment.transactions[0].amount.currency) {
                    throw new Error(`Expected ${ paymentOptions.currency } to be ${ payment.transactions[0].amount.currency }`);
                }

                if (paymentOptions.offerCredit !== (payment.payer.external_selected_funding_instrument_type === 'CREDIT')) {
                    throw new Error(`Expected ${ paymentOptions.offerCredit } to be ${ (payment.payer.external_selected_funding_instrument_type === 'CREDIT').toString() }`);
                }

                if (paymentOptions.displayName !== payment.application_context.brand_name) {
                    throw new Error(`Expected ${ paymentOptions.displayName } to be ${ payment.application_context.brand_name }`);
                }

                if (paymentOptions.landingPageType !== payment.application_context.landing_page) {
                    throw new Error(`Expected ${ paymentOptions.landingPageType } to be ${ payment.application_context.landing_page }`);
                }

                if (paymentOptions.shippingAddressOverride.line1 !== payment.payer.shipping_address.line1) {
                    throw new Error(`Expected ${ paymentOptions.shippingAddressOverride.line1 } to be ${ payment.payer.shipping_address.line1 }`);
                }

                if (paymentOptions.shippingAddressOverride.line1 !== payment.payer.shipping_address.line1) {
                    throw new Error(`Expected ${ paymentOptions.shippingAddressOverride.line1 } to be ${ payment.payer.shipping_address.line1 }`);
                }

                if (paymentOptions.shippingAddressOverride.line2 !== payment.payer.shipping_address.line2) {
                    throw new Error(`Expected ${ paymentOptions.shippingAddressOverride.line2 } to be ${ payment.payer.shipping_address.line2 }`);
                }

                if (paymentOptions.shippingAddressOverride.city !== payment.payer.shipping_address.city) {
                    throw new Error(`Expected ${ paymentOptions.shippingAddressOverride.city } to be ${ payment.payer.shipping_address.city }`);
                }

                if (paymentOptions.shippingAddressOverride.state !== payment.payer.shipping_address.state) {
                    throw new Error(`Expected ${ paymentOptions.shippingAddressOverride.state } to be ${ payment.payer.shipping_address.state }`);
                }

                if (paymentOptions.shippingAddressOverride.postalCode !== payment.payer.shipping_address.postal_code) {
                    throw new Error(`Expected ${ paymentOptions.shippingAddressOverride.postalCode } to be ${ payment.payer.shipping_address.postal_code }`);
                }

                if (paymentOptions.shippingAddressOverride.countryCode !== payment.payer.shipping_address.country_code) {
                    throw new Error(`Expected ${ paymentOptions.shippingAddressOverride.countryCode } to be ${ payment.payer.shipping_address.country_code }`);
                }

                if (paymentOptions.shippingAddressOverride.phone !== payment.payer.shipping_address.phone) {
                    throw new Error(`Expected ${ paymentOptions.shippingAddressOverride.phone } to be ${ payment.payer.shipping_address.phone }`);
                }

                if (paymentOptions.shippingAddressOverride.recipientName !== payment.payer.shipping_address.recipient_name) {
                    throw new Error(`Expected ${ paymentOptions.shippingAddressOverride.recipientName } to be ${ payment.payer.shipping_address.recipient_name }`);
                }

                return createPayment(paymentOptions);
            };

            window.paypal.Button.render({

                test: { flow, action: 'checkout' },

                braintree: mockBraintree,

                client: {
                    test: MOCK_BRAINTREE_AUTH
                },

                payment(data, actions) : ZalgoPromise<string> {
                    return actions.payment.create(payment);
                },

                onAuthorize(data) : void {

                    if (data.nonce !== MOCK_BRAINTREE_NONCE) {
                        return done(new Error(`Expected data.nonce to be ${ MOCK_BRAINTREE_NONCE }, got ${ data.nonce }`));
                    }

                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                },

                onError: done

            }, '#testContainer');
        });

        it('should error on actions.payment.create with a payment object which can not be mapped', (done) => {

            let payment = {
                intent:       'authorize',
                transactions: [
                    {
                        amount: {
                            total:    '13.37',
                            currency: 'EUR',
                            foo:      'bar'
                        }
                    }
                ]
            };

            window.paypal.Button.render({

                test: { flow, action: 'checkout' },

                braintree: mockBraintree,

                client: {
                    test: MOCK_BRAINTREE_AUTH
                },

                payment(data, actions) : ZalgoPromise<string> {
                    return actions.payment.create({ payment }).then(() => {
                        return done(new Error('Expected actions.payment.create to error'));
                    });
                },

                onAuthorize() : void {
                    return done(new Error('Expected onAuthorize() to not be called'));
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                },

                onError() {
                    done();
                }

            }, '#testContainer');
        });

        it('should render a button with a promise based client into a container and click on the button, then complete the payment with actions.braintree', (done) => {

            window.paypal.Button.render({

                test: { flow, action: 'checkout' },

                braintree: mockBraintree,

                client: {
                    test: new ZalgoPromise(resolve => { setTimeout(resolve, 50); }).then(() => MOCK_BRAINTREE_AUTH)
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
                        return done(new Error(`Expected data.nonce to be ${ MOCK_BRAINTREE_NONCE }, got ${ data.nonce }`));
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
