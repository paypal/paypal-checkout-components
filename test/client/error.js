/* @flow */
/* eslint require-await: off, max-nested-callbacks: off */

import { INTENT, FUNDING } from '@paypal/sdk-constants/src';
import { wrapPromise } from '@krakenjs/belter/src';

import { mockSetupButton, generateOrderID, mockAsyncProp, createButtonHTML, DEFAULT_FUNDING_ELIGIBILITY, clickButton, mockFunction } from './mocks';

describe('error cases', () => {

    it('should call xprops.onError for any onApprove error', async () => {
        return await wrapPromise(async ({ expect, expectError }) => {

            const error = new Error(`Something went wrong`);

            window.xprops.onApprove = expectError('onApprove', async () => {
                throw error;
            });

            window.xprops.onError = mockAsyncProp(expect('onError', (err) => {
                if (err !== error) {
                    throw new Error(`Expected errors to match`);
                }
            }));

            createButtonHTML();

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should call xprops.onError for any onCancel error', async () => {
        return await wrapPromise(async ({ expect, expectError }) => {
            const orderID = generateOrderID();

            const error = new Error(`Something went wrong`);

            window.xprops.onCancel = expectError('onCancel', async () => {
                throw error;
            });

            window.xprops.onError = mockAsyncProp(expect('onError', (err) => {
                if (err !== error) {
                    throw new Error(`Expected errors to match`);
                }
            }));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {
                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async () => {
                    return props.onCancel({ orderID });
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should error on button setup if paypal not defined', async () => {
        return await wrapPromise(async () => {

            delete window.paypal;

            let error;
            try {
                await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });
            } catch (err) {
                error = err;
            }

            if (!error) {
                throw new Error(`Expected setupButton to throw an error`);
            }
        });
    });

    it('should error on button setup if createBillingAgreement and createOrder props are set', async () => {
        return await wrapPromise(async ({ avoid }) => {
            let error;

            window.xprops.createBillingAgreement = avoid('createBillingAgreement');

            window.xprops.createOrder = avoid('createOrder');

            createButtonHTML();

            try {
                await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });
            } catch (err) {
                error = err;
            }
            
            if (!error) {
                throw new Error(`Expected setupButton to throw an error`);
            }
        });
    });

    it('should error on button setup if createBillingAgreement is passed and vault not set to true', async () => {
        return await wrapPromise(async ({ avoid }) => {
            
            let error;

            window.xprops.vault = false;

            window.xprops.createBillingAgreement = avoid('createBillingAgreement');

            createButtonHTML();

            try {
                await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });
            } catch (err) {
                error = err;
            }
            
            if (!error) {
                throw new Error(`Expected setupButton to throw an error`);
            }
        });
    });

    it('should error on button setup if createSubscription and createOrder props are set', async () => {
        return await wrapPromise(async ({ avoid }) => {
            
            let error;

            window.xprops.createSubscription = avoid('createSubscription');

            window.xprops.createOrder = avoid('createOrder');

            createButtonHTML();

            try {
                await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });
            } catch (err) {
                error = err;
            }
            
            if (!error) {
                throw new Error(`Expected setupButton to throw an error`);
            }
        });
    });

    it('should error on button setup if createSubscription and createBillingAgreement props are set', async () => {
        return await wrapPromise(async ({ avoid }) => {
            
            let error;

            window.xprops.createSubscription = avoid('createSubscription');
            
            window.xprops.createBillingAgreement = avoid('createBillingAgreement');

            createButtonHTML();

            try {
                await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });
            } catch (err) {
                error = err;
            }
            
            if (!error) {
                throw new Error(`Expected setupButton to throw an error`);
            }
        });
    });

    it('should error on button setup if createSubscription is passed and vault not set to true', async () => {
        return await wrapPromise(async ({ avoid }) => {

            let error;

            window.xprops.vault = false;
            window.xprops.createSubscription = avoid('createSubscription');

            createButtonHTML();

            try {
                await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });
            } catch (err) {
                error = err;
            }
            
            if (!error) {
                throw new Error(`Expected setupButton to throw an error`);
            }
        });
    });

    it('should error on button setup if intent=INTENT.TOKENIZE and createBillingAgreement is not set', async () => {
        return await wrapPromise(async () => {

            let error;

            window.xprops.intent = INTENT.TOKENIZE;

            delete window.xprops.createBillingAgreement;

            createButtonHTML();

            try {
                await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });
            } catch (err) {
                error = err;
            }
            
            if (!error) {
                throw new Error(`Expected setupButton to throw an error`);
            }
        });
    });

    it('should error on button setup if intent=INTENT.TOKENIZE and createOrder is set', async () => {
        return await wrapPromise(async ({ avoid }) => {

            let error;

            window.xprops.intent = INTENT.TOKENIZE;

            window.xprops.createBillingAgreement = avoid('createBillingAgreement');

            window.xprops.createSubscription = avoid('createOrder');

            createButtonHTML();

            try {
                await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });
            } catch (err) {
                error = err;
            }
            
            if (!error) {
                throw new Error(`Expected setupButton to throw an error`);
            }
        });
    });

    it('should error on button setup if intent=INTENT.TOKENIZE and createSubscription is set', async () => {
        return await wrapPromise(async ({ avoid }) => {
            
            let error;

            window.xprops.intent = INTENT.TOKENIZE;

            window.xprops.createBillingAgreement = avoid('createBillingAgreement');
            
            window.xprops.createSubscription = avoid('createSubscription');
            
            createButtonHTML();

            try {
                await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });
            } catch (err) {
                error = err;
            }
            
            if (!error) {
                throw new Error(`Expected setupButton to throw an error`);
            }
        });
    });

    it('should error on button setup if intent=INTENT.SUBSCRIPTION and createSubscription is not set', async () => {
        return await wrapPromise(async () => {

            let error;

            window.xprops.intent = INTENT.SUBSCRIPTION;

            delete window.xprops.createSubscription;

            createButtonHTML();

            try {
                await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });
            } catch (err) {
                error = err;
            }
            
            if (!error) {
                throw new Error(`Expected setupButton to throw an error`);
            }
        });
    });

    it('should error on button setup if intent=INTENT.SUBSCRIPTION and createOrder is set', async () => {
        return await wrapPromise(async ({ avoid }) => {
            
            let error;

            window.xprops.intent = INTENT.SUBSCRIPTION;

            window.xprops.createSubscription = avoid('createSubscription');

            window.xprops.createOrder = avoid('createOrder');

            createButtonHTML();

            try {
                await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });
            } catch (err) {
                error = err;
            }
            
            if (!error) {
                throw new Error(`Expected setupButton to throw an error`);
            }
        });
    });

    it('should error on button setup if intent=INTENT.SUBSCRIPTION and createBillingAgreement is set', async () => {
        return await wrapPromise(async ({ avoid }) => {

            let error;

            window.xprops.intent = INTENT.SUBSCRIPTION;

            window.xprops.createSubscription = avoid('createSubscription');
            
            window.xprops.createBillingAgreement = avoid('createBillingAgreement');

            createButtonHTML();

            try {
                await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });
            } catch (err) {
                error = err;
            }
            
            if (!error) {
                throw new Error(`Expected setupButton to throw an error`);
            }
        });
    });
});
