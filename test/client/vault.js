/* @flow */
/* eslint require-await: off, max-lines: off */

import { wrapPromise } from 'belter/src';
import { FUNDING } from '@paypal/sdk-constants/src';

import { setupButton } from '../../src';

import { createButtonHTML, validatePaymentMethodApiMock } from './mocks';

describe('vault cases', () => {

    it('should set up a new forced-vaulted funding source', async () => {
        return await wrapPromise(async ({ expect }) => {

            window.xprops.vault = true;
            window.xprops.clientAccessToken = 'abc-123';

            const orderID = 'XXXXXXXXXX';

            window.xprops.createOrder = expect('createOrder', async () => {
                return orderID;
            });

            window.xprops.onApprove = expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }
            });

            window.document.body.innerHTML = createButtonHTML();
            await setupButton({});

            window.document.querySelector(`button[data-funding-source=${ FUNDING.PAYPAL }]`).click();
        });
    });

    it('should set up a new optionally-vaulted funding source', async () => {
        return await wrapPromise(async ({ expect }) => {
            window.xprops.clientAccessToken = 'abc-123';

            const orderID = 'XXXXXXXXXX';

            window.xprops.createOrder = expect('createOrder', async () => {
                return orderID;
            });

            window.xprops.onApprove = expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }
            });

            const fundingEligibility = {
                [ FUNDING.PAYPAL ]: {
                    eligible:  true,
                    vaultable: true
                }
            };

            window.document.body.innerHTML = createButtonHTML(fundingEligibility);
            await setupButton(fundingEligibility);

            window.document.querySelector(`button[data-funding-source=${ FUNDING.PAYPAL }]`).click();
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

            const vpmCall = validatePaymentMethodApiMock().expectCalls();

            window.xprops.onApprove = expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                // $FlowFixMe
                vpmCall.done();
            });

            const fundingEligibility = {
                [ FUNDING.PAYPAL ]: {
                    eligible:           true,
                    vaultedInstruments: [
                        {
                            id: paymentMethodID
                        }
                    ]
                }
            };

            window.document.body.innerHTML = createButtonHTML(fundingEligibility);
            await setupButton(fundingEligibility);

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

            const vpmCall = validatePaymentMethodApiMock().expectCalls();

            window.xprops.onApprove = expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                // $FlowFixMe
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
                                    id: paymentMethodID
                                }
                            ]
                        }
                    }
                }
            };

            window.document.body.innerHTML = createButtonHTML(fundingEligibility);
            await setupButton(fundingEligibility);

            window.document.querySelector(`button[data-funding-source=${ FUNDING.CARD }][data-payment-method-id]`).click();
        });
    });
});
