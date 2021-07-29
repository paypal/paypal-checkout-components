/* @flow */
/* eslint max-lines: 0 */

import { ZalgoPromise } from 'zalgo-promise/src';
import { once } from 'belter/src';

import { generateOrderID, createTestContainer, destroyTestContainer, getElementRecursive, getElements, assert, WEBVIEW_USER_AGENT } from '../common';

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
});

describe('paypal button label', () => {

    beforeEach(() => {
        createTestContainer();
    });

    afterEach(() => {
        destroyTestContainer();
    });

    it('should render buttons with properly aria-abel', (done) => {
        done = once(done);
        const style = {
            label: 'pay'
        };
        window.paypal.Buttons({
            style,
            test: {
                onRender: ('onRender', () => {
                    setTimeout(() => {
                        const buttons = getElements('[role="button"]');
                        
                        if (buttons.length < 1) {
                            return done(new Error('Could not find buttons in the document'));
                        }

                        const [ paypal, credit, debitOrCredit ] = buttons;
                        const paypalButtonAriaLabel = paypal.getAttribute('aria-label') || 'undefined';
                        const creditButtonAriaLabel = credit.getAttribute('aria-label') || 'undefined';
                        const debitOrCreditButtonAriaLabel = debitOrCredit.getAttribute('aria-label') || 'undefined';

                        if (paypalButtonAriaLabel !== 'Pay with paypal')  {
                            done(new Error(`Expected aria-label to be 'Pay with paypal', but got ${ paypalButtonAriaLabel }`));
                        }

                        if (creditButtonAriaLabel !== 'Pay with credit')  {
                            done(new Error(`Expected aria-label to be 'Pay with credit', but got ${ paypalButtonAriaLabel }`));
                        }

                        if (debitOrCreditButtonAriaLabel !== 'Debit or Credit Card')  {
                            done(new Error(`Expected aria-label to be 'Debit or Credit Card', but got ${ paypalButtonAriaLabel }`));
                        }

                        return done();

                    }, 1000);
                })
            },
            onError: done

        }).render('#testContainer');
    });
});
