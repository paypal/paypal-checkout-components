/* @flow */
/* eslint max-lines: 0 */

import { COUNTRY_LANGS } from 'paypal-braintree-web-client/src';

import { mockProp, createTestContainer, destroyTestContainer } from '../common';

describe.skip(`paypal button component locales`, () => {

    beforeEach(() => {
        createTestContainer();
    });

    afterEach(() => {
        destroyTestContainer();
        window.location.hash = '';
    });


    for (let country of Object.keys(COUNTRY_LANGS)) {
        for (let lang of COUNTRY_LANGS[country]) {
            it(`should render the button for ${ lang }_${ country }`, () => {
                let mockCountry = mockProp(window, '__TEST_LOCALE_COUNTRY__', country);
                let mockLang = mockProp(window, '__TEST_LOCALE_LANG__', lang);

                return window.paypal.Buttons({
                    createOrder() {
                        // pass
                    },
                    onApprove() {
                        // pass
                    }
                }).render('#testContainer').then(() => {
                    mockCountry.cancel();
                    mockLang.cancel();
                });
            });
        }
    }
});
