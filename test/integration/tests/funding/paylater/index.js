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

    it(`should display Pay in 4 button text when payIn4 product is eligible and no variant`, () => {
        const fundingSource = FUNDING.PAYLATER;
        mockProp(window.__TEST_FUNDING_ELIGIBILITY__[fundingSource], 'eligible', true);
        mockProp(window.__TEST_FUNDING_ELIGIBILITY__[fundingSource], 'products', {
            payIn4: {
                eligible: true,
                variant:  null
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

    it(`should display Später Bezahlen label when paylater product is eligible and variant is DE`, () => {
        const fundingSource = FUNDING.PAYLATER;
        mockProp(window.__TEST_FUNDING_ELIGIBILITY__[fundingSource], 'eligible', true);
        mockProp(window.__TEST_FUNDING_ELIGIBILITY__[fundingSource], 'products', {
            paylater: {
                eligible: true,
                variant:  'DE'
            }
        });

        const button = window.paypal.Buttons({
            fundingSource
        });

        if (!button.isEligible()) {
            throw new Error(`Expected paylater to be eligible`);
        }

        return button.render('#testContainer').then(() => {
            assert.equal(getElementRecursive('.paypal-button-text').innerHTML, 'Später Bezahlen');
        });
    });

    it(`should display 4X PayPal label when payIn4 product is eligible and variant is FR`, () => {
        const fundingSource = FUNDING.PAYLATER;
        mockProp(window.__TEST_FUNDING_ELIGIBILITY__[fundingSource], 'eligible', true);
        mockProp(window.__TEST_FUNDING_ELIGIBILITY__[fundingSource], 'products', {
            payIn4: {
                eligible: true,
                variant:  'FR'
            }
        });

        const button = window.paypal.Buttons({
            fundingSource
        });

        if (!button.isEligible()) {
            throw new Error(`Expected paylater to be eligible`);
        }

        return button.render('#testContainer').then(() => {
            assert.equal(getElementRecursive('.paypal-button-text').innerHTML, '4X PayPal');
        });
    });

    it(`should display Paga in 3 rate label when payIn3 product is eligible and variant is IT`, () => {
        const fundingSource = FUNDING.PAYLATER;
        mockProp(window.__TEST_FUNDING_ELIGIBILITY__[fundingSource], 'eligible', true);
        mockProp(window.__TEST_FUNDING_ELIGIBILITY__[fundingSource], 'products', {
            payIn3: {
                eligible: true,
                variant:  'IT'
            }
        });

        const button = window.paypal.Buttons({
            fundingSource
        });

        if (!button.isEligible()) {
            throw new Error(`Expected paylater to be eligible`);
        }

        return button.render('#testContainer').then(() => {
            assert.equal(getElementRecursive('.paypal-button-text').innerHTML, 'Paga in 3 rate');
        });
    });

    it(`should display Paga en 3 plazos label when payIn3 product is eligible and variant is ES`, () => {
        const fundingSource = FUNDING.PAYLATER;
        mockProp(window.__TEST_FUNDING_ELIGIBILITY__[fundingSource], 'eligible', true);
        mockProp(window.__TEST_FUNDING_ELIGIBILITY__[fundingSource], 'products', {
            payIn3: {
                eligible: true,
                variant:  'ES'
            }
        });

        const button = window.paypal.Buttons({
            fundingSource
        });

        if (!button.isEligible()) {
            throw new Error(`Expected paylater to be eligible`);
        }

        return button.render('#testContainer').then(() => {
            assert.equal(getElementRecursive('.paypal-button-text').innerHTML, 'Paga en 3 plazos');
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
