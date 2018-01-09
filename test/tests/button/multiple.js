/* @flow */
/* eslint max-lines: 0 */

import { assert } from 'chai';
import { ZalgoPromise } from 'zalgo-promise/src';

import { generateECToken, createTestContainer, destroyTestContainer, IPHONE6_USER_AGENT } from '../common';

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
                fragment: 'guesturl=true',
                locale:   'en_US'
            },

            {
                source:    window.paypal.FUNDING.VENMO,
                fragment:  'checkouturl=true',
                locale:    'en_US',
                userAgent: IPHONE6_USER_AGENT
            },

            {
                source:   window.paypal.FUNDING.CREDIT,
                fragment: 'checkouturl=true',
                locale:   'en_US'
            },

            {
                source:   window.paypal.FUNDING.IDEAL,
                fragment: 'checkouturl=true',
                locale:   'nl_NL'
            },

            {
                source:   window.paypal.FUNDING.ELV,
                fragment: 'guesturl=true',
                locale:   'de_DE'
            }

        ];

        // $FlowFixMe
        for (let { source, fragment, locale, userAgent } of cases) {
            it(`should render multiple buttons including ${ source }, click on the ${ source } button, and send the correct url params`, (done) => {

                if (userAgent) {
                    window.navigator.mockUserAgent = userAgent;
                }

                let checkoutToken = generateECToken();

                window.paypal.Button.render({

                    test: { flow, action: 'checkout', selector: `[data-funding-source="${ source }"]` },

                    locale,

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
                        assert.isOk(data.currentUrl.indexOf(`token=${ checkoutToken }`) !== -1);
                        assert.isOk(data.currentUrl.indexOf(fragment) !== -1);
                        assert.isOk(data.currentUrl.indexOf(`fundingSource=${ source }`) !== -1);
                        assert.isOk(data.currentUrl.indexOf(`&ba_token=`) === -1);
                        assert.isOk(data.currentUrl.indexOf(`?ba_token=`) === -1);
                        assert.isOk(data.currentUrl.indexOf(`billingurl`) === -1);
                        return done();
                    },

                    onCancel() : void {
                        return done(new Error('Expected onCancel to not be called'));
                    }

                }, '#testContainer');
            });
        }
    });
}
