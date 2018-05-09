/* @flow */
/* eslint max-lines: 0 */

import { ZalgoPromise } from 'zalgo-promise/src';

import { createTestContainer, destroyTestContainer, mockProp, IPHONE6_USER_AGENT } from '../common';

describe(`paypal button component funding mix`, () => {

    beforeEach(() => {
        createTestContainer();
    });

    afterEach(() => {
        destroyTestContainer();
        window.location.hash = '';
    });

    it('should render venmo alongside default button', (done) => {

        window.navigator.mockUserAgent = IPHONE6_USER_AGENT;

        let client = window.paypal.client();

        client.Button.render({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.indexOf(client.FUNDING.VENMO) === -1) {
                        throw new Error(`Expected venmo to be offered, got ${ JSON.stringify(fundingSources) }`);
                    }

                    done();
                }
            },

            funding: {
                allowed: [ client.FUNDING.CARD, client.FUNDING.VENMO ]
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

        window.navigator.mockUserAgent = IPHONE6_USER_AGENT;

        let client = window.paypal.client();

        client.Button.render({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.indexOf(client.FUNDING.VENMO) === -1) {
                        throw new Error(`Expected venmo to be offered, got ${ JSON.stringify(fundingSources) }`);
                    }

                    done();
                }
            },

            style: {
                label: 'checkout'
            },

            funding: {
                allowed: [ client.FUNDING.CARD, client.FUNDING.VENMO ]
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

        window.navigator.mockUserAgent = IPHONE6_USER_AGENT;

        let client = window.paypal.client();

        client.Button.render({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.indexOf(client.FUNDING.VENMO) === -1) {
                        throw new Error(`Expected venmo to be offered, got ${ JSON.stringify(fundingSources) }`);
                    }

                    done();
                }
            },

            style: {
                label: 'pay'
            },

            funding: {
                allowed: [ client.FUNDING.CARD, client.FUNDING.VENMO ]
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

        window.navigator.mockUserAgent = IPHONE6_USER_AGENT;

        let client = window.paypal.client();

        client.Button.render({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.indexOf(client.FUNDING.VENMO) === -1) {
                        throw new Error(`Expected venmo to be offered, got ${ JSON.stringify(fundingSources) }`);
                    }

                    done();
                }
            },

            style: {
                label: 'paypal'
            },

            funding: {
                allowed: [ client.FUNDING.CARD, client.FUNDING.VENMO ]
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

        window.navigator.mockUserAgent = IPHONE6_USER_AGENT;

        let client = window.paypal.client();

        client.Button.render({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.indexOf(client.FUNDING.VENMO) === -1) {
                        throw new Error(`Expected venmo to be offered, got ${ JSON.stringify(fundingSources) }`);
                    }

                    done();
                }
            },

            style: {
                label: 'buynow'
            },

            funding: {
                allowed: [ client.FUNDING.CARD, client.FUNDING.VENMO ]
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

        let client = window.paypal.client();

        window.navigator.mockUserAgent = IPHONE6_USER_AGENT;
        
        let mockLocaleProp = mockProp(client.Button.props, 'locale', {
            required: false,
            value:    'pt_BR'
        });

        client.Button.render({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.indexOf(client.FUNDING.VENMO) !== -1) {
                        throw new Error(`Expected venmo to not be offered`);
                    }

                    done();
                }
            },

            funding: {
                allowed: [ client.FUNDING.VENMO ]
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

        mockLocaleProp.cancel();
    });

    it('should not render multiple horizontal buttons alongside credit button', (done) => {

        let client = window.paypal.client();

        client.Button.render({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.length !== 1 && fundingSources[0] !== client.FUNDING.CREDIT) {
                        throw new Error(`Expected credit to be the sole button, got ${ JSON.stringify(fundingSources) }`);
                    }

                    done();
                }
            },

            style: {
                label: 'credit'
            },

            funding: {
                allowed: [ client.FUNDING.CARD, client.FUNDING.VENMO ]
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

        let client = window.paypal.client();

        client.Button.render({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.indexOf(client.FUNDING.CARD) === -1) {
                        throw new Error(`Expected card to be offered, got ${ JSON.stringify(fundingSources) }`);
                    }

                    done();
                }
            },

            style: {
                layout: 'vertical'
            },

            funding: {
                allowed: [ client.FUNDING.CARD ]
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

        let client = window.paypal.client();

        client.Button.render({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.indexOf(client.FUNDING.CARD) !== -1) {
                        throw new Error(`Expected card to not be offered, got ${ JSON.stringify(fundingSources) }`);
                    }

                    done();
                }
            },

            funding: {
                allowed: [ client.FUNDING.CARD ]
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
        let client = window.paypal.client();

        let mockLocaleProp = mockProp(client.Button.props, 'locale', {
            required: false,
            value:    'nl_NL'
        });

        client.Button.render({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.indexOf(client.FUNDING.IDEAL) === -1) {
                        throw new Error(`Expected ideal to be offered, got ${ JSON.stringify(fundingSources) }`);
                    }

                    done();
                }
            },

            commit: true,

            style: {
                layout: 'vertical'
            },

            funding: {
                allowed: [ client.FUNDING.IDEAL ]
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

        mockLocaleProp.cancel();
    });

    it('should not render ideal in horizontal layout', (done) => {
        let client = window.paypal.client();

        let mockLocaleProp = mockProp(client.Button.props, 'locale', {
            required: false,
            value:    'nl_NL'
        });

        client.Button.render({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.indexOf(client.FUNDING.IDEAL) !== -1) {
                        throw new Error(`Expected ideal to not be offered, got ${ JSON.stringify(fundingSources) }`);
                    }

                    done();
                }
            },

            commit: true,

            funding: {
                allowed: [ client.FUNDING.IDEAL ]
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

        mockLocaleProp.cancel();
    });

    it.skip('should render ideal by default for eligible country', (done) => {
        let client = window.paypal.client();

        let mockLocaleProp = mockProp(client.Button.props, 'locale', {
            required: false,
            value:    'nl_NL'
        });

        client.Button.render({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.indexOf(client.FUNDING.IDEAL) === -1) {
                        throw new Error(`Expected ideal to be offered, got ${ JSON.stringify(fundingSources) }`);
                    }

                    done();
                }
            },

            commit: true,

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

        mockLocaleProp.cancel();
    });

    it('should not render ideal by default for eligible country when opted out', (done) => {

        let client = window.paypal.client();

        let mockLocaleProp = mockProp(client.Button.props, 'locale', {
            required: false,
            value:    'nl_NL'
        });

        client.Button.render({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.indexOf(client.FUNDING.IDEAL) !== -1) {
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
                disallowed: [ client.FUNDING.IDEAL ]
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

        mockLocaleProp.cancel();
    });

    it('should not render ideal for a non-eligible locale', (done) => {
        let client = window.paypal.client();

        let mockLocaleProp = mockProp(client.Button.props, 'locale', {
            required: false,
            value:    'pt_BR'
        });

        client.Button.render({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.indexOf(client.FUNDING.IDEAL) !== -1) {
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
                allowed: [ client.FUNDING.IDEAL ]
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

        mockLocaleProp.cancel();
    });

    it('should render elv in vertical layout', (done) => {
        let client = window.paypal.client();

        let mockLocaleProp = mockProp(client.Button.props, 'locale', {
            required: false,
            value:    'de_DE'
        });

        client.Button.render({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.indexOf(client.FUNDING.ELV) === -1) {
                        throw new Error(`Expected elv to be offered, got ${ JSON.stringify(fundingSources) }`);
                    }

                    done();
                }
            },

            style: {
                layout: 'vertical'
            },

            funding: {
                allowed: [ client.FUNDING.ELV ]
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

        mockLocaleProp.cancel();
    });

    it('should render elv by default for eligible country', (done) => {
        let client = window.paypal.client();

        let mockLocaleProp = mockProp(client.Button.props, 'locale', {
            required: false,
            value:    'de_DE'
        });

        client.Button.render({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.indexOf(client.FUNDING.ELV) === -1) {
                        throw new Error(`Expected elv to be offered, got ${ JSON.stringify(fundingSources) }`);
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

        mockLocaleProp.cancel();
    });

    it('should not render elv by default for eligible country when opted out', (done) => {
        let client = window.paypal.client();

        let mockLocaleProp = mockProp(client.Button.props, 'locale', {
            required: false,
            value:    'de_DE'
        });

        client.Button.render({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.indexOf(client.FUNDING.ELV) !== -1) {
                        throw new Error(`Expected elv to not be offered, got ${ JSON.stringify(fundingSources) }`);
                    }

                    done();
                }
            },

            style: {
                layout: 'vertical'
            },

            funding: {
                disallowed: [ client.FUNDING.ELV ]
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

        mockLocaleProp.cancel();
    });

    it('should render elv in horizontal layout', (done) => {
        let client = window.paypal.client();

        let mockLocaleProp = mockProp(client.Button.props, 'locale', {
            required: false,
            value:    'de_DE'
        });

        client.Button.render({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.indexOf(client.FUNDING.ELV) === -1) {
                        throw new Error(`Expected elv to be offered, got ${ JSON.stringify(fundingSources) }`);
                    }

                    done();
                }
            },

            funding: {
                allowed: [ client.FUNDING.ELV ]
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

        mockLocaleProp.cancel();
    });

    it('should not render elv for a non-eligible locale', (done) => {
        let client = window.paypal.client();

        let mockLocaleProp = mockProp(client.Button.props, 'locale', {
            required: false,
            value:    'pt_BR'
        });

        client.Button.render({

            test: {
                onRender({ fundingSources }) {
                    if (fundingSources.indexOf(client.FUNDING.ELV) !== -1) {
                        throw new Error(`Expected elv to not be offered, got ${ JSON.stringify(fundingSources) }`);
                    }

                    done();
                }
            },

            style: {
                layout: 'vertical'
            },

            funding: {
                allowed: [ client.FUNDING.ELV ]
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

        mockLocaleProp.cancel();
    });
});
