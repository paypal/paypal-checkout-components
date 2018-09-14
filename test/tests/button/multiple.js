/* @flow */
/* eslint max-lines: 0 */

import { ZalgoPromise } from 'zalgo-promise/src';

import { generateOrderID, createTestContainer, destroyTestContainer, IPHONE6_USER_AGENT, assert, mockProp } from '../common';

for (let flow of [ 'popup', 'iframe' ]) {

    describe(`paypal multiple button component happy path on ${ flow }`, () => {


        beforeEach(() => {
            createTestContainer();
            window.paypal.Checkout.contexts.iframe = (flow === 'iframe');
        });

        afterEach(() => {
            destroyTestContainer();
            window.location.hash = '';
            window.paypal.Checkout.contexts.iframe = false;
        });

        let cases = [

            {
                source:   window.paypal.FUNDING.CARD,
                fragment: 'guesturl=true'
            },

            {
                source:    window.paypal.FUNDING.VENMO,
                fragment:  'checkouturl=true',
                userAgent: IPHONE6_USER_AGENT
            },

            {
                source:   window.paypal.FUNDING.CREDIT,
                fragment: 'checkouturl=true'
            },

            {
                source:   window.paypal.FUNDING.IDEAL,
                fragment: 'checkouturl=true',
                country:   'NL',
                commit:   true
            },

            {
                source:   window.paypal.FUNDING.SEPA,
                fragment: 'guesturl=true',
                country:   'DE'
            }

        ];

        // $FlowFixMe
        for (let { source, fragment, country, userAgent, commit } of cases) {
            it(`should render multiple buttons including ${ source }, click on the ${ source } button, and send the correct url params`, (done) => {

                if (userAgent) {
                    window.navigator.mockUserAgent = userAgent;
                }

                let orderID = generateOrderID();

                let mockEligibility = mockProp(window.__TEST_FUNDING_ELIGIBILITY__[source], 'eligible', true);
                let mockCountry = mockProp(window, '__TEST_LOCALE_COUNTRY__', country || 'US');

                if (source === window.paypal.FUNDING.VENMO) {
                    window.__TEST_REMEMBERED_FUNDING__.push(window.paypal.FUNDING.VENMO);
                }
                
                window.paypal.Buttons({

                    test: { flow, action: 'checkout', selector: `[data-funding-source="${ source }"]` },

                    commit,

                    style: {
                        layout: 'vertical'
                    },

                    createOrder() : string | ZalgoPromise<string> {
                        return ZalgoPromise.resolve(orderID);
                    },

                    onApprove(data) : void {
                        assert.ok(data.currentUrl.indexOf(`token=${ orderID }`) !== -1);
                        assert.ok(data.currentUrl.indexOf(fragment) !== -1);
                        assert.ok(data.currentUrl.indexOf(`fundingSource=${ source }`) !== -1);
                        return done();
                    },

                    onCancel() : void {
                        return done(new Error('Expected onCancel to not be called'));
                    }

                }).render('#testContainer');

                mockEligibility.cancel();
                mockCountry.cancel();

                if (source === window.paypal.FUNDING.VENMO) {
                    window.__TEST_REMEMBERED_FUNDING__.splice(window.__TEST_REMEMBERED_FUNDING__.indexOf(window.paypal.FUNDING.VENMO), 1);
                }
            });
        }
    });
}
