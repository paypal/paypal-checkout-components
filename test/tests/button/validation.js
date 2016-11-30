

import paypal from 'src/index';

import { generateECToken, generateBillingToken } from '../common';

describe(`paypal button component validation`, () => {

    it('should attempt to render a button with invalid env and error out', () => {

        return paypal.Button.render({
            env: 'moo'
        }, '#meep').then(() => {
            throw new Error('Expected error to be thrown');
        }, err => {
            return assert.ok(err instanceof Error, 'Expected error object to be thrown');
        });
    });

    it('should attempt to render a button with payment and billing agreement and error out', () => {

        return paypal.Button.render({
            payment() {
                return generateECToken();
            },
            billingAgreement() {
                return generateBillingToken();
            }
        }, '#meep').then(() => {
            throw new Error('Expected error to be thrown');
        }, err => {
            return assert.ok(err instanceof Error, 'Expected error object to be thrown');
        });
    });

    it('should attempt to render a button with billing agreement and commit, and error out', () => {

        return paypal.Button.render({
            commit: true,
            billingAgreement() {
                return generateBillingToken();
            }
        }, '#meep').then(() => {
            throw new Error('Expected error to be thrown');
        }, err => {
            return assert.ok(err instanceof Error, 'Expected error object to be thrown');
        });
    });

    it('should attempt to render a button with payment and commit, and not error out', () => {

        return paypal.Button.render({
            commit: true,
            payment() {
                return generateECToken();
            },
            onAuthorize() {
                // pass
            }
        }, 'body');
    });

    it('should attempt to render a button with payment and no onAuthorize, and error out', () => {

        return paypal.Button.render({
            payment() {
                return generateECToken();
            }
        }, '#meep').then(() => {
            throw new Error('Expected error to be thrown');
        }, err => {
            return assert.ok(err instanceof Error, 'Expected error object to be thrown');
        });
    });

    it('should attempt to render a button with no payment or billing agreement, and error out', () => {

        return paypal.Button.render({
            onAuthorize() {
                // pass
            }
        }, '#meep').then(() => {
            throw new Error('Expected error to be thrown');
        }, err => {
            return assert.ok(err instanceof Error, 'Expected error object to be thrown');
        });
    });

    it('should attempt to render a button with an invalid size, and error out', () => {

        return paypal.Button.render({
            payment() {
                return generateECToken();
            },
            onAuthorize() {
                // pass
            },
            style: {
                size: 'moo'
            }
        }, '#meep').then(() => {
            throw new Error('Expected error to be thrown');
        }, err => {
            return assert.ok(err instanceof Error, 'Expected error object to be thrown');
        });
    });

    it('should attempt to render a button with no client id, and error out', () => {

        return paypal.Button.render({
            payment() {
                return generateECToken();
            },
            onAuthorize() {
                // pass
            },
            client: {

            }
        }, '#meep').then(() => {
            throw new Error('Expected error to be thrown');
        }, err => {
            return assert.ok(err instanceof Error, 'Expected error object to be thrown');
        });
    });

    it('should attempt to render a button with an invalid client id, and error out', () => {

        return paypal.Button.render({
            payment() {
                return generateECToken();
            },
            onAuthorize() {
                // pass
            },
            client: {
                test: 'xxxxxxxxxx'
            }
        }, '#meep').then(() => {
            throw new Error('Expected error to be thrown');
        }, err => {
            return assert.ok(err instanceof Error, 'Expected error object to be thrown');
        });
    });
});
