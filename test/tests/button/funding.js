/* @flow */
/* eslint max-lines: 0 */

import { ZalgoPromise } from 'zalgo-promise/src';

import { createTestContainer, destroyTestContainer } from '../common';

describe(`paypal button component funding mix`, () => {

    beforeEach(() => {
        createTestContainer();
    });

    afterEach(() => {
        destroyTestContainer();
        window.location.hash = '';
    });

    it('should render venmo alongside default button', (done) => {

        window.paypal.Button.render({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.indexOf(window.paypal.FUNDING.VENMO) === -1) {
                        throw new Error(`Expected venmo to be offered, got ${ JSON.stringify(fundingSources) }`);
                    }

                    done();
                }
            },

            locale: 'en_US',

            funding: {
                allowed: [ window.paypal.FUNDING.CARD, window.paypal.FUNDING.VENMO ]
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

    it('should render venmo alongside checkout button', (done) => {

        window.paypal.Button.render({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.indexOf(window.paypal.FUNDING.VENMO) === -1) {
                        throw new Error(`Expected venmo to be offered, got ${ JSON.stringify(fundingSources) }`);
                    }

                    done();
                }
            },

            style: {
                label: 'checkout'
            },

            locale: 'en_US',

            funding: {
                allowed: [ window.paypal.FUNDING.CARD, window.paypal.FUNDING.VENMO ]
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

    it('should render venmo alongside pay button', (done) => {

        window.paypal.Button.render({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.indexOf(window.paypal.FUNDING.VENMO) === -1) {
                        throw new Error(`Expected venmo to be offered, got ${ JSON.stringify(fundingSources) }`);
                    }

                    done();
                }
            },

            style: {
                label: 'pay'
            },

            locale: 'en_US',

            funding: {
                allowed: [ window.paypal.FUNDING.CARD, window.paypal.FUNDING.VENMO ]
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

    it('should render venmo alongside paypal button', (done) => {

        window.paypal.Button.render({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.indexOf(window.paypal.FUNDING.VENMO) === -1) {
                        throw new Error(`Expected venmo to be offered, got ${ JSON.stringify(fundingSources) }`);
                    }

                    done();
                }
            },

            style: {
                label: 'paypal'
            },

            locale: 'en_US',

            funding: {
                allowed: [ window.paypal.FUNDING.CARD, window.paypal.FUNDING.VENMO ]
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

    it('should render venmo alongside buynow button', (done) => {

        window.paypal.Button.render({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.indexOf(window.paypal.FUNDING.VENMO) === -1) {
                        throw new Error(`Expected venmo to be offered, got ${ JSON.stringify(fundingSources) }`);
                    }

                    done();
                }
            },

            style: {
                label: 'buynow'
            },

            locale: 'en_US',

            funding: {
                allowed: [ window.paypal.FUNDING.CARD, window.paypal.FUNDING.VENMO ]
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

    it('should not render venmo for ineligible country', (done) => {

        window.paypal.Button.render({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.indexOf(window.paypal.FUNDING.VENMO) !== -1) {
                        throw new Error(`Expected venmo to not be offered`);
                    }

                    done();
                }
            },

            locale: 'pt_BR',

            funding: {
                allowed: [ window.paypal.FUNDING.VENMO ]
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

    it('should not render multiple horizontal buttons alongside credit button', (done) => {

        window.paypal.Button.render({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.length !== 1 && fundingSources[0] !== window.paypal.FUNDING.CREDIT) {
                        throw new Error(`Expected credit to be the sole button, got ${ JSON.stringify(fundingSources) }`);
                    }

                    done();
                }
            },

            style: {
                label: 'credit'
            },

            funding: {
                allowed: [ window.paypal.FUNDING.CARD, window.paypal.FUNDING.VENMO ]
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

    it('should render card in vertical layout', (done) => {

        window.paypal.Button.render({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.indexOf(window.paypal.FUNDING.CARD) === -1) {
                        throw new Error(`Expected card to be offered, got ${ JSON.stringify(fundingSources) }`);
                    }

                    done();
                }
            },

            style: {
                layout: 'vertical'
            },

            funding: {
                allowed: [ window.paypal.FUNDING.CARD ]
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

    it('should not render card in horizontal layout', (done) => {

        window.paypal.Button.render({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.indexOf(window.paypal.FUNDING.CARD) !== -1) {
                        throw new Error(`Expected card to not be offered, got ${ JSON.stringify(fundingSources) }`);
                    }

                    done();
                }
            },

            funding: {
                allowed: [ window.paypal.FUNDING.CARD ]
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

    it('should render ideal in vertical layout', (done) => {

        window.paypal.Button.render({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.indexOf(window.paypal.FUNDING.IDEAL) === -1) {
                        throw new Error(`Expected ideal to be offered, got ${ JSON.stringify(fundingSources) }`);
                    }

                    done();
                }
            },

            commit: true,

            style: {
                layout: 'vertical'
            },

            locale: 'nl_NL',

            funding: {
                allowed: [ window.paypal.FUNDING.IDEAL ]
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

    it('should not render ideal in horizontal layout', (done) => {

        window.paypal.Button.render({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.indexOf(window.paypal.FUNDING.IDEAL) !== -1) {
                        throw new Error(`Expected ideal to not be offered, got ${ JSON.stringify(fundingSources) }`);
                    }

                    done();
                }
            },

            commit: true,

            funding: {
                allowed: [ window.paypal.FUNDING.IDEAL ]
            },

            locale: 'nl_NL',

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

    it.skip('should render ideal by default for eligible country', (done) => {

        window.paypal.Button.render({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.indexOf(window.paypal.FUNDING.IDEAL) === -1) {
                        throw new Error(`Expected ideal to be offered, got ${ JSON.stringify(fundingSources) }`);
                    }

                    done();
                }
            },

            commit: true,

            style: {
                layout: 'vertical'
            },

            locale: 'nl_NL',

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

    it('should not render ideal by default for eligible country when opted out', (done) => {

        window.paypal.Button.render({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.indexOf(window.paypal.FUNDING.IDEAL) !== -1) {
                        throw new Error(`Expected ideal to not be offered, got ${ JSON.stringify(fundingSources) }`);
                    }

                    done();
                }
            },

            commit: true,

            style: {
                layout: 'vertical'
            },

            funding: {
                disallowed: [ window.paypal.FUNDING.IDEAL ]
            },

            locale: 'nl_NL',

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

    it('should not render ideal for a non-eligible locale', (done) => {

        window.paypal.Button.render({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.indexOf(window.paypal.FUNDING.IDEAL) !== -1) {
                        throw new Error(`Expected ideal to not be offered, got ${ JSON.stringify(fundingSources) }`);
                    }

                    done();
                }
            },

            commit: true,

            style: {
                layout: 'vertical'
            },

            funding: {
                allowed: [ window.paypal.FUNDING.IDEAL ]
            },

            locale: 'pt_BR',

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

    it('should render elv in vertical layout', (done) => {

        window.paypal.Button.render({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.indexOf(window.paypal.FUNDING.ELV) === -1) {
                        throw new Error(`Expected elv to be offered, got ${ JSON.stringify(fundingSources) }`);
                    }

                    done();
                }
            },

            style: {
                layout: 'vertical'
            },

            locale: 'de_DE',

            funding: {
                allowed: [ window.paypal.FUNDING.ELV ]
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

    it('should render elv by default for eligible country', (done) => {

        window.paypal.Button.render({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.indexOf(window.paypal.FUNDING.ELV) === -1) {
                        throw new Error(`Expected elv to be offered, got ${ JSON.stringify(fundingSources) }`);
                    }

                    done();
                }
            },

            style: {
                layout: 'vertical'
            },

            locale: 'de_DE',

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

    it('should not render elv by default for eligible country when opted out', (done) => {

        window.paypal.Button.render({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.indexOf(window.paypal.FUNDING.ELV) !== -1) {
                        throw new Error(`Expected elv to not be offered, got ${ JSON.stringify(fundingSources) }`);
                    }

                    done();
                }
            },

            style: {
                layout: 'vertical'
            },

            funding: {
                disallowed: [ window.paypal.FUNDING.ELV ]
            },

            locale: 'de_DE',

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

    it('should not render elv in horizontal layout', (done) => {

        window.paypal.Button.render({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.indexOf(window.paypal.FUNDING.ELV) !== -1) {
                        throw new Error(`Expected elv to not be offered, got ${ JSON.stringify(fundingSources) }`);
                    }

                    done();
                }
            },

            funding: {
                allowed: [ window.paypal.FUNDING.ELV ]
            },

            locale: 'de_DE',

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

    it('should not render elv for a non-eligible locale', (done) => {

        window.paypal.Button.render({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.indexOf(window.paypal.FUNDING.ELV) !== -1) {
                        throw new Error(`Expected elv to not be offered, got ${ JSON.stringify(fundingSources) }`);
                    }

                    done();
                }
            },

            style: {
                layout: 'vertical'
            },

            funding: {
                allowed: [ window.paypal.FUNDING.ELV ]
            },

            locale: 'pt_BR',

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
