/* @flow */

import { FUNDING } from '@paypal/sdk-constants/src';

import { createTestContainer, destroyTestContainer, mockProp, assert, getElementRecursive } from '../../common';

describe(`paylater button text`, () => {

    beforeEach(() => {
        createTestContainer();
    });

    afterEach(() => {
        destroyTestContainer();
    });

    it(`should display Pay in 4 button text when payIn4 product is eligible`, () => {
        const fundingSource = FUNDING.PAYLATER;
        mockProp(window.__TEST_FUNDING_ELIGIBILITY__[fundingSource], 'eligible', true);
        mockProp(window.__TEST_FUNDING_ELIGIBILITY__[fundingSource], 'products', {
            payIn4: {
                eligible: true
            }
        });

        const button = window.paypal.Buttons({
            fundingSource
        });

        if (!button.isEligible()) {
            throw new Error(`Expected paylater to be eligible`);
        }

        return button.render('#testContainer').then(() => {
            assert.equal(getElementRecursive('.paypal-button-text').innerHTML, 'Pay in 4');
        });
    });

    it(`should display Pay Later button text when payIn4 product is not eligible`, () => {
        const fundingSource = FUNDING.PAYLATER;
        mockProp(window.__TEST_FUNDING_ELIGIBILITY__[fundingSource], 'eligible', true);
        mockProp(window.__TEST_FUNDING_ELIGIBILITY__[fundingSource], 'products', {
            payIn4: {
                eligible: false
            }
        });

        const button = window.paypal.Buttons({
            fundingSource
        });

        if (!button.isEligible()) {
            throw new Error(`Expected paylater to be eligible`);
        }

        return button.render('#testContainer').then(() => {
            assert.equal(getElementRecursive('.paypal-button-text').innerHTML, 'Pay Later');
        });
    });

    it(`should fallback to Pay Later button text if unable to retrieve products`, () => {
        const fundingSource = FUNDING.PAYLATER;
        mockProp(window.__TEST_FUNDING_ELIGIBILITY__[fundingSource], 'eligible', true);
        mockProp(window.__TEST_FUNDING_ELIGIBILITY__[fundingSource], 'products', undefined);

        const button = window.paypal.Buttons({
            fundingSource
        });

        if (!button.isEligible()) {
            throw new Error(`Expected paylater to be eligible`);
        }

        return button.render('#testContainer').then(() => {
            assert.equal(getElementRecursive('.paypal-button-text').innerHTML, 'Pay Later');
        });
    });
});
