/* @flow */

import { FUNDING } from '@paypal/sdk-constants/src';

import { IPHONE6_USER_AGENT, COMMON_DESKTOP_USER_AGENT, createTestContainer, destroyTestContainer, mockProp, assert, getElementRecursive } from '../../common';

const fundingSource = FUNDING.VENMO;

describe(`venmo native button test `, () => {

    beforeEach(() => {
        createTestContainer();
        window.navigator.mockUserAgent = IPHONE6_USER_AGENT;
        
    });

    afterEach(() => {
        destroyTestContainer();
    });


    it(`should display button when it's passed in as instrument on native`, (done) => {
        mockProp(window.__TEST_FUNDING_ELIGIBILITY__[fundingSource], 'eligible', true);

        window.paypal.Buttons({
            fundingSource,
            test:   {
                onRender: () => {
                    setTimeout(() => {
                        assert.ok(getElementRecursive(`[data-funding-source="${ fundingSource }"]`), 'Button');
                        done();
                    }, 1000);
                }
            }
        }).render('#testContainer');
    });

    it(`should display label when it's passed in as instrument on native`, (done) => {
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
                onRender: () => {
                    setTimeout(() => {
                        assert.equal(getElementRecursive('.paypal-button-text').innerHTML, '@foo');
                        done();
                    }, 1000);
                }
            }
        }).render('#testContainer');
    });
});


describe(`venmo desktop web button test `, () => {

    beforeEach(() => {
        createTestContainer();
        window.navigator.mockUserAgent = COMMON_DESKTOP_USER_AGENT;
        
    });

    afterEach(() => {
        destroyTestContainer();
    });


    it(`should not display button when it's passed in as instrument on desktop web`, (done) => {
        mockProp(window.__TEST_FUNDING_ELIGIBILITY__[fundingSource], 'eligible', true);
        
        const paypalButtons = window.paypal.Buttons({
            fundingSource
        });
        assert.equal(paypalButtons.isEligible(), false);
        done();
    });
});

describe(`venmo on tablet `, () => {

    beforeEach(() => {
        createTestContainer();
        window.navigator.mockUserAgent = 'Mozilla/5.0 (iPad; CPU OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Mobile/15E148 Safari/604.1';
        
    });

    afterEach(() => {
        destroyTestContainer();
    });


    it(`should NOT display button`, (done) => {
        mockProp(window.__TEST_FUNDING_ELIGIBILITY__[fundingSource], 'eligible', true);
        
        const paypalButtons = window.paypal.Buttons({
            fundingSource
        });
        assert.equal(paypalButtons.isEligible(), false);
        done();
    });
});
