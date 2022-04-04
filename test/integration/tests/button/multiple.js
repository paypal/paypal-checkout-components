/* @flow */
/* eslint max-lines: 0 */

import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { FUNDING } from '@paypal/sdk-constants/src';
import { rememberFunding } from '@paypal/funding-components/src';
import { once } from '@krakenjs/belter/src';

import { generateOrderID, createTestContainer, destroyTestContainer, IPHONE6_USER_AGENT, assert, mockProp, WEBVIEW_USER_AGENT } from '../common';

for (const flow of [ 'popup', 'iframe' ]) {

    describe(`paypal multiple button component happy path on ${ flow }`, () => {


        beforeEach(() => {
            createTestContainer();
            if (flow === 'iframe') {
                window.navigator.mockUserAgent = WEBVIEW_USER_AGENT;
            }
        });

        afterEach(() => {
            destroyTestContainer();
        });

        const cases = [

            {
                source:   FUNDING.CARD,
                fragment: 'checkouturl=true'
            },

            {
                source:    FUNDING.VENMO,
                fragment:  'checkouturl=true',
                userAgent: IPHONE6_USER_AGENT
            },

            {
                source:   FUNDING.CREDIT,
                fragment: 'checkouturl=true'
            },

            {
                source:   FUNDING.IDEAL,
                fragment: 'checkouturl=true',
                commit:   true
            },

            {
                source:   FUNDING.SEPA,
                fragment: 'checkouturl=true'
            }

        ];

        // $FlowFixMe
        for (const { source, fragment, userAgent, commit } of cases) {
            it(`should render multiple buttons including ${ source }, click on the ${ source } button, and send the correct url params`, (done) => {
                done = once(done);

                if (userAgent) {
                    const screenHeight = 667;

                    window.navigator.mockUserAgent = userAgent;
                    window.outerHeight = screenHeight;
                    window.innerHeight = 553;
                    window.screen = {
                        screenHeight
                    };
                }

                const orderID = generateOrderID();

                const mockEligibility = mockProp(window.__TEST_FUNDING_ELIGIBILITY__[source], 'eligible', true);

                if (source === FUNDING.VENMO) {
                    rememberFunding([ FUNDING.VENMO ], { cookie: false });
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
            });
        }
    });
}
