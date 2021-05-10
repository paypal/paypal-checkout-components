/* @flow */
/* eslint max-lines: 0 */

import { wrapPromise } from 'belter/src';
import { FUNDING } from '@paypal/sdk-constants/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import { createTestContainer, destroyTestContainer, IPHONE6_USER_AGENT } from '../common';

describe(`paypal button component props`, () => {

    beforeEach(() => {
        createTestContainer();
    });

    afterEach(() => {
        destroyTestContainer();
    });

    it('should render an Apple Pay button if applePaySupport is true', () => {
        // setup applePaySupport
        window.navigator.mockUserAgent = IPHONE6_USER_AGENT;
        window.ApplePaySession = {
            canMakePayments: () => true,
            supportsVersion: () => true
        };

        return ZalgoPromise.try(() => {
            return wrapPromise(({ expect, avoid }) => {
                let onRender = ({ xprops }) => {
                    const applePay = xprops.applePay;
                    const request = {
                        'countryCode':          'US',
                        'currencyCode':         'USD',
                        'merchantCapabilities': [
                            'supports3DS'
                        ],
                        'supportedNetworks': [
                            'visa',
                            'masterCard',
                            'amex',
                            'discover'
                        ],
                        'total': {
                            'label':    'Demo (Card is not charged)',
                            'type':     'final',
                            'amount':   '1.99'
                        }
                    };
                    applePay(3, request).then(response => {
                        const {
                            begin,
                            addListener,
                            completeMerchantValidation,
                            completeShippingContactSelection,
                            completePaymentMethodSelection,
                            completeShippingMethodSelection,
                            completePayment
                        } = response;

                        expect(begin);
                        expect(addListener);
                        expect(completeMerchantValidation);
                        expect(completeShippingContactSelection);
                        expect(completePaymentMethodSelection);
                        expect(completeShippingMethodSelection);
                        expect(completePayment);
                    });
                };

                const fundingSource = FUNDING.APPLEPAY;
                const instance = window.paypal.Buttons({
                    test: {
                        action:   'checkout',
                        onRender: (...args) => onRender(...args)
                    },
                    fundingSource,
                    onApprove: avoid('onApprove'),
                    onCancel:  avoid('onCancel')

                });
                
                if (instance.isEligible()) {
                    onRender = expect('onRender', onRender);
                    return instance.render('#testContainer');
                }
            });
        });
    });

    it('should render a button and get any queried FIs', () => {
        const fundingSources = [
            FUNDING.PAYPAL,
            FUNDING.CREDIT,
            FUNDING.VENMO
        ];

        return ZalgoPromise.all(fundingSources.map(fundingSource => {
            return wrapPromise(({ expect, avoid }) => {
                let onRender = ({ xprops }) => {
                    return xprops.getQueriedEligibleFunding().then(queriedFundingSources => {
                        if (JSON.stringify(queriedFundingSources) !== JSON.stringify(fundingSources)) {
                            throw new Error(`Expected ${ fundingSources.join(',') } to be queried, got ${ queriedFundingSources.join(',') }`);
                        }
                    });
                };

                const instance = window.paypal.Buttons({
                    test: {
                        action:   'checkout',
                        onRender: (...args) => onRender(...args)
                    },

                    fundingSource,
                    onApprove: avoid('onApprove'),
                    onCancel:  avoid('onCancel')

                });
                
                if (instance.isEligible()) {
                    onRender = expect('onRender', onRender);
                    return instance.render('#testContainer');
                }
            });
        }));
    });
});
