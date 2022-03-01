/* @flow */
/* eslint max-lines: 0 */
import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { once } from '@krakenjs/belter/src';

import { createTestContainer, destroyTestContainer } from '../common';

describe('Tests for button animations and designs', () => {

    describe('Tests for divide logo animation', () => {
        beforeEach(() => {
            createTestContainer();
        });

        afterEach(() => {
            destroyTestContainer();
        });

        it('should not apply animation in WEB', (done) => {
            done = once(done);

            const personalization = {
                buttonAnimation: {
                    id:       'run-divide-logo-animation',
                    text:     'Safe and easy way to pay',
                    tracking: {
                        click:      '',
                        impression: ''
                    }
                }
            };


            window.paypal.Buttons({

                style: {
                    shape:  'pill',
                    color:  'gold',
                    layout: 'vertical',
                    label:  'paypal'
                },

                personalization,

                test: {
                    onRender() {
                        const frame = document.querySelector('#testContainer iframe');
                        if (!frame) {
                            throw new Error(`Cannot find frame`);
                        }

                        // $FlowFixMe
                        const win = frame.contentWindow;
                        const animationContainer = win.document.querySelector('.divide-logo-animation-label-container');
                        if (animationContainer) {
                            done(new Error('No personalization should be applied on __WEB__'));
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

    });
    describe('Tests for label next to logo animation', () => {
        beforeEach(() => {
            createTestContainer();
        });

        afterEach(() => {
            destroyTestContainer();
        });

        it('should not apply animation in WEB', (done) => {
            done = once(done);

            const personalization = {
                buttonAnimation: {
                    id:       'run-add-label-text-next-to-logo-animation',
                    text:     'Safe and easy way to pay',
                    tracking: {
                        click:      '',
                        impression: ''
                    }
                }
            };

            window.paypal.Buttons({
                style: {
                    shape:  'pill',
                    color:  'gold',
                    layout: 'vertical',
                    label:  'paypal'
                },
                personalization,
                test: {
                    onRender() {
                        const frame = document.querySelector('#testContainer iframe');
                        if (!frame) {
                            throw new Error(`Cannot find frame`);
                        }

                        // $FlowFixMe
                        const win = frame.contentWindow;
                        const animationContainer = win.document.querySelector('.run-add-label-text-next-to-logo-animation');
                        if (animationContainer) {
                            done(new Error('No personalization should be applied on __WEB__'));
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
                onError:  done
            }).render('#testContainer');
        });

    });

});
