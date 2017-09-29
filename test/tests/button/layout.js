/* @flow */
/* eslint max-lines: 0 */

import { ZalgoPromise } from 'zalgo-promise/src';

import { createTestContainer, destroyTestContainer } from '../common';

describe(`paypal button layouts`, () => {

    beforeEach(() => {
        createTestContainer();
    });

    afterEach(() => {
        destroyTestContainer();
        window.location.hash = '';
    });

    it('should render a maximum of 2 buttons horizontally', (done) => {

        window.paypal.Button.render({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.length > 2) {
                        throw new Error(`Expected a maximum of 2 buttons to be rendered horizontally, got ${ fundingSources.length }`);
                    }

                    done();
                }
            },

            funding: {
                allowed: [ window.paypal.FUNDING.CARD, window.paypal.FUNDING.VENMO, window.paypal.FUNDING.CREDIT ]
            },

            payment() : string | ZalgoPromise<string> {
                throw new Error('Expected payment to not be called');
            },

            onAuthorize() {
                throw new Error('Expected onAuthorize to not be called');
            },

            onCancel() {
                throw new Error('Expected onCancel to not be called');
            },

            onError: done

        }, '#testContainer');
    });

    it('should render a maximum of 4 buttons vertically', (done) => {

        window.paypal.Button.render({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.length > 4) {
                        throw new Error(`Expected a maximum of 4 buttons to be rendered vertically, got ${ fundingSources.length }`);
                    }

                    done();
                }
            },

            funding: {
                allowed: [ window.paypal.FUNDING.CARD, window.paypal.FUNDING.VENMO, window.paypal.FUNDING.CREDIT, window.paypal.FUNDING.IDEAL, window.paypal.FUNDING.ELV ]
            },

            style: {
                layout: 'vertical'
            },

            payment() : string | ZalgoPromise<string> {
                throw new Error('Expected payment to not be called');
            },

            onAuthorize() {
                throw new Error('Expected onAuthorize to not be called');
            },

            onCancel() {
                throw new Error('Expected onCancel to not be called');
            },

            onError: done

        }, '#testContainer');
    });
});
