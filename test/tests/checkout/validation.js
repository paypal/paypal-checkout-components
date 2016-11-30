

import paypal from 'src/index';

import { generateECToken, generateBillingToken } from '../common';

describe(`paypal checkout component validation`, () => {

    it('should attempt to render checkout with invalid env and error out', () => {

        return paypal.Checkout.render({
            env: 'moo'
        }).then(() => {
            throw new Error('Expected error to be thrown');
        }, err => {
            return assert.ok(err instanceof Error, 'Expected error object to be thrown');
        });
    });

    it('should attempt to render checkout with payment and billing agreement and error out', () => {

        return paypal.Checkout.render({
            payment() {
                return generateECToken();
            },
            billingAgreement() {
                return generateBillingToken();
            }
        }).then(() => {
            throw new Error('Expected error to be thrown');
        }, err => {
            return assert.ok(err instanceof Error, 'Expected error object to be thrown');
        });
    });

    it('should attempt to render checkout with billing agreement and commit, and error out', () => {

        return paypal.Checkout.render({
            commit: true,
            billingAgreement() {
                return generateBillingToken();
            }
        }).then(() => {
            throw new Error('Expected error to be thrown');
        }, err => {
            return assert.ok(err instanceof Error, 'Expected error object to be thrown');
        });
    });

    it('should attempt to render checkout with payment and commit, and not error out', () => {

        return paypal.Checkout.render({
            commit: true,
            payment() {
                return generateECToken();
            },
            onAuthorize() {
                // pass
            }
        });
    });

    it('should attempt to render checkout with payment and no onAuthorize, and error out', () => {

        return paypal.Checkout.render({
            payment() {
                return generateECToken();
            }
        }).then(() => {
            throw new Error('Expected error to be thrown');
        }, err => {
            return assert.ok(err instanceof Error, 'Expected error object to be thrown');
        });
    });

    it('should attempt to render checkout with no payment or billing agreement, and error out', () => {

        return paypal.Checkout.render({
            onAuthorize() {
                // pass
            }
        }).then(() => {
            throw new Error('Expected error to be thrown');
        }, err => {
            return assert.ok(err instanceof Error, 'Expected error object to be thrown');
        });
    });

    it('should attempt to render checkout with an invalid size, and error out', () => {

        return paypal.Checkout.render({
            payment() {
                return generateECToken();
            },
            onAuthorize() {
                // pass
            },
            style: {
                size: 'moo'
            }
        }).then(() => {
            throw new Error('Expected error to be thrown');
        }, err => {
            return assert.ok(err instanceof Error, 'Expected error object to be thrown');
        });
    });

    it('should attempt to render checkout with no client id, and error out', () => {

        return paypal.Checkout.render({
            payment() {
                return generateECToken();
            },
            onAuthorize() {
                // pass
            },
            client: {

            }
        }).then(() => {
            throw new Error('Expected error to be thrown');
        }, err => {
            return assert.ok(err instanceof Error, 'Expected error object to be thrown');
        });
    });

    it('should attempt to render checkout with an invalid client id, and error out', () => {

        return paypal.Checkout.render({
            payment() {
                return generateECToken();
            },
            onAuthorize() {
                // pass
            },
            client: {
                test: 'xxxxxxxxxx'
            }
        }).then(() => {
            throw new Error('Expected error to be thrown');
        }, err => {
            return assert.ok(err instanceof Error, 'Expected error object to be thrown');
        });
    });
});
