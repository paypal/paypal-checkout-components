/* @flow */
/* eslint max-lines: 0 */

import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { once } from '@krakenjs/belter/src';

import { createTestContainer, destroyTestContainer } from '../common';

describe(`paypal button layouts`, () => {

    beforeEach(() => {
        createTestContainer();
    });

    afterEach(() => {
        destroyTestContainer();
    });

    it('should render a maximum of 2 buttons horizontally', (done) => {
        done = once(done);
        window.paypal.Buttons({

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

            createOrder() : string | ZalgoPromise<string> {
                throw new Error('Expected createOrder to not be called');
            },

            onApprove() {
                throw new Error('Expected onApprove to not be called');
            },

            onCancel() {
                throw new Error('Expected onCancel to not be called');
            },

            onError: done

        }).render('#testContainer');
    });

    it('should render a maximum of 4 buttons vertically', (done) => {
        done = once(done);


        window.paypal.Buttons({

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

            createOrder() : string | ZalgoPromise<string> {
                throw new Error('Expected createOrder to not be called');
            },

            onApprove() {
                throw new Error('Expected onApprove to not be called');
            },

            onCancel() {
                throw new Error('Expected onCancel to not be called');
            },

            onError: done

        }).render('#testContainer');
    });
});
