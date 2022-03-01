/* @flow */
/* eslint max-lines: 0 */

import { FUNDING } from '@paypal/sdk-constants/src';
import { wrapPromise } from '@krakenjs/belter/src';

import { createTestContainer, destroyTestContainer, mockProp } from '../common';

const SUPPORTED_FUNDING_SOURCES = [
    FUNDING.IDEAL,
    FUNDING.BANCONTACT,
    FUNDING.GIROPAY,
    FUNDING.SOFORT,
    FUNDING.EPS,
    FUNDING.MYBANK,
    FUNDING.P24,
    FUNDING.PAYU,
    FUNDING.BLIK,
    FUNDING.TRUSTLY
];

describe(`paypal standalone fields`, () => {

    beforeEach(() => {
        createTestContainer();
    });

    afterEach(() => {
        destroyTestContainer();
    });

    for (const fundingSource of SUPPORTED_FUNDING_SOURCES) {
        if (!window.__TEST_FUNDING_ELIGIBILITY__[fundingSource]) {
            continue;
        }

        it(`should render a standalone ${ fundingSource } PaymentFields element and call onInit`, () => {
            return wrapPromise(({ expect }) => {
                const mockEligibility = mockProp(window.__TEST_FUNDING_ELIGIBILITY__[fundingSource], 'eligible', true);

                const fields = window.paypal.PaymentFields({
                    fundingSource,
                    onInit:   expect('onInit')
                });

                return fields.render('#testContainer').then(() => {
                    mockEligibility.cancel();
                });
            });
        });

    }

});
