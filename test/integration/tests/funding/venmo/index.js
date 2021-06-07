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

    it(`should display label when it's passed in as instrument`, (done) => {
        const fundingSource = FUNDING.VENMO;
        const wallet = {
            [fundingSource]: {
                instruments: [
                    {
                        label: '@foo'
                    }
                ]
            }
        };

        mockProp(window.__TEST_FUNDING_ELIGIBILITY__[fundingSource], 'eligible', true);

        window.paypal.Buttons({
            fundingSource,
            wallet,
            test:   {
                onRender: ('onRender', () => {
                    setTimeout(() => {
                        assert.equal(getElementRecursive('.paypal-button-text').innerHTML, '@foo');
                        done();
                    }, 1000);
                })
            }
        }).render('#testContainer');
    });
});
