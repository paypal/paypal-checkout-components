/* @flow */

import { FUNDING } from '@paypal/sdk-constants/src';

import { createTestContainer, destroyTestContainer, mockProp } from '../common';

describe(`paypal button funding source order`, () => {

    beforeEach(() => {
        createTestContainer();
    });

    afterEach(() => {
        destroyTestContainer();
    });

    it('should render card last in the list if it is an available funding source', (done) => {
        const eligibleFundingSources = [
            FUNDING.PAYPAL,
            FUNDING.CARD,
            FUNDING.IDEAL,
            FUNDING.SEPA
        ];

        for (const source of eligibleFundingSources) {
            mockProp(window.__TEST_FUNDING_ELIGIBILITY__[source], 'eligible', true);
        }

        window.paypal.Buttons({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.indexOf(FUNDING.CARD) !== fundingSources.length - 1) {
                        done(new Error(`Expected card to be at index ${ fundingSources.length - 1 }, found at index ${ fundingSources.indexOf(FUNDING.CARD) }`));
                    }
                    done();
                }
            },

            style: {
                layout: 'vertical'
            },

            createOrder() {
                done(new Error('Expected createOrder to not be called'));
            },

            onApprove() {
                done(new Error('Expected onApprove to not be called'));
            },

            onCancel() {
                done(new Error('Expected onCancel to not be called'));
            },

            onError: done

        }).render('#testContainer');
    });

});
