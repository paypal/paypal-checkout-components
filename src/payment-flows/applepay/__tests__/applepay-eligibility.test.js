/* @flow */
import { FUNDING } from '@paypal/sdk-constants/src';

import { applepay } from '../applepay';

describe('isApplePayEligible', () => {
    test('it should be eligible', () => {
        expect(
            // $FlowFixMe
            applepay.isEligible({
                // $FlowFixMe
                serviceData: {
                    fundingEligibility: {
                        // $FlowFixMe
                        [FUNDING.APPLEPAY]: {
                            eligible: true
                        }
                    }
                }
            })
        ).toEqual(true);
    });

    test('should be ineligible when funding ineligible', () => {
        expect(
            // $FlowFixMe
            applepay.isEligible({
                // $FlowFixMe
                serviceData: {
                    fundingEligibility: {
                        // $FlowFixMe
                        [FUNDING.APPLEPAY]: {
                            eligible: false
                        }
                    }
                }
            })
        ).toEqual(false);
    });
});

describe('isApplePayPaymentEligible', () => {
    test('should be eligible when fundingSource is APPLEPAY', () => {
        expect(
            // $FlowFixMe
            applepay.isPaymentEligible({
                // $FlowFixMe
                payment: {
                    // $FlowFixMe
                    fundingSource: FUNDING.APPLEPAY
                }
            })
        ).toEqual(true);
    });
    test('should ineligible when funding is not APPLEPAY', () => {
        expect(
            // $FlowFixMe
            applepay.isPaymentEligible({
                // $FlowFixMe
                payment: {
                    fundingSource: FUNDING.IDEAL
                }
            })
        ).toEqual(false);
    });
});
