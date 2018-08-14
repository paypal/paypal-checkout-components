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

        let client = window.paypal.client();

        client.Button.render({

            style: {
                layout: 'horizontal'
            },

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.length > 2) {
                        throw new Error(`Expected a maximum of 2 buttons to be rendered horizontally, got ${ fundingSources.length }`);
                    }

                    done();
                }
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

        let client = window.paypal.client();

        client.Button.render({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.length > 4) {
                        throw new Error(`Expected a maximum of 4 buttons to be rendered vertically, got ${ fundingSources.length }`);
                    }

                    done();
                }
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
