/* @flow */

import { FUNDING } from '@paypal/sdk-constants/src';

import { IPHONE6_USER_AGENT, createTestContainer, destroyTestContainer, mockProp, assert, getElementRecursive } from '../../common';

describe(`venmo button label test`, () => {

    beforeEach(() => {
        createTestContainer();
        window.navigator.mockUserAgent = IPHONE6_USER_AGENT;
    });

    afterEach(() => {
        destroyTestContainer();
    });

    it(`should display label when it's passed in as instrument`, () => {
        const fundingSource = FUNDING.VENMO;
        const wallet = {
            [fundingSource]: {
                intruments: [
                    {
                        label: '@foo'
                    }
                ]
            }
        };

        mockProp(window.__TEST_FUNDING_ELIGIBILITY__[fundingSource], 'eligible', true);

        const button = window.paypal.Buttons({
            fundingSource,
            wallet
        });

        if (!button.isEligible()) {
            throw new Error(`Expected venmo to be eligible`);
        }

        return button.render('#testContainer').then(() => {
            assert.equal(getElementRecursive('.paypal-button-text').innerHTML, '@foo');
        });
    });
});
