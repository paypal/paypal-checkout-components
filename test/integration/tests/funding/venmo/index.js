/* @flow */

import { FUNDING } from '@paypal/sdk-constants/src';

import { ZalgoPromise } from 'zalgo-promise/src';

import { IPHONE6_USER_AGENT, WEBVIEW_USER_AGENT, createTestContainer, destroyTestContainer, mockProp, assert, getElementRecursive } from '../../common';

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
                onRender: ('onRender', () => {
                    setTimeout(() => {
                        assert.ok(getElementRecursive(`[data-funding-source="${ fundingSource }"]`), 'Button');
                        done();
                    }, 1000);
                })
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


describe(`venmo desktop web button test `, () => {

    beforeEach(() => {
        createTestContainer();
        window.navigator.mockUserAgent = WEBVIEW_USER_AGENT;
        
    });

    afterEach(() => {
        destroyTestContainer();
    });


    it(`should not display button when it's passed in as instrument on desktop web`, (done) => {
        mockProp(window.__TEST_FUNDING_ELIGIBILITY__[fundingSource], 'eligible', true);
        
        let paypalButtons = window.paypal.Buttons({
            fundingSource: fundingSource
        });
        assert.equal(paypalButtons.isEligible() === false);
        done();
    });
});
