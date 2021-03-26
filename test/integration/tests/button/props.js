/* @flow */
/* eslint max-lines: 0 */

import { wrapPromise } from 'belter/src';
import { FUNDING } from '@paypal/sdk-constants/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import { createTestContainer, destroyTestContainer } from '../common';

describe(`paypal button component props`, () => {

    beforeEach(() => {
        createTestContainer();
    });

    afterEach(() => {
        destroyTestContainer();
    });

    it('should render a button and get any queried FIs', () => {
        const fundingSources = [
            FUNDING.PAYPAL,
            FUNDING.CREDIT,
            FUNDING.VENMO,
            FUNDING.APPLEPAY
        ];

        return ZalgoPromise.all(fundingSources.map(fundingSource => {
            return wrapPromise(({ expect, avoid }) => {
                let onRender = ({ xprops }) => {
                    if (fundingSource === FUNDING.APPLEPAY) {
                        window.ApplePaySession = {
                            canMakePayments: () => true
                        };
                        const applePay = xprops.applePay();
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
                        const session = applePay ? applePay(3, request) : undefined;
                        if (session) {
                            session.begin();
                        }
                    }
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
