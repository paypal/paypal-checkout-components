/* @flow */


import { getPaymentApiMock, getExperienceApiMock, generatePaymentID,
    generateExperienceToken, MERCHANT_CLIENT_ID } from '../common';

describe(`paypal checkout auth api`, () => {

    it('should call the payment api and get a payment id', () => {

        let paymentApi = getPaymentApiMock().expectCalls();

        return window.paypal.rest.payment.create('test', { test: MERCHANT_CLIENT_ID }, {
            transactions: [
                {
                    amount: { total: '1.00', currency: 'USD' }
                }
            ]

        }).then(paymentID => {

            paymentApi.done();

            if (!paymentID.match(/^PAY-[A-Z0-9]+$/)) {
                throw new Error(`Expected valid payment ID, got ${ paymentID }`);
            }
        });
    });

    it('should call the payment api and ensure the params are passed over, and get a payment id', () => {

        let paymentApi = getPaymentApiMock({
            handler({ data }) : { id : string } {
                if (!data.transactions) {
                    throw new Error(`Expected data.transactions to be passed`);
                }

                if (!data.transactions[0]) {
                    throw new Error(`Expected data.transactions[0] to be passed`);
                }

                if (!data.transactions[0].amount) {
                    throw new Error(`Expected data.transactions[0].amount to be passed`);
                }

                if (data.transactions[0].amount.total !== '1.00') {
                    throw new Error(`Expected data.transactions[0].amount.total to be 1.00, got ${ data.transactions[0].total }`);
                }

                if (data.transactions[0].amount.currency !== 'USD') {
                    throw new Error(`Expected data.transactions[0].amount.total to be USD, got ${ data.transactions[0].currency }`);
                }

                return {
                    id: generatePaymentID()
                };
            }
        }).expectCalls();

        return window.paypal.rest.payment.create('test', { test: MERCHANT_CLIENT_ID }, {
            transactions: [
                {
                    amount: { total: '1.00', currency: 'USD' }
                }
            ]

        }).then(paymentID => {

            paymentApi.done();

            if (!paymentID.match(/^PAY-[A-Z0-9]+$/)) {
                throw new Error(`Expected valid payment ID, got ${ paymentID }`);
            }
        });
    });

    it('should call the payment api with an experience profile and get a payment id', () => {

        let experienceID = generateExperienceToken();

        let experienceApi = getExperienceApiMock({
            handler({ data }) : { id : string } {
                if (!data.presentation) {
                    throw new Error(`Expected data.presentation to be passed`);
                }

                if (data.presentation.logo_image !== 'https://foo.com/bar.png') {
                    throw new Error(`Expected data.presentation.logo_image to be 'https://foo.com/bar.png', got "${ data.presentation.logo_image }"`);
                }

                if (!data.input_fields) {
                    throw new Error(`Expected data.input_fields to be passed`);
                }

                if (data.input_fields.no_shipping !== 1) {
                    throw new Error(`Expected data.input_fields.no_shipping to be 1, got "${ data.input_fields.no_shipping }"`);
                }

                if (data.input_fields.address_override !== 1) {
                    throw new Error(`Expected data.input_fields.address_override to be 1, got "${ data.input_fields.address_override }"`);
                }

                return {
                    id: experienceID
                };
            }
        }).expectCalls();

        let paymentApi = getPaymentApiMock({
            handler({ data }) : { id : string } {
                if (data.experience_profile_id !== experienceID) {
                    throw new Error(`Expected data.experience_profile_id to be ${ experienceID }, got ${ data.experience_profile_id }`);
                }

                return {
                    id: generatePaymentID()
                };
            }
        }).expectCalls();

        return window.paypal.rest.payment.create('test', { test: MERCHANT_CLIENT_ID }, {
            transactions: [
                {
                    amount: { total: '1.00', currency: 'USD' }
                }
            ]
        }, {
            presentation: {
                logo_image: 'https://foo.com/bar.png'
            },
            input_fields: {
                no_shipping:      1,
                address_override: 1
            }
        }).then(paymentID => {

            paymentApi.done();
            experienceApi.done();

            if (!paymentID.match(/^PAY-[A-Z0-9]+$/)) {
                throw new Error(`Expected valid payment ID, got ${ paymentID }`);
            }
        });
    });

    it('should call the payment api with an experience profile and bn code in the new style and get a payment id', () => {

        let experienceID = generateExperienceToken();
        let partnerAttributionID = 'foobarbazmerchant';

        let experienceApi = getExperienceApiMock({
            handler({ data }) : { id : string } {
                if (!data.presentation) {
                    throw new Error(`Expected data.presentation to be passed`);
                }

                if (data.presentation.logo_image !== 'https://foo.com/bar.png') {
                    throw new Error(`Expected data.presentation.logo_image to be 'https://foo.com/bar.png', got "${ data.presentation.logo_image }"`);
                }

                if (!data.input_fields) {
                    throw new Error(`Expected data.input_fields to be passed`);
                }

                if (data.input_fields.no_shipping !== 1) {
                    throw new Error(`Expected data.input_fields.no_shipping to be 1, got "${ data.input_fields.no_shipping }"`);
                }

                if (data.input_fields.address_override !== 0) {
                    throw new Error(`Expected data.input_fields.address_override to be 0, got "${ data.input_fields.address_override }"`);
                }

                return {
                    id: experienceID
                };
            }
        }).expectCalls();

        let paymentApi = getPaymentApiMock({
            handler({ data, headers }) : { id : string } {
                if (data.experience_profile_id !== experienceID) {
                    throw new Error(`Expected data.experience_profile_id to be ${ experienceID }, got ${ data.experience_profile_id }`);
                }

                if (headers['paypal-partner-attribution-id'] !== partnerAttributionID) {
                    throw new Error(`Expected paypal-partner-attribution-id to be ${ partnerAttributionID }, got ${ headers['paypal-partner-attribution-id'] }`);
                }

                return {
                    id: generatePaymentID()
                };
            }
        }).expectCalls();

        return window.paypal.rest.payment.create('test', { test: MERCHANT_CLIENT_ID }, {

            payment: {
                transactions: [
                    {
                        amount: { total: '1.00', currency: 'USD' }
                    }
                ]
            },

            experience: {
                presentation: {
                    logo_image: 'https://foo.com/bar.png'
                },
                input_fields: {
                    no_shipping:      1,
                    address_override: 0
                }
            },

            meta: {
                partner_attribution_id: partnerAttributionID
            }

        }).then(paymentID => {

            paymentApi.done();
            experienceApi.done();

            if (!paymentID.match(/^PAY-[A-Z0-9]+$/)) {
                throw new Error(`Expected valid payment ID, got ${ paymentID }`);
            }
        });
    });

    it('should call the payment api and get a payment id and work even when the api does not return json content-type header', () => {

        let paymentApi = getPaymentApiMock({
            headers: {
                'content-type': 'text/html'
            }
        }).expectCalls();

        return window.paypal.rest.payment.create('test', { test: MERCHANT_CLIENT_ID }, {
            transactions: [
                {
                    amount: { total: '1.00', currency: 'USD' }
                }
            ]

        }).then(paymentID => {

            paymentApi.done();

            if (!paymentID.match(/^PAY-[A-Z0-9]+$/)) {
                throw new Error(`Expected valid payment ID, got ${ paymentID }`);
            }
        });
    });
});
