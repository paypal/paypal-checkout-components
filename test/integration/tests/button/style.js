/* @flow */
/* eslint max-lines: 0 */

import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { once } from '@krakenjs/belter/src';

import { generateOrderID, createTestContainer, destroyTestContainer, getElementRecursive, assert, WEBVIEW_USER_AGENT } from '../common';

for (const flow of [ 'popup', 'iframe' ]) {

    describe(`paypal button style cases on ${ flow }`, () => {

        beforeEach(() => {
            createTestContainer();
            if (flow === 'iframe') {
                window.navigator.mockUserAgent = WEBVIEW_USER_AGENT;
            }
        });

        afterEach(() => {
            destroyTestContainer();
        });

        it('should render a button and click and get a black overlay', (done) => {
            done = once(done);
            window.paypal.Buttons({

                test: {
                    flow,
                    action: 'checkout',
                    onRender() {
                        assert.ok(getElementRecursive('.paypal-checkout-background-color-black'));
                        done();
                    }
                },

                createOrder() : string | ZalgoPromise<string> {
                    return ZalgoPromise.resolve(generateOrderID());
                },

                onApprove() : void {
                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }).render('#testContainer');
        });
    });
}

describe('paypal button color', () => {
    beforeEach(() => {
        createTestContainer();
    });

    afterEach(() => {
        destroyTestContainer();
    });

    it('should render a button with gold background when no color is specified', () => {
        return window.paypal.Buttons({
            style: {
                color: ''
            }
        }).render('#testContainer').then(() => {
            assert.ok(getElementRecursive('.paypal-button-color-gold'));
        });
    });

    it('should render a button with black background when passed "black"', () => {
        return window.paypal.Buttons({
            style: {
                color: 'black'
            }
        }).render('#testContainer').then(() => {
            assert.ok(getElementRecursive('.paypal-button-color-black'));
        });
    });

    it('should render a button with gold background when passed ""', () => {
        return window.paypal.Buttons({
            style: {
                color: ''
            }
        }).render('#testContainer').then(() => {
            assert.ok(getElementRecursive('.paypal-button-color-gold'));
        });
    });

    it('should not mutate the style object', (done) => {
        const style = {
            shape: 'pill'
        };
        const expected = JSON.stringify(style);
        done = once(done);
        window.paypal.Buttons({
            style,
            test: {
                onRender() {
                    if (JSON.stringify(style) !== expected) {
                        done(new Error(`Expected style object ${ JSON.stringify(style) } to remain unmodified as ${ expected }`));
                    }
                    done();
                }
            },

            onError: done

        }).render('#testContainer');
    });

    it('should allow custom styling for inlinexo', (done) => {
        const style = {
            custom: {
                label: 'Checkout',
                css:   {
                    background: 'white',
                    height:     '24px'
                }
            }
        };
        const expected = JSON.stringify(style);
        done = once(done);
        window.paypal.Buttons({
            style,
            test: {
                onRender() {
                    if (JSON.stringify(style) !== expected) {
                        done(new Error(`Expected style object ${ JSON.stringify(style) } to remain unmodified as ${ expected }`));
                    }
                    done();
                }
            },

            onError: done

        }).render('#testContainer');
    });
});
