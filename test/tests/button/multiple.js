/* @flow */
/* eslint max-lines: 0 */

import { ZalgoPromise } from 'zalgo-promise/src';

import { generateECToken, createTestContainer, destroyTestContainer, IPHONE6_USER_AGENT, assert, mockProp } from '../common';

for (let flow of [ 'popup', 'iframe' ]) {

    describe(`paypal multiple button component happy path on ${ flow }`, () => {

        let client = window.paypal.client();

        beforeEach(() => {
            createTestContainer();
            client.Checkout.contexts.iframe = (flow === 'iframe');
        });

        afterEach(() => {
            destroyTestContainer();
            window.location.hash = '';
            client.Checkout.contexts.iframe = false;
        });

        let cases = [

            {
                source:   client.FUNDING.CARD,
                fragment: 'guesturl=true'
            },

            {
                source:    client.FUNDING.VENMO,
                fragment:  'checkouturl=true',
                userAgent: IPHONE6_USER_AGENT
            },

            {
                source:   client.FUNDING.CREDIT,
                fragment: 'checkouturl=true'
            },

            {
                source:   client.FUNDING.IDEAL,
                fragment: 'checkouturl=true',
                locale:   'nl_NL',
                commit:   true
            },

            {
                source:   client.FUNDING.ELV,
                fragment: 'guesturl=true',
                locale:   'de_DE'
            }

        ];

        // $FlowFixMe
        for (let { source, fragment, locale, userAgent, commit } of cases) {
            it(`should render multiple buttons including ${ source }, click on the ${ source } button, and send the correct url params`, (done) => {

                if (userAgent) {
                    window.navigator.mockUserAgent = userAgent;
                }

                let checkoutToken = generateECToken();

                let mockLocaleProp = mockProp(client.Button.props, 'locale', {
                    required: false,
                    value:    locale || 'en_US'
                });

                client.Button.render({

                    test: { flow, action: 'checkout', selector: `[data-funding-source="${ source }"]` },

                    commit,

                    style: {
                        layout: 'vertical'
                    },

                    funding: {
                        allowed: [ source ]
                    },

                    payment() : string | ZalgoPromise<string> {
                        return checkoutToken;
                    },

                    onAuthorize(data) : void {
                        assert.ok(data.currentUrl.indexOf(`token=${ checkoutToken }`) !== -1);
                        assert.ok(data.currentUrl.indexOf(fragment) !== -1);
                        assert.ok(data.currentUrl.indexOf(`fundingSource=${ source }`) !== -1);
                        return done();
                    },

                    onCancel() : void {
                        return done(new Error('Expected onCancel to not be called'));
                    }

                }, '#testContainer');

                mockLocaleProp.cancel();
            });
        }
    });
}
