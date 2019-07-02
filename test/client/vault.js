/* @flow */
/* eslint require-await: off, max-lines: off, max-nested-callbacks: off */

import { wrapPromise } from 'belter/src';
import { FUNDING } from '@paypal/sdk-constants/src';

import { setupButton } from '../../src';

import { createButtonHTML, getValidatePaymentMethodApiMock, clickButton, getGraphQLApiMock } from './mocks';

describe('vault cases', () => {

    it('should set up a new forced-vaulted funding source', async () => {
        return await wrapPromise(async ({ expect }) => {

            window.xprops.vault = true;
            window.xprops.clientAccessToken = 'abc-123';

            const orderID = 'XXXXXXXXXX';

            window.xprops.createOrder = expect('createOrder', async () => {
                return orderID;
            });

            let enableVaultCalled = false;

            const gqlMock = getGraphQLApiMock({
                handler: expect('graphqlCall', ({ data }) => {
                    if (!data.query.includes('mutation EnableVault')) {
                        return {};
                    }

                    enableVaultCalled = true;
                    return {};
                })
            }).expectCalls();

            window.xprops.onApprove = expect('onApprove', async () => {
                gqlMock.done();

                if (!enableVaultCalled) {
                    throw new Error(`Expected graphql call with enableVault mutation`);
                }
            });

            const fundingEligibility = {
                [FUNDING.PAYPAL]: {
                    eligible:  true,
                    vaultable: true
                }
            };

            createButtonHTML(fundingEligibility);
            await setupButton({ fundingEligibility });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should set up a new forced-vaulted funding source, and fail because paypal is not vaulable', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            window.xprops.vault = true;
            window.xprops.clientAccessToken = 'abc-123';

            const orderID = 'XXXXXXXXXX';

            window.xprops.createOrder = expect('createOrder', async () => {
                return orderID;
            });

            window.xprops.onApprove = avoid('onApprove');

            const fundingEligibility = {
                [FUNDING.PAYPAL]: {
                    eligible:  true,
                    vaultable: false
                }
            };

            createButtonHTML(fundingEligibility);
            await setupButton({ fundingEligibility });

            await clickButton(FUNDING.PAYPAL).catch(expect('clickCatch'));
        });
    });

    it('should set up a new optionally-vaulted funding source', async () => {
        return await wrapPromise(async ({ expect }) => {

            window.xprops.clientAccessToken = 'abc-123';

            const orderID = 'XXXXXXXXXX';

            window.xprops.createOrder = expect('createOrder', async () => {
                return orderID;
            });

            let enableVaultCalled = false;

            const gqlMock = getGraphQLApiMock({
                handler: expect('graphqlCall', ({ data }) => {
                    if (!data.query.includes('mutation EnableVault')) {
                        return {};
                    }

                    enableVaultCalled = true;
                    return {};
                })
            }).expectCalls();

            window.xprops.onApprove = expect('onApprove', async () => {
                gqlMock.done();

                if (!enableVaultCalled) {
                    throw new Error(`Expected graphql call with enableVault mutation`);
                }
            });

            const fundingEligibility = {
                [FUNDING.PAYPAL]: {
                    eligible:  true,
                    vaultable: true
                }
            };

            createButtonHTML(fundingEligibility);
            await setupButton({ fundingEligibility });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should not set up a new optionally-vaulted funding source when vaulting is not eligible', async () => {
        return await wrapPromise(async ({ expect }) => {

            window.xprops.clientAccessToken = 'abc-123';

            const orderID = 'XXXXXXXXXX';

            window.xprops.createOrder = expect('createOrder', async () => {
                return orderID;
            });

            let enableVaultCalled = false;

            const gqlMock = getGraphQLApiMock({
                handler: ({ data }) => {
                    if (!data.query.includes('mutation EnableVault')) {
                        return {};
                    }

                    enableVaultCalled = true;
                    return {};
                }
            }).enable();

            window.xprops.onApprove = expect('onApprove', async () => {
                gqlMock.disable();

                if (enableVaultCalled) {
                    throw new Error(`Expected graphql to not be called with enableVault mutation`);
                }
            });

            const fundingEligibility = {
                [FUNDING.PAYPAL]: {
                    eligible:  true,
                    vaultable: false
                }
            };

            createButtonHTML(fundingEligibility);
            await setupButton({ fundingEligibility });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should continue with a one time payment for a new optionally-vaulted funding source when enableVault errors out', async () => {
        return await wrapPromise(async ({ expect }) => {

            window.xprops.clientAccessToken = 'abc-123';

            const orderID = 'XXXXXXXXXX';

            window.xprops.createOrder = expect('createOrder', async () => {
                return orderID;
            });

            let enableVaultCalled = false;

            const gqlMock = getGraphQLApiMock({
                handler: expect('graphqlCall', ({ data }) => {
                    if (!data.query.includes('mutation EnableVault')) {
                        return {};
                    }

                    enableVaultCalled = true;
                    return {
                        errors: [
                            {
                                message: 'enableVault intentionally failed'
                            }
                        ]
                    };
                })
            }).expectCalls();

            window.xprops.onApprove = expect('onApprove', async () => {
                gqlMock.done();

                if (!enableVaultCalled) {
                    throw new Error(`Expected graphql call with enableVault mutation`);
                }
            });

            const fundingEligibility = {
                [FUNDING.PAYPAL]: {
                    eligible:  true,
                    vaultable: true
                }
            };

            createButtonHTML(fundingEligibility);
            await setupButton({ fundingEligibility });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should pay with an existing vaulted paypal account', async () => {
        return await wrapPromise(async ({ expect }) => {

            window.xprops.clientAccessToken = 'abc-123';

            const orderID = 'XXXXXXXXXX';
            const paymentMethodID = 'xyz123';

            window.xprops.createOrder = expect('createOrder', async () => {
                return orderID;
            });

            const vpmCall = getValidatePaymentMethodApiMock().expectCalls();

            window.xprops.onApprove = expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                vpmCall.done();
            });

            const fundingEligibility = {
                [ FUNDING.PAYPAL ]: {
                    eligible:           true,
                    vaultedInstruments: [
                        {
                            id:    paymentMethodID,
                            label: {
                                description: 'foo@bar.com'
                            }
                        }
                    ]
                }
            };

            createButtonHTML(fundingEligibility);
            await setupButton({ fundingEligibility });

            window.document.querySelector(`button[data-funding-source=${ FUNDING.PAYPAL }][data-payment-method-id]`).click();
        });
    });

    it('should pay with an existing vaulted card', async () => {
        return await wrapPromise(async ({ expect }) => {

            window.xprops.clientAccessToken = 'abc-123';

            const orderID = 'XXXXXXXXXX';
            const paymentMethodID = 'xyz123';

            window.xprops.createOrder = expect('createOrder', async () => {
                return orderID;
            });

            const vpmCall = getValidatePaymentMethodApiMock().expectCalls();

            window.xprops.onApprove = expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                vpmCall.done();
            });

            const fundingEligibility = {
                [ FUNDING.PAYPAL ]: {
                    eligible: true
                },
                [ FUNDING.CARD ]: {
                    eligible: true,
                    vendors:  {
                        visa: {
                            eligible:           true,
                            vaultedInstruments: [
                                {
                                    id:    paymentMethodID,
                                    label: {
                                        description: 'Visa x-1234'
                                    }
                                }
                            ]
                        }
                    }
                }
            };

            createButtonHTML(fundingEligibility);
            await setupButton({ fundingEligibility });

            window.document.querySelector(`button[data-funding-source=${ FUNDING.CARD }][data-payment-method-id]`).click();
        });
    });
});
